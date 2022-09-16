import React from 'react'

const Input = ({ type, id, name, className, value, onChange }) => {
    return (
        <input
            type={type}
            id={id}
            name={name}
            className={className}
            value={value}
            onChange={onChange}
        />
    )
}

export default Input