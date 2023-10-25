import React, { useState, useEffect } from 'react'
import BlogSection from '../components/BlogSection'
import { db } from '../Firebase'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore/lite';
import Spinner from '../components/Spinner';
import Tags from '../components/Tags';
import MostPopular from '../components/MostPopular';
function Home({ user, setActive }) {
  console.log("user in fsakl;kd")
  console.log(user?.email);

  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState([])
  console.log(typeof blogs + " type of blogs");

  useEffect(() => {
    const postCollectionRef = collection(db, "Posts")
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(typeof list + "typeo of list ")
      console.log(list)
      const sortedBlogs = list.sort((a, b) => {
        const dateA = a.timestamp.toDate();
        const dateB = b.timestamp.toDate();
        return dateB - dateA;
      });
      console.log("GetAllpost-list")
      setBlogs(sortedBlogs)
      setLoading(false)
      setActive("home")
    };
    getPosts();
  }, [setActive]);

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
        setActive("home")

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

          <div className='col-md-8 '>
            <BlogSection setActive={setActive} blogs={blogs} user={user} handleDlete={handleDlete} />
          </div>
          <div className='col-md-4'>

            <Tags blogs={blogs} />
            <MostPopular blogs={blogs} />

          </div>


        </div>


      </div>

    </div>
  )
}

export default Home
