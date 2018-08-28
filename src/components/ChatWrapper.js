import React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';
import moment from 'moment';
import RenderMessages from './RenderMessages';
import Textbox from './Textbox'
import "../App.css";

export default class RenderMessagesProxy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refetch: null
    }
  }

  // Set mutation callback. For instantly adding messages to state after mutation
  setMutationCallback = (mutationCallback) => {
    this.setState({
      ...this.state,
      mutationCallback
    })
  }

  render() {
    return (
      <div className="chatWrapper">
        <OnlineUsers userId={this.props.userId} /> 
        <div className="wd75">
          <RenderMessages
            refetch={this.props.refetch}
            setRefetch={this.props.setRefetch}
            setMutationCallback={this.setMutationCallback}
            username={this.props.username}
            userId={this.props.userId}

          />
          <Textbox
            username={this.props.username}
            mutationCallback={this.state.mutationCallback}
            userId={this.props.userId}
          />
        </div>
      </div>
    );
  }
}

const fetchOnlineUsers = gql`
  subscription ($timestamp: timestamptz!, $selfId: Int ) {
    user (
      where: {
        _and: {
          actions: {
            last_seen: {
              _gt: $timestamp
            }
          },
          id: {
            _neq: $selfId
          }
        }
        
      }
    ){
      id
      username
    }
  }
`;

const OnlineUsers = (props) => {
  return (
    <Subscription
      subscription={fetchOnlineUsers}
      variables={{
        timestamp: moment().subtract(10, 'seconds').format(),
        selfId: props.userId
      }}
    >
      {
        ({data, error, loading}) => {
          if (loading) { return "Loading"; }
          if (error) { return "Error loading online users"; }
          return (
            <div className="wd25 onlineUsers">
              <p className="userListHeading"> Online Users </p>
              <ul className="userList">
                {
                  data.user.map((u) => {
                    return <li key={u.id}>u.username</li>
                  })
                }
              </ul>
            </div>  
          );
        }
      }
    </Subscription>
  )
}
