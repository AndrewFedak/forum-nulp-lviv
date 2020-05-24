import React from "react";
import './forum-login.css';
import {Link} from "react-router-dom";
import UsersOnline from "../../users-online";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {checkProfileInDataBase} from '../../../actions'
import {withData} from '../../hoc-helper';
import {withRouter} from "react-router-dom";


const ForumLogin = (props) => {
    return (
        <div>
            <div className="login-form" style={{backgroundColor: "white"}}>

                <div className="div-logo">
                    <p><span><img src={require("./img/logout.png")} alt="logout"/></span> ВХІД</p>
                </div>

                <div className="login-form-body">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        props.checkProfileInDataBase(e.target);
                    }}>
                        <div className="inputs">
                            <label>
                                <p> Введіть Email</p>
                                <input type="text" id="login input" placeholder="EMAIL" name="dataUserEmail" required/>
                            </label>

                            <label>
                                <p> Пароль</p>
                                <input type="password" id="password input" placeholder="PASSWORD"
                                       name="dataUserPassword" required/>
                            </label>
                        </div>

                        <div className="forgot-password">
                            <p onClick={() => console.log("Forgot pass")}>Забули пароль?</p>
                        </div>

                        <div className="remember-me form-inline">
                            <label>
                                <input type="checkbox" style={{width: "16px", height: "16px"}}/>
                                <p style={{marginTop: "-4.5px", marginLeft: "4px"}}>Запам'ятати мене</p>
                            </label>
                        </div>

                        <div className="text-right submit-btn">
                            <button type="submit">
                                <span><img src={require("./img/lock.png")}
                                           style={{marginRight: "10px", marginTop: "-7px"}} alt="lock"/></span>
                                УВІЙТИ
                            </button>
                        </div>

                        <div className="text-right create-account-btn">
                            <Link to='/registration'>
                                <button>
                                    СТВОРИТИ АККАУНТ
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            <UsersOnline/>
        </div>
    )
};
const mapStateToProps = (state) => {
    return {
        personalInfo: state.personalInfo
    }
};

const mapDispatchToProps = (dispatch, {nulpService, history}) => {
    return bindActionCreators({
        checkProfileInDataBase: (data) => checkProfileInDataBase(nulpService, data, history)
    }, dispatch)
};
export default withRouter(withData(connect(mapStateToProps, mapDispatchToProps)(ForumLogin)));