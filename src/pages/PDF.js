import React, { Component } from 'react';
import { Storage } from 'aws-amplify';

class PDF extends Component 
{

    state = { fileUrl: '' };

    constructor(props) 
    {
      super(props);
      this.state = { value: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) 
    {
      this.setState({ value: event.target.value });
    }

    handleSubmit(event) 
    {
      alert("A name was submitted: " + this.state.value);
      event.preventDefault();
    }

    componentDidMount()
   {
      Storage.list('ArquitecturaDataLake.pdf')
      .then(result => 
        this.setState({
              fileUrl: result
      }) )
      .catch(err => console.log('error fetching document' + err));
   }

  downloadPDF()
  {
    const signedURL = Storage.get("public/");
  }
    
    render() {
        return (
            <div style={{position: 'absolute', width: '100%', height: '100%'}}>
                <object
                data={this.state.fileUrl}
                type="application/pdf"
                width="100%"
                height="100%"
                >
                  
                </object>
            </div>
        );
    }
}

export default PDF;