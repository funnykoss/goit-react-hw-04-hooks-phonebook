import React, { Component } from 'react';
import ContactForm from './components/ContactForm/ContactForm.jsx';
import ContactList from './components/ContactList/ContactList.jsx';
import Filter from './components/Filter/Filter.jsx';
import Contact from './components/ContactList/Contact.jsx';
import s from './App.module.css';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const prevContact = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(prevContact);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.contacts);
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = newContact => {
    const contactCheck = this.state.contacts.find(
      ({ name }) => name === newContact.name,
    );

    if (contactCheck !== undefined) {
      alert(`${newContact.name} is already in contact`);
      return;
    }

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };
  onChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
    this.reset();
  };
  reset = () => {
    this.setState({ filter: '' });
  };
  render() {
    const { filter, contacts } = this.state;
    const normalizeContacts = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeContacts),
    );

    return (
      <>
        <section className={s.section}>
          <ContactForm addContact={this.addContact} />
          <Contact />
          <Filter value={this.state.filter} onChange={this.onChange} />
          <ContactList
            // contacts={this.state.contacts}

            onDeleteContact={this.deleteContact}
            contacts={filteredContacts}
          />
        </section>
      </>
    );
  }
}
