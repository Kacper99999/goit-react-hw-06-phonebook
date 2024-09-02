import React ,{useState, useEffect, useRef} from 'react';
import { useDispatch , useSelector } from 'react-redux'; 
import { addPhone } from '../redux/reducer';
import { nanoid } from 'nanoid';
import Contacts from '/src/components/Contacts';
import Filter from '/src/components/Filter'
import ContactList from '/src/components/ContactList';
import '/src/components/styles.css';

export default function App() {

  const contact = useSelector(state => state.contact.contact);
  const filterselector = useSelector(state => state.contact.filter);
  const dispatch = useDispatch();

const [state, setState] = useState({
contacts: [],
filter: '',
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
    dispatch(addPhone({id:nanoid, name, number}))
  }
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
  <p>ppp</p>
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
      filter={filter}
      filteredContacts={filteredContacts}
      removeContact={removeContact}
    />

  </>
);

}
