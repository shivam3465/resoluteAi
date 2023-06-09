import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name: 'user',
    initialState:{
        authenticated: false,
        user: {},
        loading: false,    
        tasks: [],
        taskAdded: false, 
    },
    reducers:{
        setAuthenticated: (state,action)=>{
            state.authenticated=action.payload;
        },
        setUser: (state,action)=>{
            state.user=action.payload;
        },
        setLoading: (state,action)=>{
            state.loading=action.payload;
        },
        setTask: (state,action)=>{
            state.tasks=action.payload;
        },
        setTaskAdded: (state,action)=>{
            state.taskAdded=action.payload;
        }
    }
})

export const {setAuthenticated, setUser,setLoading,setTask,setTaskAdded} =userSlice.actions;
export const userReducer=userSlice.reducer;