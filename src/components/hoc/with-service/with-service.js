import React from 'react'
import {Consumer} from '../../serviceContext/serviceContext'

const WithService = () =>
{
    return (Wrapped)=>{
        return (props)=>{
            return(
                <Consumer>
                    {
                        (service) =>{
                            return <Wrapped {...props} service={service}/>
                        }
                    }
                </Consumer>
            );
        }
    }
}


export default WithService;