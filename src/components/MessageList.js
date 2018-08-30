import React from 'react';
import '../App.js';
import '../App.css';
import moment from 'moment';

export default class MessageList extends React.Component {
  render() {
    const { isNew } = this.props;
    
    return (
      <div className={isNew ? "messageWrapperNew" : "messageWrapper"}>
        {
          this.props.messages.map((m, i) => {
            return (
              <div key={m.id} className="message">
                <b>{m.username}</b>: {m.text } <i>{moment(m.timestamp).fromNow()} </i>
              </div>
            );
          })
        }
      </div>
    );
  }
};
