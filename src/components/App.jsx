import React ,{useState, useEffect, useRef} from 'react';
import { useDispatch , useSelector } from 'react-redux'; 
import { addPhone, removePhone, filterContact } from '../redux/reducer';
import { nanoid } from 'nanoid';
import Contacts from '/src/components/Contacts';
import Filter from '/src/components/Filter'
import ContactList from '/src/components/ContactList';
import '/src/components/styles.css';

export default function App() {
  let contact = useSelector(state => state.contacts.contacts);
  const filterselector = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

const [state, setState] = useState({
contacts: [],
filterr: '',
name: '',
number: ''
})

const [name, setName] = useState("");
const [number, setNumber] = useState("");



// const handleChange = (e) => {
//   const {name, value} = e.currentTarget;
//   setState((preState) => ({
//     ...preState,
//     [name]:value
//   }));
//   };


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


    const filteredContacts = contact.filter((con) =>
      con.name.toLowerCase().startsWith(filterselector)
    );

    const isMounted = useRef(false);
    
    useEffect(()=>{
      const zmienna = localStorage.getItem("contacts");
      contact = zmienna;
      console.log(contact);
      },[])
      
    
    useEffect(()=>{
      if(isMounted.current){
        localStorage.setItem("contacts", JSON.stringify(contact));
      }
      else{
        isMounted.current = true;
      }
    },[contact]);

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
      contacts={contact}
      filter={filterselector}
      filteredContacts={filteredContacts}
      removeContact={removeContact}
    />

  </>
);

}
