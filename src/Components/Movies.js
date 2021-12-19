import React from 'react';
import { Component } from 'react';
import { movies, baseURL } from '../constants';
import { Button } from 'react-bootstrap';
import TitleButton from './TitleButton';
import './Movies.css';

export default class Movies extends Component {
    constructor() {
        super(); // Allows Us To Use this KeyWord
        this.state = {
            id: '',
            page: 1,
            moviesArr: [],
            lastIndex: 0,
            hover: false,
        }
    }

    componentDidMount() {
        this.setState({moviesArr: [...movies.results.slice(this.state.lastIndex, 10)], lastIndex: this.state.lastIndex + 10});
    }

    handleOnMouseEnter = (item) => {
        const favouriteMovies = JSON.parse(localStorage.getItem('favourites')) || [];
        let isPresent = favouriteMovies.some((Obj) => {
            return Obj.id === item.id;
        });
        this.setState({id: item.id, hover: isPresent});
    }

    handleOnMouseLeave = () => {
        this.setState({id: ''});
    }

    handleNextPage = () => {
        if(this.state.page < Math.ceil(movies.results.length / 10)) {
            this.setState({
                moviesArr: [...movies.results.slice(this.state.lastIndex, this.state.lastIndex + 10)], 
                lastIndex: this.state.lastIndex + 10, 
                page: this.state.page + 1
            });
            window.scrollTo(0, 0);  //For Scrolling To Top When Page Changes
        }
    }

    handlePrevPage = () => {
        if(this.state.page > 1) {
            const index = this.state.lastIndex;
            let arr = [...movies.results.slice(index - 20, index - 10)];
            this.setState({
                moviesArr: arr, 
                page: this.state.page - 1, 
                lastIndex: index - 10,
            });
            window.scrollTo(0, 0);  //For Scrolling To Top When Page Changes
        }
    }

    addToFavourites = (item) => {
        let favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];  //Need To Parse Beforing Getting
        favouritesList.push(item);
        localStorage.setItem('favourites', JSON.stringify(favouritesList));  // Need To stringify Before Insertion
    }

    removeFromFavourites = (item) => {
        let favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];  //Need To Parse Beforing Getting
        favouritesList = favouritesList.filter((Obj) => {
            return item.id !== Obj.id;
        });
        localStorage.setItem('favourites', JSON.stringify(favouritesList));
    }

    render() {
        const { id,
                page,
                moviesArr,
                hover,
            } 
        = this.state;
        return (
            <React.Fragment>
                <div className="movies-list">
                    {moviesArr.map((Obj, idx) => {
                        return (
                            <React.Fragment key={Obj.id}>
                                <div className="movies" onMouseEnter={() => this.handleOnMouseEnter(Obj)}
                                    onMouseLeave={this.handleOnMouseLeave}
                                >
                                    <img src={baseURL + Obj.backdrop_path} width="240" height="300" alt=""/><br/>
                                    <h6>{Obj.title}</h6>
                                    {Obj.id === id && !hover &&
                                        <TitleButton 
                                            variant="success" 
                                            onClick={() => this.addToFavourites(Obj)}
                                            className="button"
                                            title='Add To Favourite'
                                        />
                                    }
                                    {Obj.id === id && hover &&
                                        <TitleButton 
                                            variant="danger" 
                                            onClick={() => this.removeFromFavourites(Obj)}
                                            className="button"
                                            title='Remove Favourite'
                                        />
                                    }
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
                <div className="pagination">
                    <Button variant="light" onClick={this.handlePrevPage}>Prev</Button>
                    <span>{page}</span>
                    <Button variant="light" onClick={this.handleNextPage}>Next</Button>
                </div>
            </React.Fragment>
        )
    }
}