import {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { withAuthenticator} from '@aws-amplify/ui-react';
import { API, Storage} from 'aws-amplify';
import { listTodos, Search } from '../graphql/queries';
import { searchTodo } from '../graphql/mutations';

function Buscar() 
{
  
  const [notas, setNotas] = useState([]);
  //const [formData, setFormData] = useState(initialFormState);

  useEffect(() => 
  {
  listTodo();
   }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 170 },
    { field: 'nombre', headerName: 'NOMBRE', width: 170 },
    { field: 'tipo', headerName: 'TIPO', width: 170 },
  ];

  const rows = { nombrearchivo: '', tipoarchivo:'', archivo: ''};
    
  async function listTodo(id, nombrearchivo, tipoarchivo, archivo)
 {
   const newNotesArray = notas.filter(nota => nota.id !== id);
   setNotas(newNotesArray);
   await API.graphql({ query: listTodos, variables: { input: { id, nombrearchivo, tipoarchivo, archivo} }});
 } 

      //const category = this.props.category;
      return (

          <div style={{ height: 500, width: '80%', color: 'white'}}>
            {
                 notas.map(nota => (
                  <DataGrid rows={nota.id, nota.nombrearchivo.nota.tipoarchivo} columns={columns} pageSize={2} />
                 ))
            }
          </div> 
      );
  }
  
  export default withAuthenticator(Buscar);
  

  
  