import React, { useEffect, useRef, useState } from 'react'
import User from './User'
import '../styles/blog.css'
import { useDispatch, useSelector } from 'react-redux'
import { likeArticle, unlikeArticle } from '../features/article/articleSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as likedIcon, faEllipsisH, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as unlikedIcon, faComment } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import UserAvatar from './UserAvatar'
import CommentView from './CommentView'
import { saveComment, deleteArticle } from '../features/article/articleSlice'
import Loading from '../components/Loading'
import Moment from 'react-moment'

const Blog = ({ id, time, title, content, image, categoryId, userId, likes, comments }) => {

    const [open, setOpen] = useState(false)
    const { token, user } = useSelector(state => state.auth)

    const listRef = useRef()

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.article)

    let liked = likes.indexOf(user && user._id) !== -1
    

    useEffect(() => {
        const handleClose = (e) => {
            if (!listRef.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClose)


        return () => {
            document.removeEventListener('mousedown', handleClose)
        }
    })

    const like = () => {
        dispatch(likeArticle({ body: user._id, token, id }))
    }

    const unlike = () => {
        dispatch(unlikeArticle({ body: user._id, token, id }))
    }

    const [closed, setClosed] = useState(true)

    const openCommentBox = () => {
        setClosed(!closed)
    }

    const [comment, setComment] = useState('')

    const changeHandler = (e) => {
        setComment(e.target.value)
    }

    const commentArticle = async () => {
        const data = {
            token,
            content: comment,
            articleId: id,
            userId: user._id
        }

        dispatch(saveComment(data))
        setComment('')
    }

    const deleteHandler = () => {
        dispatch(deleteArticle({ token, id }))
        setOpen(false)
    }


    if (loading) {
        return <Loading />
    }

    return (
        <div className="blog">
            <div ref={listRef}>
                {(user && user._id === userId) && <div className="options-btn" onClick={() => setOpen(!open)} >
                    <FontAwesomeIcon icon={faEllipsisH} />
                </div>}
                {open && <div className="options-view">
                    <div onClick={deleteHandler} >
                        <FontAwesomeIcon icon={faTrashCan} style={{ marginRight: '3px' }} /> Delete
                    </div>{/* 
                    <div>
                        <FontAwesomeIcon icon={faPenToSquare} style={{ marginRight: '3px' }} /> Update
                    </div> */}
                </div>}
            </div>
            <User
                userId={userId}
            />
            <div className="blog-header">
                <span className="blog-title">{title}</span>
                <span className="blog-time">
                    <Moment fromNow date={new Date(time)} ></Moment>
                </span>
                {/* <Category
                    id={categoryId}
                /> */}
            </div>

            <div className="blog-content">
                <p>
                    {content}
                </p>
            </div>

            {image && <div className="blog-image">
                <img src={`../../../uploads/${image}`} alt="img" />
            </div>}

            {
                (likes.length !== 0 || comments.length !== 0) &&

                <div className="blog-status">

                    {
                        likes.length !== 0 &&

                        <div className="likes-status">
                            <Link to="/">
                                <FontAwesomeIcon icon={likedIcon} /> <span>{likes.length}</span>
                            </Link>
                        </div>
                    }

                    {
                        comments.length !== 0 &&
                        <div className="comments-status">
                            {comments.length} commnets
                        </div>
                    }
                </div>

            }

            <div className="blog-footer">
                <div
                    className="like"
                    onClick={liked ? unlike : like}
                >
                    {
                        liked ?
                            <span style={{ color: '#0066ff', fontWeight: 'bolder' }}>
                                <FontAwesomeIcon icon={likedIcon} /> Like
                            </span> :
                            <span><FontAwesomeIcon icon={unlikedIcon} /> Like</span>
                    }
                </div>
                <div
                    className="comment"
                    onClick={openCommentBox}
                >
                    <FontAwesomeIcon icon={faComment} style={{ marginRight: '5px' }} /> Comment
                </div>

            </div>

            {!closed && <div className="comment-box">
                <div className="comment-box-type">
                    <UserAvatar />
                    <div className="comment-input">
                        <input type="text" value={comment} name="content" onChange={changeHandler} placeholder='Add a comment ... ' />
                        {comment.length !== 0 && <button type="button" onClick={commentArticle}>Comment</button>}
                    </div>
                </div>

                <div className="comment-box-list" id="comment-box-list">

                    {loading ? <div style={{ textAlign: 'center', padding: '20px 0 20px 0' }}>Posting comment...</div> :
                        comments.map((c, index) => {
                            return <div key={index}>
                                <CommentView
                                    id={c}
                                    blogOwnerId={userId}
                                    articleId={id}
                                />
                            </div>
                        })}

                    {/*    <div className="show-btn" onClick={showAll}>
                        Show all comments
                    </div> */}
                </div>
            </div>}


        </div>
    )
}

export default Blog