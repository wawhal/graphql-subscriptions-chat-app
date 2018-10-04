import React from 'react';
import { Subscription } from 'react-apollo';
import ChatWrapper from './ChatWrapper';
import { subscribeToNewMessages, emitOnlineEvent } from '../graphqlQueries';

class Chat extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      username: props.username,
      refetch: null
    };
  }

  // set refetch function (coming from child <Query> component) using callback
  setRefetch = (refetch) => {
    this.setState({
      ...this.state,
      refetch
    })
  } 

  /*
    Subscription is used only for event notification
    No data is bound to the subscription component
    As soon as an event occurs, the refetch() of the child component is called
  */
  render () {
    const { refetch, username } = this.state;
    const data = {message: 'hey'} ;
    return (
      <div>
        {/*Subscribe to new messages*/}
        <ChatWrapper
          refetch={refetch}
          setRefetch={this.setRefetch}
          userId={this.props.userId}
          username={username}
        />
      </div>
    );
  }
};

export default Chat;
