import React, {Component} from "react";
import './forum-article.css';
import {withData} from "../hoc-helper";
import {connect} from 'react-redux';
import {fetchArticle, likeArticle} from "../../actions";
import LoadingBar from "../loading-bar/loading-bar";
import {bindActionCreators} from "redux";
import correctName from "../correct-name";
import {withRouter} from "react-router";
import checkJWTToken from "../correct-name/check-jwt-token";
import RenderComment from './render-comment';
import RenderReplyForm from './render-reply-form';

function checkWebToken() {
    if (!localStorage.getItem('jwt_token') || localStorage.getItem('jwt_token') === 'undefined') {
        alert('Authorize please!');
        return false
    }
    return true
}

class ForumArticle extends Component {
    state = {
        placeholder: 'Введіть відповідь...',
        icon: 'https://pluspng.com/img-png/user-png-icon-male-user-icon-512.png'
    };

    componentDidMount() {
        checkJWTToken(this.props.history, this.props.match.params.id);
        this.props.fetchArticle();
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {owner} = this.props.currentArticleData;
        if (prevProps.currentArticleData.owner !== owner) {
            fetch(`https://forum-nulp-api.herokuapp.com/api/avatar/${owner}`).then((res) => {
                if (res.ok) {
                    this.setState({icon: `https://forum-nulp-api.herokuapp.com/api/avatar/${owner}`})
                }
            });
        }
    }


    render() {
        const textareaRef = React.createRef();
        const {titleTheme, userName, articleText, articleCreationData, articleLikesAmount = [], articleComments = [], owner} = this.props.currentArticleData;

        const comments = articleComments.length === 0
            ? <div className="comments-undefined"><p>Коментарі до цієї теми відсутні</p></div>
            : articleComments.map((item) => <RenderComment item={item} key={item._id} ref={textareaRef}
                                                           pathname={this.props.location.pathname}
                                                           articleId={this.props.articleId}/>);
        if (this.props.pageRequest) {
            return <LoadingBar/>
        }
        if (this.props.error) {
            return <div>Error</div>
        }

        return (
            <div className="article">
                <div className="article-logo">
                    <p>{titleTheme}</p><span className="pull-right"><img src={require("./img/flag.png")}
                                                                         alt="flag"/></span>
                </div>
                <div className="article-body">
                    <div className="article-author-info">
                        <img className="img-fluid rounded-circle user-icon"
                             src={this.state.icon}
                             alt="userIcon"/>
                        <div className="username-and-data">
                            <p className="username">{userName}</p>
                            <p className="data">{articleCreationData}</p>
                        </div>
                    </div>
                    <div className="article-content">
                        <p>{articleText}</p>
                    </div>


                    <div className="article-likes">
                        <div className="likes-status-bar">
                            <p>ЛАЙКНУЛО <span>{articleLikesAmount.length}</span> {correctName(articleLikesAmount.length)}
                            </p>
                        </div>

                        <div className="like-button button">
                            <button onClick={() => {
                                if (checkWebToken()) {
                                    this.props.likeArticle(owner)
                                }
                            }}><span><img
                                src={require("./img/like.png")}
                                alt="like"/></span>LIKE
                            </button>
                        </div>

                        <div className="reply-button button">
                            <button onClick={() => {
                                if (this.props.location.pathname.match(/\/me\//)) {
                                    textareaRef.current.focus();
                                    textareaRef.current.value += `@${userName}, `
                                } else {
                                    alert('Залогіньтесь або зареєструйтесь!!!')
                                }
                            }}><span><img
                                src={require("./img/quote.png")} alt="quote"/></span>ВІДПОВІСТИ
                            </button>
                        </div>
                    </div>
                </div>

                {comments}


                {<RenderReplyForm userProfile={this.props.userProfile} ref={textareaRef}
                                  nulpService={this.props.nulpService} id={this.props.articleId}/>}
            </div>
        )
    }
}

const mapStateToProps = ({currentArticleData, pageRequest, error, userProfile}) => {
    return {
        currentArticleData,
        pageRequest,
        error,
        userProfile
    }
};

const mapDispatchToProps = (dispatch, {nulpService, articleId}) => {
    return bindActionCreators({
        fetchArticle: fetchArticle(nulpService, articleId),   // () => dispatch({...})
        likeArticle: (owner) => likeArticle(owner, articleId, nulpService)
    }, dispatch)
};

export default withRouter(withData(connect(mapStateToProps, mapDispatchToProps)(ForumArticle)))