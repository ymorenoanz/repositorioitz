import { withAuthenticator, AmplifyS3Album } from "@aws-amplify/ui-react";
import { render } from "@testing-library/react";
import { Storage } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Component } from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { AmplifyS3Text, AmplifyS3TextPicker } from '@aws-amplify/ui-react';
import { DataGrid } from '@material-ui/data-grid';
import { listTodos } from "../graphql/queries";
import { API } from 'aws-amplify';


class ListDocs extends Component 
{
  state = { fileUrl: "" };

  constructor(props) 
  {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  //Consulta en el bucket el documento para desplegarla en la pantalla
  componentDidMount()
  {
      Storage.list("public/")
      .then(result => 
        this.setState({
              fileUrl: result
      }) )
      .catch(err => console.log('error fetching document' + err));
  }


/*  async function componentDidMount() 
  {
    Storage.get('public/ArquitecturaDataLake.pdf', { download: true })
      .then(result => this.setState({
        fileUrl: result.forEach(item => console.log(item))
      }))
      .catch(err => console.error(err))
  } */


  render()
  {
    return (
      <a href="./PDF" target="_blank"> <button>Ir a PDF</button></a>

    )

  }
}

export default withAuthenticator(ListDocs, AmplifyS3Text);
