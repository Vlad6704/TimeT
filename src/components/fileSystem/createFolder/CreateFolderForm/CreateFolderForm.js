import React from 'react'
import {connect} from "react-redux";
import * as actions from "../../../../redux_components/fileSystem/fileSystemActions";
import WithService from "../../../hoc/with-service/with-service";
import ModalWindow from "../../../modalWindow/modalWindow";
import ModTitle from "../../../modalWindow/modalElements/modTitle";
import ModInput from "../../../modalWindow/modalElements/modInput";
import ModSubmit from "../../../modalWindow/modalElements/modSubmit";




const CreateFolderForm = ({createNewFolderHandler}) =>{

    const inputRef = React.useRef(null);
    const getInputVal = () =>{
        return inputRef.current.value;
    }

    return (
        <ModalWindow>
            <ModTitle title={"Add new folder"} />
            <ModInput placeholder={'Title'}  inputRef={inputRef}/>
            <ModSubmit title={"Submit"} clickHandler={()=> createNewFolderHandler(getInputVal())} />
        </ModalWindow>
    )
}

const mapStateToProps = (state) =>{
    return {

    }
}

export default WithService()(connect(mapStateToProps,actions)(CreateFolderForm));