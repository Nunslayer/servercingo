USE {{ .DbName }}

CREATE TABLE {{ .TableName }}(
{{ $limit := len .Columns }}
{{ range $index, $value := .Columns }}
{{ formatColumn $value }}{{coma $limit $index}}
{{ end}}
)
