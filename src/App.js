import logo from './logo.svg';
import './App.css';
import Routes from './routes/Routes';
import AuthContextProvider from './contextProvider/authContextProvider';

import ToastMessegeProvider from './contextProvider/toastMessegeProvider';
function App() {
  return (
    <div className='App'>
      <AuthContextProvider>
        <ToastMessegeProvider>
          <Routes />
        </ToastMessegeProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
