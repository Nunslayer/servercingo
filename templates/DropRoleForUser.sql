-- =====================
-- Drop Role template
-- =====================

USE {{ .DbName }};
GO

-- Drop the role
ALTER ROLE {{ .Role }}
DROP MEMBER {{ .UserName }}
GO
