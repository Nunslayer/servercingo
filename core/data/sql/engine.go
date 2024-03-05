package sql

import (
	"context"
	"fmt"

	"github.com/jmoiron/sqlx"

	"changeme/core/model"
)

type EngineStorage interface {
	GetEngineById(ctx context.Context, id int8) (*model.Engine, error)
	GetEngines(ctx context.Context) ([]*model.Engine, error)
	SaveEngine(ctx context.Context, server string, port int) (*model.Engine, error)
	RemoveEngine(ctx context.Context, id int8) error
}

func (s *Storage) GetEngineById(ctx context.Context, id int8) (*model.Engine, error) {
	query, args, err := sqlx.In(`
		SELECT * FROM engines
		WHERE id = (?)
		LIMIT 1
	`, id)
	if err != nil {
		return nil, fmt.Errorf("prepare get user clause: %w", err)
	}
	var engine model.Engine
	err = s.db.GetContext(ctx, &engine, query, args...)
	if err != nil {
		return nil, fmt.Errorf("get engine by id: %w", err)
	}
	return &engine, nil
}

func (s *Storage) GetEngines(ctx context.Context) ([]*model.Engine, error) {
	var engines []*model.Engine
    var query = `
        SELECT
            e.id,
            e.server,
            e.port
        FROM engines as e
        JOIN users u on e.id = u.engine_id
        `
	err := s.db.SelectContext(ctx, &engines, query)
	if err != nil {
		return nil, fmt.Errorf("select sql engines: %w", err)
	}
    fmt.Println(engines)
	return engines, nil
}

func (s *Storage) SaveEngine(ctx context.Context, server string, port int) (*model.Engine, error) {
	engine := model.Engine{
        Server: server,
        Port: port,
	}
	query := `
		INSERT OR IGNORE INTO engines (server, port)
		VALUES (:server, :port)
	`
	res, err := s.db.NamedExecContext(ctx, query, engine)
	if err != nil {
		return nil, fmt.Errorf("create engine: %w", err)
	}
    lastInsertId, err := res.LastInsertId()
    if err != nil {
        return nil, fmt.Errorf("create engine id %w", err)
    }
    engine.Id = int8(lastInsertId)
	return &engine, nil
}

func (s *Storage) RemoveEngine(ctx context.Context, id int8) error {
	query, args, err := sqlx.In(`
		DELETE * FROM engines
		WHERE id = (?)
	`, id)
	if err != nil {
		return fmt.Errorf("prepare delete engine clause: %w", err)
	}
	_, err = s.db.NamedExecContext(ctx, query, args)
	if err != nil {
		return fmt.Errorf("remove engine: %w", err)
	}
	return nil
}

func (s *Storage) createEnginesTable() error {
	_, err := s.db.Exec(`
	CREATE TABLE IF NOT EXISTS engines (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		server TEXT NOT NULL,
        port INTEGER NOT NULL
	)`)
	if err != nil {
		return fmt.Errorf("create engines table: %w", err)
	}
	return nil
}
