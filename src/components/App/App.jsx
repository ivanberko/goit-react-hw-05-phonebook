import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";

// Components
import ContactForm from "../ContactForm/ContactForm";
import Filter from "../Filter/Filter";
import ContactList from "../ContactList/ContactList";
import Notification from "../Notification/Notification";

// Styles
import { container, title } from "./App.module.css";
import notifyTransition from "./transition/notify.module.css";
import showTitleTransition from "./transition/showTitle.module.css";

export default class App extends Component {
  state = {
    contacts: [
      { id: uuidv4(), name: "Rosie Simpson", number: "459-12-56" },
      { id: uuidv4(), name: "Hermione Kline", number: "443-89-12" },
      { id: uuidv4(), name: "Eden Clements", number: "645-17-79" },
      { id: uuidv4(), name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    isNotify: false,
    showTitle: false,
  };

  addContact = (contact) => {
    const { contacts } = this.state;
    const isExistContact = contacts.find(
      (item) => item.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (!isExistContact) {
      const contactToAdd = {
        id: uuidv4(),
        ...contact,
      };

      this.setState((prevState) => ({
        contacts: [contactToAdd, ...prevState.contacts],
      }));
    } else {
      this.setState({ isNotify: true });
      setTimeout(() => this.setState({ isNotify: false }), 1500);
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
    this.setState({ showTitle: true });
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
    const { contacts, filter, isNotify, showTitle } = this.state;
    const filteredContact = this.findContact(filter, contacts);

    return (
      <section className={container}>
        <CSSTransition
          in={isNotify}
          timeout={250}
          unmountOnExit
          classNames={notifyTransition}
        >
          <Notification />
        </CSSTransition>

        <CSSTransition
          in={showTitle}
          timeout={500}
          unmountOnExit
          classNames={showTitleTransition}
        >
          <h1 className={title}>Phonebook</h1>
        </CSSTransition>

        <ContactForm onAddContact={this.addContact} />

        <Filter
          contacts={contacts}
          filter={filter}
          handleFindName={this.handleChangeFilter}
        />
        <ContactList
          contacts={filteredContact}
          onDeleteContact={this.deleteContact}
        />
      </section>
    );
  }
}
