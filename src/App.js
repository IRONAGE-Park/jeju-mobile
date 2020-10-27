import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage';

import Header from './components/header/Header'

import { Paths } from './paths';

import './static/stylesheets/App.css';
import { useDispatch } from 'react-redux';
import { setLanguage } from './store/language';

const LANGUAGE_LIST = ['kr', 'cn', 'en', 'jp'];

const App = ({ match }) => {
  const reduxDispatch = useDispatch();
  const { language } = match.params;

  const state = LANGUAGE_LIST.find(item => item === language);
  // 언어 팩에 일치하는 경로가 아니면 undefined 반환

  useEffect(() => {
    if (state) {
      // 만약 경로의 제일 처음에 언어가 선택되어 있으면
      // 그 언어를 리덕스에 저장.
      reduxDispatch(setLanguage(state));
    }
  }, [reduxDispatch, state]);


  const STATE_PATH = state ? `/${state}` : '';

  return (
    <>
      <Header />
      <Switch>
        <Route path={STATE_PATH + Paths.index} component={HomePage} exact />
        <Route path={STATE_PATH + Paths.exhibition + '/:index?'} component={OnlineExhibitionPage} />
        <Route path={STATE_PATH + Paths.conference} component={ConferencePage} />
        <Route path={STATE_PATH + Paths.session + '/:mode?'} component={WelcomingPage} />
        <Route path={STATE_PATH + Paths.notice + '/:index?'} component={NoticeListPage} />
        <Route path={STATE_PATH + Paths.sns} component={SNSPage} />
        <Route component={ErrorPage} />
      </Switch>

      <OnlineExhibitionEventContainer />
      {/* ----- 신경 ㄴㄴ ----- */}
      <DialogContainer />
      <LoadingContainer />
    </>
  );
};

export default App;
