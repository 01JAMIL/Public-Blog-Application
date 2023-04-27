import axios from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import User from './User'
import '../styles/blog.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faTrashCan, faPenToSquare, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { deleteComment } from '../features/article/articleSlice'
const CommentView = ({ id, blogOwnerId, articleId }) => {

    const [comment, setComment] = useState({})
    const [updateMode, setUpdateMode] = useState(false)
    const [content, setContent] = useState('')
    const [userDataLoaded, setUserDataLoaded] = useState(false)
    const [open, setOpen] = useState(false)
    const { token, user } = useSelector(state => state.auth)
    const [changed, setChanged] = useState(false)
    const liked = (user && comment && comment.likes) && comment.likes.indexOf(user._id) !== -1
    const dispatch = useDispatch()

    const listRef = useRef()



    const getComment = useCallback(async () => {
        await axios.get(`/api/comment/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(response => {
            setComment(response.data)
            setContent(response.data.content)
        }).catch(err => console.error(err))
    }, [id, token, setComment, setContent])

    const closeHandler = e => {
        if (listRef.current !== undefined && !listRef.current.contains(e.target)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        getComment()

        document.addEventListener('mousedown', closeHandler)

        return () => {
            document.removeEventListener('mousedown', closeHandler)
        }
    }, [changed, getComment])


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


    const handleUpdate = async () => {
        await axios.put(`/api/comment/${id}`, { content }, {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(response => {
            setComment(response.data)
            setContent(response.data.content)
            setUpdateMode(false)
        }).catch(err => {
            console.log(err.message)
        })
    }

    return (
        <div>
            {comment && <div className="comment-view">
                <User
                    userId={comment.userId}
                    setUserDataLoaded={setUserDataLoaded}
                />

                {
                    userDataLoaded ? <div>
                        <div className="comment-body">

                            <div className="comment-date">
                                {comment.date && comment.date.substring(0, 10)}
                            </div>

                            <div className="comment-content">
                                {(comment.content && !updateMode) && comment.content}
                                {updateMode &&
                                    <>
                                        <textarea
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            className="comment-content-update"
                                        >
                                        </textarea>
                                        {content.length > 0 && <button className="update-btn" onClick={handleUpdate}>
                                            Update
                                        </button>}
                                        <button className="cancel-btn" onClick={() => setUpdateMode(false)}>
                                            Cancel
                                        </button>
                                    </>
                                }
                            </div>

                            <div>
                                {(user._id === comment.userId || user._id === blogOwnerId) &&

                                    <div ref={listRef} className="comment-button">
                                        <div id="btn" onClick={() => setOpen(!open)}>
                                            <FontAwesomeIcon icon={faEllipsisH} />
                                        </div>
                                    </div>

                                }

                                {open &&

                                    <div className="comment-actions">

                                        {(user._id === comment.userId || user._id === blogOwnerId) &&
                                            <div onClick={handleDelete}>
                                                <FontAwesomeIcon icon={faTrashCan} style={{ marginRight: '3px' }} />  Delete comment
                                            </div>}
                                        {(user._id === comment.userId) &&
                                            <div onClick={() => setUpdateMode(true)}>
                                                <FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: '3px' }} /> Update comment
                                            </div>}

                                    </div>
                                }
                            </div>
                        </div>


                        {!updateMode && <div className="comment-footer">
                            <span
                                style={!liked ? {
                                    marginRight: '5px',
                                    cursor: 'pointer',
                                } : {
                                    marginRight: '5px',
                                    cursor: 'pointer',
                                    color: '#0066ff',
                                    fontWeight: 'bold'
                                }}
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
                        </div>}
                    </div> : null
                }

            </div>}

        </div>
    )
}

export default CommentView