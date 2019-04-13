import React from "react";
import config from '../../config';

export default class HomePage extends React.Component {
  state = {
    error: null,
    cat: {},
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
        if(data.message && data.message === 'No cats left in queue'){
            this.setState({ error: data.message });
            return;
        }
        this.setState({ cat: data });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  adoptCat = () => {
    return fetch(`${config.API_ENDPOINT}/cat`, {
      method: 'DELETE'
    })
      .then(this.getCat)
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const cat = this.state.cat;
    return (
      <div>
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
