import { errorsx, model } from '@@/go/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DatabaseSlice = {
    id: number | null
    name: string | null
    idEngine: number | null
    dbs: model.DatabaseRes[]
    error: errorsx.FormattedError | null
}
const initialState: DatabaseSlice = {
	id: null,
    name: null,
    idEngine: null,
    dbs: [],
    error: null
};

export const databaseSlice = createSlice({
	name: 'database',
	initialState,
	reducers: {
		setDatabase: (state, action: PayloadAction<model.DatabaseRes>) => {
			state.id = action.payload.id;
			state.idEngine = action.payload.engineId;
			state.name = action.payload.name;
		},
        // setConnectedStatus: (state, action: PayloadAction<boolean>)=>{
        //     state.isConnected = action.payload
        // },
        disconnectDatabase: (state, ) => {
            state.error = initialState.error
            state.id = initialState.id
            state.name = initialState.name
            state.idEngine = initialState.idEngine
        },
        setArrayDatabases: (state, action: PayloadAction<model.DatabaseRes[]>)=>{
            state.dbs = action.payload
        }
	},
});

export const { setDatabase, disconnectDatabase, setArrayDatabases } = databaseSlice.actions;
