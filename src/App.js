import React, { Component } from 'react';
import Navigation from './Component/Navigation/Navigation.js';
import Logo from './Component/Logo/Logo.js';
import Face from './Component/Face/Face.js';
import ImageLinkForm from './Component/ImageLinkForm/ImageLinkForm.js';
import Rank from './Component/Rank/Rank.js';
import SignIn from './Component/SignIn/SignIn.js';
import Register from './Component/Register/Register.js';
import Particles from 'react-particles-js';
import './App.css';


const particleParams =  {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: '#ffffff',
    line_linked:
    {
      enable: true,
      color: '#ffffff',
      opacity: 0.4
    },
    move: {
      speed: 5,
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (user) =>
  {
    this.setState({user: {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      entries: user.entries,
      joined: user.joined
    }});
  }

  calculateFacelocation = (data) => {
    const clarifai = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifai.left_col * width,
      rightCol: width - (clarifai.right_col * width),
      topRow: clarifai.top_row * height,
      bottomRow: height - (clarifai.bottom_row * height),
    }
  }

  displayFacebox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onDetect = () => {
    this.setState({imageUrl: this.state.input});
     fetch('https://nameless-thicket-45432.herokuapp.com/imageurl', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
      .then(response => response.json())
      .then(response => {
      if(response){
        fetch('https://nameless-thicket-45432.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(err => {console.log(err)});
      }
      this.displayFacebox(this.calculateFacelocation(response))
      }
    )
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    this.setState({route: route}, () => {
        if(this.state.route==='signout')
    {
      this.setState(initialState);
      this.setState({route: 'signin'});
    }
    else if(this.state.route==='home')
    {
      this.setState({isSignedIn: true});
    }
    });
  }

  render() {

    const { isSignedIn, imageUrl, route, box } = this.state;

    return(
      <div className="App">
        <Particles 
        className = "particles"
        params={particleParams} 
        />
        <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange}/>
        {route === 'home' ?
            <>
              <Logo />
              <Rank name = {this.state.user.name} entries = {this.state.user.entries} />
              <ImageLinkForm onInputChange = {this.onInputChange} onDetect = {this.onDetect}/>
              <Face box = {box} imageUrl = {imageUrl}/>
            </>
            :(route === 'signin'
            ?<SignIn loadUser = {this.loadUser} onRouteChange = {this.onRouteChange} />
            :<Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
