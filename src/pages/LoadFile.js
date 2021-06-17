import { React, useState, useEffect, Fragment } from 'react';
import { withAuthenticator} from '@aws-amplify/ui-react'
import { API, Storage} from 'aws-amplify';
import { listTodos } from '../graphql/queries';
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from '../graphql/mutations';
import { Button } from "react-bootstrap";

// create function to work with Storage

const initialFormState = { nombrearchivo: '', tipoarchivo:'', archivo: ''}


function LoadFile() 
{
  const [notas, setNotas] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  //var categoria= ['Sistemas', 'TICS'];
  //var subcategoria= ['Bases de datos', 'Programación', 'Redes'];
  //var subsubcategoria= ['NoSQL', 'POO', 'Hacking'];


  useEffect(() => 
  {
  fetchNotes();
   }, []);


  //Esta función utiliza el tipo de API para enviar una consulta a la API de GraphQL 
  //y recuperar una lista de notas.
   async function fetchNotes() 
  {
    const apiData = await API.graphql({ query: listTodos });
    const notesFromAPI = apiData.data.listTodos.items;
    await Promise.all(notesFromAPI.map(async nota => 
      {
      if (nota.archivo) 
      {
        const file = await Storage.get(nota.archivo);
        nota.archivo = file;
      }
      return nota;
    }))
    setNotas(apiData.data.listTodos.items);
   }


async function createTodo() 
{
    if (!formData.nombrearchivo || !formData.tipoarchivo) return;
    await API.graphql({ query: createTodoMutation, variables: { input: formData } });
    try
   { 
     if (formData.archivo) 
     {
      const file = await Storage.get(formData.archivo);
      formData.file = file;
     }
     setNotas([ ...notas, formData ]);
     setFormData(initialFormState);
   }
   catch(error)
   {
     console.log('Error uploading file', error);
   }
}

 /*async function deleteTodo({ id }) 
 {
   const newNotesArray = notas.filter(nota => nota.id !== id);
   setNotas(newNotesArray);
   await API.graphql({ query: deleteTodoMutation, variables: { input: { id } }});
 } */

 async function onChange(e) 
 {
  if (!e.target.files[0]) return
  const file = e.target.files[0];
  setFormData({ ...formData, nombrearchivo: file.name, tipoarchivo: file.type, archivo:file.name});
  await Storage.put(file.name, file);
  fetchNotes();
}

return(
<div className="LoadFile">
     
<h2>Subir archivos</h2>

  <Fragment>
     
      <div className="form-group">
        <label htmlFor="example3">Nombre</label>
        <input type="text" id="example3" className="form-control form-control-sm" 
        onChange={e => setFormData({ ...formData, 'nombrearchivo': e.target.value})}
        value={formData.nombrearchivo}
        />
      </div>

      <div className="form-group">
        <label htmlFor="example3">Tipo de archivo</label>
        <input type="text" id="example3" className="form-control form-control-sm" 
          onChange={e => setFormData({ ...formData, 'tipoarchivo': e.target.value})}
          value={formData.tipoarchivo}
        />
      </div>


      <div className="form-group">
        <label htmlFor="example3">Archivo</label>
        <input type="file" id="example3" className="form-control form-control-sm" 
        accept="image/*, video/*, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={onChange}
        multiple />
      </div>

      <br />

      <div className="form-group">
      <Button onClick={createTodo}>Subir archivo</Button>
      </div>

    </Fragment>


      </div>
    );

  }

export default withAuthenticator(LoadFile, API,Storage);