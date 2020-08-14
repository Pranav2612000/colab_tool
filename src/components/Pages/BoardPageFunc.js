import React from 'react';
import {useParams} from "react-router-dom";

import BoardPage from './BoardPage';

function BoardPageFunc() {

    const { id } = useParams();
    console.log(id);

    return (
        <div>
            <BoardPage boardname={id} />
        </div>
    );
}

export default BoardPageFunc;
