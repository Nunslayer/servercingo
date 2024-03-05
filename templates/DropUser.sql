-- =====================
-- Drop User template
-- =====================
USE {{ .DbName }}
GO

DROP USER {{ .UserName }}
GO
