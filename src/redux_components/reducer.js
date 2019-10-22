import {initialState} from './initialState';


const reducer = (state = initialState, action) =>{
    switch (action.type) {
        case 'OnSerfing':{
            let OldFileSistem = state.fileSistem;
            let id = action.payload;

            let newState = {
                ...state,
                fileSistem: {
                    ...state.fileSistem,
                    currentItemId: id,
                }
            }
            return newState;
        }

            
        case 'onGoToPrev':{
            let prevId = -1;
            state.fileSistem.items.forEach((item)=> {
                if(item.id === state.fileSistem.currentItemId) prevId = item.parentsId
            });

            let OldFileSistem = state.fileSistem;
            let id = prevId;

            let newState = {
                ...state,
                fileSistem: {
                    ...state.fileSistem,
                    currentItemId: id,
                }
            }
            return newState;
        }
        case 'onGoToHome':{

            let newState = {
                ...state,
                fileSistem: {
                    ...state.fileSistem,
                    currentItemId: state.fileSistem.homeLevelId,
                }
            }
            return newState;
        }

            
        
        default:
            return state;
    }
}

export default reducer;