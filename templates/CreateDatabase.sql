-- =============================================
-- Create database template
-- =============================================
USE master
GO

-- Drop the database if it already exists
IF  EXISTS (
	SELECT name
		FROM sys.databases
		WHERE name = N'{{ .DbName }}'
)
DROP DATABASE {{ .DbName }}
GO

CREATE DATABASE {{ .DbName }}
{{ if eq .IsDefault false }}
ON
(
{{- range ( slice .DbFiles 0 1 ) }}
    NAME = {{ .LogicalName }},
    FILENAME = '{{ .FileName }}',
    SIZE = {{.SizeMB}},
    MAXSIZE = {{.MaxSizeMB}}
{{ end -}}
)
LOG ON
(
{{- range (slice .DbFiles 1) }}
    NAME = {{.LogicalName}},
    FILENAME = '{{ .FileName }}',
    SIZE = {{.SizeMB}}
{{ end -}}
)
{{ end }}
GO
