import { React, useState } from "react";
import { Document, Page } from "react-pdf";
import { Storage } from "aws-amplify";

function ListPdf() 
{
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const state = { fileUrl: ''};

  async function onDocumentLoadSuccess({ numPages }) 
  {
    setNumPages(numPages);
  }


  async function componentDidMount() 
  {
      Storage.get('public/aws-cli.pdf')
      .then((result) => this.setState({
          fileUrl: result,
        })
      )
      .catch((err) => console.log("error fetching document" + err));
  }

  return (
    <div>
    <Document
     file = {state.fileUrl}
      onLoadSuccess={onDocumentLoadSuccess}>
      <Page pageNumber={pageNumber} />
    </Document>
    <p>Page {pageNumber} of {numPages}</p>

    <a href = {state.fileUrl} target = "_blank">Download Pdf</a>
  </div>
  );
}
export default ListPdf;
