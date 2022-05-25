import React, { Component } from "react";
import axios from "axios";
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { withStyles } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
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
    const { email, password } = this.state;
    console.log(email,password);
    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            email: email,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.logged_in) {
          //console.log(response.data);
          //this.props.handleSuccessfulAuth(response.data);
          this.props.handleLogin(response.data);
          this.props.history.push("/dashboard");
        }
      })
      .catch(error => {
        console.log("login error", error);
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

          {/*<button type="submit">Login</button>*/}
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </div>
    );
  }
}
