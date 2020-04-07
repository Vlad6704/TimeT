import React from 'react';
import {connect} from "react-redux";
import * as actions from "../../../../../redux_components/fileSystem/fileSystemActions";
import WithService from "../../../../hoc/with-service/with-service";



const RemoveFolderButton = ({removeFolderHandler})=>{



    return (
        <div className={"cursPointSelNon"} onClick={removeFolderHandler}>
            Remove folder
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {

    }
};

export default WithService()(connect(mapStateToProps,actions)(RemoveFolderButton));