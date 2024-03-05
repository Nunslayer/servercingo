SELECT
    DB_NAME(database_id) AS DatabaseName,
    name AS LogicalName,
    physical_name AS FileName,
    CONVERT(BIGINT, size) * 8 / 1024 AS SizeMB,
    CONVERT(BIGINT, max_size) * 8 / 1024 AS MaxSizeMB
FROM
    sys.master_files
WHERE
    type_desc IN ('ROWS', 'LOG') -- Filtrar solo archivos de datos y de registro
    AND database_id = DB_ID('{{ . }}');
