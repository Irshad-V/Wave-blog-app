import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../Firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore/lite';
import Tags from '../components/Tags';
import MostPopular from '../components/MostPopular';
import Likebtn from '../components/LIkebtn';




function Details({setActive}) {
  const { id } = useParams();
  const [item, setList] = useState(null)
  const [blogs, setBlog] = useState([])
  useEffect(() => {
    const getBlogData = async () => {
      const postCollectionRef = collection(db, "Posts")
      const docRef = doc(postCollectionRef, id)

      try {

        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        setList(docSnap.data())
        const data = await getDocs(postCollectionRef);
        const list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setBlog(list)

      } catch (error) {
        console.log(error)
      }

    }
    id && getBlogData()

  }, [id,setActive])
  console.log(item);
  console.log("blogitem");
  console.log(id);
  console.log("id");

  return (
    <div className='container single'>
      <div className='blog-title-box '>
        <img src={item?.imgUrl} alt='img' />
        <h2 className='text-center'>{item?.title}</h2>
      </div>
      <div className='container-fluid pb-4 pt-4 '>
        <div className='container'>
          <div className='row mx-0'>
            <div className='col-md-8'>
              <span className='meta-info text-start '>
                By <p className='author'> {item?.author} </p> -&nbsp; <span className='mb-3'> {item?.timestamp.toDate().toDateString()}</span>
                <p className='pt-2'>  <Likebtn Dflex={"yes"} like={item?.like} id={id}  setActive={setActive}/></p>
              </span>
              <p className='text-start'>{item?.description}</p>
            </div>
            <div className='col-md-4'>

              <Tags tag={item?.tags} />
              <MostPopular blogs={blogs} />
            </div>

          </div>
        </div>
      </div>


    </div>
  )
}

export default Details
