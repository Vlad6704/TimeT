import React from 'react';

const ModInput = ({placeholder, inputRef}) => {



    return (
        <input className={"el-modal__input"} ref={inputRef} placeholder={placeholder} />
    )
}

export default ModInput;