import React from 'react';

export default class Home extends React.Component{
    
    render(){
        return(
            <div>
                <h2>
                    Welcome to Adopt a Pet-o-Rama 5001! 
                </h2>
                <p>
                    To start, click on the Adopt button. Enter your contact details to be entered into our queue.
                    Once you have reached the front of the line, you will be presented with an amazing and fluffy
                    (most likely) cat and dog that are both ready to be adopted! You can choose to adopt one or the
                    other, or both, and bring them back to their dream home. 
                </p>
                <button type="button">Start</button>
            </div>
        );
    }
}