package manager

import (
	"context"
	"net/http"

	"changeme/core/data"
	"changeme/core/errorsx"
	"changeme/core/manager/sa"
	"changeme/core/model"
)

type DBManager interface {
	Start(ctx context.Context, dsn string) error
	Stop() error
	CreateDatabase(ctx context.Context, arg *model.CreateDatabase) error
	DropDatabase(ctx context.Context, dbName string) error
	GetDatabases(ctx context.Context) ([]string, error)
	GetDatabaseInfo(ctx context.Context, dbName string) ([]model.DatabaseFileDetail, error)
	GetLogins(ctx context.Context) ([]model.Login, error)
	CreateLogin(ctx context.Context, arg *model.Login) error
	DropLogin(ctx context.Context, loginName string) error
	CreateUser(ctx context.Context, arg *model.CreateUserForLogin) error
	DropUser(ctx context.Context, arg *model.DropUser) error
	GetUsers(ctx context.Context)
	GetRolesByUser(ctx context.Context)
	AddRoleForUser(ctx context.Context, arg *model.AddRoleForUser) error
	DropRoleForUser(ctx context.Context, arg *model.DropRoleForUser) error
	GetTablesByDatabase(ctx context.Context, name string) ([]string, error)
	CreateTable(ctx context.Context, arg *model.CreateTable) error
	DropTable(ctx context.Context, arg *model.DropTable) error
	GetAllFromTable(ctx context.Context, arg string) ([]*model.RowTable, error)
	GetColumnsInfoByTableName(ctx context.Context, name string) ([]*model.TableColumn, error)
}

type ManagerType uint8

const (
	ManagerTypeUndefined ManagerType = iota
	ManagerTypeSA
	ManagerTypeCR
)

func (m ManagerType) String() string {
	switch m {
	case ManagerTypeSA:
		return `sa`
	case ManagerTypeCR:
		return `cr`
	case ManagerTypeUndefined:
		return `undefined`
	}
	return `unknown`
}

func MakeSAManager(
	ctx context.Context,
	server, login, pass string,
	port int64,
	repo *data.CFNTrackerRepository,
) (DBManager, error) {
	saManager := sa.NewSAManager(repo)
	err := saManager.Connect(ctx, server, login, pass, port)
	if err != nil {
		return nil, errorsx.NewFormattedError(http.StatusUnauthorized, err)
	}
	var dm DBManager = saManager
	return dm, nil
}
