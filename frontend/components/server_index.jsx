import React from 'react';
import ServerIndexItem from './server_index_item';
import ServerCreateForm from './server_create_container';
import ChannelShowContainer from './channel_show_container';
import { ProtectedRoute } from '../util/route_util';
import ServerShowContainer from './server_show_container';
import Modal from './modal';


class ServerIndex extends React.Component {
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
    

  componentDidMount(){
    this.props.fetchServers();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params !== prevProps.match.params) {
      this.props.fetchServers()
    }
  }
  
  render(){ 
    let homeId;
    const home = this.props.servers.map(server => {
      if (server.server_name === 'Home') {
        homeId = server.id
        return <ServerIndexItem key={server.id} server={server} />
      }
    })
    const servers = this.props.servers.map(server => {
      if (server.id !== homeId) {
        return <ServerIndexItem 
        key={server.id} 
        server={server} 
        />
      }
    });

    return(
      <div className="home-page">
        <section className="server-index">
          <ul>
            { home }
            <div className="divider"></div>
            { servers }
            <li>
              <Modal show={this.state.show} handleClose={this.hideModal}>
                  <ServerCreateForm handleClose={this.hideModal}/>
              </Modal>
              <button onClick={this.showModal} className="create-server" >+</button>
            </li>
          </ul>
        </section>
        <div className="server-divider" />
      <ProtectedRoute path='/server/:serverId' component={ServerShowContainer} />
      </div>
    );
  }
}

export default ServerIndex;
