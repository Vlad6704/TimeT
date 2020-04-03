import {initialState} from './initialState';




const isValidNewFolderName = (folder_name) =>{
    return true;
}

const isValidFieldsNewTask = (field_obj)=>{
    return true;
}

const getTaskByTemporaryId = (state,temporaryId) =>{

    return state.tasks.find((item) =>{
        return item.temporaryId == temporaryId
    })
}


const reducer = (state = initialState, action) =>{
    switch (action.type) {













        default:
            return state;
    }
}

export default reducer;