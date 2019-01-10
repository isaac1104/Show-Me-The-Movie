import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions';
import ScrollToTop from './utils/ScrollToTop';
import requireAuth from './utils/requireAuth';
import ContentLayout from './layouts/ContentLayout';
import Sidebar from './Sidebar';
import FooterNav from './FooterNav';
import Spinner from './Spinner';

const Landing = lazy(() => import('../pages/Landing'));
const Home = lazy(() => import('../pages/Home'));
const MovieDetail = lazy(() => import('../pages/MovieDetail'));
const LikedMovies = lazy(() => import('../pages/LikedMovies'));
const Search = lazy(() => import('../pages/Search'));
const SearchResults = lazy(() => import('../pages/SearchResults'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));

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
              <Suspense fallback={<Spinner />}>
                <Switch>
                  <Route
                    exact
                    path='/'
                    render={() => {
                      const { data } = this.props.current_user;
                      if (data) {
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
              </Suspense>
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
