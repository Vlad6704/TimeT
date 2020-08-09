import React from 'react';
import WithService from "../../../../hoc/with-service/with-service";
import {connect} from "react-redux";
import * as actions from "../../../../../redux_components/fileSystem/fileSystemActions";
import ModalWindow from "../../../../modalWindow/modalWindow";
import ModTitle from "../../../../modalWindow/modalElements/modTitle";
import ModInput from "../../../../modalWindow/modalElements/modInput";
import ModSubmit from "../../../../modalWindow/modalElements/modSubmit";


const RenameFolderForm = ({renameFolderHandler, currentFolderId, fileSystemItems})=>{

    const inputRef = React.useRef(null);

    React.useEffect(()=>{
        inputRef.current.focus();
    },[]);
    const getInputVal = () =>{
        return inputRef.current.value;
    }

    const folderTitle = fileSystemItems.find( item => item.id === currentFolderId).name;

    return (
        <ModalWindow>
            <ModTitle title={`Rename folder: ${folderTitle}`} />
            <ModInput placeholder={'New title'}  inputRef={inputRef}/>
            <ModSubmit title={"Submit"} clickHandler={()=> renameFolderHandler(getInputVal())} />
        </ModalWindow>
    )
}

const mapStateToProps = (state) =>{
    return {
        currentFolderId: state.fileSystem.currentItemId,
        fileSystemItems: state.fileSystem.items,
    }
}

export default WithService()(connect(mapStateToProps,actions)(RenameFolderForm));