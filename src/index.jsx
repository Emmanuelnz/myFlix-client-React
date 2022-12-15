import React from 'react';
import ReactDOM from 'react-dom';

// React-bootstrap imports 
import { Container } from 'react-bootstrap';

// View imports 
import { MainView } from './components/main-view/main-view';

// Import bundle statement `./index.scss`
import './index.scss';

// Main component
class MyFlixApplication extends React.Component {
  render() {

    return (
      <Container className='app-ctnr'>
        <MainView />
      </Container>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);