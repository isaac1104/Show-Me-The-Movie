import React, { Component } from 'react';
import { connect } from 'react-redux';
import getAverageColor from 'get-average-color';
import { Layout } from 'antd';
const { Content } = Layout;

class ContentLayout extends Component {
  state = {
    averageColor: {}
  }

  componentDidMount() {
    const { poster_path } = this.props.movie_data.data;
    const { pathname } = window.location;
    if (pathname.includes('movie') && !pathname.includes('liked') && poster_path) {
      this.getPosterAverageColor(`https://image.tmdb.org/t/p/w500/${this.props.movie_data.data.poster_path}`);
    }
  }

  componentDidUpdate(prevProps) {
    const { poster_path } = this.props.movie_data.data;
    const { pathname } = window.location;
    if (prevProps.movie_data.data.poster_path !== poster_path) {
      if (pathname.includes('movie') && !pathname.includes('liked')) {
        this.getPosterAverageColor(`https://image.tmdb.org/t/p/w500/${poster_path}`);
      }
      if (!poster_path) {
        this.setState({ averageColor: { r: 240 , g: 242, b: 255 } });
      }
    }
  }

  getPosterAverageColor(src) {
    return getAverageColor(src).then(rgb => this.setState({ averageColor: rgb }));
  }

  render() {
    const { r, g, b } = this.state.averageColor;
    const { pathname } = window.location;
    const style = {
      layout: {
        background: this.state.averageColor ? `rgb(${r}, ${g}, ${b})` : '#f0f2f5',
        padding: 24,
        height: '100vh',
        overflow: 'hidden'
      },
      content: {
        backgroundColor: pathname === '/' ? 'transparent' : '#ffffff',
        padding: 24,
        margin: 0,
        width: '100%',
        height: '100%',
        overflowY: pathname === '/' ? 'hidden' : 'scroll'
      }
    };

    return (
      <Layout style={style.layout}>
        <Content style={style.content}>
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = ({ movie_data }) => {
  return {
    movie_data
  };
};

export default connect(mapStateToProps)(ContentLayout);
