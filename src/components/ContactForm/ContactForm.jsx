import React, { Component } from "react";
import PropTypes from "prop-types";
import { formAddContact } from "./ContactForm.module.css";

const initState = {
  name: "",
  number: "",
};

export default class ContactForm extends Component {
  state = { ...initState };

  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    const { name, number } = this.state;
    const { onAddContact } = this.props;
    e.preventDefault();
    if (name && Number(number)) {
      onAddContact({ ...this.state });
      this.setState({
        ...initState,
      });
    }
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={formAddContact} onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Number
          <input
            type="text"
            name="number"
            value={number}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
