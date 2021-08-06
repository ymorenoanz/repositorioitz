import { withAuthenticator, AmplifyS3Album } from "@aws-amplify/ui-react";
import { render } from "@testing-library/react";
import { Storage } from "aws-amplify";
import React from "react";
import { Component } from "react";
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

class ListDocs extends Component 
{
    state = { fileUrl: ''}

   //Consulta en el bucket el documento para desplegarla en la pantalla
   componentDidMount()
   {
       Storage.list('public/*.pdf')
       .then(result => this.setState({
               fileUrl: result
       }) )
       .catch(err => console.log('error fetching document' + err));
   } 

  render() 
  {
    return(
        <div style={{position:'absolute', width:'100%', height:'100%'}}>
        <label htmlFor="example3">PDF</label>
         <object data={require(this.state.fileUrl)}
         type="application/pdf"
         width="100%"
         height="100%"> 
         
         </object>

        </div>
    ) 
    
  }
}
