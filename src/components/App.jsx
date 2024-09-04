import {useState, useEffect} from 'react';
import { useDispatch , useSelector } from 'react-redux'; 
import { addPhone, removePhone, filterContact } from '../redux/reducer';
import { nanoid } from 'nanoid';
import Contacts from '/src/components/Contacts';
import Filter from '/src/components/Filter'
import ContactList from '/src/components/ContactList';
import '/src/components/styles.css';

export default function App() {
  const contacts = useSelector(state => state.contacts.contacts);
  const filterselector = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

const [name, setName] = useState("");
const [number, setNumber] = useState("");


    
useEffect(()=>{
  const saverdContacts = localStorage.getItem("contacts");
  if(saverdContacts){
    const parsedContacts = JSON.parse(saverdContacts);
    parsedContacts.forEach(contact => dispatch(addPhone(contact)));
  }
},[dispatch])

useEffect(()=>{
    localStorage.setItem("contacts", JSON.stringify(contacts));
},[contacts]);


const handleSubmit = (e) => {
  e.preventDefault();
  if(name && number){
    dispatch(addPhone({id:nanoid(), name, number}));
    setName("");
    setNumber("");
  }
};


const searchContact = (e) => {
  const filter = e.target.value.toLowerCase();
  dispatch(filterContact(filter));
}


const removeContact = (idToRemove) => {
  dispatch(removePhone(idToRemove));
};


    const filteredContacts = contacts.filter((con) =>
      con.name.toLowerCase().startsWith(filterselector)
    );


return (
  <>
  <h1>Phonebook</h1>
    <Contacts
      handleChange={setName}
      handleChange2={setNumber}
      handleSubmit={handleSubmit}
    />
    <h2>Contacts</h2>
    <Filter
      search={searchContact}
    />
    <ContactList
      contacts={contacts}
      filter={filterselector}
      filteredContacts={filteredContacts}
      removeContact={removeContact}
    />

  </>
);

}
