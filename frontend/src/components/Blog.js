import React from 'react'
import Category from './Category'
import User from './User'
import '../styles/blog.css'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { likeArticle, unlikeArticle } from '../features/article/articleSlice'

const Blog = ({ id, time, title, content, image, categoryId, userId, likes, comments }) => {

    const { token, user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    let liked = likes.indexOf(user && user._id) !== -1

    const like = () => {
        dispatch(likeArticle({ body: user._id, token, id }))
    }

    const unlike = () => {
        dispatch(unlikeArticle({ body: user._id, token, id }))
    }
    return (
        <div className="blog">
            <ToastContainer />
            <User
                userId={userId}
            />
            <div className="blog-header">
                <span className="blog-title">{title}</span>
                <span className="blog-time">Posted in <b>{time.substring(0, 10)}</b> at <b>{time.substring(11, 16)}</b></span>
                <Category
                    id={categoryId}
                />
            </div>

            <div className="blog-content">
                <p>
                    {content}
                </p>
            </div>

            <div className="blog-image">
                <img src={`../../../uploads/${image}`} alt="img" />
            </div>

            {(likes.length !== 0 || comments.length !== 0) && <div className="blog-status">
                {likes.length !== 0 && <div className="likes-status"> {likes.length} Likes</div>}
                {comments.length !== 0 && <div className="comments-status">{comments.length} commnets</div>}
            </div>}

            <div className="blog-footer">
                <div
                    className="like"
                    onClick={liked ? unlike : like}
                >
                    {liked ? <span style={{ color: '#0066ff', fontWeight: 'bolder' }}>Liked</span> : <span>Like</span>}
                </div>
                <div className="comment">Comment</div>
            </div>
        </div>
    )
}

export default Blog