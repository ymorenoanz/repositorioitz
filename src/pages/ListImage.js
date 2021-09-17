import { Storage } from 'aws-amplify';
import { withAuthenticator, AmplifyS3Album, AmplifyS3ImagePicker } from '@aws-amplify/ui-react';
import { render } from '@testing-library/react';
import React from 'react';
import { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { listTodos } from "../graphql/queries";

//const App = () => <AmplifyS3Album />;

class ListImage extends React.Component 
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

  //Consulta en el bucket la imagen para desplegarla en la pantalla
  componentDidMount() 
  {
    Storage.list("public/")
      .then((result) =>
        this.setState({
          fileUrl: result,
        })
      )
      .catch((err) => console.log("error fetching image" + err));
  }

  onImageSelected(event) 
  {
    this.selected.emit(event);
  }

 /* async listImages(id) 
  {
    const newNotesArray = notes.filter((note) => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: listTodos, variables: { input: { id } } });
  } */

  render() {
    return (
      <div className="albumViewer">

        <div style={{position: 'absolute', width: '100%', height: '100%'}}>
          <AmplifyS3Album
            path={this.state.fileUrl}
            picker
            selected={this.onImageSelected}
          />
        </div>
      </div>
    );
  }
}

export default withAuthenticator(ListImage, AmplifyS3Album);


