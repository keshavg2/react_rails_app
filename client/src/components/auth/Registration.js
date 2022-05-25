import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password, password_confirmation } = this.state;

    axios
      .post(
        "http://localhost:3001/registrations",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("registration error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form style={{display:'flex',flexDirection:'column'}} onSubmit={this.handleSubmit}>
          {/*<input*/}
          {/*  type="email"*/}
          {/*  name="email"*/}
          {/*  placeholder="Email"*/}
          {/*  value={this.state.email}*/}
          {/*  onChange={this.handleChange}*/}
          {/*  required*/}
          {/*/>*/}
          <TextField
              onChange={this.handleChange}
              label="email"
              name="email"
              type="email"
              placeholder="Email"
              value={this.state.email}
              variant="outlined"
          />

          {/*<input*/}
          {/*  type="password"*/}
          {/*  name="password"*/}
          {/*  placeholder="Password"*/}
          {/*  value={this.state.password}*/}
          {/*  onChange={this.handleChange}*/}
          {/*  required*/}
          {/*/>*/}

          <TextField
              label="Password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
          />

          {/*<input*/}
          {/*  type="password"*/}
          {/*  name="password_confirmation"*/}
          {/*  placeholder="Password confirmation"*/}
          {/*  value={this.state.password_confirmation}*/}
          {/*  onChange={this.handleChange}*/}
          {/*  required*/}
          {/*/>*/}

          <TextField
              label="Password_confirmation"
              type="password"
              name="password_confirmation"
              value={this.state.password_confirmation}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
          />

          {/*<button type="submit">Register</button>*/}
          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </form>
      </div>
    );
  }
}
