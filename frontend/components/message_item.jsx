import React from 'react';

class MessageItem extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  contextMenu (e) {
    e.preventDefault();
  }

  handleClick (e) {
    e.preventDefault();
    this.props.deleteMessage(id);
  }

  render () {
   const message = this.props.message 

   if (message.length > 1) {
     message = <section>
                <p className="message-body"> {this.message.body} </p>
                {messageb}
              </section>
    
   } else {
      message = this.props.message.map(mess => {
        <section>
          <p className="message-body"> {this.mess.body} </p>
          {messageb}
        </section>
      })
   }

  let timestamp;

   return (
    <div key={message.id} className="message">
      <div>
        <img className="message-image" src={window.user_url}></img>
        <div className="message-box">
          <p >{user ? user.username : null} {timestamp}</p> 
          {message}
        </div>
      </div>
    </div>
   )
      
  }
}

export default MessageItem;
