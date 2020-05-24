import React, {useState} from "react";
import "./nav-bar.css";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {updateSearchTerm, fetchList} from '../../actions';
import {withData} from '../hoc-helper';

const NavBurger = (props) => {
    const {updateSearchTerm, fetchList} = props;


    return (
        <React.Fragment>
            <div className="nav-bar-item">
                <span><img src={require("./img/home-run.png")} alt="home-run"/></span>
                <a href='https://lpnu.ua/'>ГОЛОВНА</a>
            </div>

            <div className="nav-bar-item">
                <span><img src={require("./img/chat.png")} alt="chat"/></span>
                <Link to={() => {
                    if (localStorage.getItem('jwt_token') === null || localStorage.getItem('jwt_token') === 'undefined') {
                        return '/articles/'
                    } else {
                        return '/articles/me/'
                    }
                }} onClick={() => fetchList()}>ФОРУМИ</Link>
            </div>

            <div className="nav-bar-search">
                <span><img
                    src={require("./img/search.png")}
                    onClick={(e) => {
                        const inputValue = document.querySelector(".search-input");
                        updateSearchTerm(inputValue);
                    }
                    }
                    alt="search"/>
                </span>
                <input type="text" placeholder="ПОШУК" className="search-input"/>
            </div>
        </React.Fragment>
    )
};

const NavBar = (props) => {
    const [hidden, setVisibility] = useState(false);
    return (
        <nav>
            <div className="nav-bar-shown">
                <NavBurger {...props}/>
            </div>
            <div className="nav-bar-hidden">
                {hidden && <NavBurger {...props}/>}
                <span className="burger-menu" onClick={() => setVisibility(!hidden)}><img
                    src={require('./img/burger_menu.png')} alt="burger_menu" style={{width: 30}}/></span>
            </div>
        </nav>
    )
};


const mapDispatchToProps = (dispatch, {nulpService}) => () => {
    return {
        updateSearchTerm: (value) => dispatch(updateSearchTerm(value)),
        fetchList: fetchList(nulpService, dispatch)
    }
};

export default withRouter(withData(connect(null, mapDispatchToProps)(NavBar)));