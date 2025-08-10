import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefrshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         setIsAuthenticated(true);
    //         if (location.pathname === '/' ||
    //             location.pathname === '/login' ||
    //             location.pathname === '/signup'
    //         ) {
    //             navigate('/home', { replace: false });
    //         }
    //     }
    // }, [location, navigate, setIsAuthenticated])

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
            navigate('/login');
        } 
        else {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        null
    )
}

export default RefrshHandler;