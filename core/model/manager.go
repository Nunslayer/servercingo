package model

import (
	"database/sql"
)

type (
	DropLogin struct {
		Name string
	}
	DatabaseFileDetail struct {
		LogicalName string `json:"logicalName"`
		FileName    string `json:"fileName"`
		SizeMB      int64  `json:"sizeMB"`
		MaxSizeMB   int64  `json:"maxSizeMB"`
	}
	CreateDatabase struct {
		DbName    string               `json:"dbName"`
		IsDefault bool                 `json:"isDefault"`
		DbFiles   []DatabaseFileDetail `json:"dbFiles,omitempty"`
	}
	Login struct {
		LoginName  string `json:"loginName"`
		Password   string `json:"password"`
		IsSysAdmin bool   `json:"isSysAdmin"`
	}
	DropUser struct {
		DbName   string `json:"dbName"`
		UserName string `json:"userName"`
	}
	CreateUserForLogin struct {
		DbName    string   `json:"dbName"`
		UserName  string   `json:"userName"`
		LoginName string   `json:"loginName"`
		Roles     []string `json:"roles"`
	}
	AddRoleForUser struct {
		DbName   string `json:"dbName"`
		UserName string `json:"userName"`
		Role     string `json:"role"`
	}
	DropRoleForUser struct {
		DbName   string `json:"dbName"`
		UserName string `json:"userName"`
		Role     string `json:"role"`
	}
	// --------- TABLE --------------
	TableColumn struct {
		ColumnName   string         `json:"columnName"`
		DataType     string         `json:"dataType"`
		MaxLength    sql.NullInt64  `json:"maxLength"`
		IsNullable   string         `json:"isNullable"`
		DefaultValue sql.NullString `json:"defaultValue"`
		IsIdentity   string         `json:"isIdentity"`
		IsPrimaryKey string         `json:"isPrimaryKey"`
	}
	TableColumnReq struct {
		ColumnName   string `json:"columnName"`
		DataType     string `json:"dataType"`
		MaxLength    int64  `json:"maxLength,omitempty"`
		IsNullable   string `json:"isNullable,omitempty"`
		DefaultValue string `json:"defaultValue"`
		IsIdentity   string `json:"isIdentity"`
		IsPrimaryKey string `json:"isPrimaryKey"`
	}
	CreateTableReq struct {
		DbName    string           `json:"dbName"`
		TableName string           `json:"tableName"`
		Columns   []TableColumnReq `json:"columns,omitempty"`
	}
	CreateTable struct {
		DbName    string        `json:"dbName"`
		TableName string        `json:"tableName"`
		Columns   []TableColumn `json:"columns"`
	}
	DropTable struct {
		DbName    string `json:"dbName"`
		TableName string `json:"tableName"`
	}
	GetAll struct {
		DbName    string `json:"dbName"`
		TableName string `json:"tableName"`
	}
	RowTable struct {
		Values map[string]interface{} `json:"values"`
	}
)
