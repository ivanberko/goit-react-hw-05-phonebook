import React from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import { sectionFilter, inputFilter } from "./Filter.module.css";
import filterTransition from "./transition/filter.module.css";

const Filter = ({ contacts, filter, handleFindName }) => (
  <CSSTransition
    in={contacts.length >= 2}
    timeout={250}
    unmountOnExit
    classNames={filterTransition}
  >
    <section className={sectionFilter}>
      <label>
        Find contacts by name
        <input
          type="text"
          name="filter"
          value={filter}
          onChange={handleFindName}
          className={inputFilter}
        />
      </label>
    </section>
  </CSSTransition>
);
Filter.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  filter: PropTypes.string.isRequired,
  handleFindName: PropTypes.func.isRequired,
};

export default Filter;
