import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions';
import ScrollToTop from './utils/ScrollToTop';
import requireAuth from './utils/requireAuth';
import ContentLayout from './ContentLayout/ContentLayout';
import Sidebar from './Sidebar/Sidebar';
import FooterNav from './FooterNav/FooterNav';
import Spinner from './Spinner/Spinner';

const Landing = lazy(() => import('./Landing/Landing'));
const Home = lazy(() => import('./Home'));
const MovieDetail = lazy(() => import('./MovieDetail/MovieDetail'));
const LikedMovies = lazy(() => import('./LikedMovies/LikedMovies'));
const Search = lazy(() => import('./Search'));
const SearchResults = lazy(() => import('./SearchResults/SearchResults'));
const PageNotFound = lazy(() => import('./PageNotFound/PageNotFound'));

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
                  <Redirect from='/search/:title/' to='/search/:title/1' />
                  <Route exact path='/search' component={requireAuth(Search)} />
                  <Route render={() => <PageNotFound />} />
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
