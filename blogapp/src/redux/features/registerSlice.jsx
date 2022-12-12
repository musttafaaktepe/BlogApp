import { createSlice } from "@reduxjs/toolkit";

const initialStates = {    
    name:"",
    lastName:"",
    email:"",
    password:"",
    
};

const registerSlice = createSlice({
    name:"register",
    initialState:initialStates,
    reducers:{
        registerInformation:(state,action)=>{
            state.name=action.payload.firstName;
            state.lastName=action.payload.lastName;
            state.email=action.payload.email;
            state.password=action.payload.password;            
        },
        afterRegister:(state) => {
           delete state.password;
        }
        
    }
})

export const {registerInformation, afterRegister} = registerSlice.actions;
export default registerSlice.reducer

