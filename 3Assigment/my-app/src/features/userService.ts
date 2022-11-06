import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface User {
    id?: number;
    username: string;
    password: string;
    token?: string;
    isAdmin?: boolean;
}

const initialState: User = {
    id: 0,
    username: '',
    password: '',
    token: '',
    isAdmin: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state = {...action.payload};
            return state;
        },
        logout: (state:User) => {
            state = {...initialState};
            return state;
        }
    }
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;