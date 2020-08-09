import React from 'react';

const ModTextArea = ({placeholder, textareaRef}) => {



    return (
        <textarea className={"el-modal__textarea"} ref={textareaRef} placeholder={placeholder}></textarea>
    )
}

export default ModTextArea;