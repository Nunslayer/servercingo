import { configureStore } from '@reduxjs/toolkit';
import { engineSlice } from './slices/engines/engines.slice';
import { loginSlice } from './slices/logins/logins.slice';
import { databaseSlice } from './slices/databases/databases.slice';
import { authSlice } from './slices/auth/auth.slice';
export const store = configureStore({
	reducer: {
        engine: engineSlice.reducer,
        login: loginSlice.reducer,
        database: databaseSlice.reducer,
        auth: authSlice.reducer,
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
