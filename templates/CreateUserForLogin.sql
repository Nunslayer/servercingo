-- ===================================
-- Create Data Reader User template
-- ===================================
USE {{ .DbName }}
GO

-- Add the user to the database using their login name and the user name
CREATE USER {{ .UserName }}
	FOR LOGIN {{ .LoginName }}
	WITH DEFAULT_SCHEMA = dbo
GO
-- Add user to roles
{{ $aux := .UserName}}
{{ range .Roles }}
ALTER ROLE {{ . }}
ADD MEMBER {{ $aux }}
GO
{{end}}

