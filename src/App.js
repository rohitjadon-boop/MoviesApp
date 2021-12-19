import React from 'react';
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import Movies from './Components/Movies';
import Favourites from './Components/Favourites';
import { Route, Routes } from 'react-router-dom';

export default class App extends React.Component {
    render() {
        return (
           <React.Fragment>
                <Navbar appName='MoviesApp'
                        favourites='Favourites'
                />
                <Routes>
                    <Route 
                        path='/' 
                        exact 
                        element={<Original />}>
                    </Route>
                    <Route 
                        path='favourites' 
                        exact 
                        element ={<Favourites />}>
                    </Route>
                </Routes>
           </React.Fragment> 
        )
    }
}

const Original = () => {
    return (
        <React.Fragment>
            <Header />
            <Movies />
        </React.Fragment>
    )
}