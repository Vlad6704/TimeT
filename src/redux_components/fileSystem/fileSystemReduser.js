const initialState = {
    items:  [
        // {
        //     id:0,
        //     name:"work",
        //     parentsId:-1,
        //
        //
        // },
        //
        //
        // },

    ],
    currentItemId:-1,
    homeLevelId:-1,
    replaceFolderId:-1,
    isOpenCreateFolderForm:false,
    isOpenCreateTaskForm:false,
    isOpenRenameFolderForm:false,
    taskOptionsPanel:{
        optionsPanelIsOpenForTask:-1,

    }

};

const  fileSystemReduser = (state = initialState, action) => {
    switch (action.type) {
        case 'ON_SERFING':{
            let OldFileSistem = state.fileSistem;
            let id = action.payload;

            let newState = {
                ...state.fileSistem,
                currentItemId: id,

            }
            return newState;
        }
        default:
            return state;
    }
}