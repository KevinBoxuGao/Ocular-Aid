import React from "react";

class GenericForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: "", text: "", password: "", email: "" };
  }
  inputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };
  submitForm = event => {
    console.log(event);
  };
  render() {
    return (
      <form>
        <div>
          <label>Number</label>
          <input
            type="number"
            name="number"
            value={this.state.number}
            onChange={this.inputChange}
            required
          />
        </div>
        <div>
          <label>Text</label>
          <input
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.inputChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.inputChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.inputChange}
            required
          />
        </div>
        <button type="button" onClick={() => this.submitForm()}>
          Submit
        </button>
      </form>
    );
  }
}

export default GenericForm;
