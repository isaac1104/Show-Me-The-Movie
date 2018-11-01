import React, { Component, Fragment } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Layout, Spin, Icon } from 'antd';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions';
import ContentLayout from './Layout/ContentLayout';
import Sidebar from './Sidebar';
import requireAuth from './requireAuth';
import MovieDetail from './MovieDetail';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import Search from '../pages/Search';
import SearchResults from '../pages/SearchResults';
import NotFound from '../pages/NotFound';

class App extends Component {
  componentDidMount() {
    this.props.fetchCurrentUser();
  };

  render() {
    return (
      <BrowserRouter>
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
                    return (
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                        <Fragment>
                          <Spin size='large' indicator={ <Icon type='loading' /> } />
                        </Fragment>
                      </div>
                    );
                  } else if (data) {
                    return <Redirect to='/home' />;
                  } else {
                    return <Landing />;
                  }
                }}
              />
              <Route exact path='/home' component={requireAuth(Home)} />
              <Route exact path='/search/:title/:id' component={requireAuth(MovieDetail)} />
              <Route exact path='/search/:title' component={requireAuth(SearchResults)} />
              <Route exact path='/search' component={requireAuth(Search)} />
              <Route exact path='/notfound' component={requireAuth(NotFound)} />
            </Switch>
          </ContentLayout>
        </Layout>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ current_user }) {
  return { current_user };
};

export default connect(mapStateToProps, { fetchCurrentUser })(App);
