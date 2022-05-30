import React from 'react';
import image from '../assets/images/baner.png';
import ContentWrapper from './ContentWrapper';
import GenresInDb from './GenresInDb';
import LastProductInDb from './LastProductInDb';
import LastUserInDb from './LastUserInDb';
import ContentRowMovies from './ContentRowMovies';
import NotFound from './NotFound';
import SearchMovies from './SearchMovies'
import {Link, Route, Switch} from 'react-router-dom';

function SideBar(){
    return(
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" src={image} alt="Hardstore"/>
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - Hardstore</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>
             
                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                <Link className="nav-link" to="/Users">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Users</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Charts -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/Products">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Products</span></Link>
                </li>

                {/*<!-- Nav Item - SearchMovies -->*/}
                <li className="nav-item nav-link">
                <Link className="nav-link" to="/Search">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Search Products</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
            {/*<!-- End of Sidebar -->*/}

            {/*<!-- Microdesafio 1 -->*/}
            {/*<!--<Route exact path="/">
                <ContentWrapper />
            </Route>
            <Route path="/GenresInDb">
                <GenresInDb />
            </Route>
            <Route path="/LastProductInDb">
                <LastProductInDb />
            </Route>
            <Route path="/ContentRowMovies">
                <ContentRowMovies />
            </Route>*/}
            {/*<!-- End Microdesafio 1 -->*/}

            {/*<!-- End Microdesafio 2 -->*/}
            <Switch>
                <Route exact path="/">
                    <ContentWrapper />
                </Route>
                <Route path="/Search">
                    <SearchMovies />
                </Route>
                <Route path="/Products">
                    <LastProductInDb />
                </Route>
                <Route path="/Users">
                    <LastUserInDb />
                </Route>
                <Route component={NotFound} />
            </Switch>
            {/*<!-- End Microdesafio 2 -->*/}
        </React.Fragment>
    )
}
export default SideBar;