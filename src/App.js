//  eslint-disable react/jsx-no-duplicate-props
import shortid from 'shortid';
import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm/ContactForm.jsx';
import ContactList from './components/ContactList/ContactList.jsx';
import Filter from './components/Filter/Filter.jsx';
import Contact from './components/ContactList/Contact.jsx';
import s from './App.module.css';
const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
};
export default function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const addContact = (name, number) => {
    const newContact = {
      id: shortid.generate(),
      name,
      number,
    };

    const contactCheck = contacts.find(({ name }) => name === newContact.name);

    if (contactCheck !== undefined) {
      alert(`${newContact.name} is already in contact`);
      return;
    }
    setContacts(prevState => [...prevState, newContact]);
  };
  const onChange = event => {
    setFilter(event.target.value);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const normalizeContacts = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeContacts),
  );

  return (
    <>
      <section className={s.section}>
        <ContactForm addContact={addContact} />
        <Contact />
        <Filter value={filter} onChange={onChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      </section>
    </>
  );
}
