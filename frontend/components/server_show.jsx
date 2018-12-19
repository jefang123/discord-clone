import React from 'react';
import { Link, Redirect, Switch, matchPath } from 'react-router-dom'
import ChannelShowContainer from './channel_show_container';
import ChannelCreateContainer from './channel_create_container';
import PrivateCreate from './channel_create_private_form';
import Modal from './modal';
import { ProtectedRoute } from '../util/route_util';
import { receiveChannel, receiveChannels } from '../actions/channel_actions';
import WelcomeShow from './welcome_show';
import { receiveServer } from '../actions/server_actions';
import { receiveMessage } from '../actions/message_actions';
import Loading from './loading';

class ServerShow extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { 
      show: false,
      showServer: false,
     }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.handlePMClick = this.handlePMClick.bind(this)
    this.handleDropdown = this.handleDropdown.bind(this)
    this.handleClickOut = this.handleClickOut.bind(this)
  }

  showModal () {
    this.setState({ show: true });
  }
  
  hideModal () {
    this.setState({ show: false });
  }

  componentDidMount () {
    this.props.fetchServer(this.props.match.params.serverId);
    App.cable.subscriptions.create({
      channel: "MessageChannel",
      room: 'ChannelRoom'
    },    {

      received: (data) => {
        // if(data.action === "typing") {
        // }

        // else if (data.action === "done") {
        // }
        if (data.server) {
          dispatch(receiveServer(data));
        }
        else if(data.channels) {
          let parsedCh = {};
          data.channels.forEach(channel => {
            parsedCh[channel.id] = channel;
          })
          dispatch(receiveChannels(parsedCh));
        } 
        else if (data.channel_name) {
          dispatch(receiveChannel(data));
        }
        else if(data.body){
          dispatch(receiveMessage(data));
        }
      },

      typing: function(data) {
        return this.perform("typing", data)
      },

      done: function(data) {
        return this.perform("done", data)
      },

      speak: function(data) {
        return this.perform("speak", data)
      },

      speak2: function(data) {
        return this.perform("speak2", data)
      },

      update: function(data) {
        return this.perform("update", data)
      },

      join: function(data) {
        return this.perform("join", data)
      }

    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.serverId !== prevProps.match.params.serverId) {
      this.props.fetchServer(this.props.match.params.serverId)
      this.setState({
        showServer: false
      })
    }
  }

  handleClick (e) {
    e.preventDefault();
    this.props.deleteServer(this.props.server.id);   
  }

  handlePMClick (e) {
    // const mesagee = this.props.users[e.target.getAttribute("value")];
    // <Link to={`/server/${window.homeId}`}/>
    // this.props.fetchServer(window.homeId);
    // App.cable.subscriptions.subscriptions[0].speak2({server_id: window.homeId, channel_name: mesagee.username});
  }

  handleDropdown() {
    let boolean = this.state.showServer ? false : true
    this.setState ({
      showServer: boolean
    })
  }

  handleRemoveClick (e) {
    e.preventDefault();
    this.props.removeServer(this.props.server.id);  
  }

  handleClickOut () {
    if (this.state.showServer) {
      this.setState ({
        showServer: false
      })
    }
  }

  render() {
    if (this.props.redirect.includes("No Such Server")) {
      return (
        <Redirect to={`/server/${window.homeId}/welcome`} />
      );
  
  }
    let match = matchPath(this.props.history.location.pathname, {
      path: '/server/:serverId/channel/:channelId',
      exact: true,
      strict: false 
    });
    let parameter;
    if (!match) {
      parameter = 0;
    } else if (match.params.channelId) {
      parameter = parseInt(match.params.channelId);
    } else {
      parameter = 0;
    }
    
    let klass;

    if (!this.props.server)
    return <Loading />
    const channels= this.props.channels.map( channel => {
      if (channel.id === parameter) {
        klass = "ch-selected"
      } else {
        klass = ""
      }

      let hash;
      // let privateS = this.props.server.private;
      if (this.props.server.private) {
        hash = "@"
      } else {
        hash = "#"
      }

      let channelName;
      // if (privateS) {
        if (channel.channel_name === this.props.currentUser.username) {
          channelName = channel.channel_topic
        } 
      // }
      else {
        channelName = channel.channel_name
      }

      let channelb;
      if(this.props.server.creator_id === this.props.currentUser.id) {
        channelb = 
        <div className="delete-server" onClick={()=>{this.props.deleteChannel(channel.id)}}>
          <i className="fas fa-cog"></i>
        <div className="delete-hidden"><div className="arrow-left"></div>Delete Channel </div>
        </div>
      } 
      return (
        <Link key={channel.id} to={`/server/${this.props.server.id}/channel/${channel.id}`}>
          <li className={klass}>
            {hash} {channelName}
            {channelb}
          </li>
        </Link>
      )
    });

    const users = Object.values(this.props.users).map(user => {
      if (this.props.server.creator_id === user.id ) {
        return (
          <p onClick={this.handlePMClick} value={user.id} key={user.id}>{user.username} <i className="fas fa-crown"></i></p>
        );
      } else {
        return (
          <p onClick={this.handlePMClick} value={user.id} key={user.id}>{user.username}</p>
        );
      }
    });
    let button;
    if (this.props.server.private) {
      button;
    }
    else if (this.props.currentUser.id === this.props.server.creator_id) {
      button = <button onClick={this.handleClick.bind(this)}>Delete Server</button>
    } else {
      button = <button onClick={this.handleRemoveClick.bind(this)}>Leave Server</button>
    }
    
    let modalbutton;
    if (this.props.server.private) {
      modalbutton = <button onClick={this.showModal} >New Private Message</button>
    }
    else if (this.props.currentUser.id === this.props.server.creator_id) {
      modalbutton = <button onClick={this.showModal} >Create Channel</button>
    }
    const { server } = this.props;
    let icon = <i className="fas fa-chevron-down" onClick={this.handleDropdown}></i>

    if (this.state.showServer) {
      icon = <i className="fas fa-times" onClick={this.handleDropdown}></i>
    }

    let modalshow = <Modal show={this.state.show} handleClose={this.hideModal}>
    <div className="channel-create-modal">
      <ChannelCreateContainer handleClose={this.hideModal} />
    </div>
    </Modal >

    if (this.props.server.private) {
      modalshow = <Modal show={this.state.show} handleClose={this.hideModal} >
      <div className="channel-create-modal">
      <PrivateCreate handleClose={this.hideModal}/>
    </div>
      </Modal >
    }   

    let showServerName = this.state.showServer ? "display-servershow" : "hidden-servershow";
    if (this.props.server.private) {
      return (
        <div className="server-show" onClick={this.handleClickOut}>
          <section className='channel-index'>
            <section className='server-heading'>
              <h3>{server.server_name} {icon}</h3>
              <div className={showServerName}>
                {button}
                {modalbutton}
              </div>
              {modalshow}
              <br />
            </section>
            <ul>
              {channels}
            </ul>
            <div className="user-tab">
                <div>
  
                <img src={window.logo_url}></img>
                </div>
                <section>
                  <p>{this.props.currentUser.username}</p>
                  <p># {this.props.currentUser.id}</p>
                </section>
                <button onClick={this.props.logout}>Log Out</button>
            </div>
      
          </section>
          <section className='home-show'>
          <Switch>
            <ProtectedRoute path='/server/:serverId/welcome' component={WelcomeShow} />
            <ProtectedRoute path='/server/:serverId/channel/:channelId' component={ChannelShowContainer} />
          </Switch>
          </section>
        </div>
      )
    } 
    else if (parameter === 0 && this.props.channels.length > 0) {
      if (this.props.channels[0].server_id === parseInt(this.props.match.params.serverId)) {
       
        return <Redirect to={`/server/${this.props.server.id}/channel/${this.props.channels[0].id}`}/> 
      } else {
         return <Loading />
      }
    }
     else {
      return (
        <div className="server-show" onClick={this.handleClickOut}>
          <section className='channel-index' >
            <section className='server-heading'>
              <h3>{server.server_name} {icon}</h3>
              <div className={showServerName}>
                {/* <button>Edit Server</button> */}
                {button}
                {modalbutton}
              </div>
              {modalshow}
              <br />
            </section>
            <ul>
              {channels}
            </ul>
            <div className="user-tab">
                <div>
  
                <img src={window.logo_url}></img>
                </div>
                <section>
                  <p>{this.props.currentUser.username}</p>
                  <p># {this.props.currentUser.id}</p>
                </section>
                <button onClick={this.props.logout}>Log Out</button>
            </div>
      
          </section>
          <section className='channel-show'>
          <ProtectedRoute path='/server/:serverId/channel/:channelId' component={ChannelShowContainer} />
          </section>
          <section className='user-index'>
            <h3> Users </h3>
            <div className="full-divider" />
            <ul>
            <h5>ONLINE—{users.length}</h5>
            {users}
            <h5>OFFLINE—0</h5>
            </ul>
          </section>
        </div>
      )
    }
  }
}

export default ServerShow;
