import React from 'react';
import { Query } from 'react-apollo';
import '../App.js';
import Banner from './Banner';
import MessageList from './MessageList';
import { fetchMessages } from '../graphqlQueries';

export default class RenderMessages extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [
        {'username': 'user1', text: 'message one', id: 1},
        {'username': 'user1', text: 'message two', id: 2}
      ],
      newMessages: [],
      error: null,
    }
  }

  async componentWillMount() {
    // set mutation callback to update messages in state after mutation
    this.props.setMutationCallback(this.mutationCallback);
  }


  componentDidMount() {
    // add scroll listener on mount
    window.addEventListener("scroll", this.handleScroll);
  }


  componentDidUpdate() {
    // if there are no new messages in the state, scroll to bottom
    if (this.state.newMessages.length === 0) {
      this.scrollToBottom();
    } 
  }

  componentWillUnmount() {
    // remove scroll listener on unmount
    window.removeEventListener("scroll", this.handleScroll);
  }


  // scroll to bottom
  scrollToBottom = () => {
    document.getElementById('lastMessage').scrollIntoView({ behavior: "instant" });
  }

  // scroll to the new message
  scrollToNewMessage = () => {
    document.getElementById('newMessage').scrollIntoView({ behavior: "instant" });
  }

  // scroll handler
  handleScroll = (e) => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.getElementById("chatbox");
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.setState({
        ...this.state,
        bottom: true
      })
    } else {
      if (this.state.bottom) {
        this.setState({
          ...this.state,
          bottom: false
        });
      }
    }
  }

  // check if the view is scrollable
  isViewScrollable = () => {
    const isInViewport = (elem) => {
      const bounding = elem.getBoundingClientRect();
      return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };
    if (document.getElementById('lastMessage')) {
      return !isInViewport(document.getElementById('lastMessage'));
    }
    return false;
  }

  render() {
    const { messages, newMessages, bottom } = this.state;
    // set refetch in parent component for refetching data whenever an event occurs
    if (!this.props.refetch && this.state.refetch) {
      this.props.setRefetch(this.refetch);
    }
    return (
      <div id="chatbox"> 
        { /* show "unread messages" banner if not at bottom */}
        {
          (!bottom && newMessages.length > 0 && this.isViewScrollable()) ?
          <Banner
             scrollToNewMessage={this.scrollToNewMessage}
             numOfNewMessages={newMessages.length}
           /> : null
        }

        { /* Render old messages */}
        <MessageList
          messages={messages}
          isNew={false}
          username={this.props.username}
        />
        { /* Show old/new message separation */}
        <div
          id="newMessage"
          className="oldNewSeparator"
        >
          {
            newMessages.length !== 0 ?
            "New messages" :
            null
          }

        </div>

        { /* render new messages */}
        <MessageList
          messages={newMessages}
          isNew={true}
          username={this.props.username}
        />
        { /* Bottom div to scroll to */}
      </div>
    );
  }
}



