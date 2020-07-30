import React from 'react';
import WithService from "../../../../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../../../../redux_components/fileSystem/fileSystemActions";
import ModalWindow from "../../../../modalWindow/modalWindow";
import ModTitle from "../../../../modalWindow/modalElements/modTitle";
import ModInput from "../../../../modalWindow/modalElements/modInput";
import ModSubmit from "../../../../modalWindow/modalElements/modSubmit";


const RenameTaskForm = ({id, renameTaskHandler})=>{

    const inputRef = React.useRef(null);
    const getInputVal = () =>{
        return inputRef.current.value;
    }

    return (
        <ModalWindow>
            <ModTitle title={"Rename"} />
            <ModInput placeholder={'Title'}  inputRef={inputRef}/>
            <ModSubmit title={"Submit"} clickHandler={()=> renameTaskHandler(getInputVal())} />
        </ModalWindow>
    )
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default WithService()(connect(mapStateToProps,actions)(RenameTaskForm));