-- =================================================
-- Create SQL Login Must Change Password template
-- =================================================
CREATE LOGIN {{ .LoginName }}
	WITH PASSWORD = N'{{ .Password }}';
{{if eq .IsSysAdmin true}}
ALTER SERVER ROLE [sysadmin]
ADD MEMBER {{ .LoginName }}
{{end}}
