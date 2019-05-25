import React from 'react';
import ReactDOM from 'react-dom';

class Base extends React.Component {
    render() {
        return (
         <h1>biba</h1>
        );
    }
}

const domContainer = document.getElementById('main');
ReactDOM.render(<Base />, domContainer);