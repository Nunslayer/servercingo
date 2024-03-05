package main

import (
	"changeme/core/model"
	"database/sql"
	"fmt"
	"os"
	"reflect"
	"text/template"
)

type (
	CreateLogin struct {
		Name     string
		Password string
	}
	DropLogin struct {
		Name string
	}
	KeyValue struct {
		Key   string
		Value interface{}
	}
	DropUser struct {
		DbName   string
		UserName string
	}
	CreateUserForLoginDefaultRole struct {
		DbName    string
		UserName  string
		LoginName string
	}
	CreateUserWithCustomRole struct {
		DbName    string
		UserName  string
		LoginName string
		Roles     []string
	}
)

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

func main() {
	login := &model.Login{
        LoginName: "milo",
        Password: "Porongon",
        IsSysAdmin: false,
	}
	login1 := &model.Login{
        LoginName: "dianna",
        Password: "Porongon",
        IsSysAdmin: true,
	}
	// options := []map[string]interface{}{
	// 	{"NAME": "BDExample_Data"},
	// 	{"FILENAME": "C:/BDs/BDExample1_data.fmd"},
	// 	{"SIZE": 5},
	// 	{"MAXSIZE": 8},
	// }
	dUser := &DropUser{
		DbName:   "BDPROBANDO2",
		UserName: "pablito",
	}
	dUserDefault := &model.CreateUserForLogin{
		DbName:    "DBPROBANDO",
		UserName:  "pablito",
		LoginName: "milo",
        Roles: []string{"hola", "perro"},
	}
    db1 := &model.CreateDatabase{
        DbName: "BDCENSO",
        IsDefault: false,
        DbFiles: []model.DatabaseFileDetail{
            {LogicalName: "BDCENSO_DATA", FileName: "C:/BDs/Bdcenso_data.fmd", SizeMB: 12, MaxSizeMB: 14},
            {LogicalName: "BDCENSO_LOG", FileName: "C:/BDs/Bdcenso_log.lmd", SizeMB: 1, MaxSizeMB: 114},
        },

    }
	db2 := &model.CreateDatabase{
		DbName:    "BDPROBANDO2",
		IsDefault: true,
	}
    table1 := &model.CreateTable{
        DbName: "BDPROBANDO2",
        TableName: "Mojigatos",
        Columns: []model.TableColumn{
            {
                ColumnName: "ID",
                DataType: "INT",
                MaxLength: sql.NullInt64{Valid: false},
                IsNullable: "NO",
                DefaultValue: sql.NullString{Valid: false},
                IsIdentity: "Yes",
                IsPrimaryKey: "Yes",
            },
            {
                ColumnName: "NOMBRE",
                DataType: "VARCHAR",
                MaxLength: sql.NullInt64{Int64:30, Valid: true},
                IsNullable: "NO",
                DefaultValue: sql.NullString{Valid: false},
                IsIdentity: "No",
                IsPrimaryKey: "No",
            },
            {
                ColumnName: "CARRERA",
                DataType: "VARCHAR",
                MaxLength: sql.NullInt64{Int64:30, Valid: true},
                IsNullable: "NO",
                DefaultValue: sql.NullString{Valid: false},
                IsIdentity: "No",
                IsPrimaryKey: "No",
            },
            {
                ColumnName: "FECHAINICIO",
                DataType: "DATE",
                MaxLength: sql.NullInt64{Valid: false},
                IsNullable: "YES",
                DefaultValue: sql.NullString{String:"GETDATE()", Valid: true},
                IsIdentity: "No",
                IsPrimaryKey: "No",
            },
        },
    }
	loadTemplate("CreateDatabase.sql", db1)
	loadTemplate("CreateDatabase.sql", db2)
	loadTemplate("DropDatabase.sql", "BDPROBANDO")
	loadTemplate("DropUser.sql", dUser)
	loadTemplate("CreateUserForLogin.sql", dUserDefault)
	loadTemplate("CreateSQLLogin.sql", login)
	loadTemplate("CreateSQLLogin.sql", login1)
	loadTemplate("CreateTable.sql", table1)
}

func loadTemplate(fileName string, data interface{}) {
	t, err := template.New(fileName).Funcs(funcs).ParseFiles("templates/" + fileName)
	if err != nil {
		panic(err)
	}

	err = t.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
