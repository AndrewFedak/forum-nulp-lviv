import React from 'react';
import './reg-form.css';
import {withRouter} from "react-router-dom";

const sendFormDataToServer = (e, history) => {
    let obj = {};
    new FormData(e.target).forEach((value, key) => {
        obj[key] = value;
    });
    fetch(`https://forum-nulp-api.herokuapp.com/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then((res) => res.json()).then((item) => {
        if (item.error) {
            throw new Error()
        }
        localStorage.setItem('jwt_token', item.token);
        history.push('/articles/me/');
        alert('Welcome');
    }).catch(() => {
        alert('You are already registered')
    });
    e.preventDefault();
};


const RegForm = (props) => {

    return (
        <form className="registration-form" onSubmit={(e) => sendFormDataToServer(e, props.history)}>
            <div className="form-information">
                <div className="form-group">
                    <label className="name" htmlFor="name">Ім'я користувача: </label>
                    <input type="text" id="name" required name="dataUserName"/><br/>
                    <span>Це обов’язкове поле!</span>
                </div>
                <div className="form-group">
                    <label className="email" htmlFor="email">Електронна пошта: </label>
                    <input type="email" id="email" name="dataUserEmail" required/><br/>
                    <span>Це обов’язкове поле!</span>
                </div>
                <div className="form-group">
                    <label className="password" htmlFor="password">Пароль:</label>
                    <input type="password" id="password" required name="dataUserPassword"/><br/>
                    <span>Це обов’язкове поле!</span>
                </div>
                <button type="submit" className="submit-registration"><img src={require("./img/btn-photo.png")}
                                                                           alt="New"/>Створити аккаунт
                </button>
            </div>
        </form>
    )
};

export default withRouter(RegForm);