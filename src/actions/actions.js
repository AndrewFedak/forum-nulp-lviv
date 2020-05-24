const dataLoaded = (data) => {
    return {
        type: "LOADED",                 //actionCreator для загрузки даних
        payload: data
    }
};

const toggleContent = (idx) => {
    return {
        type: "TOGGLE_CONTENT",         //actionCreator для опису статті
        payload: idx
    }
};


const updateSearchTerm = (target) => {
    return {
        type: "UPDATE_SEARCH",
        payload: target.value           //actionCreator для пошуку конкретної статті
    }
};

const currentArticle = (data) => {
    return {
        type: "CURRENT_ARTICLE",        //actionCreator для рендера статті
        payload: data
    }
};

const pageLoading = () => {
    return {
        type: "PAGE_LOADING"            //actionCreator для загрузки сторінки
    }
};

const pageError = (error) => {
    return {
        type: "PAGE_ERROR",             //actionCreator для повідомлення про помилку завантаження контенту
        payload: error
    }
};

const profileInfo = (payload) => {
    return {
        type: 'PROFILE_INFO',
        payload
    }
};

const saveUserProfile = (payload) => {
    return {
        type: 'SAVE_USER_PROFILE',
        payload
    }
};

const fetchProfileData = (service) => () => (dispatch) => {
    service.fetchProfileData().then((item) => dispatch(profileInfo(item))).catch(() => dispatch(pageError()))
};

const fetchArticle = (service, articleId) => () => (dispatch) => {
    dispatch(pageLoading());
    service.getItem(articleId)
        .then((data) => dispatch(currentArticle(data)))         //actionCreator для загрузки статті з серверу
        .catch(err => dispatch(pageError(err)));
};

const fetchList = (service, dispatch) => () => {
    dispatch(pageLoading());
    service.getItems()
        .then((data) => dispatch(dataLoaded(data)))     //actionCreator для загрузки списку статей з серверу
        .catch(err => {
            console.log(err.message);
            dispatch(pageError(err))
        });
};

const checkProfileInDataBase = (service, data, history) => (dispatch) => {
    service.generateWebToken(data)
        .then((item) => {
            localStorage.setItem('jwt_token', item);
            if (localStorage.getItem('jwt_token') !== 'undefined') {
                history.push('/articles/me/')
            } else {
                alert('Wrong password or login')
            }
        })
        .catch(() => dispatch(pageError()))
};

const createNewArticle = (service, data, history) => {
    service.createNewArticle(data).then(() => {
        alert('Ваша тема створена!');
        history.push('/articles/me/')
    }).catch((e) => alert('Щось пішло не так!'));
};

const saveProfile = () => (dispatch) => {
    fetch(`https://forum-nulp-api.herokuapp.com/profile`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ` + String(localStorage.getItem('jwt_token'))
        }
    })
        .then((item) => item.json())
        .then((item) => dispatch(saveUserProfile({...item})))
        .catch((e) => console.log(e))
};

const commentArticle = async (service, item) => {
    const res = await service.createArticleComment(item);
    return res;
};

const likeComment = (_id, articleId, service) => (dispatch) => {
    fetch(`https://forum-nulp-api.herokuapp.com/api/articles/like-comment`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id, articleId})
    }).then(() => {
        service.getItem(articleId)
            .then((data) => dispatch(currentArticle(data)))         //actionCreator для загрузки статті з серверу
            .catch(err => dispatch(pageError(err)));
    }).catch((e) => {
        alert(e.message)
    });
};

const likeArticle = (owner, articleId, service) => (dispatch) => {
    fetch(`https://forum-nulp-api.herokuapp.com/api/articles/like-article`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwt_token'),
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({owner, articleId})
    }).then(() => {
        service.getItem(articleId)
            .then((data) => dispatch(currentArticle(data)))         //actionCreator для загрузки статті з серверу
            .catch(err => dispatch(pageError(err)));
    }).catch((e) => {
        alert(e.message)
    });
};

export {
    dataLoaded,
    toggleContent,
    updateSearchTerm,
    fetchArticle,
    fetchList,
    checkProfileInDataBase,
    fetchProfileData,
    createNewArticle,
    saveProfile,
    commentArticle,
    likeComment,
    likeArticle
};