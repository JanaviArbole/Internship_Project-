import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import "../styles/home.css";

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchProducts = async () => {
        try {
            const url = "https://deploy-mern-app-1-api.vercel.app/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    return (
       

    <div className="body">
        <div className="container">
            <header>
                <div className="logo"> <img src="./1000368905.png" alt="img" /></div>
                <div className="heading">POLYINFO DESK</div>
            <nav>
                <ul className="navbar">
                    <li><a href="www.google.com" className="active" >Home</a></li>

                    <li className="dropdown">
                        <a href="www.google.com">Admission </a>
                        <ul className="dropdown-menu">
                            <li><a href="reg.html">Registration</a></li>
                            <li><a href="www.google.com">Cap round</a></li>
                            <li><a href="www.google.com">DocumentS</a></li>
                        </ul>
                    </li>

                    <li><a href="www.google.com">Services</a></li>
                    <li><a href="www.google.com">Testimonials</a></li>
                    <li><a href="www.google.com">Gallery</a></li>
                    <li><a href="www.google.com">Contact</a></li>
                </ul>
            </nav>
        </header>
        <section className="hero">
            <div className="content">
                <h4><span>Best Education</span></h4>
                <h1>Knowledge <br /> empowers your future!</h1>
                <p>Welcome to our educational hub, where learning meets excellence.</p>
                <div class="buttons">
                    <a href="www.google.com" class="btn primary">Join Now</a>
                    <a href="www.google.com" class="btn outline">Contact Us</a>
                </div>
            </div>
            <div className="image">
                <img src="imgbg.png" alt="Education Image"/>
            </div>
        </section>
    </div>


        </div>
        
    )
}

 export default Home




