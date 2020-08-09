import React, {Component} from 'react'
import './errorBoundry.css'

export default class ErrorBoundry extends Component {
    state = {
        hasError:false
    };

    static getDerivedStateFromError(error) {
        return {hasError: true}

    }

    render(){
        if(this.state.hasError){
             return (
                    <div className="el-box error-container">
                        <div className={"error-indicator"} >
                            <p className="error-indicator__text">
                                Oops something went wrong, please try again later
                            </p>
                            <a href="/" className={"error-indicator__link"}>
                                Back
                            </a>
                        </div>
                    </div>

                 )

        }

        return this.props.children;
    }
}