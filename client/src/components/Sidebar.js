import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;

class Sidebar extends Component {
  state = {
    collapsed: false
  };

  render() {
    const style = {
      sidebar: {
        // height: '100vh'
      }
    }

    return (
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        style={style.sidebar}
        >
        <div className="logo" />
        <Menu mode="inline" theme='dark' defaultSelectedKeys={['0']}>
          <Menu.Item key="1">
            <NavLink to="/">
              <Icon type="home" />
                <span className="nav-text">Home</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
