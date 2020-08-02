import React, {Component} from 'react'
import ErrorIndicator from '../errorIndicator/errorIndicator'

export default class ErrorBoundry extends Component {
    state = {
        hasError:false
    };

    static getDerivedStateFromError(error) {
        return {hasError: true}

    }

    render(){
        if(this.state.hasError){
             return <ErrorIndicator />
        }

        return this.props.children;
    }
}