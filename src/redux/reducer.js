import { createStlice } from '@reduxjs/toolkit';


const initialState = {
    contacts: [],
    filter: '',
    name: '',
    number: ''
    }

const phonebook = createStlice({
    name:"phonebook",
    initialState,
    reducers:{
        addPhone : (state, action) =>{
            state.contacts.push(action.payload)
        },
        removePhone : (state, action) =>{
            state.contacts.filter(con => con.id !== action.payload)
        },
        filterContact : (state, action) =>{
            state.filter === action.payload
        }
    }

})

export const {addPhone, removePhone, filterContact} = phonebook.actions;

export default phonebook.reducer;