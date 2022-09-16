import React from 'react'

const Input = ({ type, id, name, className }) => {
    return (
        <input
            type={type}
            id={id}
            name={name}
            className={className}
        />
    )
}

export default Input