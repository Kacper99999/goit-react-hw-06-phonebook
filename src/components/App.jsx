import React ,{useState, useEffect, useRef} from 'react';
import { nanoid } from 'nanoid';
import Contacts from '/src/components/Contacts';
import Filter from '/src/components/Filter'
import ContactList from '/src/components/ContactList';
import '/src/components/styles.css';

export default function App() {

const [state, setState] = useState({
contacts: [],
filter: '',
name: '',
number: ''
})



const handleChange = (e) => {
  const {name, value} = e.currentTarget;
  setState((preState) => ({
    ...preState,
    [name]:value
  }));
  };


const handleSubmit = (e) => {
  e.preventDefault();
  const { name, number, contacts } = state;
  const contactExists = contacts.some(con => con.name === name);

  if (contactExists) {
    alert("Kontakt o takiej nazwie już istnieje!");
    return;
  }

  const newContact = {
    id: nanoid(),
    name: name,
    number: number
  }

  setState((prevState) => ({
    ...prevState,
    contacts: [...prevState.contacts, newContact]
  }));
};


const searchContact = (e) => {
  const filter = e.target.value.toLowerCase();
  setState((preState) =>({
    ...preState,
    filter : filter
  }));
}


const removeContact = (idToRemove) => {
  setState((preState) => ({
    ...preState,
    contacts : preState.contacts.filter(contact => contact.id !== idToRemove)
  }));
  
};


    const { contacts, filter } = state;
    const filteredContacts = contacts.filter((con) =>
      con.name.toLowerCase().startsWith(filter)
    );

    const isMounted = useRef(false);
    
    useEffect(()=>{
      const zmienna = localStorage.getItem("contacts")
      if(zmienna){
        setState((preState) =>({
          ...preState,
          contacts:JSON.parse(zmienna)
        }))
      }
      },[])
      
    
    useEffect(()=>{
      if(isMounted.current){
        localStorage.setItem("contacts", JSON.stringify(state.contacts));
      }
      else{
        isMounted.current = true;
      }
    },[state.contacts]);

return (
  
  <>
  <h1>Phonebook</h1>
    <Contacts
      handleChange={handleChange}
      handleChange2={handleChange}
      handleSubmit={handleSubmit}
    />
    <h2>Contacts</h2>
    <Filter
      search={searchContact}
    />
    <ContactList
      contacts={contacts}
      filter={filter}
      filteredContacts={filteredContacts}
      removeContact={removeContact}
    />

  </>
);

}
