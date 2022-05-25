import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            message: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { email } = this.state;
        console.log(email)
        axios.post(
                "http://localhost:3001/set_email",
                {
                        email: email,
                },
                { withCredentials: true }
            )
            .then(response => {
                if (response) {
                  this.setState({message: response.message})
                }
            })
            .catch(error => {
                console.log("email not sent", error);
            });
        event.preventDefault();
        console.log(this.state.message)
    }

    handleLogoutClick() {
        axios
            .delete("http://localhost:3001/logout", { withCredentials: true })
            .then(response => {
                this.props.handleLogout();
            })
            .catch(error => {
                console.log("logout error", error);
            });
    }

    render(){
            return (
                <div>
                    <div>
                        <h1>Dashboard</h1>
                        <h1>Status: {this.props.loggedInStatus}</h1>
                        <Button variant="contained" color="primary" onClick={() => this.handleLogoutClick()}>Logout</Button>
                        <h1 style={{marginTop:'20px'}}>Send the Referral</h1>
                        <form style={{marginTop:'20px',display:'flex',flexDirection:'column'}} onSubmit={this.handleSubmit}>
                            <TextField
                                onChange={this.handleChange}
                                label="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={this.state.email}
                                variant="outlined"
                                margin="normal"
                            />
                            <Button type="Submit" variant="contained" color="primary">
                                Send
                            </Button>
                            {this.state.message ? <h1>{this.state.message}</h1> : ''}
                        </form>
                    </div>
                </div>
            );
        }
};
