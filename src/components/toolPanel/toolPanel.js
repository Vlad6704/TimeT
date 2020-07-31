import React from 'react';
import ReactDOM from 'react-dom';

class ToolPanel extends React.Component{

    // let toolPanelContainer;
    // if(!document.querySelector('.el-tool-panel')){
    //     toolPanelContainer = document.createElement('div');
    //     toolPanelContainer.classList.add("el-tool-panel");
    //     document.querySelector('.app').append(toolPanelContainer);
    // }



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