export default class NulpService {

    getItems = async () => {
        let res = await fetch(`https://forum-nulp-api.herokuapp.com/api/articles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res);
        if (!res.ok) {
            throw new Error('Something went wrong!')
        }
        let response = await res.json();
        return response.map(this._transformArticleList);
    };

    _transformArticleList(response) {
        const {visible, shortDescription} = response.articlePreview;
        return {
            titleTheme: response.titleTheme,
            shortDescription: shortDescription,
            createdAt: response.createdAt.substring(0, 10).replace(/-/g, '.'),
            userName: response.userName,
            visible: visible,
            _id: response._id
        }
    }

    getItem = async (id) => {
        const res = await fetch(`https://forum-nulp-api.herokuapp.com/api/articles/${id}`);
        const response = await res.json();
        return this.articleIntoObject(response);
    };

    articleIntoObject(data) {
        const {titleTheme, userName, articleComments, createdAt, _id, owner, particularArticle: {articleText, articleUserIcon, articleLikesAmount}} = data;

        return {
            articleComments,
            titleTheme,
            userName,
            articleText,
            articleUserIcon,
            articleCreationData: createdAt.substring(0, 10).replace(/-/g, '.'),
            articleLikesAmount,
            _id,
            owner
        }
    }

    fromFormToObj = (data) => {
        let obj = {};
        new FormData(data).forEach((value, key) => {
            obj[key] = value;
        });
        return obj
    };

    createNewArticle = async (data) => {
        let obj = this.fromFormToObj(data);
        const res = await fetch(`https://forum-nulp-api.herokuapp.com/api/article/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        const result = await res.json();
        return result;
    };


    generateWebToken = async (data) => {
        let obj = this.fromFormToObj(data);
        const res = await fetch(`https://forum-nulp-api.herokuapp.com/authenticate/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        const result = await res.json();
        return result.token
    };

    fetchProfileData = async () => {
        const res = await fetch(`$https://forum-nulp-api.herokuapp.com/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
            }
        });
        const result = await res.json();
        return {
            dataUserIcon: result.user.dataUserIcon,
            dataUserName: result.user.dataUserName,
            dataUserEmail: result.user.dataUserEmail,
            token: result.token,
            _id: result._id
        }
    };

    createArticleComment = async (item) => {
        const {dataUserName, _id, userComment, id} = item;
        const res = await fetch(`https://forum-nulp-api.herokuapp.com/api/articles/add-comment/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                userName: dataUserName,
                userComment,
                commentOwner: _id
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`
            }
        });
        const parseRes = await res.json();

        return parseRes
    };
}