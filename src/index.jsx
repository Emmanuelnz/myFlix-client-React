import React from 'react';
import ReactDOM from 'react-dom';

// Redux Imports
import { createStore } from "redux";
import { Provider } from "react-redux";
import { devToolsEnhancer } from 'redux-devtools-extension';

// Reducers Imports
import moviesApp from "./reducers/reducers";

// React-bootstrap imports 
import { Container } from 'react-bootstrap';

// Custom Components Imports 
import MainView from "./components/main-view/main-view";

// Custom SCSS 
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);