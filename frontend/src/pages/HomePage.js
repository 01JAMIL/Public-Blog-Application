import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/home.css'
import Loading from '../components/Loading'

import { getArticles } from '../features/article/articleSlice'
import Blog from '../components/Blog'
import NewPost from '../components/NewPost'
import { getMe } from '../features/auth/userSlice'

const HomePage = () => {

  document.title = 'Blogy - Home'

  const { token, user } = useSelector(state => state.auth)
  const { data, loading } = useSelector(state => state.article)

  const dispatch = useDispatch()

  useEffect(() => {
    data.length === 0 && dispatch(getArticles(token))
    user === null && dispatch(getMe(token))
  }, [dispatch, token, data.length, user])

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div className="home-container">
        <div className="home-container-body">
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