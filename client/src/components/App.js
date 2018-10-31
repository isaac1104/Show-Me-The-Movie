import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import ContentLayout from './Layout/ContentLayout';
import Sidebar from './Sidebar';
import Home from '../pages/Home';
import Landing from '../pages/Landing';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Sidebar />
          <ContentLayout>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/home' component={Home} />
            </Switch>
          </ContentLayout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
