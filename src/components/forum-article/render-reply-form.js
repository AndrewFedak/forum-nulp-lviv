import React, {useEffect, useState} from "react";
import {commentArticle} from "../../actions";

const RenderReplyForm = React.forwardRef(({userProfile, nulpService, id}, ref) => {
    const [icon, changeIcon] = useState('https://pluspng.com/img-png/user-png-icon-male-user-icon-512.png');

    useEffect(() => {
        fetch(`https://forum-nulp-api.herokuapp.com/api/avatar/${userProfile._id}`).then((res) => {
            if (res.ok) {
                return changeIcon(`https://forum-nulp-api.herokuapp.com/api/avatar/${userProfile._id}`)
            }
        });
    }, [userProfile._id]);
    if (localStorage.getItem('jwt_token') === null || localStorage.getItem('jwt_token') === 'undefined') {
        return (
            <React.Fragment>
                <div style={{height: "10px", width: '100%', backgroundColor: "#154a89", marginTop: "20px"}}/>
                <div className="login-or-register">
                    <p>Ввійдіть в аккаунт або створіть новий для відповіді на дану тему</p>
                </div>
            </React.Fragment>
        )
    } else {

        return (
            <React.Fragment>
                <div style={{height: "10px", width: '100%', backgroundColor: "#154a89", marginTop: "20px"}}/>
                <div className="article-reply">
                    <div className="reply-article-author-info">
                                <span><img className="img-fluid rounded-circle user-icon"
                                           src={icon}
                                           alt="icon"/></span>
                    </div>

                    <form className="write-comment" onSubmit={(e) => {
                        e.preventDefault();
                        const userComment = ref.current.value;

                        if (userComment.match(/Введіть відповідь\.\.\./)) {
                            return alert('Невалідний ввід!')
                        }
                        commentArticle(nulpService, {...userProfile, userComment, id})
                            .then(({message}) => {
                                if (message === 'Comment is saved') {
                                    alert(message);
                                    ref.current.value = 'Введіть відповідь...';
                                    document.location.reload();
                                } else {
                                    alert('Something goes wrong')
                                }
                            });
                    }}>
                        <div className="decoration-buttons"/>
                        <div className="textarea-for-comment pull-left">
                            <textarea defaultValue='Введіть відповідь...'
                                      onFocus={(e) => e.target.value === 'Введіть відповідь...' ? e.target.value = '' : e.target.value}
                                      onBlur={(e) => e.target.value === '' ? e.target.value = 'Введіть відповідь...' : e.target.value}
                                      ref={ref}
                                      name="userComment"
                                      id="reply-text-area">
                            </textarea>
                        </div>
                        <div className="clip_or_send_buttons">
                            <button type="submit">
                                <span><img src={require("./img/write-comment/return.png")} alt="return"/></span>
                                Відповісти
                            </button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
});

export default RenderReplyForm;