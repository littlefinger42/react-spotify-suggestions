import React from "react"
import Button from "./Button.jsx"

class App extends React.Component {
  render() {
    return <Button label="Test" handleClick={this.loginButtonClicked}/>
  }

  loginButtonClicked() {
    // TODO: Check to see if logged in already
    console.log('clicked')
  }
}

export default App
