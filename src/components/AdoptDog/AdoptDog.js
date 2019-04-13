import React from "react";
import config from "../../config";

export default class AdoptDog extends React.Component {
  state = {
    error: null,
    dog: {}
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
        if (data.message) {
          this.setState({ error: data.message });
          return;
        }
        this.setState({ dog: data });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  adoptDog = () => {
    const user_name = window.sessionStorage.getItem(config.USER_KEY);
    return fetch(`${config.API_ENDPOINT}/dog`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ user_name, name: this.state.dog.name })
    })
      .then(this.getDog)
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  render() {
    const dog = this.state.dog;
    if (this.state.error) {
      return (
        <div className="dogs-slide-container">
          <h2>{this.state.error}</h2>
        </div>
      );
    }
    return (
      <div className="dogs-slide-container">
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
