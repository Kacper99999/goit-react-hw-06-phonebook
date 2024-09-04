import {configureStore} from '@reduxjs/toolkit';
import phonebook from "./reducer"

const store = configureStore({
    reducer:{
        contacts:phonebook
    }
})

export default store;






