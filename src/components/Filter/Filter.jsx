import React from "react";
import PropTypes from "prop-types";

const Filter = ({ contacts, filter, handleFindName }) => (
  <div>
    {contacts.length >= 2 && (
      <label>
        Find contacts by name
        <input
          type="text"
          name="filter"
          value={filter}
          onChange={handleFindName}
        />
      </label>
    )}
  </div>
);
Filter.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  filter: PropTypes.string.isRequired,
  handleFindName: PropTypes.func.isRequired,
};

export default Filter;
