import React, { Component } from 'react';
import './App.css'
import axios from 'axios'


class App extends Component {
  constructor() {
    super()
    this.state = {
      user: [],
      userText: '',
      follower: []
    }
  }

  componentDidMount() {
    axios.all([
      axios.get( 'https://api.github.com/users/codeasaglacier' ),
      axios.get( 'https://api.github.com/users/codeasaglacier/followers' ) 
    ])
    
      .then(axios.spread((res, fol) => {
        this.setState({
          user: res.data
        })
        fol.data.forEach(flwr => {
          axios
            .get( `https://api.github.com/users/${flwr.login}` )
            .then( resp => {
              console.log('Resp: ', resp.data)
              this.setState({
                follower: resp.data
              })
            })
        })
      }))
      .catch( err => console.log( 'componentDidMount Error: ', err ) )
  }
  
  handleChange = e => {
    this.setState( { 
      userText: e.target.value 
    } )
    console.log( 'This is state: ', e.target.value )
  }


  render() {

    return (
      <div className="App">
          <h1>React Github User Cards</h1>
        <div>
          <img 
            src = { this.state.user.avatar_url } 
            alt = { this.state.user.login }
          />
          <div>
            <p>Username: { this.state.user.login }</p>
            <p>Bio: { this.state.user.bio }</p>
            <p>Followers: {this.state.user.followers}</p>
            <p>Following: {this.state.user.following}</p>
          </div>
        </div>
        <input
          type = 'text'
          value = { this.state.login }
          onChange = { this.handleChange }
        />
        <div>
          { this.state.follower.map(foll => (
            <div>
              <img 
                src = { foll.avatar_url }
                alt = { foll.login }
              />
              <div>
                <p>Username: { foll.login }</p>
                <p>Bio: { foll.bio }</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}




export default App;
