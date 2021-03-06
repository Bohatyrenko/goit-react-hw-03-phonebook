import React from 'react'; //при закоментированом варианте нужно сюда дописать { Component }
import { useState, useEffect } from 'react';

//libraries
import shortid from 'shortid';

//helpers
import getFilteredContacts from './helpers/filterContacts';

//Components
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import ContactFilter from './components/ContactFilter/ContactFilter';

const initilState = {
  contacts: [],
  name: '',
  number: '',
  filter: '',
};

function App() {
  const [state, setState] = useState(initilState);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      contacts:
        JSON.parse(localStorage.getItem('contacts')) !== null
          ? JSON.parse(localStorage.getItem('contacts'))
          : [],
    }));
  }, []);

  //Метод, который в State записывает введенные name і number
  const handleSetName = ({ target: { name, value } }) => {
    setState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  //Добавляем контакт в наш массив контактов
  const handleAddContact = e => {
    e.preventDefault();
    const contact = {
      name: state.name,
      number: state.number,
      id: shortid.generate(),
    };
    if (state.contacts.map(el => el.name).includes(state.name)) {
      alert('Остановись, контакт с таким именем уже существует');
      return;
    }
    localStorage.setItem(
      'contacts',
      JSON.stringify([...state.contacts, contact]),
    );
    setState(prev => ({
      ...prev,
      contacts: [...prev.contacts, contact],
      name: '',
      number: '',
    }));
  };

  //Удаляем контакт из ContactList
  const handleDeleteContact = ({ target: { id } }) => {
    setState(prev => ({
      ...prev,
      contacts: state.contacts.filter(el => el.id !== id),
    }));
    localStorage.setItem(
      'contacts',
      JSON.stringify(state.contacts.filter(el => el.id !== id)),
    );
  };

  //Делаем фильтр контактов
  const contacts = getFilteredContacts(state.contacts, state.filter);

  return (
    <div className="App" style={{ marginLeft: '50%', marginRight: '50%' }}>
      <h1>Phonebook</h1>
      <ContactForm
        onSetName={handleSetName}
        name={state.name}
        number={state.number}
        onAddContact={handleAddContact}
        // onSubmit={this.formSubmit}
        // input={this.state}
        // options={this}
        // optionsTel={this.handleTelChange}
      />
      <h2>Contacts</h2>
      {state.contacts.length > 1 && (
        <ContactFilter onSetFilter={handleSetName} filter={state.filter} />
      )}
      <ContactList contacts={contacts} onDeleteContact={handleDeleteContact} />
    </div>
  );
}

// Первый вариант
// class App extends Component {
//   state = {
//     inputValue: '',
//     name: '',
//     tel: '',
//   };

//   // handleChange = event => {
//   //   const { name, value } = event.currentTarget;
//   //   this.setState({ [name]: value });
//   // };

//   // handleSubmit = event => {
//   //   event.preventDefault();
//   //   console.log(this.state);
//   // };

//   formSubmit = event => {
//     console.log(event);
//   };

//   render() {
//     return (
//       <>
//         <h1>Phonebook</h1>
//         <ContactForm
//           onSubmit={this.formSubmit}
//           // input={this.state}
//           // options={this}
//           // optionsTel={this.handleTelChange}
//         />
//         <h2>Contacts</h2>
//         {/* <Filter ... /> */}
//         {/* <ContactList ... /> */}
//       </>
//     );
//   }
// }

export default App;
