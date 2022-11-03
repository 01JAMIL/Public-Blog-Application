import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../components/NavBar'
import '../styles/home.css'
import Loading from '../components/Loading'

import { getArticles } from '../features/article/articleSlice'
import { getCategorys } from '../features/category/categorySlice'
import Blog from '../components/Blog'
import NewPost from '../components/NewPost'

const HomePage = () => {

  const { token } = useSelector(state => state.auth)
  const { data, loading } = useSelector(state => state.article)

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getArticles(token))
    dispatch(getCategorys(token))
  }, [dispatch, token])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <NavBar />
      <div className="home-container">
        <div className="home-container-body">

          {/* NEW POST */}
          <NewPost />

          {data && data.map((b, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
              <Blog
                id={b._id}
                time={b.time}
                title={b.title}
                content={b.content}
                image={b.image}
                categoryId={b.categoryId}
                userId={b.userId}
                likes={b.likes}
                comments={b.comments}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default HomePage