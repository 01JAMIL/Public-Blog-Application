import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import User from './User'
import '../styles/blog.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faTrashCan, faPenToSquare, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
const CommentView = ({ id, blogOwnerId }) => {

    const [loading, setLoading] = useState(false)
    const [comment, setComment] = useState({})
    const [open, setOpen] = useState(false)
    const { token, user } = useSelector(state => state.auth)



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
                    {(user._id === comment.userId || user._id === blogOwnerId) && <div className="comment-button">
                        <div id="btn" onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                            <FontAwesomeIcon icon={faEllipsisH} />
                        </div>
                    </div>}
                    {open && <div className="comment-actions" onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                        {(user._id === comment.userId || user._id === blogOwnerId) && <div><FontAwesomeIcon icon={faTrashCan} style={{ marginRight: '3px' }} />  Delete comment</div>}
                        {(user._id === comment.userId) && <div><FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: '3px' }} /> Update comment</div>}
                    </div>}
                </div>
                <div className="comment-footer">
                    <span style={{ marginRight: '5px', cursor: 'pointer' }}>Like</span>
                    {comment.likes && (
                        comment.likes.length > 0 &&
                        <>
                            <span style={{ marginRight: '5px' }}>.</span>
                            <FontAwesomeIcon icon={faThumbsUp} style={{ marginRight: '2px', color: '#0066ff' }} />
                            <span> {comment.likes.length} </span>
                        </>
                    )}
                </div>

            </div>}

        </>
    )
}

export default CommentView