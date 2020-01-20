export const initialState = {
    tasks:[
        // {
        //     id:0,
        //     name: 'testTask 1',
        //     description: 'description description description',
        //     stages:[
        //         {
         //            id:1,
        //             name:'stages 1',
        //s
        //         },
        //         {
        //             id:2,
        //             name:'stages 2'
        //         }
        //     ],
        //     folderId:1,
        //      stageLastId:2
        // }
    ],
    fileSistem:{
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

    },
    ongoingTasksArr:[
        // {
        //     id: 2,
        //     status: 'connecting',
        //     ongoingTime: 0
        // }
    ],
    statistic:{
        charts:{
            foldersArr:[],
            tasksArr:[]
        },
        dateRange:{
            startDate:null,
            endDate:null,
            currMeasure:'day',
            isIntegerMeasure:false,

        },
        statFileSystem:{

        }
    },
    other_inf:{
        newTemporaryIdForNewTask:0,
        switchableTaskId:-1,
    },
    app_options:{
        timeShift:7,
        firstDayOfTheWeek:1,
    }


}

