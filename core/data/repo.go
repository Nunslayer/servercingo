package data

import (
	"context"
	"fmt"

	"changeme/core/data/nosql"
	"changeme/core/data/sql"
	"changeme/core/data/txt"
	"changeme/core/model"
)

type CFNTrackerRepository struct {
	sqlDb   *sql.Storage
	nosqlDb *nosql.Storage
	txtDb   *txt.Storage
}

func NewCFNTrackerRepository(
	sqlDb *sql.Storage,
	nosqlDb *nosql.Storage,
	txtDb *txt.Storage,
) *CFNTrackerRepository {
	return &CFNTrackerRepository{
		sqlDb:   sqlDb,
		nosqlDb: nosqlDb,
		txtDb:   txtDb,
	}
}

// ----------------------------Engines----------------------------------------------

func (m *CFNTrackerRepository) GetEngines(ctx context.Context) ([]*model.Engine, error) {
	return m.sqlDb.GetEngines(ctx)
}

func (m *CFNTrackerRepository) GetEngineById(
	ctx context.Context,
	idEngine int8,
) (*model.Engine, error) {
	return m.sqlDb.GetEngineById(ctx, idEngine)
}

func (m *CFNTrackerRepository) CreateEngine(
	ctx context.Context,
	server, name, password string,
	port int,
) (*model.Engine, error) {
	engine, err := m.sqlDb.SaveEngine(ctx, server, port)
	if err != nil {
		return nil, fmt.Errorf("Service layer create engine : %w", err)
	}
	sa := true
	user, err := m.sqlDb.SaveUser(ctx, name, password, sa, engine.Id)
	if err != nil {
		return nil, fmt.Errorf("Service layer create user sa: %w", err)
	}
	engine.Users = append(engine.Users, user)
	return nil, nil
}

func (m *CFNTrackerRepository) RemoveEngine(ctx context.Context, id int8) error {
	return m.sqlDb.RemoveEngine(ctx, id)
}

// ---------------------------Users ----------------------------------------------------

func (m *CFNTrackerRepository) GetUserById(ctx context.Context, id int8) (*model.User, error) {
	return m.sqlDb.GetUserById(ctx, id)
}

func (m *CFNTrackerRepository) GetUsers(ctx context.Context) ([]*model.User, error) {
	return m.sqlDb.GetUsers(ctx)
}

func (m *CFNTrackerRepository) GetUsersByEngineId(
	ctx context.Context,
	id int8,
) ([]*model.User, error) {
	return m.sqlDb.GetUsersByEngineId(ctx, id)
}

func (m *CFNTrackerRepository) SaveUser(
	ctx context.Context,
	name, password string,
	engineId int8,
) error {
	sa := false
	_, err := m.sqlDb.SaveUser(ctx, name, password, sa, engineId)
	if err != nil {
		return fmt.Errorf("Service layer create user: %w", err)
	}
	return nil
}

func (m *CFNTrackerRepository) RemoveUser(ctx context.Context, id int8) error {
	return m.sqlDb.RemoveUser(ctx, id)
}

// ------------------------------------ Databases ------------------------------------

func (m *CFNTrackerRepository) GetDatabaseById(
	ctx context.Context,
	id int8,
) (*model.DatabaseRes, error) {
	return m.sqlDb.GetDatabaseById(ctx, id)
}

func (m *CFNTrackerRepository) GetDatabases(ctx context.Context) ([]*model.DatabaseRes, error) {
	return m.sqlDb.GetDatabases(ctx)
}

func (m *CFNTrackerRepository) GetDatabasesByEngineId(
	ctx context.Context,
	id int8,
) ([]*model.DatabaseRes, error) {
	return m.sqlDb.GetDatabasesByEngineId(ctx, id)
}

func (m *CFNTrackerRepository) SaveDatabase(
	ctx context.Context,
	arg *model.DatabaseRes,
) error {
	err := m.sqlDb.SaveDatabase(ctx, arg)
	if err != nil {
		return fmt.Errorf("Service layer create database: %w", err)
	}
	return nil
}

func (m *CFNTrackerRepository) RemoveDatabase(ctx context.Context, id int8) error {
	return m.sqlDb.RemoveDatabase(ctx, id)
}

// ----------------------------------------- tables -----------------------------------------------------------------------------

//	func (m *CFNTrackerRepository) GetMatches(ctx context.Context, sessionId uint16, userId string, limit uint8, offset uint16) ([]*model.Match, error) {
//		return m.sqlDb.GetMatches(ctx, sessionId, userId, limit, offset)
//	}
//
// ----------------------------------- Otros ----------------------------------------
func (m *CFNTrackerRepository) SaveLocale(locale string) error {
	return m.nosqlDb.SaveLocale(locale)
}

func (m *CFNTrackerRepository) SaveTrackingState(trackingState *model.TrackingState) error {
	return m.txtDb.SaveTrackingState(trackingState)
}

func (m *CFNTrackerRepository) SaveSidebarMinimized(sidebarMinified bool) error {
	return m.nosqlDb.SaveSidebarMinimized(sidebarMinified)
}

func (m *CFNTrackerRepository) GetGuiConfig() (*model.GuiConfig, error) {
	return m.nosqlDb.GetGuiConfig()
}

// func (m *CFNTrackerRepository) GetLatestSession(ctx context.Context, userId string) (*model.Session, error) {
// 	log.Println("get latest session", userId)
// 	sessions, err := m.sqlDb.GetSessions(ctx, userId, 1, 0)
// 	if err != nil {
// 		return nil, fmt.Errorf("get session: %w", err)
// 	}
// 	if len(sessions) == 0 {
// 		return nil, nil
// 	}
// 	sesh := sessions[0]
// 	matches, err := m.sqlDb.GetMatches(ctx, sesh.Id, userId, 0, 0)
// 	if err != nil {
// 		return nil, fmt.Errorf("failed to get matches by session: %w", err)
// 	}
// 	sesh.Matches = matches
// 	return sesh, nil
// }
//
// func (m *CFNTrackerRepository) UpdateSession(ctx context.Context, sesh *model.Session, match model.Match, sessionId uint16) error {
// 	err := m.sqlDb.UpdateLatestSession(ctx, sesh.LP, sesh.MR, sessionId)
// 	if err != nil {
// 		return fmt.Errorf("update session: %w", err)
// 	}
// 	err = m.sqlDb.SaveMatch(ctx, match)
// 	if err != nil {
// 		return fmt.Errorf("save match in storage: %w", err)
// 	}
// 	return nil
// }
