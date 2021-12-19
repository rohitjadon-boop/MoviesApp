import React from 'react';
import { Component } from 'react';
import { movies, baseURL } from '../constants';
import './Header.css';

class Header extends Component {
    render() {
        const moviesURL = movies.results[0].backdrop_path;
        return (
            <React.Fragment>
                <div className="header-cont">
                    <img src={baseURL + moviesURL} className="header-img" alt=""/>
                    <h3 className="movie-overview">{movies.results[0].overview}</h3>
                </div>
            </React.Fragment>
        )
    }
}

export default Header;