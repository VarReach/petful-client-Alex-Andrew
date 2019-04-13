import React from 'react';
import UserApiService from '../services/users-api-service';

export default class AdoptPage extends React.Component{
    constructor(props) {
      super(props);
      this.state = { 
        error: null,
        first_error: null,
        last_error: null,
        first_name: '',
        last_name: '',
      };
    }

    handleOnSubmit = (e) => {
      e.preventDefault();
      const firstName = this.state.first_name;
      const lastName = this.state.last_name;
      const verifyFirst = this.verifyName(firstName);
      const verifyLast = this.verifyName(lastName);
      if (verifyFirst || verifyLast) {
        this.setState({ first_error: verifyFirst, last_error: verifyLast });
        return;
      }

      const user_name = firstName+' '+lastName;
      UserApiService.postUserToQueue({ user_name })
        .then(resp => {
          this.props.history.push('/adopt');
        })
        .catch(resp => {
          this.setState({ error: resp.message });
        });
    }

    verifyName(name) {
      if (name.length <= 1 || name.length >= 30) {
        return 'Name must be more than 1 character long and less than 30 characters long';
      } else if (/[^a-z]/i.test(name)) {
        return 'Name must contain only standard letters';
      } else {
        return null;
      }
    }

    handleChangeFirst = (e) => {
      const error = this.verifyName(e.target.value);
      this.setState({ first_name: e.target.value, first_error: error });
    }

    handleChangeLast = (e) => {
      const error = this.verifyName(e.target.value);
      this.setState({ last_name: e.target.value, last_error: error });
    }

    render(){
        return(
            <div className="form-container">
              <form className="register__form" onSubmit={this.handleOnSubmit}>
                {this.state.error && <p className="register__error">{this.state.error}</p>}
                <label htmlFor="register__first-name">Enter your first name:</label>
                <input type="text" id="register__first-name" value={this.state.first_name} onChange={this.handleChangeFirst} placeholder="John"/>
                {this.state.first_error && <p className="register__error">{this.state.first_error}</p>}
                <label htmlFor="register__last-name">Enter your first name:</label>
                <input type="text" id="register__last-name" value={this.state.last_name} onChange={this.handleChangeLast} placeholder="Smith"/>
                {this.state.last_error && <p className="register__error">{this.state.last_error}</p>}
                <button type="submit" disabled={this.state.error || this.state.first_error || this.state.last_error}>Submit</button>
              </form>
            </div>
        );
    }
}