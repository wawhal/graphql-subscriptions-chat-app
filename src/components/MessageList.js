import React from 'react';
import '../App.js';
import '../App.css';
export default class MessageList extends React.Component {
  render() {
    const { isNew } = this.props;
    
    return (
      <div className={isNew ? "messageWrapperNew" : "messageWrapper"}>
        {
          this.props.messages.map((m, i) => {
            return (
              <div key={m.id} className="message">
                { m.username + ": " + m.text }
              </div>
            );
          })
        }
      </div>
    );
  }
};
