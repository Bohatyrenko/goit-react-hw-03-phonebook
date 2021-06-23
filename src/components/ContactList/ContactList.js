import React from 'react';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
    {contacts.map(({ name, number, id }) => (
      <li key={id}>
        <p>Name:{name}</p>
        <p>Number:{number}</p>
        <button id={id} onClick={onDeleteContact}>
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default ContactList;
