import React from 'react'

const NotFound = (props) => {
    return (
        <div>
            아 그런거 없다고ㅋㅋ
            <button onClick={()=>{props.history.goBack()}}>뒤로가자</button>

        </div>
    )
}

export default NotFound
