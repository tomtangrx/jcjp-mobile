import React from 'react-native';
import { Provider } from 'react-redux/native';
import configureStore from './lib/configureStore';

import App from './containers/App';

const store = configureStore();

class Root extends React.Component {
  render () {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    )
  }
}

export default Root;
