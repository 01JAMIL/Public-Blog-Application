import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import User from './User'
import '../styles/blog.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faTrashCan, faPenToSquare, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { deleteComment } from '../features/article/articleSlice'
const CommentView = ({ id, blogOwnerId, articleId }) => {

    const [loading, setLoading] = useState(false)
    const [comment, setComment] = useState({})
    const [open, setOpen] = useState(false)
    const { token, user } = useSelector(state => state.auth)
    const [changed, setChanged] = useState(false)
    const liked = (user && comment && comment.likes) && comment.likes.indexOf(user._id) !== -1
    const dispatch = useDispatch()

    useEffect(() => {
        getComment()
    }, [changed])



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



    const like = async () => {
        await axios.put(`/api/comment/like/${id}`, { userId: user._id }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(response => {
            setComment({
                ...comment,
                [comment.likes]: response
            })
            setChanged(!changed)
        }).catch(err => {
            console.log(err.message)
        })
    }

    const unlike = async () => {
        await axios.put(`/api/comment/unlike/${id}`, { userId: user._id }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(response => {
            setComment({
                ...comment,
                [comment.likes]: response
            })
            setChanged(!changed)
        }).catch(err => {
            console.log(err.message)
        })
    }

    const handleDelete = () => {
        const data = {
            token,
            id,
            articleId
        }
        dispatch(deleteComment(data))
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
                        {(user._id === comment.userId || user._id === blogOwnerId) &&
                            <div onClick={handleDelete}>
                                <FontAwesomeIcon icon={faTrashCan} style={{ marginRight: '3px' }} />  Delete comment
                            </div>}
                        {(user._id === comment.userId) && <div><FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: '3px' }} /> Update comment</div>}
                    </div>}
                </div>
                <div className="comment-footer">
                    <span
                        style={{ marginRight: '5px', cursor: 'pointer' }}
                        onClick={liked ? unlike : like}
                    >Like</span>
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