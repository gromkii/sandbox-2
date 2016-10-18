import React, { Component } from 'react'

class Main extends Component {
  render(){
    return (
      <section>
        {this.props.children}
      </section>
    )
  }
}



export default Main
