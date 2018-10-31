import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;

class Sidebar extends Component {
  render() {
    const { data } = this.props.current_user;
    return (
      <Fragment>
        {data ? (
          <Sider
            breakpoint='lg'
            collapsedWidth='0'
            >
              <div className="logo" />
              <Menu mode="inline" theme='dark' defaultSelectedKeys={['0']}>
                <Menu.Item key="0">
                  <NavLink to="/home">
                  <Icon type="home" />
                  <span className="nav-text">Home</span>
                </NavLink>
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
