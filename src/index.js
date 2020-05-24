import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from "./store";
import {NulpProvider} from "./components/context";
import NulpService from "./components/nulp-service";
import Header from "./components/header";
import NavBar from "./components/nav-bar";
import {ForumTopics, ForumLogin, ForumSideProfile} from './components/forum-content';
import Row from "./components/row";
import ForumArticle from "./components/forum-article";
import {Switch, BrowserRouter as Router, Route} from "react-router-dom";
import RegForm from "./components/reg-form/";
import ForumCreateArticle from "./components/forum-create-article";


ReactDOM.render(
    <Provider store={store}>
        <NulpProvider value={NulpService}>
            <Router>
                <Header/>
                <NavBar/>
                <Switch>
                    <Route path="/articles/" exact render={() => <Row left={<ForumTopics/>} right={<ForumLogin/>}/>}/>
                    <Route path="/registration" exact component={RegForm}/>
                    <Route path="/articles/me/create-article" exact component={ForumCreateArticle}/>
                    <Route path="/articles/me/" exact
                           render={() => <Row left={<ForumTopics/>} right={<ForumSideProfile/>}/>}/>
                    <Route path="/articles/:id" exact
                           render={({match}) => {
                               const {id} = match.params;
                               return <Row left={<ForumArticle articleId={id}/>} right={<ForumLogin/>}/>
                           }}/>
                    <Route path="/articles/me/:id" exact
                           render={({match}) => {
                               const {id} = match.params;
                               return <Row left={<ForumArticle articleId={id}/>} right={<ForumSideProfile/>}/>
                           }}/>
                    <Route render={() => <div>Not found</div>}/>
                </Switch>
            </Router>
        </NulpProvider>
    </Provider>
    , document.getElementById('root')
);

