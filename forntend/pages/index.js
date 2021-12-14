import React, { Component, setState } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Login from './Login'
import Auth from '../context/auth'
import Nav from '../Navigation/nav'
import Blogs from './Blogs'

class Home extends Component {

  state = {
    token: null,
    userId: null
  }


  login = (token, userId) => {
    this.setState({ token: token, userId: userId })
  }
  logout = () => {
    this.setState({ token: null, userId: null })
  }

  render() {
    return (
      <div>

        <Auth.Provider value={{ token: this.state.token, userId: this.state.userId, login: this.login, logout: this.logout }}>
          <Nav />
          <Login />
          <Blogs />

        </Auth.Provider>

      </div>
    )
  }
}

export default Home;
