
import { withAuthenticator, AmplifyS3Album, AmplifyS3ImagePicker} from '@aws-amplify/ui-react';
import { render } from '@testing-library/react';
import { Storage} from 'aws-amplify';
import React from 'react';
import { Component } from 'react';
import {BrowserRouter, Switch, Route}  from 'react-router-dom';

//const App = () => <AmplifyS3Album />;

 class ListImage extends React.Component
{
    state = { fileUrl: ''}

    //Consulta en el bucket la imagen para desplegarla en la pantalla
    componentDidMount()
    {
        Storage.get('public/')
        .then(result => this.setState({
                fileUrl: result
        }) )
        .catch(err => console.log('error fetching image' + err));
    } 

     onImageSelected(event)
    {
      this.selected.emit(event);
    }


    render()
    {
        return(
         <div className="albumViewer">
            <label htmlFor="example3">Imagen</label>
            <div>
            <AmplifyS3Album path={this.state.fileUrl} picker selected={this.onImageSelected}/>
            </div> 
         </div>   
        )
    }


}

export default withAuthenticator(ListImage, AmplifyS3Album);


