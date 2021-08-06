import {React, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Storage } from "aws-amplify";

function ListPdf() 
{
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }) 
    {
      setNumPages(numPages);
    }

    const state = { fileUrl: ''}

    function componentDidMount()
    {
        Storage.list('public/aws-cli.pdf')
        .then(result => this.setState({
                fileUrl: result
        }) )
        .catch(err => console.log('error fetching document' + err));
    } 

    
    return (
        <div>
          <Document
            file= {state.fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}>

            <Page pageNumber={pageNumber} />
          </Document>
          <p>Page {pageNumber} of {numPages}</p>
        </div>
      );
    }
    export default ListPdf;