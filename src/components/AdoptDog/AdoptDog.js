import React from "react";
import config from '../../config';

export default class HomePage extends React.Component {
  state = {
    error: null,
    dog: {},
  };

  componentDidMount() {
    this.getDog();
  }

  getDog = () => {
    return fetch(`${config.API_ENDPOINT}/dog`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        if(data.message && data.message === 'No dogs left in queue'){
            this.setState({ error: data.message });
            return;
        }
        this.setState({ dog: data });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  adoptDog = () => {
    return fetch(`${config.API_ENDPOINT}/dog`, {
      method: 'DELETE'
    })
    .then(this.getDog)
    .catch(error => {
      this.setState({ error: error.message });
    });
  }

  render() {
    const dog = this.state.dog;
    return (
      <div>
        <img
          className="dogs-slide-picture"
          src={dog.imageUrl}
          alt={dog.imageDescription}
        />
        <h3 className="dogs-slide-name">{dog.name}</h3>
        <p className="dogs-slide-story">{dog.story}</p>
        <button type="button" onClick={this.adoptDog}>
          Adopt
        </button>
      </div>
    );
  }
}
