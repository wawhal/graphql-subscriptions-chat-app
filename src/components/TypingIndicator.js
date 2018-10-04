import React from 'react';
import { Subscription } from 'react-apollo';
import '../App.css';
import { getUserTyping } from '../graphqlQueries';


class TypingIndicator extends React.Component {
  render() {
    const data = {
      user_typing: [{username: 'user2'}]
    };
    return (
      <div className="typingIndicator">
        {
          (data.user_typing.length === 0) ?
          ""
          :
          `${data.user_typing[0].username} is typing ...`
        }
      </div>
    )
  }
};

export default TypingIndicator;

