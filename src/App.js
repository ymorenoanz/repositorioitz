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
import ListPdf from './pages/ListPdf';
import MyDocs from './pages/MyDocs';
import TablaResult from './pages/TablaResult';
import PDF from './pages/PDF';
import Footer from './components/Footer';
import DownloadFiles from './pages/DownloadFiles';
import DataGrid from './pages/DataGrid';
import Buscador from './pages/Buscador';
import {Amplify, Auth} from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);
Auth.configure(config);

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
       <Route path={'/DataGrid'} component={DataGrid}></Route>
       <Route path={'/Buscador'} component={Buscador}></Route>
       <Route path={'/Logout'} component={AmplifySignOut}></Route>
       <Route exact path='/PDF' component={PDF}/>
       </div>

     </Router>

      <ThemeProvider theme={theme}>
      <>
      <GlobalStyles />
      </>
    </ThemeProvider>

    <Footer /> 
    </div>
  );
}

export default withAuthenticator(App, Menu);

