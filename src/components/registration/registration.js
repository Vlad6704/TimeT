import React, {Component} from 'react';
import {connect} from 'react-redux';
import {registrationHandler} from '../../redux_components/auth/authActions';
import {Link} from "react-router-dom";
import './registration.css';

class Registration extends Component {
    state = {
        username: "",
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

        const {registrationError} = this.props;

        return (
            <div className={"registration-page"}>

                <div className="login-wrapper">
                    <div className="login">
                        <h1 className={"login__title"}>Sign Up For An Account</h1>
                        <form onSubmit={this.handleSubmit} className={"login-form"}>

                            <div className={"login-form__inner"}>

                                <input
                                    className={"login-form__input"}
                                    name='username'
                                    placeholder='Username'
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    required
                                />

                                <input
                                    className={`login-form__input ${registrationError === "unacceptable_email" && this.state.email ? "login-form__input_error" : ""}`}
                                    // type='email'
                                    name='email'
                                    placeholder='Email'
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    required
                                />

                                {registrationError === "unacceptable_email" && this.state.email &&
                                    <p className="login-form__error-massage">
                                        Unacceptable email
                                    </p>
                                }

                                <input
                                    className={`login-form__input ${registrationError === "unacceptable_password_length" && this.state.password ? "login-form__input_error" : ""}`}
                                    type='password'
                                    name='password'
                                    placeholder='Password'
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    required
                                />

                                {registrationError === "unacceptable_password_length" && this.state.password &&
                                    <p className="login-form__error-massage">
                                        Password length must be at least 4 symbols
                                    </p>
                                }

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

const mapStateToProps = state => {

    return {
        registrationError: state.user.registrationError,
    }
}

const mapDispatchToProps = dispatch => ({
    userPostFetch: userInfo => dispatch(registrationHandler(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Registration);