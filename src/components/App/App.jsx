import React, { Component } from "react";
import ContactForm from "../ContactForm/ContactForm";
import Filter from "../Filter/Filter";
import ContactList from "../ContactList/ContactList";
import { v4 as uuidv4 } from "uuid";

export default class App extends Component {
  state = {
    contacts: [
      { id: uuidv4(), name: "Rosie Simpson", number: "459-12-56" },
      { id: uuidv4(), name: "Hermione Kline", number: "443-89-12" },
      { id: uuidv4(), name: "Eden Clements", number: "645-17-79" },
      { id: uuidv4(), name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addContact = (contact) => {
    const { contacts } = this.state;
    const isExistContact = contacts.find(
      (item) => item.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (!isExistContact) {
      const contactToAdd = {
        id: uuidv4(),
        ...contact
      };

      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contactToAdd],
      }));
    } else {
      alert(`${contact.name} is already in contacts.`);
    }
  };

  findContact = (name, contacts) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  handleChangeFilter = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    const persistedContacts = localStorage.getItem("contacts");
    if (persistedContacts) {
      const contacts = JSON.parse(persistedContacts);
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const filteredContact = this.findContact(filter, contacts);

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter
          contacts={contacts}
          filter={filter}
          handleFindName={this.handleChangeFilter}
        />
        <ContactList
          contacts={filteredContact}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
