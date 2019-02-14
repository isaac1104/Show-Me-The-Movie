import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;

class Sidebar extends Component {
  highlightMenu() {
    const { pathname } = window.location;
    if (pathname.includes('/home')) {
      return ['0'];
    } else if (pathname.includes('/liked_movies')) {
      return ['1'];
    } else if (pathname.includes('/search')) {
      return ['2'];
    } else {
      return ['0'];
    }
  };

  renderSidebar() {
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

    if (data) {
      return (
        <Sider breakpoint='lg' collapsedWidth='0' style={styles.sidebar}>
          <div className="logo"/>
          <Menu mode="inline" theme='dark' defaultSelectedKeys={this.highlightMenu()} style={styles.menu}>
            <Menu.Item key="0">
              <Link to="/home">
                <Icon type="home"/>
                <span className="nav-text">Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="1">
              <Link to="/liked_movies">
                <Icon type="heart"/>
                <span className="nav-text">Liked</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/search">
                <Icon type="search"/>
                <span className="nav-text">Search</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3" style={styles.logout}>
              <a href="/api/signout">
                <Icon type="logout"/>
                <span className="nav-text">Logout</span>
              </a>
            </Menu.Item>
          </Menu>
        </Sider>
      );
    } else {
      return null;
    }
  }

  render() {
    return <Fragment>{this.renderSidebar()}</Fragment>;
  }
};

function mapStateToProps({ current_user }) {
  return { current_user };
};

export default connect(mapStateToProps, null)(Sidebar);
