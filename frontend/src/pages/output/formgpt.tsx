import React, { useState } from 'react';

interface ColumnInfo {
  columnName: string;
  dataType: string;
  maxLength: any;
  isNullable: string;
  defaultValue: any;
  isIdentity: string;
  isPrimaryKey: string;
}

const FormularioTabla: React.FC = () => {
  const [tableName, setTableName] = useState('');
  const [dbName, setDbName] = useState('');
  const [columnas, setColumnas] = useState<ColumnInfo[]>([]);

  const agregarColumna = () => {
    const nuevaColumna: ColumnInfo = {
      columnName: '',
      dataType: '',
      maxLength: null,
      isNullable: 'true',
      defaultValue: null,
      isIdentity: 'false',
      isPrimaryKey: 'false'
    };
    setColumnas([...columnas, nuevaColumna]);
  };

  const manejarCambioColumna = (index: number, campo: keyof ColumnInfo, valor: string | number | boolean | null) => {
    const nuevasColumnas = [...columnas];
    nuevasColumnas[index][campo] = valor === null ? valor : valor.toString();
    setColumnas(nuevasColumnas);
  };

  const enviarFormulario = () => {
    // Aquí puedes enviar los datos del formulario al servidor (por ejemplo, a través de una solicitud HTTP)
    console.log('Nombre de la tabla:', tableName);
    console.log('Nombre de la base de datos:', dbName);
    console.log('Columnas:', columnas);
  };

  return (
    <div>
      <h2>Formulario para crear tabla en SQL Server</h2>
      <form onSubmit={enviarFormulario}>
        <div>
          <label>Nombre de la tabla:</label>
          <input type="text" value={tableName} onChange={(e) => setTableName(e.target.value)} />
        </div>
        <div>
          <label>Nombre de la base de datos:</label>
          <input type="text" value={dbName} onChange={(e) => setDbName(e.target.value)} />
        </div>
        <button type="button" onClick={agregarColumna}>Agregar columna</button>
        <div className="flex flex-col">
          {columnas.map((columna, index) => (
            <div key={index} className="flex flex-row">
              <h3>Columna {index + 1}</h3>
              <div>
                <label>Nombre de la columna:</label>
                <input type="text" value={columna.columnName} onChange={(e) => manejarCambioColumna(index, 'columnName', e.target.value)} />
              </div>
              <div>
                <label>Tipo de datos:</label>
                <input type="text" value={columna.dataType} onChange={(e) => manejarCambioColumna(index, 'dataType', e.target.value)} />
              </div>
              <div>
                <label>Longitud máxima:</label>
                <input type="number" value={columna.maxLength || ''} onChange={(e) => manejarCambioColumna(index, 'maxLength', parseInt(e.target.value) || null)} />
              </div>
              <div>
                <label>¿Es nula?</label>
                <input type="checkbox" checked={columna.isNullable === 'true'} onChange={(e) => manejarCambioColumna(index, 'isNullable', e.target.checked)} />
              </div>
              <div>
                <label>Valor predeterminado:</label>
                <input type="text" value={columna.defaultValue || ''} onChange={(e) => manejarCambioColumna(index, 'defaultValue', e.target.value || null)} />
              </div>
              <div>
                <label>¿Es una clave primaria?</label>
                <input type="checkbox" checked={columna.isPrimaryKey === 'true'} onChange={(e) => manejarCambioColumna(index, 'isPrimaryKey', e.target.checked)} />
              </div>
              <div>
                <label>¿Es una columna de identidad?</label>
                <input type="checkbox" checked={columna.isIdentity === 'true'} onChange={(e) => manejarCambioColumna(index, 'isIdentity', e.target.checked)} />
              </div>
            </div>
          ))}
        </div>
        <button type="submit">Enviar formulario</button>
      </form>
    </div>
  );
};

export default FormularioTabla;
