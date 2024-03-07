
CREATE FUNCTION dbo.ENCRIPTARALUMNO(@DATO VARCHAR(30))
RETURNS VARCHAR(30)
AS
BEGIN
	DECLARE @DATOENCRIPTADO VARCHAR(30)
	SET @DATOENCRIPTADO = ''
	DECLARE @VIS INT
	SET @VIS = 1
	DECLARE @CARACTERVISITADO VARCHAR(1)
	WHILE @VIS <= LEN(@DATO)
	BEGIN
		SET @CARACTERVISITADO = UPPER(SUBSTRING(@DATO, @VIS,1))
		SET @DATOENCRIPTADO = @DATOENCRIPTADO + CASE
		WHEN @CARACTERVISITADO = 'A' THEN '*'
		WHEN @CARACTERVISITADO = 'B' THEN '!'
		WHEN @CARACTERVISITADO = 'C' THEN '¡'
		WHEN @CARACTERVISITADO = 'D' THEN '¿'
		WHEN @CARACTERVISITADO = 'E' THEN '?'
		WHEN @CARACTERVISITADO = 'F' THEN '=' 
		WHEN @CARACTERVISITADO = 'G' THEN ')'
		WHEN @CARACTERVISITADO = 'H' THEN '('
		WHEN @CARACTERVISITADO = 'I' THEN '/'
		WHEN @CARACTERVISITADO = 'J' THEN '&'
		WHEN @CARACTERVISITADO = 'K' THEN '%'
		WHEN @CARACTERVISITADO = 'L' THEN '$'
		WHEN @CARACTERVISITADO = 'M' THEN '#'
		WHEN @CARACTERVISITADO = 'N' THEN '-'
		WHEN @CARACTERVISITADO = 'O' THEN '+'
		WHEN @CARACTERVISITADO = 'Q' THEN '*'
		WHEN @CARACTERVISITADO = 'P' THEN '<'
		WHEN @CARACTERVISITADO = 'R' THEN '>'
		WHEN @CARACTERVISITADO = 'S' THEN ','
		WHEN @CARACTERVISITADO = 'T' THEN '.'
		WHEN @CARACTERVISITADO = 'U' THEN '_'
		WHEN @CARACTERVISITADO = 'V' THEN '9'
		WHEN @CARACTERVISITADO = 'W' THEN '4'
		WHEN @CARACTERVISITADO = 'X' THEN '6'
		WHEN @CARACTERVISITADO = 'Y' THEN '1'
		WHEN @CARACTERVISITADO = 'Z' THEN '0'
		WHEN @CARACTERVISITADO = '' THEN '3'
		END
		SET @VIS = @VIS + 1
	END
	RETURN @DATOENCRIPTADO
END

CREATE PROCEDURE dbo.SPINSERTARALUMNO
@NOMB VARCHAR(30), @CONTRAS VARCHAR(300), @MATE VARCHAR(20), @FINI DATE, @FENT DATE
AS
BEGIN
	INSERT INTO PFALUMNOS VALUES(dbo.ENCRIPTARALUMNO(@NOMB), EncryptByPassPhrase('111',@CONTRAS), @MATE, @FINI, @FENT)
END


CREATE PROCEDURE dbo.SPINSERTA_N_ALUMNOS
AS
BEGIN
	DECLARE @NOM VARCHAR(30)
	DECLARE @CONTRA VARCHAR(300)
    DECLARE @MAT VARCHAR(20)
    DECLARE @FI DATE
    DECLARE @FE DATE
	DECLARE @CON INT
	DECLARE @AZARNOM INT
	DECLARE @AZARCONTRA INT
    DECLARE @AZARMAT INT
	SET @CON = 1
	WHILE @CON <= {{ . }}
	BEGIN
		SET @AZARNOM = RAND()*(5-1)+1
		SET @AZARCONTRA = RAND()*(20001-11000)+11000
        SET @AZARMAT = RAND()*(5-1)+1
        SET @FI = GETDATE()
        SET @FE = GETDATE()
		SET @NOM = CASE
		WHEN @AZARNOM = 1 THEN 'JOSE CARLOS'
		WHEN @AZARNOM = 2 THEN 'HERLAND MAURICIO'
		WHEN @AZARNOM = 3 THEN 'JONATHAN'
		ELSE 'MILTON'
	END
        SET @MAT = CASE
		WHEN @AZARMAT = 1 THEN 'BASE DE DATOS'
		WHEN @AZARMAT = 2 THEN 'INGLES'
		WHEN @AZARMAT = 3 THEN 'PROGRAMACION'
		ELSE 'CAMPOS MAGNETICOS'
	END
		SET @CONTRA = CONCAT(LEFT(@NOM,1), @AZARCONTRA)
		EXECUTE SPINSERTARALUMNO @NOM, @CONTRA, @MAT, @FI, @FE
		SET @CON = @CON +1
	END
END
EXECUTE dbo.SPINSERTA_N_ALUMNOS
DROP FUNCTION dbo.ENCRIPTARALUMNO
DROP PROCEDURE dbo.SPINSERTARALUMNO
DROP PROCEDURE dbo.SPINSERTA_N_ALUMNOS