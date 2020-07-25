import React, {Component} from 'react';
import {connect} from 'react-redux';
import {registrationHandler} from '../../redux_components/auth/authActions';
import {Link} from "react-router-dom";
import './registration.css';

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
            <div className={"registration-page"}>

                <div className="login-wrapper">
                    <div className="login">
                        <h1 className={"login__title"}>Sign Up For An Account</h1>
                        <form onSubmit={this.handleSubmit} className={"login-form"}>

                            <div className={"login-form__inner"}>

                                <input
                                    className={"login-form__input"}
                                    name='firstname'
                                    placeholder='First Name'
                                    value={this.state.firstname}
                                    onChange={this.handleChange}
                                />

                                <input
                                    className={"login-form__input"}
                                    name='lastname'
                                    placeholder='Last Name'
                                    value={this.state.lastname}
                                    onChange={this.handleChange}
                                />

                                <input
                                    className={"login-form__input"}
                                    type='email'
                                    name='email'
                                    placeholder='Email'
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />

                                <input
                                    className={"login-form__input"}
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />

                            </div>

                            <div className={"login-form__footer"}>

                                <button className={"login-form__submit"}>
                                    Submit
                                </button>

                            </div>
                        </form>
                    </div>
                    <Link className={"login-form__registration-link"} to='/login'>Back to LogIn</Link>
                </div>
                
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    userPostFetch: userInfo => dispatch(registrationHandler(userInfo))
})

export default connect(null, mapDispatchToProps)(Registration);