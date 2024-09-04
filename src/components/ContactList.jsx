import React from "react";
import PropTypes from "prop-types";


function ContactList({contacts, filter, filteredContacts,removeContact}){
    return(
        <>
        {filter === "" ? (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              {contact.name} - {contact.number} <button onClick={() => removeContact(contact.id)}>Delate</button>
            </li>
          ))}
        </ul>
        ) : (
        <ul>
          {filteredContacts.map((contact) => (
            <li key={contact.id}>
              {contact.name} - {contact.number} <button onClick={() => removeContact(contact.id)}>Delate</button>
              </li>
          ))}
        </ul>
      )}
        </>
    )
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string
    })
  ).isRequired,
  filter: PropTypes.string,
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ).isRequired,
  removeContact: PropTypes.func,
};

export default ContactList