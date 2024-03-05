import { errorsx, model } from '@@/go/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LoginSlice = {
    loginId: number | null
    loginName: string | null
    logins: model.User[]
    sysAdmin: boolean
    error: errorsx.FormattedError | null
}
const initialState: LoginSlice = {
	loginId: null,
    loginName: null,
    logins: [],
    sysAdmin: false,
    error: null
};

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setLogin: (state, action: PayloadAction<model.User>) => {
			state.loginId = action.payload.id;
			state.loginName = action.payload.name;
			state.sysAdmin = action.payload.isSA;
		},
        resetLogin: (state, ) => {
            state.error = initialState.error
            state.loginId = initialState.loginId
            state.loginName = initialState.loginName
            state.sysAdmin = initialState.sysAdmin
        },
        setArrayLogins: (state, action: PayloadAction<model.User[]>)=>{
            state.logins = action.payload
        }
	},
});

export const { setLogin, resetLogin, setArrayLogins } = loginSlice.actions;
