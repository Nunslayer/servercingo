import { errorsx, model } from '@@/go/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type EngineSlice = {
    id: number | null
    name: string | null
    port: number | null
    engs: model.Engine[]
    isConnected: boolean
    error: errorsx.FormattedError | null
}
const initialState: EngineSlice = {
	id: null,
    name: null,
    port: null,
    engs: [],
    isConnected: false,
    error: null
};

export const engineSlice = createSlice({
	name: 'engine',
	initialState,
	reducers: {
		setEngine: (state, action: PayloadAction<model.Engine>) => {
			state.id = action.payload.id;
			state.port = action.payload.port;
			state.name = action.payload.server;
		},
        setConnectedStatus: (state, action: PayloadAction<boolean>)=>{
            state.isConnected = action.payload
        },
        disconnectEngine: (state, ) => {
            state.error = initialState.error
            state.id = initialState.id
            state.name = initialState.name
            state.port = initialState.port
            state.isConnected = initialState.isConnected
        },
        setArrayEngines: (state, action: PayloadAction<model.Engine[]>)=>{
            state.engs = action.payload
        }
	},
});

export const { setEngine, setConnectedStatus, disconnectEngine, setArrayEngines } = engineSlice.actions;
