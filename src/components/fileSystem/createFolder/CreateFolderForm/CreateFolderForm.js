import React from 'react'
import PropTypes from 'prop-types';
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

CreateFolderForm.propTypes = {
    createNewFolderHandler: PropTypes.func
}

export default WithService()(connect(null,actions)(CreateFolderForm));