import React from 'react';
import UsersApiService from '../services/users-api-service';
import Loading from '../components/Loading/Loading';
import config from '../config';
import AdoptCat from '../components/AdoptCat/AdoptCat';
import AdoptDog from '../components/AdoptDog/AdoptDog';

export default class AdoptPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      error: null,
      queuePos: null,
    };
  }

  componentDidMount() {
    const user_name = window.sessionStorage.getItem(config.USER_KEY);
    if (!user_name) {
      this.props.history.push('/register');
    } else {
      this.getQueueUpdate(user_name);
    }
  }

  getQueueUpdate(user_name) {
    UsersApiService.getQueuePosition({ user_name })
      .then(resp => {
        this.setState({
          queuePos: resp
        }, () => {
          if (resp <= 1) {
            UsersApiService.clearTimeout();
          } else {
            UsersApiService.setTimeout(() => this.getQueueUpdate(user_name));
          }
        });
      })
      .catch(error => {
        if (error.message === 'User does not exist') {
          this.props.history.push('/register');
        } else {
          this.setState({ error: error.message });
        }
      });
  }

  removeSelfFromQueue = (e) => {
    e.preventDefault();
    fetch(`${config.API_ENDPOINT}/users`, {
      method: 'DELETE',
    })
      .then(resp => {
        this.props.history.push('/');
      });
  }

  render(){
    if (this.state.queuePos > 1) {
      return <Loading queuePos={this.state.queuePos}/>
    } else {
      return(
        <div>
          <AdoptCat/>
          <AdoptDog/>
          <button onClick={this.removeSelfFromQueue}>
            Finished!
          </button>
        </div>
      );
    }
  }
}