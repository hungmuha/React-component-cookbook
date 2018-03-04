import PropTypes from 'prop-types';
/* eslint-disable no-param-reassign */
import React from 'react';
import { pick } from 'lodash';
import 'font-awesome/css/font-awesome.css';
import moment from 'moment';

const styles = require('./Messages.css');

class Messages extends React.Component {
  //static prop can only be access thru the class not thru the instance of the class
  static propTypes = {
    users: PropTypes.array.isRequired,
    initialActiveChatIdx: PropTypes.number,
    messages: PropTypes.array.isRequired,
  };
// PropTypes are a way to validate the values that are passed in through our props. 
// Well-defined interfaces provide us with a layer of safety at the run time of our apps. 

  static childContextTypes = {
    users: PropTypes.array,
    userMap: PropTypes.object,
  };
// Instead, specifying context allows us to automatically pass down variables from component to component, 
// rather than needing to pass down our props at every level,

// In order to tell React we want to pass context from a parent component to the rest of its children 
// we need to define two attributes in the parent class:
// • childContextTypes and • getChildContext

  static defaultProps = {
    initialActiveChatIdx: 0,
  };

  state = {
    currentChatIndex: this.props.initialActiveChatIdx,
  };
//getChildContext got call everytime state or prop change
// If the context is updated, then the children will receive the updated context and will subsequently be re-rendered.
  getChildContext() {
    return {
      users: this.getUsers(),
      userMap: this.getUserMap(),
    };
  }

  getUsers = () => {
    const users = this.props.users
      .map(m => pick(m, [ 'uuid', 'username', 'avatar', 'lastOnline' ]))
      .sort((a, b) => moment(a.lastOnline).isBefore(b.lastOnline));
    return users;
  };

  getUserMap = () => {
    // Should be elsewhere
    return this.props.users.reduce(
      (memo, u) => {
        memo[u.uuid] = u;
        return memo;
      },
      {}
    );
  };

  selectChat = (idx) => {
    this.setState({
      currentChatIndex: idx,
    });
  };

  render() {
    const { currentChatIndex } = this.state;
    const currentChat = this.props.messages[currentChatIndex];
    return (
      <div className={styles.container}>
        {/* navbar */}
        <ThreadList onClick={this.selectChat} />
        <ChatWindow messages={currentChat} />
      </div>
    );
  }
}

export default Messages;

