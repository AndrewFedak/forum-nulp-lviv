import React from "react";
import {withRouter} from "react-router";
import {withData} from '../hoc-helper';
import './forum-create-article.css';
import {createNewArticle} from '../../actions';

class ForumCreateArticle extends React.Component {
    render() {
        return (
            <div className='create-article-main'>
                <div className="article-creation-header">
                    <p>СТВОРЕННЯ ТЕМИ</p>
                </div>
                <div className="article-creation-body">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        createNewArticle(this.props.nulpService, e.target, this.props.history)
                    }}>
                        <div className="article-name-input">
                            <input type="text" name="titleTheme" placeholder="Введіть назву теми..." required/>
                        </div>
                        <div className="article-content-textarea">
                            <div className="line-above">
                                <p>ЗАПИТАННЯ АБО ТЕМА</p>
                            </div>
                            <textarea defaultValue="Введіть запитання..."
                                      onFocus={(e) => e.target.value === 'Введіть запитання...' ? e.target.value = '' : e.target.value}
                                      onBlur={(e) => e.target.value === '' ? e.target.value = 'Введіть запитання...' : e.target.value}
                                      name="articleText" required>
                            </textarea>
                        </div>
                        <div className="details-of-article">
                            <div className="line-above">
                                <p>КОРОТКИЙ ОПИС</p>
                            </div>
                            <textarea defaultValue="Введіть короткий опис до вашого запитання..."
                                      onFocus={(e) => e.target.value === 'Введіть короткий опис до вашого запитання...' ? e.target.value = '' : e.target.value}
                                      onBlur={(e) => e.target.value === '' ? e.target.value = 'Введіть короткий опис до вашого запитання...' : e.target.value}
                                      name="shortDescription" required>
                            </textarea>
                        </div>
                        <button type="submit" className="create-article-button">
                            <span>new</span> Створити тему
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(withData(ForumCreateArticle));