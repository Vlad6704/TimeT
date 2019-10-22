export const initialState = {
    tasks:[],
    fileSistem:{
        items:  [
            {
                id:1,
                name:"work",
                children:[{id:2},],
                parentsId:-1,
                tasks:[
                    {},
                    {}
                ],


            },
            {
                id:2,
                name:"site",
                children:[{id:3},],
                parentsId:1,
                tasks:[
                    {},
                    {}
                ],


            },
            {
                id:3,
                name:"sinerg",
                children:[],
                parentsId:2,
                tasks:[
                    {},
                    {}
                ],


            },
            {
                id:4,
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
        isCreateFolderFormOpen:false,
        homeLevelId:-1,
    }

}

