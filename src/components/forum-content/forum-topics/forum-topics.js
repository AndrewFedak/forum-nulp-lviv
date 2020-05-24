import React, {Component} from "react";
import {connect} from "react-redux";
import './forum-topics.css';
import {withData} from "../../hoc-helper";
import {fetchList, toggleContent} from '../../../actions';
import {withRouter} from 'react-router-dom';
import TopicItem from './topic-item';
import LoadingBar from "../../loading-bar/loading-bar";
import checkJWTToken from "../../correct-name/check-jwt-token";

const searchFilter = (items, term) => {
    if (term === '') {
        return items;
    }
    return items.filter((item) => {
        return item.titleTheme.indexOf(term) > -1;
    });
};

const EmptyArr = () => {
    return (
        <React.Fragment>
            <div style={{height: "10px", width: '100%', backgroundColor: "#154a89", marginTop: "20px"}}/>
            <div className="login-or-register">
                <p>Список тем пустий. Створіть аккаунт або залогіньтесь і створіть нову тему)</p>
            </div>
            <div style={{height: "10px", width: '100%', backgroundColor: "#154a89"}}/>
        </React.Fragment>
    )
};

class ForumTopics extends Component {
    componentDidMount() {
        checkJWTToken(this.props.history);
        this.props.fetchList();
    }


    render() {
        const {
            data,
            searchValue,
            pageRequest,
            error,
            history,
            toggleContent,
        } = this.props;

        const filteredArray = searchFilter(data, searchValue);
        const renderedArr = filteredArray.length === 0 ?
            <EmptyArr/> : filteredArray.map((item, idx) => TopicItem(item, idx)(toggleContent, history));

        if (pageRequest) {
            return <LoadingBar/>
        }

        if (error) {
            return <div>Something wen wrong</div>
        }

        return (
            <div className="main">
                <div className="list-logo">
                    <h1>СПИСОК ТЕМ</h1>
                </div>
                {renderedArr}
            </div>
        )
    }
}

const mapStateToProps = ({data, searchValue, pageRequest, error}) => {
    return {
        data,
        searchValue,
        pageRequest,
        error
    }
};

const mapDispatchToProps = (dispatch, {nulpService}) => {
    return {
        fetchList: fetchList(nulpService, dispatch),
        toggleContent: (id) => dispatch(toggleContent(id)),
    }
};
export default withData(connect(mapStateToProps, mapDispatchToProps)(withRouter(ForumTopics)));


