export const initialState = {
    tasks:[
        {
            id:0,
            name: 'testTask 1',
            description: 'description description description',
            stages:[
                {
                    name:'stage 1'
                },
                {
                    name:'stage 2'
                }
            ],
            folderId:1
        }
    ],
    fileSistem:{
        items:  [
            {
                id:0,
                name:"work",
                children:[{id:1},],
                parentsId:-1,
                tasks:[
                    {},
                    {}
                ],


            },
            {
                id:1,
                name:"site",
                children:[{id:2},],
                parentsId:0,
                tasks:[
                    {},
                    {}
                ],


            },
            {
                id:2,
                name:"sinerg",
                children:[],
                parentsId:1,
                tasks:[
                    {},
                    {}
                ],


            },
            {
                id:3,
                name:"food",
                children:[],
                parentsId:-1,
                tasks:[
                    {},
                    {}
                ],


            },

        ],
        currentItemId:-1,
        homeLevelId:-1,
        isOpenCreateFolderForm:false,
        isOpenCreateTaskForm:false,
    },



}

