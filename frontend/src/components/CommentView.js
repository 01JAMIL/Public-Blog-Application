import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import User from './User'
import '../styles/blog.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
const CommentView = ({ id }) => {

    const [loading, setLoading] = useState(false)
    const [comment, setComment] = useState({})
    const [open, setOpen] = useState(false)
    const { token } = useSelector(state => state.auth)


    const getComment = async () => {
        setLoading(true)
        await axios.get(`/api/comment/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(response => {
            setLoading(false)
            setComment(response.data)
        }).catch(err => console.error(err))
    }

    useEffect(() => {
        getComment()
    }, [])

    if (loading) {
        return <></>
    }
    return (
        <>
            {comment && <div className="comment-view">
                <User
                    userId={comment.userId}
                />

                <div className="comment-body">
                    <div className="comment-date">
                        {comment.date && comment.date.substring(0, 10)}
                    </div>
                    <div className="comment-content">
                        {comment.content && comment.content}
                    </div>
                    <div className="comment-button">
                        <div onClick={() => setOpen(!open)}>
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </div>
                    </div>
                    {open && <div className="comment-actions">
                        <div>Delete comment</div>
                        <div>Update comment</div>
                    </div>}
                </div>
            </div>}
        </>
    )
}

export default CommentView