import { React, useState, useEffect, Fragment } from 'react';
import { withAuthenticator} from '@aws-amplify/ui-react';
import { API, Storage} from 'aws-amplify';
import { listTodos } from '../graphql/queries';
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from '../graphql/mutations';
import { Button} from "react-bootstrap";
import Select from 'react-select';
import { black } from 'chalk';
//import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

// create function to work with Storage

const initialFormState = { nombrearchivo: '', tipoarchivo:'', archivo: '', tamanoarchivo: parseFloat,
categoria:'', subcategoria:'', subsubcategoria:'', rutadocumento:''}


function LoadFile() 
{
  const [notas, setNotas] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  //const [value, setValue] =useState();
  /*const onDropdownChange = (value) => {
    setValue(value);
  } */
  /*const [dropdown, setDropdown]=useState(false);
  const abrirCerrarDropdown=() => {
    setDropdown(!dropdown);
  } */

  const categoria = [
    { label: "Sistemas", value: "Sistemas",color: black},
    { label: "TICS", value: "TICS", color:black},
    { label: "Bioquímica", value: "Bioquímica", color:black},
    { label: "Civil", value: "Civil", color:black},
  ];

  const subcategoria = [
    { label: "Bases de datos", value: "Bases de datos", color:black },
    { label: "Programación", value: "Programación", color:black },
    { label: "Redes", value: "Redes", color:black},
    { label: "Química", value: "Química", color: black},

  ];

  const subsubcategoria = [
    { label: "NoSQL", value: "NoSQL" ,color: black},
    { label: "POO", value: "POO" },
    { label: "Hacking", value: "Hacking" },

  ];

  
  const [result, ddlvalue] =useState(categoria.label);
  const ddHandler = e =>
  {
     ddlvalue(e.value); 
  } 


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

//Esta función crea un archivo JSON y guarda los metadatos del archivo
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


 //Esta función maneja la carga del archivo
 async function onChange(e) 
 {
  if (!e.target.files[0]) return
  const file = e.target.files[0];
  await Storage.put(file.name, file);
  const signedURL = await Storage.get(file.name); //URL del objeto
  setFormData({ ...formData, nombrearchivo: file.name, tipoarchivo: file.type, tamanoarchivo: file.size,
    archivo:file.name, rutadocumento:signedURL});
  fetchNotes();
 }

 function handleChange(e) 
 {    
  this.setState({value: e.target.value});  
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
        <label htmlFor="example3">Tamaño de archivo</label>
        <input type="text" id="example3" className="form-control form-control-sm" 
          onChange={e => setFormData({ ...formData, 'tamanoarchivo': e.target.value})}
          value={formData.tamanoarchivo}
        />
      </div> 

      <div className="form-group">
        <label htmlFor="example3">Categoría</label>
        <Select options={categoria} styles={{background: 'black'}} >  
        </Select>
      </div>

      <div className="form-group">
        <label htmlFor="example3">Subcategoría</label>
        <Select options={subcategoria} styles={{background: 'black'}} ></Select>
      </div>

      <div className="form-group">
        <label htmlFor="example3">Subsubcategoría</label>
        <Select options={subsubcategoria} styles={{background: 'black'}} ></Select>
      </div>


      <div className="form-group">
        <label htmlFor="example3">Archivo</label>
        <input type="file" id="example3" className="form-control form-control-sm" 
        accept="image/*, video/*, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={onChange}
        multiple />
      </div>

      <div className="form-group">
        <label htmlFor="example3">Ruta del archivo</label>
        <input type="text" id="example3" className="form-control form-control-sm" 
          onChange={e => setFormData({ ...formData, 'rutadocumento': e.target.value})}
          value={formData.rutadocumento}
        />
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