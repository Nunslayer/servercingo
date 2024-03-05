package core

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os/exec"
	"runtime"

	"changeme/core/config"
	"changeme/core/data"
	"changeme/core/errorsx"
	"changeme/core/manager"
	"changeme/core/model"
)

// The CommandHandler is the interface between the GUI and the core
type CommandHandler struct {
	ctx context.Context
	// tracker tracker.GameTracker
	manager manager.DBManager
	// browser *browser.Browser
	repo *data.CFNTrackerRepository
	cfg  *config.Config
}

func NewCommandHandler(
	trackerRepo *data.CFNTrackerRepository,
	// man manager.DBManager,
	cfg *config.Config,
) *CommandHandler {
	return &CommandHandler{
		repo: trackerRepo,
		// manager: man,
		// browser: browser,
		cfg: cfg,
	}
}

// The CommandHandler needs the wails runtime context in order to emit events
func (ch *CommandHandler) SetContext(ctx context.Context) {
	ch.ctx = ctx
}

func (ch *CommandHandler) GetAppVersion() string {
	return ch.cfg.AppVersion
}

func (ch *CommandHandler) GetSupportedLanguages() []string {
	var arrayString []string
	arrayString = append(arrayString, "es")
	return arrayString
}

// func (ch *CommandHandler) StartTracking(cfn string, restore bool) error {
// 	log.Printf(`Starting tracking for %s, restoring = %v`, cfn, restore)
// 	err := ch.tracker.Start(ch.ctx, cfn, restore, 30*time.Second)
// 	if err != nil {
// 		log.Println(err)
// 		if !errorsx.ContainsFormattedError(err) {
// 			err = errorsx.NewFormattedError(http.StatusInternalServerError, fmt.Errorf(`failed to start tracking %w`, err))
// 		}
// 	}
// 	return err
// }

func (ch *CommandHandler) OpenResultsDirectory() {
	switch runtime.GOOS {
	case `darwin`:
		exec.Command(`Open`, `./results`).Run()
	case `windows`:
		exec.Command(`explorer.exe`, `.\results`).Run()
	}
}

// ---------------------------- Engines ------------------------------------------------
func (ch *CommandHandler) SaveEngine(
	server, name, password string,
	port int,
) (*model.Engine, error) {
	engine, err := ch.repo.CreateEngine(ch.ctx, server, name, password, port)
	if err != nil {
		log.Println(err)
		if !errorsx.ContainsFormattedError(err) {
			err = errorsx.NewFormattedError(
				http.StatusNotFound,
				fmt.Errorf(`failed to create engine %w`, err),
			)
		}
	}
	return engine, err
}

func (ch *CommandHandler) GetEngines() ([]*model.Engine, error) {
	engines, err := ch.repo.GetEngines(ch.ctx)
	if err != nil {
		log.Println(err)
		if !errorsx.ContainsFormattedError(err) {
			err = errorsx.NewFormattedError(
				http.StatusNotFound,
				fmt.Errorf(`failed to get engines %w`, err),
			)
		}
	}
	return engines, err
}

func (ch *CommandHandler) GetEngineById(idEngine int8) (*model.Engine, error) {
	var err error
	eng := &model.Engine{}
	eng, err = ch.repo.GetEngineById(ch.ctx, idEngine)
	if err != nil {
		log.Println(err)
		if !errorsx.ContainsFormattedError(err) {
			err = errorsx.NewFormattedError(
				http.StatusInternalServerError,
				fmt.Errorf(`failed get engine by id  %w`, err),
			)
		}
	}
	return eng, err
}

func (ch *CommandHandler) RemoveEngine(id int8) error {
	err := ch.repo.RemoveEngine(ch.ctx, id)
	if err != nil {
		log.Println(err)
		if !errorsx.ContainsFormattedError(err) {
			err = errorsx.NewFormattedError(
				http.StatusInternalServerError,
				fmt.Errorf(`failed remove engine by id  %w`, err),
			)
		}
	}
	return err
}

// --------------------------- Users -------------------------------------------
func (ch *CommandHandler) SaveUser(name, password string, engineId int) error {
	err := ch.repo.SaveUser(ch.ctx, name, password, int8(engineId))
	if err != nil {
		log.Println(err)
		if !errorsx.ContainsFormattedError(err) {
			err = errorsx.NewFormattedError(
				http.StatusNotFound,
				fmt.Errorf(`failed to create user %w`, err),
			)
		}
	}
	return err
}

func (ch *CommandHandler) GetUsers() ([]*model.User, error) {
	users, err := ch.repo.GetUsers(ch.ctx)
	if err != nil {
		log.Println(err)
		if !errorsx.ContainsFormattedError(err) {
			err = errorsx.NewFormattedError(
				http.StatusNotFound,
				fmt.Errorf(`failed to get users %w`, err),
			)
		}
	}
	return users, err
}

func (ch *CommandHandler) GetUsersByEngineId(id int8) ([]*model.User, error) {
	users, err := ch.repo.GetUsersByEngineId(ch.ctx, id)
	if err != nil {
		log.Println(err)
		if !errorsx.ContainsFormattedError(err) {
			err = errorsx.NewFormattedError(
				http.StatusNotFound,
				fmt.Errorf(`failed to get users with engine id %w`, err),
			)
		}
	}
	return users, err
}

func (ch *CommandHandler) RemoveUser(id int8) error {
	err := ch.repo.RemoveUser(ch.ctx, id)
	if err != nil {
		log.Println(err)
		if !errorsx.ContainsFormattedError(err) {
			err = errorsx.NewFormattedError(
				http.StatusInternalServerError,
				fmt.Errorf(`failed remove user by id  %w`, err),
			)
		}
	}
	return err
}

func (ch *CommandHandler) GetUserById(id int8) (*model.User, error) {
	user, err := ch.repo.GetUserById(ch.ctx, id)
	if err != nil {
		log.Println(err)
		if !errorsx.ContainsFormattedError(err) {
			err = errorsx.NewFormattedError(
				http.StatusInternalServerError,
				fmt.Errorf(`failed remove user by id  %w`, err),
			)
		}
	}
	return user, err
}

// ------------------------------------------ Databases --------------------------------------
func (ch *CommandHandler) SaveDatabase(arg model.DatabaseRes) error {
	err := ch.repo.SaveDatabase(ch.ctx, &arg)
	if err != nil {
		log.Println(err)
		if !errorsx.ContainsFormattedError(err) {
			err = errorsx.NewFormattedError(
				http.StatusNotFound,
				fmt.Errorf(`failed to create Database %w`, err),
			)
		}
	}
	return err
}

//	func (ch *CommandHandler) GetDatabases() ([]*model.DatabaseRes, error) {
//		dbs, err := ch.repo.GetDatabases(ch.ctx)
//		if err != nil {
//			log.Println(err)
//			if !errorsx.ContainsFormattedError(err) {
//				err = errorsx.NewFormattedError(
//					http.StatusNotFound,
//					fmt.Errorf(`failed to get databases %w`, err),
//				)
//			}
//		}
//		return dbs, err
//	}
func (ch *CommandHandler) GetDatabasesByEngineId(id int8) ([]*model.DatabaseRes, error) {
	dbs, err := ch.repo.GetDatabasesByEngineId(ch.ctx, id)
	if err != nil {
		log.Println(err)
		if !errorsx.ContainsFormattedError(err) {
			err = errorsx.NewFormattedError(
				http.StatusNotFound,
				fmt.Errorf(`failed to get databases with engine id %w`, err),
			)
		}
	}
	return dbs, err
}

func (ch *CommandHandler) RemoveDatabase(id int8) error {
	err := ch.repo.RemoveDatabase(ch.ctx, id)
	if err != nil {
		log.Println(err)
		if !errorsx.ContainsFormattedError(err) {
			err = errorsx.NewFormattedError(
				http.StatusInternalServerError,
				fmt.Errorf(`failed remove database by id  %w`, err),
			)
		}
	}
	return err
}

func (ch *CommandHandler) GetDatabaseById(id int8) (*model.DatabaseRes, error) {
	db, err := ch.repo.GetDatabaseById(ch.ctx, id)
	if err != nil {
		log.Println(err)
		if !errorsx.ContainsFormattedError(err) {
			err = errorsx.NewFormattedError(
				http.StatusInternalServerError,
				fmt.Errorf(`failed get database by id  %w`, err),
			)
		}
	}
	return db, err
}

// ----------------------------------------- Tables --------------------------------------------

// ---------------------------------------- Manager --------------------------------------------

func (ch *CommandHandler) ConnectEngine(server, login, pass string, port int64) error {
	var err error
	ch.manager, err = manager.MakeSAManager(ch.ctx, server, login, pass, port, ch.repo)

	if err != nil {
		log.Println(err)
		if !errorsx.ContainsFormattedError(err) {
			err = errorsx.NewFormattedError(
				http.StatusInternalServerError,
				fmt.Errorf(`failed to connecting engine SQL Server %w`, err),
			)
		}
	}
	return err
}
func (ch *CommandHandler) ShutdownConnection() {
	log.Println(`Stopped tracking`)
	ch.manager.Stop()
}

func (ch *CommandHandler) SaveLocale(locale string) error {
	return ch.repo.SaveLocale(locale)
}

func (ch *CommandHandler) CreateDatabase(arg model.CreateDatabase) error {
	return ch.manager.CreateDatabase(ch.ctx, &arg)
}

func (ch *CommandHandler) DropDatabase(name string) error {
	return ch.manager.DropDatabase(ch.ctx, name)
}

func (ch *CommandHandler) GetDatabases() ([]string, error) {
	return ch.manager.GetDatabases(ch.ctx)
}

func (ch *CommandHandler) GetDatabaseInfo(name string) ([]model.DatabaseFileDetail, error) {
	return ch.manager.GetDatabaseInfo(ch.ctx, name)
}

func (ch *CommandHandler) GetLogins() ([]model.Login, error) {
	return ch.manager.GetLogins(ch.ctx)
}

func (ch *CommandHandler) CreateLogin(arg model.Login) error {
	return ch.manager.CreateLogin(ch.ctx, &arg)
}

func (ch *CommandHandler) DropLogin(loginName string) error {
	return ch.manager.DropLogin(ch.ctx, loginName)
}

func (ch *CommandHandler) CreateUser(arg model.CreateUserForLogin) error {
	return ch.manager.CreateUser(ch.ctx, &arg)
}

func (ch *CommandHandler) DropUser(arg model.DropUser) error {
	return ch.manager.DropUser(ch.ctx, &arg)
}
func (ch *CommandHandler) AddRoleForUser(arg model.AddRoleForUser) error {
	return ch.manager.AddRoleForUser(ch.ctx, &arg)
}

func (ch *CommandHandler) DropRoleForUser(arg model.DropRoleForUser) error {
	return ch.manager.DropRoleForUser(ch.ctx, &arg)
}
func (ch *CommandHandler) GetTablesByDatabase(name string) ([]string, error) {
	return ch.manager.GetTablesByDatabase(ch.ctx, name)
}
func (ch *CommandHandler) CreateTable(arg model.CreateTable) error {
	return ch.manager.CreateTable(ch.ctx, &arg)
}
func (ch *CommandHandler) DropTable(arg model.DropTable) error {
	return ch.manager.DropTable(ch.ctx, &arg)
}
func (ch *CommandHandler) GetAllFromTable(arg string) ([]*model.RowTable, error) {
	return ch.manager.GetAllFromTable(ch.ctx, arg)
}
func (ch *CommandHandler) GetColumnsInfoByTableName(arg string) ([]*model.TableColumn, error) {
	return ch.manager.GetColumnsInfoByTableName(ch.ctx, arg)
}
func (ch *CommandHandler) GetGuiConfig() (*model.GuiConfig, error) {
	return ch.repo.GetGuiConfig()
}

func (ch *CommandHandler) SaveSidebarMinimized(sidebarMinified bool) error {
	return ch.repo.SaveSidebarMinimized(sidebarMinified)
}

func (ch *CommandHandler) GetTrackingStateUnused() *model.TrackingState {
	return nil
}

func (ch *CommandHandler) GetFormattedErrorModelUnused() *errorsx.FormattedError {
	return nil
}
