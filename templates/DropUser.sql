-- =====================
-- Drop User template
-- =====================
USE {{ .DbName }}

DROP USER {{ .UserName }}
