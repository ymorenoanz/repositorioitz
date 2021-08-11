import { withAuthenticator, AmplifyS3Album } from "@aws-amplify/ui-react";
import { render } from "@testing-library/react";
import { Storage } from "aws-amplify";
import React from "react";
import { Component } from "react";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { AmplifyS3Text, AmplifyS3TextPicker} from '@aws-amplify/ui-react';

class ListDocs extends Component 
{
    state = { fileUrl: ''}

   //Consulta en el bucket el documento para desplegarla en la pantalla
   componentDidMount()
   {
       Storage.get('public/')
       .then(result => this.setState({
               fileUrl: result
       }) )
       .catch(err => console.log('error fetching document' + err));
   } 

   processStorageList(result) 
   {
    const filesystem = {}
    // https://stackoverflow.com/questions/44759750/how-can-i-create-a-nested-object-representation-of-a-folder-structure
    const add = (fileUrl, target, result) => {
      const elements = fileUrl.split("/");
      const element = elements.shift();
      if (!element) return // blank
      target[element] = target[element] || {__data: result}// element;
      if (elements.length) 
      {
        target[element] = typeof target[element] === "object" ? target[element] : {};
        add(elements.join("/"), target[element], result);
      }
    };
    result.forEach(result => add(result.key, filesystem, result));
    return filesystem
  }

  render() 
  {
    return(
      <div className="docsViewer">
      <label htmlFor="example3">Documentos</label>
      <div>
      <AmplifyS3Text path={this.state.fileUrl} contentType="application/pdf"/>
      <AmplifyS3TextPicker contentType="pdf"/>
      </div> 
   </div> 
    ) 
    
  }
}

export default withAuthenticator(ListDocs, AmplifyS3Text);
