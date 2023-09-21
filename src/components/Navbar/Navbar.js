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
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'} onClick={clickedStatus} ></i>
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>

                <Link className='nav-links ' to="/auth" >
                    <li className={props.active === "home" ? "active-link" : ""}
                        onClick={() => props.setActive("home")}>
                        Home
                    </li>
                </Link>

                <Link className='nav-links ' to="/create  " >
                    <li className={props.active === "create" ? "active-link" : ""}
                        onClick={() => props.setActive("create")}>
                        Create
                    </li>
                </Link>

                <Link className='nav-links ' to="/about" >
                    <li className={props.active === "about" ? "active-link" : ""}
                        onClick={() => props.setActive("about")}>
                        About
                    </li>
                </Link>



                <div className='userInfo'>
                    <div className={props.active === "user" ? "active-link" : ""}
                        onClick={() => props.setActive("user")}>
                        <i class="fa-solid fa-user"></i>
                        {props.user ? <h4> irshad</h4> : <h4>no user</h4>}
                    </div>
                    
                    <button  className={props.active === "login" ? "active-link" : ""}
                        onClick={() => props.setActive("login")}> Sign up</button>
                </div>
            </ul>


        </nav>
    )
}







export default Navbar








