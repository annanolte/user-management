import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import UserTable from './components/UserTable';
import './App.css';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <UserTable />
    </Provider>
  );
};

export default App;
