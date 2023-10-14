import React from 'react'
import { excerpt } from '../utility/Actions'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
function BlogSection({ blogs, user, handleDlete }) {
    return (
        <div >
            <div className='blog-heading text-start py-2 mb-4'> Daily Blogs</div>
            {
                blogs?.map((item) => {
                    return (
                        <div className='row pb-4' key={item.id}>
                            <div className='col-md-5'>
                                <div className='hover-blogs-img'>
                                    <div className='blogs-img'>
                                        <img src={item.imgUrl} alt={item.title} />
                                    </div>
                                </div>
                            </div>
                            <div className=' col-md-7'>
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
                                        <button className="btn btn-read">Read More</button>
                                    </Link>
                                    {

                                        user && user.uid === item.userId && (
                                            <div className='d-flex justify-content-between align-items-center '>
                                                <FontAwesomeIcon icon={faTrashCan}
                                                    className='fa-trash-can fs-20 mx-2'
                                                    onClick={() => handleDlete(item.id)} />
                                                <Link to={`/update/${item.id}`}>
                                                    <FontAwesomeIcon icon={faPenToSquare} className='fa-pen-to-square fs-20 mx-2' />
                                                </Link>

                                            </div>

                                        )}
                                  
                                </div>
                            </div>


                        </div>
                    )

                })
            }

        </div>
    )
}

export default BlogSection
