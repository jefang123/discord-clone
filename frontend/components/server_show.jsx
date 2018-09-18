import React from 'react';
import { Link } from 'react-router-dom'
import { ProtectedRoute } from '../util/route_util';
import ChannelShowContainer from './channel_show_container';

class ServerShow extends React.Component {
  componentDidMount () {
    this.props.fetchServer(this.props.match.params.serverId);
  }

  componentWillUpdate(newProps) {
    if (this.props.match.params.serverId != newProps.match.params.serverId) {
      this.props.fetchServer(newProps.match.params.serverId)
    }
  }

  render() {
    if (!this.props.server) return null;
    const channels= this.props.channels.map( channel => {
      return (
        <li>
          <Link to={`/server/${this.props.server.id}/channel/${channel.id}`}>
            {channel.channel_name}
          </Link>
        </li>
      )
    });
    const users = this.props.users.map(user => {
      return (
        <p key={user.id}>{user.username}</p>
      );
    });
    const { server } = this.props;
    return (
      <div className="server-show">
        <section className='channel-index'>
          <h3>{server.server_name}</h3>
          <div className="divider" />
          <ul>
            {channels}
          </ul>
          <div className="divider" />
          <div>
              <h2>Welcome Back, {this.props.currentUser.username}</h2>
              <button onClick={this.props.logout}>Log Out</button>
          </div>
    
        </section>
        <div className="server-divider" />
        <section className='channel-show'>
          <ProtectedRoute path='/server/:serverId/channel/:channelId' component={ChannelShowContainer} />
        </section>
        <div className="server-divider" />
        <section className='user-index'>
          <p> Users </p>
          <div className="divider" />
          {users}
        </section>
      </div>
    )
  }

}

export default ServerShow;

