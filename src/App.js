import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import logo from './logo.svg';

import './Client/css/allStyle';
import AllPages from "./Client/Components/AllPages"



function App() {
  return (
      <div style={{ backgroundImage: "url(./Client/images/background/musicBackground.jpg)"} }>
          <AllPages/>
      </div>
    // <div className="App">
    //   <header className="App-header">
    //     {/*<img src={logo} className="App-logo" alt="logo" />*/}
    //     {/*<p>*/}
    //     {/*  Edit <code>src/App.js</code> and save to reload.*/}
    //     {/*</p>*/}
    //     {/*<a*/}
    //     {/*  className="App-link"*/}
    //     {/*  href="https://reactjs.org"*/}
    //     {/*  target="_blank"*/}
    //     {/*  rel="noopener noreferrer"*/}
    //     {/*>*/}
    //     {/*  Learn React*/}
    //     {/*</a>*/}
    //
    //
    //   </header>
    // </div>
  );
}

export default App;
