import { React, useState } from "react";
import { Document, Page } from "react-pdf";
import { Storage, API } from "aws-amplify";
import { listTodos } from '../graphql/queries';

function ListPdf() 
{
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [docs, setDocs] = useState([]);
  const [docsURL, setDocsURL] = useState('');
  const state = { fileUrl: '' };

  async function onDocumentLoadSuccess({ numPages }) 
  {
    setNumPages(numPages);
  }


  async function componentDidMount() 
  {
     Storage.list("public/ArquitecturaDataLake.pdf")
      .then((result) => this.setState({
        fileUrl: result
      })

      )
      .catch((err) => console.log("error fetching document" + err));
  }


  //const docsFilePath = docs[state.fileUrl].rutadocumento;
  //const signedURL= docs[Storage.get("public/", {download: true}, {level: 'public'})]

 /*try {
    const fileAccessURL = Storage.get("public/", { expires: 60 });
    console.log('access url', fileAccessURL);
    setDocsURL(fileAccessURL);
    return;
  } catch (error) 
  {
    console.error('error accessing the file from s3', error);
    setDocsURL('');
  } */ 

   async function listDocs(id) 
 {
   const newNotesArray = docs.filter(doc => doc.id !== id);
   setDocs(newNotesArray);
   await API.graphql({ query: listTodos, variables: { input: { id } }});
 } 


  return (
    <div>
      <Document
        file={state.fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
  
    </div>
  );

}

export default ListPdf;
