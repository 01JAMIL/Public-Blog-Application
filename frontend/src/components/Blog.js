import React from 'react'
import Category from './Category'
import User from './User'
import '../styles/blog.css'

const Blog = ({ time, title, content, image, categoryId, userId }) => {
    return (
        <div className="blog">
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
        </div>
    )
}

export default Blog