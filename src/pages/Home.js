import React, { useState, useEffect } from 'react'
import BlogSection from '../components/BlogSection'
import { db } from '../Firebase'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore/lite';
import Spinner from '../components/Spinner';
function Home({ user, setActive }) {

  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    const postCollectionRef = collection(db, "Posts")
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(list)
      console.log("list")
      setBlogs(list)
      setLoading(false)
      setActive("home")
    };
    getPosts();
  }, [setActive,loading]);

  if (loading) {
    return <Spinner />

  }

  const handleDlete = async (id) => {
    if (window.confirm("Are You Sure to delete this blog....?")) {
      try {
        setLoading(true)
        await deleteDoc(doc(db, "Posts", id));
        console.log("delter buton");
        setLoading(false)

      } catch (err) {
        console.log("delter buton fals");
        console.log(err);
      }
    }
  }

  console.log(blogs);


  return (

    <div className='container-fluid'>
      <div className='container p-3'>

        <div className='row mx-0'>
          <h2 className='text-center'>Trending</h2>
          <div className='col-md-8 '>
            <h2 className='text-start py-2'>Blog Section</h2>
            <BlogSection blogs={blogs} user={user}  handleDlete={handleDlete}/>
          </div>
          <div className='col-md-3'>
            <h2>Tags</h2>
            <h2>Most Popular</h2>
          </div>


        </div>


      </div>

    </div>
  )
}

export default Home
