import React from 'react'
import { useNavigate } from 'react-router-dom'

function MostPopular({ blogs }) {
    const navigate = useNavigate()
    return (
        <div>
            <div className='blog-heading text-start pt-3 py-2 mb-4'>  Most Popular  </div>

            {
                blogs?.map((item) => {
                    return (
                        <div className="row pb-3" key={item.id}
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/detail/${item.id}`)}>
                            <div className="col-5 ">
                                <img
                                    src={item.imgUrl}
                                    alt={item.title}
                                    className='w-100 '
                                    style={{ height: "80px" }}
                                />
                            </div>
                            <div className="col-7 pt-3">
                                <div className="text-start fw-5">
                                    {item.title}
                                </div>
                                <div className="text-start" style={{ color: "#777" }}>
                                    { item.timestamp.toDate().toDateString()}

                                </div>
                            </div>

                        </div>


                    )
                })
            }


        </div>
    )
}

export default MostPopular
