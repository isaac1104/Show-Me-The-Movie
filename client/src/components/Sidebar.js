import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;

class Sidebar extends Component {
  render() {
    const { data } = this.props.current_user;
    const styles = {
      logout: {
        position: 'absolute',
        bottom: 0
      },
      sidebar: {
        backgroundColor: '#202225'
      },
      menu: {
        backgroundColor: '#202225'
      }
    };

    return (
      <Fragment>
        {data ? (
          <Sider breakpoint='lg' collapsedWidth='0' style={styles.sidebar}>
            <div className="logo"/>
            <Menu mode="inline" theme='dark' defaultSelectedKeys={['0']} style={styles.menu}>
              <Menu.Item key="0">
                <NavLink to="/home">
                  <Icon type="home"/>
                  <span className="nav-text">Home</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="1">
                <NavLink to="/liked_movies">
                  <Icon type="heart"/>
                  <span className="nav-text">Liked</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink to="/search">
                  <Icon type="search"/>
                  <span className="nav-text">Search</span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="3" style={styles.logout}>
                <a href="/api/signout">
                  <Icon type="logout"/>
                  <span className="nav-text">Logout</span>
                </a>
              </Menu.Item>
            </Menu>
          </Sider>
        ) : null}
      </Fragment>
    );
  }
};

function mapStateToProps({ current_user }) {
  return { current_user };
};

export default connect(mapStateToProps, null)(Sidebar);
