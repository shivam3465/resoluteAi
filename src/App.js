import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import './app.scss';
import Header from './components/header/Header.jsx'
import Home from './components/home/Home.jsx'
import Login from './components/login/Login.jsx'
import Register from './components/register/Register.jsx'
import ResetPassword from './components/reset-password/ResetPassword.jsx'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">            
          <Router>      
            <Header/>  
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/> 
              <Route path='/forgot' element={<ResetPassword/>}/>
            </Routes>
          </Router>
          <ToastContainer/>          
      </div>
    </Provider>    
  );
}

export default App;
