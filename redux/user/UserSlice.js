

import { createSlice } from "@reduxjs/toolkit";




const userSlice = createSlice({

    name :'User',
    initialState :[],
    reducers :{

        AddUser: (state,action)=>{
            state.push(action.payload)
        }
    }

})


export const {AddUser} = userSlice.actions
export default userSlice.reducer;