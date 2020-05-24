import React, {Component} from 'react';
import './forum-side-profile.css';
import {withRouter} from "react-router-dom";
import UsersOnline from "../../users-online";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import withData from "../../hoc-helper/with-data";
import {fetchProfileData, saveProfile} from "../../../actions";


class ForumSideProfile extends Component {
    constructor() {
        super();
        this.state = {
            icon: 'https://pluspng.com/img-png/user-png-icon-male-user-icon-512.png'
        };
        this.fetchIcon = this.fetchIcon.bind(this);
    }

    fetchIcon(_id){

        fetch(`https://forum-nulp-api.herokuapp.com/api/avatar/${_id}`).then((res) => {
            if (res.ok) {
                this.setState({icon: `https://forum-nulp-api.herokuapp.com/api/avatar/${_id}`})
            }
        });
    }
    componentDidMount() {
        const {_id} = this.props.userProfile;
        this.props.saveProfile();
        this.fetchIcon(_id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {_id} = this.props.userProfile;
        if (prevProps.userProfile._id !== _id) {
            this.fetchIcon(_id)
        }
    }

    componentWillUnmount() {
        this.props.userProfile._id = '';
    }

    leaveFromProfileWithoutAsking(history) {
        fetch(`https://forum-nulp-api.herokuapp.com/logout`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + String(localStorage.getItem('jwt_token'))
            }
        }).then(() => {
            localStorage.removeItem('jwt_token');
            history.push('/articles/');
            alert('You are logged out!');
        }).catch(() => alert('Something goes wrong!'));
    }

    leaveFromProfile(history) {
        const conf = window.confirm('Ви точно хочете вийти з профілю?');
        if (conf) {
            this.leaveFromProfileWithoutAsking(history)
        }
    };

    changeAvatar(form) {
        fetch(`https://forum-nulp-api.herokuapp.com/api/me/avatar`, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt_token')
            }
        }).then(() => {
            alert('Avatar saved');
            document.location.reload();
        }).catch((e) => alert(e))
    }

    render() {

        const {dataUserName, dataUserEmail, _id} = this.props.userProfile;
        console.log(_id);
        return (
            <div>
                <div className="profile-block" style={{backgroundColor: "white"}}>

                    <div className="div-logo">
                        <p>ПРОФІЛЬ</p>
                    </div>

                    <div className="profile-body">
                        <div className="text-center icon-and-form">
                            <img src={this.state.icon} alt="user-icon" className="profile-user-icon mx-auto"
                                 width="100"/>
                            <form onSubmit={(e) => {
                                this.changeAvatar(e.target);
                                e.preventDefault();
                            }} className='mt-2'>
                                <input type="file" name="avatar" id="avatar" className="d-none" onChange={(e) => {
                                    if (!e.target.files[0]) {
                                        e.target.nextElementSibling.textContent = 'ЗМІНИТИ АВАТАР';
                                    } else {
                                        e.target.nextElementSibling.textContent = e.target.files[0].name;
                                    }
                                }}/>
                                <label htmlFor="avatar" className="btn btn-warning avatar">ЗМІНИТИ АВАТАР</label>
                                <button type="submit" className="btn btn-dark">ПРИЙНЯТИ ЗМІНИ</button>
                            </form>
                        </div>
                        <p>Ваш НікНейм: <span className="text-danger">{dataUserName}</span></p>
                        <p>Ваша електронна пошта: <span className="text-danger">{dataUserEmail}</span></p>
                        <div className="d-flex buttons justify-content-around">
                            <button className="side-profile-create-article__button btn btn-primary"
                                    onClick={() => this.props.history.push('create-article')}>
                                СТВОРИТИ СТАТТЮ
                            </button>
                            <button className="side-profile-leave-profile__button btn btn-danger"
                                    onClick={() => this.leaveFromProfile(this.props.history)}>
                                ВИЙТИ З ПРОФІЛЮ
                            </button>
                        </div>
                    </div>

                </div>
                <UsersOnline/>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        profileInfo: state.profileInfo,
        userProfile: state.userProfile
    }
};

const mapDispatchToProps = (dispatch, {nulpService}) => {
    return bindActionCreators({
        fetchProfileData: fetchProfileData(nulpService),
        saveProfile
    }, dispatch)
};

export default withRouter(withData(connect(mapStateToProps, mapDispatchToProps)(ForumSideProfile)))