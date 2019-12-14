import React from "react";
import axios from "axios";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "newyork",
      data: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  loadUsers = async () =>
    await fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => (res.ok ? res : Promise.reject(res)))
      .then(res => res.json());

  handleChange(event) {
    this.setState({ city: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .get("http://localhost:3100/api?city=" + this.state.city)
      .then(response => {
        console.log(response.data);
        this.setState({
          data: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <select
            className="cities"
            name="cities"
            size="3"
            onChange={this.handleChange}
          >
            <option value="newyork">New York</option>
            <option value="seattle">Seattle</option>
            <option value="pasadena">Pasadena</option>
          </select>
          <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
