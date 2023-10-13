import React, { useState } from 'react'
import './navbar.scss'
import { Link } from 'react-router-dom'



function Navbar(props) {


    const [clicked, setClicked] = useState(false)

    const clickedStatus = () => {
        setClicked(!clicked)

    }





    return (
        <nav className='NavbarItems'>
            <h1 className='navbar-logo'>Writing Waves </h1>
            <div className='menu-icons'>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'} onClick={clickedStatus}></i>
            </div>
            <ul className={`${clicked ? 'nav-menu active ' : 'nav-menu'}`} >

                <Link className='nav-links ' to="/" onClick={clickedStatus} >
                    <li className={props.active === "home" ? "active-link" : ""}
                        onClick={() => props.setActive("home")}>
                        Home
                    </li>
                </Link>

                {
                    props.user && <Link className='nav-links ' to="/create  " onClick={clickedStatus}>
                        <li className={props.active === "create" ? "active-link" : ""}
                            onClick={() => props.setActive("create")}>
                            Create
                        </li>
                    </Link>
                }



                <Link className='nav-links ' to="/about" onClick={clickedStatus}>
                    <li className={props.active === "about" ? "active-link" : ""}
                        onClick={() => props.setActive("about")}>
                        About
                    </li>
                </Link>


                <div className='userInfo'>
                    {props.user ?
                        (<>
                            <Link className={`user_link link-hover ${props.active === "user" ? "active-link" : ""}`}
                                onClick={() => { props.setActive("user") }}>
                                <i class="fa-solid fa-user"></i> <h4> {props?.user?.displayName}</h4>
                            </Link>

                            <Link className={`link-hover ${props.active === "log-out" ? "active-link" : ""}`}
                                onClick={() => { props.setActive("log-out"); clickedStatus(); props.handleLogout() }}> Logout </Link>

                        </>

                        )
                        :
                        (<Link to={"/auth"} className={`link-hover ${props.active === "login" ? "active-link" : ""}`}
                            onClick={() => { props.setActive("login"); clickedStatus() }}> login</Link>)}


                </div>
            </ul>


        </nav>
    )
}







export default Navbar








