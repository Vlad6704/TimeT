import React from 'react'
import {Consumer} from '../../service-context/service-context'

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