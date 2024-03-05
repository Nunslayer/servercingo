import { errorsx, model } from '@@/go/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthSlice = {
    isLoading: boolean
    server: string | null
    login: string | null
    user: string | null
    database: string | null
    table: string | null
    isSysAdmin: boolean
    isConnected: boolean
    dbs: string[]
    tbs: string[]
    lgs: model.Login[]
    error: errorsx.FormattedError | null
}
const initialState: AuthSlice = {
    isLoading: false,
    server: null,
    login: null,
    user: null,
    database: null,
    table: null,
    isSysAdmin: false,
    isConnected: false,
    dbs: [],
    tbs: [],
    lgs: [],
    error: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setConnectedStatus: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload
        },
        shutdownConnection: (state,) => {
            state.error = initialState.error
            state.isLoading = initialState.isLoading
            state.server = initialState.server
            state.login = initialState.login
            state.user = initialState.user
            state.database = initialState.database
            state.table = initialState.table
            state.isSysAdmin = initialState.isSysAdmin
            state.dbs = initialState.dbs
            state.tbs = initialState.tbs
            state.lgs = initialState.lgs
        },
        setServer: (state, action: PayloadAction<string | null>) => {
            state.server = action.payload
        },
        setLogin: (state, action: PayloadAction<string | null>) => {
            state.login = action.payload
        },
        setUser: (state, action: PayloadAction<string | null>) => {
            state.user = action.payload
        },
        setDatabase: (state, action: PayloadAction<string | null>) => {
            state.database = action.payload
        },
        setTable: (state, action: PayloadAction<string | null>) => {
            state.table = action.payload
        },
        setIsSysAdmin: (state, action: PayloadAction<boolean>) => {
            state.isSysAdmin = action.payload
        },
        setDbs: (state, action: PayloadAction<string[]>) => {
            state.dbs = action.payload
        },
        setTbs: (state, action: PayloadAction<string[]>) => {
            state.tbs = action.payload
        },
        setLgs: (state, action: PayloadAction<model.Login[]>) => {
            state.lgs = action.payload
        },

    },
});

export const { setConnectedStatus, setDatabase, setIsLoading, setIsSysAdmin, setLogin, setServer, setTable, setUser, shutdownConnection, setDbs, setLgs, setTbs } = authSlice.actions;
