import React, { Component } from 'react';
import FileViewer from 'react-file-viewer';
import { Storage} from 'aws-amplify';
//import { CustomErrorComponent } from 'custom-error';
//import logger from 'logging-library';

//const file = 'http://example.com/image.png'
//const type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
const type = 'application/pdf'

class MyDocs extends Component 
{

    state = { fileUrl: ''}

    //Consulta en el bucket la imagen para desplegarla en la pantalla
    componentDidMount()
    {
        Storage.list("public/")
        .then(result => this.setState({
                fileUrl: result
        }) )
        .catch(err => console.log('error fetching image' + err));
    } 

  render() 
  {
    return (
      <FileViewer
        fileType={type}
        filePath={this.state.fileUrl}
        //errorComponent={CustomErrorComponent}
        onError={this.onError}/>
    );
  }

  onError(e) 
  {
    //logger.logError(e, 'error in file-viewer');
  }
}

export default MyDocs;