import React from 'react';
import ReactDOM from 'react-dom';

class ToolPanel extends React.Component{


    state = {
        isAppMount: false
    }

    componentDidMount() {
        this.setState({isAppMount: true})
    }

    render() {
        const {children} = this.props;
        if(this.state.isAppMount) {
            return ReactDOM.createPortal(
                <>
                    {children}
                </>
                ,
                document.querySelector('.el-tool-panel')

            )

        }
        else return <div></div>

    }
}

export default ToolPanel;