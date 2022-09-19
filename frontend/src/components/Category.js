import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Category = ({ id }) => {

    const [category, setCategory] = useState('')

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
        <div> {category} </div>
    )
}

export default Category