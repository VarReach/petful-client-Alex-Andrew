import React from 'react';

export default class AdoptPage extends React.Component{
    handleOnSubmit = (e) => {
      e.preventDefault();
      const firstName = e.target['register__first-name'].value;
      const lastName = e.target['register__last-name'].value;
      e.target['register__first-name'].value = '';
      e.target['register__last-name'].value = '';
      console.log(firstName, lastName);
    }

    render(){
        return(
            <div>
              <form className="register__form" onSubmit={this.handleOnSubmit}>
                <label htmlFor="register__first-name">Enter your first name:</label>
                <input type="text" id="register__first-name" placeholder="John"/>
                <label htmlFor="register__last-name">Enter your first name:</label>
                <input type="text" id="register__last-name" placeholder="Smith"/>
                <button type="submit">Submit</button>
              </form>
            </div>
        );
    }
}