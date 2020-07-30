import React from 'react';

const ModSubmit = ({title, clickHandler}) => {



    return (
        <button className={"el-modal__submit"} onClick={clickHandler}>
            {title}
        </button>
    )
}

export default ModSubmit;