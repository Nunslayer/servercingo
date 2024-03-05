package sa

import (
	"bytes"
	"context"
	"database/sql"
	"fmt"
	"reflect"
	"text/template"

	"changeme/core/data"
	"changeme/core/model"
)

type SAManager struct {
	isConnected bool
	stopPolling func()error
	DB          *sql.DB
	*data.CFNTrackerRepository
}

var funcs = template.FuncMap{
	"coma": func(a int, b int) string {
		if a == b+1 {
			return ""
		}
		return ","
	},
	"formatMap": func(key string, value interface{}) string {
		typeValue := reflect.TypeOf(value).String()
		if typeValue == "string" {
			value = fmt.Sprintf("'%v'", value)
		} else {
			value = fmt.Sprintf("%v", value)
		}
		return fmt.Sprintf("%v: %v", key, value)
	},
	"formatColumn": func(col model.TableColumn) string {
		query := fmt.Sprintf("%s %s", col.ColumnName, col.DataType)
		if col.MaxLength.Valid {
			query += fmt.Sprintf("(%d)", col.MaxLength.Int64)
		}
		if col.IsNullable == "NO" {
			query += fmt.Sprintf(" NOT NULL")
		}
		if col.DefaultValue.Valid {
			query += fmt.Sprintf(" DEFAULT '%s'", col.DefaultValue.String)
		}
		if col.IsIdentity == "Yes" {
			query += fmt.Sprintf(" IDENTITY")
		}
		if col.IsPrimaryKey == "Yes" {
			query += fmt.Sprintf(" PRIMARY KEY")
		}
		return query
	},
}

func NewSAManager(repo *data.CFNTrackerRepository) *SAManager {
	return &SAManager{
		stopPolling:          func() error{return nil},
		CFNTrackerRepository: repo,
	}
}

func (m *SAManager) Start(ctx context.Context, dsn string) error {
	return nil
}

// ----------------------------- DATABASES ---------------------------------------------------------------
func (m *SAManager) CreateDatabase(ctx context.Context, arg *model.CreateDatabase) error {
	q, err := loadTemplate("CreateDatabase.sql", arg)
	if err != nil {
		return fmt.Errorf("Create database generate query: %w", err)
	}
	r, err := m.DB.Exec(q)
	if err != nil {
		return fmt.Errorf("Create database execute query: %w", err)
	}
	fmt.Println(r)
	// txn, err := m.DB.Begin()
	// if err != nil {
	//     return fmt.Errorf("Create database init transaction: %w", err)
	// }
	// r, err := txn.Exec(q)
	// if err != nil {
	//     txn.Rollback()
	//     return fmt.Errorf("Create database execute query: %w", err)
	// }
	// fmt.Println(r)
	// err = m.CFNTrackerRepository.SaveDatabase(ctx, arg)
	// if err != nil {
	//     txn.Rollback()
	//     return fmt.Errorf("Create database sql repo: %w", err)
	// }
	// err = txn.Commit()
	// if err != nil {
	//     return fmt.Errorf("Create database txn commit: %w", err)
	// }
	return nil
}

func (m *SAManager) DropDatabase(ctx context.Context, dbName string) error {
	q, err := loadTemplate("DropDatabase.sql", dbName)
	if err != nil {
		return fmt.Errorf("Drop database generate query: %w", err)
	}
	r, err := m.DB.Exec(q)
	if err != nil {
		return fmt.Errorf("Drop database execute query: %w", err)
	}
	fmt.Println(r)
	// txn, err := m.DB.Begin()
	// if err != nil {
	//     return fmt.Errorf("Drop database init transaction: %w", err)
	// }
	// r, err :=txn.Exec(q)
	// if err != nil {
	//     txn.Rollback()
	//     return fmt.Errorf("Drop database exec query: %w", err)
	// }
	// fmt.Println(r)
	// err = m.CFNTrackerRepository.RemoveDatabase(ctx, id)
	// if err != nil {
	//     txn.Rollback()
	//     return fmt.Errorf("Remove database sql repo: %w", err)
	// }
	// err = txn.Commit()
	// if err != nil {
	//     return fmt.Errorf("Drop database txn commit: %w", err)
	// }
	return nil
}

func (m *SAManager) GetDatabases(ctx context.Context) ([]string, error) {
	var dbs []string
	q := `
		SELECT name
		FROM sys.databases
		WHERE name NOT IN ('master', 'tempdb', 'model', 'msdb');
    `
	rows, err := m.DB.Query(q)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var db string
		if err := rows.Scan(&db); err != nil {
			return nil, err
		}
		dbs = append(dbs, db)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return dbs, nil
}

func (m *SAManager) GetDatabaseInfo(
	ctx context.Context,
	dbName string,
) ([]model.DatabaseFileDetail, error) {
	q, err := loadTemplate("GetDatabaseInfo.sql", dbName)
	if err != nil {
		return nil, fmt.Errorf("Get info database generate query: %w", err)
	}
	rows, err := m.DB.Query(q)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var dbInfo []model.DatabaseFileDetail
	for rows.Next() {
		var logicalName, fileName string
		var sizeMB, maxSizeMB int64

		err := rows.Scan(&logicalName, &fileName, &sizeMB, &maxSizeMB)
		if err != nil {
			return nil, err
		}
		dbInfo = append(dbInfo, model.DatabaseFileDetail{
			LogicalName: logicalName,
			FileName:    fileName,
			SizeMB:      sizeMB,
			MaxSizeMB:   maxSizeMB,
		})
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return dbInfo, nil
}

// ----------------------------- LOGINS --------------------------------------------
func (m *SAManager) GetLogins(ctx context.Context) ([]model.Login, error) {
	q := `
    SELECT
        sp.name AS LoginName,
        CASE
            WHEN sr.name IS NOT NULL THEN 1
            ELSE 0
        END AS IsSysadmin
    FROM
        sys.server_principals sp
    LEFT JOIN
        sys.server_role_members srm ON sp.principal_id = srm.member_principal_id
    LEFT JOIN
        sys.server_principals sr ON srm.role_principal_id = sr.principal_id AND sr.name = 'sysadmin'
    WHERE
        sp.type_desc = 'SQL_LOGIN'
    `
	rows, err := m.DB.Query(q)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var lgs []model.Login
	for rows.Next() {
		var lg model.Login
		err := rows.Scan(&lg.LoginName, &lg.IsSysAdmin)
		if err != nil {
			return nil, err
		}
		lgs = append(lgs, lg)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return lgs, nil
}

func (m *SAManager) CreateLogin(ctx context.Context, arg *model.Login) error {
	q, err := loadTemplate("CreateSQLLogin.sql", arg)
	if err != nil {
		return fmt.Errorf("Create SQL Login generate query: %w", err)
	}
	r, err := m.DB.Exec(q)
	if err != nil {
		return fmt.Errorf("Create SQL Login execute query: %w", err)
	}
	fmt.Println(r)
	return nil
}

func (m *SAManager) DropLogin(ctx context.Context, loginName string) error {
	q, err := loadTemplate("DropLogin.sql", loginName)
	if err != nil {
		return fmt.Errorf("Drop Login generate query: %w", err)
	}
	r, err := m.DB.Exec(q)
	if err != nil {
		return fmt.Errorf("Drop Login execute query: %w", err)
	}
	fmt.Println(r)
	return nil
}

// -------------------------------USERS ----------------------------------------------------------
func (m *SAManager) CreateUser(ctx context.Context, arg *model.CreateUserForLogin) error {
	q, err := loadTemplate("CreateUserForLogin.sql", arg)
	if err != nil {
		return fmt.Errorf("Create user generate query: %w", err)
	}
	r, err := m.DB.Exec(q)
	if err != nil {
		return fmt.Errorf("Create user execute query: %w", err)
	}
	fmt.Println(r)
	return nil
}

func (m *SAManager) DropUser(ctx context.Context, arg *model.DropUser) error {
	q, err := loadTemplate("DropUser.sql", arg)
	if err != nil {
		return fmt.Errorf("Drop user generate query: %w", err)
	}
	r, err := m.DB.Exec(q)
	if err != nil {
		return fmt.Errorf("Drop user execute query: %w", err)
	}
	fmt.Println(r)
	return nil
}

func (m *SAManager) GetUsers(ctx context.Context) {
}

// -----------------------------ROLES -----------------------------------------------------------

func (m *SAManager) GetRolesByUser(ctx context.Context) {
}

func (m *SAManager) AddRoleForUser(ctx context.Context, arg *model.AddRoleForUser) error {
	q, err := loadTemplate("AddRoleForUser.sql", arg)
	if err != nil {
		return fmt.Errorf("Add role for user generate query: %w", err)
	}
	r, err := m.DB.Exec(q)
	if err != nil {
		return fmt.Errorf("Add role for user execute query: %w", err)
	}
	fmt.Println(r)
	return nil
}

func (m *SAManager) DropRoleForUser(ctx context.Context, arg *model.DropRoleForUser) error {
	q, err := loadTemplate("DropRoleForUser.sql", arg)
	if err != nil {
		return fmt.Errorf("Drop role for user generate query: %w", err)
	}
	r, err := m.DB.Exec(q)
	if err != nil {
		return fmt.Errorf("Drop role for user execute query: %w", err)
	}
	fmt.Println(r)
	return nil
}

//------------------------------TABLES----------------------------------------------------------

func (m *SAManager) GetTablesByDatabase(ctx context.Context, name string) ([]string, error) {
	q, err := loadTemplate("TablesByDatabaseName.sql", name)
	if err != nil {
		return nil, fmt.Errorf("Get tables by database generate query: %w", err)
	}
	rows, err := m.DB.Query(q)
	if err != nil {
		return nil, fmt.Errorf("Get tables by database  execute query: %w", err)
	}
	defer rows.Close()
	var tbs []string
	for rows.Next() {
		var tb string
		err := rows.Scan(&tb)
		if err != nil {
			return nil, fmt.Errorf("Get tables by database Scan Row: %w", err)
		}
		tbs = append(tbs, tb)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("Get tables by database Rows Err: %w", err)
	}
	return tbs, nil
}

func (m *SAManager) CreateTable(ctx context.Context, arg *model.CreateTable) error {
	q, err := loadTemplate("CreateTable.sql", arg)
	if err != nil {
		return fmt.Errorf("Create table  generate query: %w", err)
	}
	r, err := m.DB.Exec(q)
	if err != nil {
		return fmt.Errorf("Create Table execute query: %w", err)
	}
	fmt.Println(r)
	return nil
}

func (m *SAManager) DropTable(ctx context.Context, arg *model.DropTable) error {
	q, err := loadTemplate("DropTable.sql", arg)
	if err != nil {
		return fmt.Errorf("Drop table  generate query: %w", err)
	}
	r, err := m.DB.Exec(q)
	if err != nil {
		return fmt.Errorf("Drop Table execute query: %w", err)
	}
	fmt.Println(r)
	return nil
}

func (m *SAManager) GetAllFromTable(ctx context.Context, arg string) ([]*model.RowTable, error) {
	q := fmt.Sprintf("SELECT * FROM %s", arg)

	// Ejecutar la consulta
	rows, err := m.DB.Query(q)
	if err != nil {
		return nil, fmt.Errorf("Get rows from table execute query: %w", err)
	}
	defer rows.Close()
	cols, err := rows.Columns()
	if err != nil {
		return nil, fmt.Errorf("Get rows from table Columns from rows: %w", err)
	}
	values := make([]interface{}, len(cols))
	for i := range values {
		var val interface{}
		values[i] = &val
	}
	var content []*model.RowTable
	for rows.Next() {
		err := rows.Scan(values...)
		if err != nil {
		return nil, fmt.Errorf("Get rows from table Rows Scan: %w", err)
		}
		row := make(map[string]interface{})
		var ct model.RowTable
		for i, cn := range cols {
			switch v := (*(values[i].(*interface{}))).(type) {
			case nil:
				row[cn] = nil
			case []byte:
				row[cn] = string(v)
			default:
				row[cn] = v
			}
		}
		ct.Values = row
		content = append(content, &ct)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("Get rows from table Rows Err: %w", err)
	}

	return content, nil
}

func (m *SAManager) GetColumnsInfoByTableName(
	ctx context.Context,
	name string,
) ([]*model.TableColumn, error) {
	q, err := loadTemplate("GetColumnsInfoByTableName.sql", name)
	if err != nil {
		return nil, fmt.Errorf("Get columns info  generate query: %w", err)
	}
	rows, err := m.DB.Query(q)
	if err != nil {
		return nil, fmt.Errorf("Get columns info  execute query: %w", err)
	}
	defer rows.Close()
	var cols []*model.TableColumn
	for rows.Next() {
		var col model.TableColumn
		err := rows.Scan(
			&col.ColumnName,
			&col.DataType,
			&col.MaxLength,
			&col.IsNullable,
			&col.DefaultValue,
			&col.IsIdentity,
			&col.IsPrimaryKey,
		)
		if err != nil {
			return nil, fmt.Errorf("Get columns info Scan Row: %w", err)
		}
		cols = append(cols, &col)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("Get columns info Rows Err: %w", err)
	}
	return cols, nil
}

// ------------------------------funciones privadas-----------------------------------------------
func loadTemplate(fileName string, data interface{}) (string, error) {
	t, err := template.New(fileName).Funcs(funcs).ParseFiles("templates/" + fileName)
	if err != nil {
		return "", fmt.Errorf("Error parsing files: %v, with description: %w", fileName, err)
	}
	var b bytes.Buffer
	err = t.Execute(&b, data)
	if err != nil {
		return "", fmt.Errorf("Error executing template: %w", err)
	}
	return b.String(), nil
}

func (m *SAManager) Stop()error {
	return m.stopPolling()
}
