import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Category = ({ id }) => {

    const [category, setCategory] = useState('')
    const style = {
        padding: '5px',
        fontWeight: 'bolder',
        backgroundColor: 'rgba(0,0,0,0.05)' ,
        border: '1px solid rgba(0,0,0,0.15)',
        borderRadius: '5px',
        width: 'fit-content',
    }

    useEffect(() => {

        const getCategorie = async () => {
            await axios.get(`/api/category/one/${id}`).then(res => {
                setCategory(res.data.name)
            }).catch(err => {
                console.error(err)
            })
        }

        getCategorie()
    }, [id])

    return (
        <div style={style}>
            {category}
        </div>
    )
}

export default Category