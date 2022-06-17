import './App.css';
import GobalContextProvider from './Hools/GobalContext';
import MyRoutes from './MyRoutes';
//import {createStore} from 'redux';
//import { Provider } from 'react-redux';
//import itemReducer from './reduces/itemReducer';

//import Display from'./pages/Display';
// import First from './pages/First';
// import Second from './pages/Second';

//const store = createStore(itemReducer)

function App() {
  return (
    //<GobalContextProvider>
    //<Provider store={store}>
    //{/* <div className="App"> */}
    <div>
   <MyRoutes/>
   </div>

  // {/* <Display/> */}
   // {/* </div> */}
    //</Provider>
    //</GobalContextProvider>
    
  );
}

export default App;


