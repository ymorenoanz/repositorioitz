import './App.css';
import React from 'react'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/Global';
import { theme } from './styles/Theme';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LoadFile from './pages/LoadFile';
import Menu from './components/Menu';
import Home from './pages/Home';
import ListImage from './pages/ListImage';
import ListDocs from './pages/ListDocs';
import ListDocuments from './pages/ListDocuments';
import ListPdf from './pages/ListPdf';
import MyDocs from './pages/MyDocs';

function App() 
{
  return (
    <div className="App">
      <header>
      <h1>Repositorio ITZ</h1>
      <br />
      <Menu></Menu>
      </header>
  
      <br />

     <Router>
       <div>
       <Route path={'/Home'} component={Home}></Route>
       <Route path={'/LoadFile'} component={LoadFile}></Route>
       <Route path={'/ListImage'} component={ListImage}></Route>
       <Route path={'/ListPdf'} component={ListPdf}></Route>
       <Route path={'/Logout'} component={AmplifySignOut}></Route>
       </div>

     </Router>

      <ThemeProvider theme={theme}>
      <>
      <GlobalStyles />
      </>
    </ThemeProvider>
    </div>
  );
}

export default withAuthenticator(App, Menu);

