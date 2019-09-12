import React from 'react'

const Folders = ({fileSistemObj,onSerfing,currentItemId}) => {

    return  fileSistemObj.items.map(item => {
        if(currentItemId === item.parentsId){
            return (
                <div className={"folder"}
                     onClick={()=> onSerfing(item.id)}
                >
                    {item.name}

                </div>
            )
        }
    })
}

export default Folders;