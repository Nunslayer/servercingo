package sql

import (
	"context"
	"fmt"

	"github.com/jmoiron/sqlx"

	"changeme/core/model"
)

type UserStorage interface {
	GetUserById(ctx context.Context, id int8) (*model.User, error)
	GetUsersByEngineId(ctx context.Context, id int8) ([]*model.User, error)
	GetUsers(ctx context.Context) ([]*model.User, error)
	SaveUser(
		ctx context.Context,
		name, password string,
		sa bool,
		engineId int8,
	) (*model.User, error)
	RemoveUser(ctx context.Context, id int8) error
}

func (s *Storage) GetUserById(ctx context.Context, id int8) (*model.User, error) {
	query, args, err := sqlx.In(`
		SELECT * FROM users
		WHERE id = (?)
		LIMIT 1
	`, id)
	if err != nil {
		return nil, fmt.Errorf("prepare get user clause: %w", err)
	}
	var user model.User
	err = s.db.GetContext(ctx, &user, query, args...)
	if err != nil {
		return nil, fmt.Errorf("get user by id: %w", err)
	}
	return &user, nil
}

func (s *Storage) GetUsersByEngineId(ctx context.Context, id int8) ([]*model.User, error) {
	query, args, err := sqlx.In(`
		SELECT * FROM users
		WHERE engine_id = (?)
	`, id)
	if err != nil {
		return nil, fmt.Errorf("prepare get users of engine id clause: %w", err)
	}
	var users []*model.User
	err = s.db.SelectContext(ctx, &users, query, args...)
	if err != nil {
		return nil, fmt.Errorf("get users by engine id: %w", err)
	}
	return users, nil
}

func (s *Storage) GetUsers(ctx context.Context) ([]*model.User, error) {
	var users []*model.User
	err := s.db.SelectContext(ctx, &users, "SELECT * FROM users")
	if err != nil {
		return nil, fmt.Errorf("select sql users: %w", err)
	}
	return users, nil
}

func (s *Storage) SaveUser(
	ctx context.Context,
	name, password string,
	sa bool,
	engineId int8,
) (*model.User, error) {
	user := model.User{
		Name:     name,
		EngineId: engineId,
		Password: password,
		IsSA:     sa,
	}
	query := `
		INSERT OR IGNORE INTO users (name, engine_id, password, is_sa)
        VALUES (:name, :engine_id, :password, :is_sa)
	`
	res, err := s.db.NamedExecContext(ctx, query, user)
	if err != nil {
		return nil, fmt.Errorf("create user: %w", err)
	}
	lastInsertId, err := res.LastInsertId()
	if err != nil {
		return nil, fmt.Errorf("create user id: %w", err)
	}
	user.Id = int8(lastInsertId)
	return &user, nil
}

func (s *Storage) RemoveUser(ctx context.Context, id int8) error {
	query, args, err := sqlx.In(`
		DELETE * FROM users
		WHERE id = (?)
	`, id)
	if err != nil {
		return fmt.Errorf("prepare delete user clause: %w", err)
	}
	_, err = s.db.NamedExecContext(ctx, query, args)
	if err != nil {
		return fmt.Errorf("delete user: %w", err)
	}
	return nil
}

func (s *Storage) createUsersTable() error {
	_, err := s.db.Exec(`
	CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		engine_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        password TEXT NOT NULL,
        is_sa BOOLEAN NOT NULL,
		FOREIGN KEY (engine_id) REFERENCES engines(id)
	)`)
	if err != nil {
		return fmt.Errorf("create users table: %w", err)
	}
	return nil
}
