import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from '../components/NavBar'
import '../styles/home.css'
import Loading from '../components/Loading'

import { getArticles, createArticle } from '../features/article/articleSlice'
import { getCategorys } from '../features/category/categorySlice'
import Blog from '../components/Blog'
import UserAvatar from '../components/UserAvatar'

const HomePage = () => {

  const { token, user } = useSelector(state => state.auth)
  const { categorys } = useSelector(state => state.category)
  const { data, loading } = useSelector(state => state.article)
  const [show, setShow] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [form, setForm] = useState(new FormData())
  const [img, setImg] = useState('')

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getArticles(token))
    dispatch(getCategorys(token))
  }, [dispatch, token])


  const submitHandler = (e) => {
    e.preventDefault()

    form.userId = user._id

    dispatch(createArticle({ article: form, token }))
    setShow(false)

  }

  const fileChangeHandler = (e) => {
    setLoaded(true)
    const img = document.getElementById('img')
    setForm({
      ...form,
      [e.target.name]: e.target.files[0]
    })
    setImg(URL.createObjectURL(e.target.files[0]))
    img.src = URL.createObjectURL(e.target.files[0])
  }

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }


  if (loading) {
    return <Loading />
  }

  return (
    <>
      <NavBar />
      <div className="home-container">
        <div className="home-container-body">


          <div className="new-post">
            <div className="create-post-container">
              <div className="create-post-header">
                <UserAvatar />
                <div className="create-post-button" onClick={() => setShow(!show)}>
                  Start a post
                </div>
              </div>

              {show && <div className="create-post-body">
                <h3>create new post</h3>
                <form className="create-post-form" onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      onChange={changeHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea name="content" id="content" onChange={changeHandler}>

                    </textarea>
                  </div>

                  <div className="form-group">
                    <label htmlFor="image" className="image">Choose image</label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      onChange={fileChangeHandler}
                    />
                    <div style={!loaded ? { display: 'none' } : { display: 'flex', justifyContent: 'center', padding: '10px' }}>
                      <img src={img} alt="img" id="img" width="100%" style={{ borderRadius: '8px' }} />
                    </div>
                  </div>

                  {categorys && <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select name="categoryId" id="category" defaultValue={'null'} onChange={changeHandler}>
                      <option value="null" disabled>Choose category</option>
                      {categorys.map(category => (
                        <option key={category._id} value={category._id} >{category.name}</option>
                      ))}
                    </select>
                  </div>}

                  <div>
                    <button>
                      Post
                    </button>
                  </div>
                </form>
              </div>}
            </div>
          </div>



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