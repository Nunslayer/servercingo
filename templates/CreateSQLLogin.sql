-- =================================================
-- Create SQL Login Must Change Password template
-- =================================================
CREATE LOGIN {{ .LoginName }}
	WITH PASSWORD = N'{{ .Password }}';
GO
{{if eq .IsSysAdmin true}}
ALTER SERVER ROLE [sysadmin]
ADD MEMBER {{ .LoginName }}
GO
{{end}}
