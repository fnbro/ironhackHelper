import React, { Component } from 'react'

export default class Register extends Component {
    render() {
        return (
            <div>
                <form action="">
                    <label htmlFor="username"></label>
                    <input type="username" placeholder="Your username" />
                    <label htmlFor="password"></label>
                    <input type="password" placeholder="********" />
                </form>
            </div>
        )
    }
}
