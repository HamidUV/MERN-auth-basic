// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get('http://localhost:3003/auth/logout')
    .then(res => {
      if(res.data.status){
        navigate('/login')
      }
    }).catch(err => {
      console.log(err);
    })
  }
  return (
    <div><h2>Home</h2>

      <button><Link to="/dashboard">Dashboard</Link> </button>
      <br />
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home