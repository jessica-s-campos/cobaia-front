import './App.css';
import logo from './logo.svg';
//import Home from './componentes/home/home';
import Main from './../src/componentes/main/main';


function App(env) {

  return (
    <div className="App">
      {/*<img src={logo} className="App-logo" alt="logo" />*/}     
      <Main></Main>
    </div>
  );
}

export default App;
