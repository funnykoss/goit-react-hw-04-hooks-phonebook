import { useState } from "react";

import s from '../ContactForm/ContactForm.module.css'
import PropTypes from 'prop-types';

export default function ContactForm({ addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handlerChange = event => {
  
    const { name, value } = event.target;
     
    switch (name) {
      case 'name':
        setName(value)
        break;
      
      case 'number':
        setNumber(value)
        break;
      
      default:
        break;
    }
    
    };

  const submitForm = event => {
 console.log(event)
    event.preventDefault();
     
    addContact(name,number);
    reset();
   }
   function reset() {
      setName('');
      setNumber('');
     }
  
  return (
       <>
        <h2 className={s.title}>Phonebook</h2>
          <form className={s.form}
              onSubmit={submitForm}>
              <label className={s.label}>
            Name
            <input className={s.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
              value={name}
              onChange={handlerChange}
            />
          </label>
              <label className={s.label}>
            Number
            <input className={s.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
              value={number}
              onChange={handlerChange}
            />
          </label>
          <button type="submit" className={s.button}> Add contacts</button>
          </form>
      </>)
 
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired
}