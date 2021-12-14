import React, { Component, useState } from "react"
import Auth from '../context/auth'
import router from 'next/router'


class Login extends Component {

    static contextType = Auth;
    constructor(props) {
        super(props);
        this.usernamel = React.createRef()
        this.passwordl = React.createRef()
        this.state = {
            isLogin: true
        }
    }
    switchModeHandler = () => {
        this.setState(prevState => {
            return { isLogin: !prevState.isLogin };
            console.log(isLogin)
        });
    };

    submitHandler = (e) => {
        e.preventDefault()
        const username = this.usernamel.current.value
        const password = this.passwordl.current.value
        if (username.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        console.log("username is: " + username, password)

        let requestBody = {
            query: `
                query{
                    login(username: "${username}", password:"${password}"){
                        token
                        userId
                    }
                }
            `
        }

        if (!this.state.isLogin) {
            requestBody = {
                query: `
                    mutation {
                        createUser(userInput: {username: "${username}", password:"${password}"}) {
                            _id
                            username
                        }
                    }
                `
            };
        }



        fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed')
            }
            return res.json()
        }).then(resData => {
            // console.log(resData.data.login.token)
            if (resData.data.login.token) {
                this.context.login(resData.data.login.token, resData.data.login.userId)
                router.push('/blogs')


            }
        })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div className="form-control" >
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" ref={this.usernamel}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" ref={this.passwordl}></input>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={this.switchModeHandler}> switch to {this.state.isLogin ? 'SignUp' : 'Login'}</button>
                        <button type="submit">{this.state.isLogin ? 'Login' : 'SignUp'}</button>
                    </div>

                </form>
            </div >
        )
    }
}

export default Login;