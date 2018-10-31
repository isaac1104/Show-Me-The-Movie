import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;

class Sidebar extends Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };
  render() {
    const style = {
      sidebar: {
        minHeight: '80vh'
      }
    }

    return (
      <Sider style={style.sidebar}>
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
