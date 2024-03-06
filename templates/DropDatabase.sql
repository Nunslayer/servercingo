-- =========================
-- Drop Database Template
-- =========================
USE master

IF  EXISTS (
	SELECT name
		FROM sys.databases
		WHERE name = N'{{ . }}'
)
DROP DATABASE {{ . }}
