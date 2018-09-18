import React from 'react';
import Splash from './splash';
import ServerIndexContainer from './server_index_container';

class Home extends React.Component {
  render () {
    if (this.props.currentUser) {
      return (
        <div>
          <ServerIndexContainer 
          currentUser ={ this.props.currentUser }
          logout = { this.props.logout }/>
        </div>
      );} else {
        return (
          <Splash />
        )
      };
    }
  }


export default Home;

