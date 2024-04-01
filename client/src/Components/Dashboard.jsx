// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    useEffect( () => {
        axios.get('http://localhost:3003/auth/verify')
        .then(res => {
            if(res.data.status) { /* empty */ } else {
                navigate('/login');
            }
        })
    })
  return (
    <div>
        <h1>
           Dashboard 
        </h1>
        <h4>
            User details
        </h4>

    </div>

  )
}

export default Dashboard