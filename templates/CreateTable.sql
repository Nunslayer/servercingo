USE {{ .DbName }}
GO

CREATE TABLE {{ .TableName }}(
{{ $limit := len .Columns }}
{{ range $index, $value := .Columns }}
{{ formatColumn $value }}{{coma $limit $index}}
{{ end}}
)
GO
