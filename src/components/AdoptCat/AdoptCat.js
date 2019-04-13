import React from "react";
import config from "../../config";

export default class AdoptCat extends React.Component {
  state = {
    error: null,
    cat: {}
  };

  componentDidMount() {
    this.getCat();
  }

  getCat = () => {
    return fetch(`${config.API_ENDPOINT}/cat`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          this.setState({ error: data.message });
          return;
        }
        this.setState({ cat: data });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  adoptCat = () => {
    const user_name = window.sessionStorage.getItem(config.USER_KEY);
    return fetch(`${config.API_ENDPOINT}/cat`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ user_name, name: this.state.cat.name })
    })
      .then(this.getCat)
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  render() {
    const cat = this.state.cat;
    if (this.state.error) {
      return (
        <div className="cats-slide-container">
          <h2>{this.state.error}</h2>
        </div>
      );
    }
    return (
      <div className="cats-slide-container">
        <img
          className="cats-slide-picture"
          src={cat.imageUrl}
          alt={cat.imageDescription}
        />
        <h3 className="cats-slide-name">{cat.name}</h3>
        <p className="cats-slide-story">{cat.story}</p>
        <button type="button" onClick={this.adoptCat}>
          Adopt
        </button>
      </div>
    );
  }
}
