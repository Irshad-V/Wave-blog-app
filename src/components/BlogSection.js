import React from 'react'
import { excerpt } from '../utility/Actions'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Likebtn from './LIkebtn';
function BlogSection({ blogs, user, handleDlete, setActive }) {


    return (
        <div >
            <div className='blog-heading text-start py-2 mb-4'> Daily Blogs</div>
            {
                blogs?.map((item) => {
                    return (
                        <div className='row pb-4' key={item.id}>
                            <div className='col-md-5'>
                                <div className='hover-blogs-img w-100'>
                                    <div className='blogs-img w-100'>
                                        <img src={item.imgUrl} alt={item.title} />
                                    </div>
                                </div>
                            </div>
                            <div className=' col-md-6'>
                                <div className='text-start'>
                                    <h6 className='category '>{item.category}</h6>
                                    <span className='title py-2'>{item.title}</span>
                                    <span className='meta-info'>
                                        <p className='author'>{item.author} - </p>
                                        {item.timestamp.toDate().toDateString()}
                                    </span>
                                </div>
                                <div className='short-description'>
                                    {excerpt(item.description, 120)}
                                </div>
                                <div className='d-flex justify-content-between  align-items-center'>

                                    <Link to={`/detail/${item.id}`}>
                                        <button className="btn btn-read" onClick={setActive("")}>Read More</button>
                                    </Link>


                                </div>
                            </div>



{
    console.log(item.userId)
    
}
{
    console.log(user.uid)
    
}
{
    console.log("item.userId")
}
                            <div className='col-md-1'>
                                {user && (
                                    <div className='d-flex flex-md-column pt-3 justify-content-between align-items-center '>

                                        <Likebtn like={item.like} id={item.id} setActive={setActive} />

                                        {user.uid === item.userId ||user?.email === "virshad469@gmail.com" ? (
                                            <div className='d-flex flex-md-column pb-4'>
                                                <FontAwesomeIcon icon={faTrashCan}
                                                    className='fa-trash-can fs-20 mb-3 ms-3 pe-3'
                                                    onClick={() => handleDlete(item.id)} />
                                                <Link to={`/update/${item.id}`}>
                                                    <FontAwesomeIcon icon={faPenToSquare} className='fa-pen-to-square fs-20 mb-3 ms-3 pe-3 ' />
                                                </Link>
                                            </div>
                                        ):null}
                                    </div>

                                )}


                            </div>


                        </div>
                    )

                })
            }

        </div>
    )
}

export default BlogSection
