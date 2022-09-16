import React from 'react'

const Loading = () => {

    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '3rem'
    }

    return (
        <div style={style}>Please wait...</div>
    )
}

export default Loading