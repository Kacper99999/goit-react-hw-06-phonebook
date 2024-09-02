import {configureStore} from '@reduxjs/toolkit';
import {phonebook} from "./reducer"

const store = configureStore({
    reducer:phonebook
})

export default store;
