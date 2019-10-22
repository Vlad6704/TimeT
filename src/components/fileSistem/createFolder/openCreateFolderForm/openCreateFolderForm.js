import React from 'react'

const OpenCreateFolderForm = ({onGoToPrev}) =>{
    return (
        <div className={"GoToPrev"}
             onClick={onGoToPrev}
        >
            CreateFolder >
        </div>
    )
}

export default OpenCreateFolderForm;