import Link from 'next/link'
import React from 'react';
import Auth from '../context/auth';

const mainNavigation = props => (
    <Auth.Consumer>
        {context => {
            return (
                <header className="main-navigation">
                    <div className="main-navigation__logo">
                        <h1>EasyEvent</h1>
                    </div>
                    <nav className="main-navigation__items">
                        <ul>
                            {!context.token && (
                                <li>
                                    <Link href="/Login">Login</Link>
                                </li>
                            )}
                            {context.token && (
                                <React.Fragment>
                                    <li>
                                        <Link href="/blogs">Blogs</Link>
                                    </li>
                                    <li>
                                        <button onClick={context.logout}>Logout</button>
                                    </li>
                                </React.Fragment>
                            )}
                        </ul>
                    </nav>

                </header>
            );
        }}
    </Auth.Consumer>
);

export default mainNavigation;