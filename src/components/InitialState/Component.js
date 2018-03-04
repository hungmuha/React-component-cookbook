import React from 'react'

class InitialStateComponent extends React.Component {
  
  // Defining state on our component requires us to set an instance variable called this.state in the object prototype class. 
  // In order to do this, it requires us to set the state in one of two places,
  // either as a property of the class or in the constructor.

  constructor(props) {
    super(props)

    this.state = {
      currentValue: 1,
      currentUser: {
        name: 'Ari'
      }
    }
  }

  render() {
    return (
      <div>I am a Component</div>
    )
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props)

    this.state = 0
  }
}

export default InitialStateComponent
