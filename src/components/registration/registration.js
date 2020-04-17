import React, {Component} from 'react';
import {connect} from 'react-redux';
import {registrationHandler} from '../../redux_components/auth/authActions';
import {Link} from "react-router-dom";

class Registration extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.userPostFetch(this.state)
    }

    render() {
        return (
            <div className={"registration"}>
                <form onSubmit={this.handleSubmit}>
                    <h1>Sign Up For An Account</h1>

                    <label>First Name</label>
                    <input
                        name='firstname'
                        placeholder='First Name'
                        value={this.state.firstname}
                        onChange={this.handleChange}
                    /><br/>

                    <label>Last Name</label>
                    <input
                        name='lastname'
                        placeholder='Last Name'
                        value={this.state.lastname}
                        onChange={this.handleChange}
                    /><br/>

                    <label>Email</label>
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={this.state.email}
                        onChange={this.handleChange}
                    /><br/>

                    <label>Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.handleChange}
                    /><br/>

                    <input type='submit'/>
                </form>
                <Link to='/login'>Back to LogIn</Link>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    userPostFetch: userInfo => dispatch(registrationHandler(userInfo))
})

export default connect(null, mapDispatchToProps)(Registration);