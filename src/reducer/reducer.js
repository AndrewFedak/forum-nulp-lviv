const initialState = {
    data: [],
    searchValue: "",
    currentArticleData: {},     //Створюємо початковий store
    pageRequest: true,
    error: null,
    userProfile: {}
};


const reducer = (state = initialState, action) => {
    const {payload} = action;
    switch (action.type) {
        case "LOADED":
            console.log("Loaded");
            return {
                ...state,
                data: payload,          //перезаписуємо state при вдалій загрузці контенту
                pageRequest: false,
                error: null,
                searchValue: ""
            };
        case "TOGGLE_CONTENT":
            const idx = state.data.findIndex((el) => el._id === payload);
            const oldItem = state.data[idx];
            const newItem = {...oldItem, visible: !oldItem.visible};                //перезаписуємо state при відкритті опису статті
            return {
                ...state,
                data: [...state.data.slice(0, idx), newItem, ...state.data.slice(idx + 1)]
            };
        case "UPDATE_SEARCH":
            return {
                ...state,               //перезаписуємо state при пошуку статті
                searchValue: payload
            };
        case 'SAVE_USER_PROFILE':
            return {
                ...state,
                userProfile: payload
            };
        case "PROFILE_INFO":
            return {
                ...state,
                pageRequest: false,
                error: null,
                profileInfo: payload
            };
        case "CURRENT_ARTICLE":
            return {
                ...state,
                currentArticleData: payload,    //перезаписуємо state при відкритті статті
                pageRequest: false,
                error: null
            };
        case "PAGE_LOADING":
            return {
                ...state, //перезаписуємо state при загрузці сторінки
                pageRequest: true,
                error: null
            };
        case "PAGE_ERROR": {
            return {
                ...state,
                pageRequest: false,         //перезаписуємо state при помилці загрузки сторінки
                error: action.payload
            };
        }
        default:
            return state                //при помилці, повертаємо минулий state
    }
};

export default reducer;