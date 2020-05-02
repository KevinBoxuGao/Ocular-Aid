import React from "react";
import "./Button.scss";

class Button extends React.Component {
  state = {
    header: "thing"
  };

  handleClick = () => {
    this.setState({ header: "success" });
  };

  render() {
    return (
      <div>
        <h1 data-testid="h1tag">{this.state.header}</h1>
        <button className="button-style" onClick={this.handleClick}>
          click me!
        </button>
      </div>
    );
  }
}

export default Button;
