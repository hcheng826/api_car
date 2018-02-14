import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import store from './store/configureStore';

// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './styles/css/style.css'
// Temp fix for reactstrap
import './styles/css/dropdown-menu-right.css'

// Containers
import Full from './containers/Full/'

ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" name="Home" component={Full}/>
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('root'));
