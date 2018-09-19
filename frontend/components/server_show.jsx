import React from 'react';
import { Link } from 'react-router-dom'
import { ProtectedRoute } from '../util/route_util';
import ChannelShowContainer from './channel_show_container';
import ChannelCreateContainer from './channel_create_container';
import Modal from './modal';

class ServerShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  showModal () {
    this.setState({ show: true });
  }
  
  hideModal () {
    this.setState({ show: false });
  }

  componentDidMount () {
    this.props.fetchServer(this.props.match.params.serverId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params !== prevProps.match.params) {
      this.props.fetchServer(this.props.match.params.serverId)
    }
  }

  handleClick (e) {
    e.preventDefault();
    this.props.deleteServer(this.props.server.id);   
  }

  render() {
    if (!this.props.server) return null;
    const channels= this.props.channels.map( channel => {
      return (
        <li>
          <Link to={`/server/${this.props.server.id}/channel/${channel.id}`}>
            {channel.channel_name}
            <button onClick={()=>{this.props.deleteChannel(channel.id)}}>Delete Channel</button>
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
          <button onClick={this.handleClick.bind(this)}>Delete Server</button>
          <Modal show={this.state.show} handleClose={this.hideModal}>
            <ChannelCreateContainer handleClose={this.hideModal}/>
          </Modal>
          <br />
          <button onClick={this.showModal} >+</button>
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

