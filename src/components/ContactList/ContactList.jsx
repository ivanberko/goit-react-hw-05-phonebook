import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { list, itemContact, btnDelete } from "./ContactList.module.css";
import slideTransition from "./transition/slideContact.module.css";

const ContactList = ({ contacts, onDeleteContact }) => (
  <TransitionGroup component="ul" className={list}>
    {contacts.map(({ name, number, id }) => (
      <CSSTransition key={id} timeout={200} unmountOnExit classNames={slideTransition}>
        <li className={itemContact}>
          <p>
            {name}: <span>{number}</span>
          </p>
          <button
            className={btnDelete}
            type="button"
            onClick={() => onDeleteContact(id)}
          ></button>
        </li>
      </CSSTransition>
    ))}
  </TransitionGroup>
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
