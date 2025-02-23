import { createSlice } from "@reduxjs/toolkit";
export const IsLogged=createSlice({
    name:'isLogged',
    initialState:false,
    reducers:{

        Logging:(state)=>{
            return !state;
        },
    }
})

export const {Logging} = IsLogged.actions;
export default IsLogged.reducer;

