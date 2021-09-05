import { Component } from "react";
import shortid from 'shortid';
import s from '../ContactForm/ContactForm.module.css'
import PropTypes from 'prop-types';
export default class ContactForm extends Component{
    state = {
         name: '',
        number: '',
    }

    handlerChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value});
    };

    submitForm = event => {
        event.preventDefault();
        const newContact = {
            id: shortid.generate(),
            name: this.state.name,
            number: this.state.number,
      }
      
      this.props.addContact(newContact);
      this.reset()
    
    }
    reset = () => {
        this.setState({ name: '', number: '',})
    }
    render(){
        return (
       <>
        <h2 className={s.title}>Phonebook</h2>
          <form className={s.form}
              onSubmit={this.submitForm}>
              <label className={s.label}>
            Name
            <input className={s.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required
              value={this.state.name}
              onChange={this.handlerChange}
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
              value={this.state.number}
              onChange={this.handlerChange}
            />
          </label>
          <button type="submit" className={s.button}> Add contacts</button>
          </form>
      </>
    )
  }
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired
}