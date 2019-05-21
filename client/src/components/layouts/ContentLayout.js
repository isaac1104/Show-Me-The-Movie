import React, { Component } from 'react';
import { connect } from 'react-redux';
import getAverageColor from 'get-average-color';
import { Layout } from 'antd';
const { Content } = Layout;

class ContentLayout extends Component {
  state = {
    averageColor: '255, 255, 255'
  }

  componentDidMount() {
    const { poster_path } = this.props.movie_data.data;
    if (poster_path) {
      this.getPosterAverageColor(`https://image.tmdb.org/t/p/w500/${this.props.movie_data.data.poster_path}`);
    }
    return this.setState({ averageColor: { r: 255, g: 255, b: 255 } });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.movie_data.data.poster_path !== this.props.movie_data.data.poster_path) {
      this.getPosterAverageColor(`https://image.tmdb.org/t/p/w500/${this.props.movie_data.data.poster_path}`);
    }
  }

  getPosterAverageColor(src) {
    return getAverageColor(src).then(rgb => this.setState({ averageColor: rgb }));
  }

  render() {
    const { r, g, b } = this.state.averageColor;
    const { pathname } = window.location;
    console.log(pathname.includes('movie'));
    const style = {
      layout: {
        backgroundColor: pathname === '/' ? 'transparent' : '#ffffff',
        height: '100vh',
        overflow: 'hidden'
      },
      content: {
        backgroundColor: pathname.includes('movie') && !pathname.includes('liked') ? `rgb(${r}, ${g}, ${b})` : '#ffffff',
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
