import React, {useEffect, useState} from "react";
import correctName from "../correct-name";
import {likeComment} from '../../actions';
import {connect} from 'react-redux';
import withData from '../hoc-helper/with-data';
import {bindActionCreators} from "redux";

function checkWebToken() {
    if (!localStorage.getItem('jwt_token') || localStorage.getItem('jwt_token') === 'undefined') {
        alert('Authorize please!');
        return false
    }
    return true
}

const RenderComment = (props) => {
    const {userName, userComment, commentCreationDate, commentLikes, _id, commentOwner} = props.item;
    const [icon, changeIcon] = useState('https://pluspng.com/img-png/user-png-icon-male-user-icon-512.png');

    useEffect(() => {
        fetch(`https://forum-nulp-api.herokuapp.com/api/avatar/${commentOwner}`).then((res) => {
            if (res.ok) {
                return changeIcon(`https://forum-nulp-api.herokuapp.com/api/avatar/${commentOwner}`)
            }
        });
    }, [commentOwner]);

    return (
        <React.Fragment>
            <div style={{height: "10px", width: '100%', backgroundColor: "#154a89", marginTop: "30px"}}/>

            <div className="article-discussion">
                <div className="comment">
                    <div className="answer-article-author-info">
                        <span><img className="rounded-circle user-icon" src={icon} alt="icon"/></span>
                        <div className="username-and-data">
                            <p className="username">{userName}</p>
                            <p className="data">{commentCreationDate}</p>
                        </div>
                    </div>

                    <div className="answer-article-content">
                        <p>{userComment}</p>
                    </div>

                </div>

                <div className="article-likes">
                    <div className="likes-status-bar">
                        <p>ЛАЙКНУЛО <span>{commentLikes.length}</span> {correctName(commentLikes.length)}</p>
                    </div>

                    <div className="like-button button">
                        <button onClick={() => {
                            if (checkWebToken()) {
                                props.likeComment(_id, props.articleId)
                            }
                        }}><span><img
                            src={require("./img/like.png")} alt="like"/></span>LIKE
                        </button>
                    </div>

                    <div className="reply-button button">
                        <button onClick={() => {
                            if (props.pathname.match(/\/me\//)) {
                                document.getElementById('reply-text-area').focus();
                                document.getElementById('reply-text-area').value += `@${userName}, `
                            } else {
                                alert('Залогіньтесь або зареєструйтесь!!!')
                            }
                        }}><span><img src={require("./img/quote.png")} alt="quote"/></span>ВІДПОВІСТИ
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

const mapDispatchToProps = (dispatch, {nulpService}) => {
    return bindActionCreators({
        likeComment: (_id, articleId) => likeComment(_id, articleId, nulpService)
    }, dispatch)
};

export default withData(connect(null, mapDispatchToProps)(RenderComment));