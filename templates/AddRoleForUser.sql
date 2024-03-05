-- =====================
-- Add Role template
-- =====================

USE {{ .DbName }};
GO

-- Drop the role
ALTER ROLE {{ .Role }}
ADD MEMBER {{ .UserName }}
GO
