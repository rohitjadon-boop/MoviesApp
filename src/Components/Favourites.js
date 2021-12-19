import React from 'react';
import { Component } from 'react';
import { movies, baseURL } from '../constants';
import './Favourites.css'


export default class Favourites extends Component {

    constructor() {
        super();
        this.state = {
            moviesArr: movies.results,
        }
    }

    componentDidMount() {
        let newArr = JSON.parse(localStorage.getItem('favourites'));
        this.setState({
            moviesArr: newArr,
        });
    }

    displayActionMovies = () => {
        let newArr = [];
        newArr = movies.results.filter((Obj) => {
            return Obj.genre === 'Action';
        });
        this.setState({
            moviesArr: newArr
        });
    }

    displayHorroMovies = () => {
        let newArr = [];
        newArr = movies.results.filter((Obj) => {
            return Obj.genre === 'Horror';
        });
        this.setState({
            moviesArr: newArr,
        });
    }

    displayAdvenutreMovies = () => {
        let newArr = [];
        newArr = movies.results.filter((Obj) => {
            return Obj.genre === 'Adventure';
        });
        this.setState({
            moviesArr: newArr,
        }); 
    }

    deleteMovie = (id) => {
        let newArr = [...this.state.moviesArr];
        newArr = newArr.filter((Obj) => {
            return Obj.id !== id;
        });
        this.setState({
            moviesArr: newArr,
        })
    }

    sortBestFirst = () => {
        let newArr = [...this.state.moviesArr];
        newArr = newArr.sort((first, second) => {
            return second.popularity - first.popularity;
        });
        this.setState({
            moviesArr: newArr,
        });
    }

    sortWorstFirst = () => {
        let newArr = [...this.state.moviesArr];
        newArr = newArr.sort((first, second) => {
            return first.popularity - second.popularity;
        });
        this.setState({
            moviesArr: newArr,
        });
    }

    sortRateFirst = () => {
        let newArr = [...this.state.moviesArr];
        newArr = newArr.sort((first, second) => {
            return second.vote_average - first.vote_average;
        });
        this.setState({
            moviesArr: newArr,
        });
    }

    sortLateFirst = () => {
        let newArr = [...this.state.moviesArr];
        newArr = newArr.sort((first, second) => {
            return first.vote_average - second.vote_average;
        });
        this.setState({
            moviesArr: newArr,
        });
    }

    searchMovie = (e) => {
        const word = e.target.value;
        let newArr = [...movies.results];
        console.log(word);
        newArr = newArr.filter((Obj) => {
            return Obj.title.toUpperCase().includes(word.toUpperCase());
        });
        console.log(newArr)
        this.setState({
            moviesArr: newArr,
        });
    }



    render() {
        const { moviesArr } = this.state;
        return (
            <div>
                <>
                    <div className="main">
                        <div className="row">
                            <div className="col-lg-3 col-sm-12">
                            <ul className="list-group favourites-genres">
                                    <li className="list-group-item" style={{background:'white',color:'#3f51b5'}}>All Genre</li>
                                    <li className="list-group-item" style={{background:'white',color:'#3f51b5'}} onClick={this.displayActionMovies}>Action</li>
                                    <li className="list-group-item" style={{background:'white',color:'#3f51b5'}} onClick={this.displayHorroMovies}>Horror</li>
                                    <li className="list-group-item" style={{background:'white',color:'#3f51b5'}} onClick={this.displayAdvenutreMovies}>Adventure</li>
                            </ul>
                            </div>
                            <div className="col-lg-9 favourites-table col-sm-12">
                                <div className="row">
                                    <input type="text" className="input-group-text col" placeholder="Search" onChange={this.searchMovie}/>
                                    <input type="number" className="input-group-text col" placeholder="Rows Count" />
                                </div>
                                <div className="row">
                                <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col"><i className="fas fa-sort-up" onClick={this.sortBestFirst}/>Popularity<i className="fas fa-sort-down" onClick={this.sortWorstFirst}></i></th>
                                        <th scope="col"><i className="fas fa-sort-up" onClick={this.sortRateFirst}></i>Rating<i className="fas fa-sort-down" onClick={this.sortLateFirst}></i></th>
                                        <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            moviesArr.map((movieObj)=>(
                                                <tr>
                                                    <td><img src={baseURL + movieObj.backdrop_path} alt="" style={{width: '5rem'}}/>{movieObj.title}</td>
                                                    <td>{movieObj.genre}</td>
                                                    <td>{movieObj.popularity}</td>
                                                    <td>{movieObj.vote_average}</td>
                                                    <td><button type="button" class="btn btn-danger" onClick={() => this.deleteMovie(movieObj.id)}>Delete</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }
}