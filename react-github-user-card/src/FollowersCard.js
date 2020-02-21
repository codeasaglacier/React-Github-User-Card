import React, { Component } from 'react'
import axios from 'axios'
import './App.css'


class FollowersCard extends Component {

  constructor( props ) {
    super( props )
    this.state = {
      follower: {}
    }
  }

  componentDidMount() {
    axios
      .get( `https://api.github.com/users/${this.props.follower.login}` )
      .then( res => this.setState( { follower: res.data } ) )
  }
  render() {
    return (
      <div className = 'myPicBox-follower'>
        <img
          className = 'myPic-follower'
          src = { this.state.follower.avatar_url }
          alt = { this.state.follower.login }
        />
        <div className = 'about-follower'>
          <p>Username: { this.state.follower.login }</p>
          { this.state.follower.bio && (
            <p>Bio: { this.state.follower.bio }</p>
          )}
          { this.state.follower.followers && (
            <p>Followers: { this.state.follower.followers }</p>
          )}
          { this.state.follower.following && (
            <p>Following: { this.state.follower.following }</p>
          )}
        </div>
      </div>
    )
  }
}

export default FollowersCard