import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { listTodos } from "../graphql/queries";
import { API } from 'aws-amplify';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const initialFormState =
{
  nombrearchivo: "",
  tipoarchivo: "",
  archivo: "",
  tamanoarchivo: parseFloat,
  categoria: "",
  subcategoria: "",
  subsubcategoria: "",
  rutadocumento: "",
};

export default function TablaResult() 
{
  const classes = useStyles();
  const [notas, setNotas] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const state = { fileUrl: "" };

  useEffect(() => {
    fetchNotes();
  }, []);

  
  async function fetchNotes() 
  {
    const apiData = await API.graphql({ query: listTodos });
    setNotas(apiData.data.listTodos.items);
  }

  async function listTodo({ id }) 
  {
    const newNotesArray = notas.filter(nota => nota.id !== id);
    setNotas(newNotesArray);
    await API.graphql({ query: listTodos, variables: { input: { id } } });

   /* newNotesArray.map(note=> {
      return note.nombrearchivo, note.tipoarchivo;
    }) */
  }

  async function componentDidMount()
  {
      const signedUrl= Storage.get("public/", {download: true}, {level: 'public'} )
      .then((result) => 
      this.setState({
              fileUrl: result
      }) )
      .catch(err => console.log("error fetching document" + err));
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Tipo de archivo</TableCell>
            <TableCell align="right">Tamaño</TableCell>
            <TableCell align="right">Ruta</TableCell>
            <TableCell align="right">Categoria</TableCell>
            <TableCell align="right">Subcategoria</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          notas.map(note => (
            <TableRow key={note.id || note.nombrearchivo}>
              <TableCell component="th" scope="row">
                {note.nombrearchivo}
              </TableCell>
              <TableCell align="right">{note.tipoarchivo}</TableCell>
              <TableCell align="right">{note.tamanoarchivo}</TableCell>
              <TableCell align="right"> <a href={note.rutadocumento} target="_blank">Descargar</a> </TableCell>
              <TableCell align="right">{note.categoria}</TableCell>
              <TableCell align="right">{note.subcategoria}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
