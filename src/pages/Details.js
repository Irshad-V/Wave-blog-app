import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../Firebase';
import { collection, doc, getDoc } from 'firebase/firestore/lite';




function Details() {
  const { id } = useParams();
  const [item, setBlog] = useState(null)
  useEffect(() => {
    const getBlogData = async () => {
      const postCollectionRef = collection(db, "Posts")
      const docRef = doc(postCollectionRef, id)

      try {
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        setBlog(docSnap.data())
      } catch (error) {
        console.log(error)
      }

    }
    id && getBlogData()

  }, [id])
  console.log(item);
  console.log("blog");
  console.log(id);
  console.log("id");

  return (
    <div className='single'>
      <div className='blog-title-box '>
        <img src={item?.imgUrl} alt='img' />
        <h2 className='text-center'>{item?.title}</h2>
      </div>
      <div className='container-fluid pb-4 pt-4 '>
        <div className='container'>
          <div className='row mx-0'>
            <div className='col-md-8'>
              <span className='meta-info text-start'>
                By <p className='author'> {item?.author}</p> -&nbsp;
                {item?.timestamp.toDate().toDateString()}
              </span>
              <p className='text-start'>{item?.description}</p>
            </div>
            <div className='col-md-4'>
              <h2>Tags</h2>
              <h2>Most Popular</h2>
            </div>

          </div>
        </div>
      </div>


    </div>
  )
}

export default Details
