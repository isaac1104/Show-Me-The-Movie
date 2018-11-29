import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions';
import ScrollToTop from './utils/ScrollToTop';
import ContentLayout from './layouts/ContentLayout';
import Sidebar from './Sidebar';
import FooterNav from './FooterNav';
import Spinner from './Spinner';
import requireAuth from './utils/requireAuth';
import MovieDetail from '../pages/MovieDetail';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import LikedMovies from '../pages/LikedMovies';
import Search from '../pages/Search';
import SearchResults from '../pages/SearchResults';
import PageNotFound from '../pages/PageNotFound';

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  };

  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <Layout>
            <Sidebar />
            <ContentLayout>
              <Switch>
                <Route
                  exact
                  path='/'
                  render={() => {
                    const { isFetching, data } = this.props.current_user;
                    if (isFetching) {
                      return <Spinner />;
                    } else if (data) {
                      return <Redirect to='/home' />;
                    } else {
                      return <Landing />;
                    }
                  }}
                />
                <Route exact path='/home' component={requireAuth(Home)} />
                <Route exact path='/movie/:id' component={requireAuth(MovieDetail)} />
                <Route exact path='/liked_movies' component={requireAuth(LikedMovies)} />
                <Route exact path='/search/:title/:page' component={requireAuth(SearchResults)} />
                <Route exact path='/search' component={requireAuth(Search)} />
                <Route component={PageNotFound} />
              </Switch>
            </ContentLayout>
            <FooterNav />
          </Layout>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ current_user }) {
  return { current_user };
};

export default connect(mapStateToProps, { fetchCurrentUser })(App);
