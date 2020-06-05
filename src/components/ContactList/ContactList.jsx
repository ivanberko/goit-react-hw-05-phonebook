import React from "react";
import PropTypes from "prop-types";
import { list, itemContact, btnDelete } from "./ContactList.module.css";

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className={list}>
    {contacts.map(({ name, number, id }) => (
      <li key={id}>
        <p className={itemContact}>
          {name}: <span>{number}</span>
        </p>
        <button className={btnDelete} type="button" onClick={() => onDeleteContact(id)}>
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
