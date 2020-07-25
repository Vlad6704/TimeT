import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginHandler} from '../../redux_components/auth/authActions';
import {Link} from "react-router-dom";
import './login.css';

class Login extends Component {
    state = {
        username: "",
        password: ""
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.userLoginFetch(this.state)
    }

    render() {
        return (
            <section className={"login-page"}>

                <div className="login-wrapper">
                    <div className="login">
                        <h1 className={"login__title"}>Login</h1>
                        <form onSubmit={this.handleSubmit} className={"login-form"}>

                            <div className={"login-form__inner"}>

                                <input
                                    className={"login-form__input"}
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
                                    LOGIN
                                </button>

                            </div>
                        </form>
                    </div>
                    <Link className={"login-form__registration-link"} to='/registration'>Don’t have an account? Sign Up</Link>
                </div>
            </section>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    userLoginFetch: userInfo => dispatch(loginHandler(userInfo))
})

export default connect(null, mapDispatchToProps)(Login);