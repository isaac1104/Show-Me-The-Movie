import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions';
import ContentLayout from './Layout/ContentLayout';
import Sidebar from './Sidebar';
import requireAuth from './requireAuth';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import Search from '../pages/Search';

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
                    return null;
                  } else if (data) {
                    return <Redirect to='/home' />;
                  } else {
                    return <Landing />;
                  }
                }}
              />
              <Route exact path='/home' component={requireAuth(Home)} />
              <Route exact path='/search' component={requireAuth(Search)} />
              <Route exact path='/search/:title' component={requireAuth(Search)} />
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
