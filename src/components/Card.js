import React, { useEffect, useState } from 'react';
import { listTodos } from "../graphql/queries";
import { API } from 'aws-amplify';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FileViewer from 'react-file-viewer';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
function Card({archivo}) 
{
   const classes = useStyles();
   const [notas, setNotas] = useState([]);

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
    }

  return(
      <Container maxWidth="sm">
        <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Tipo de archivo</TableCell>
            <TableCell align="right">Archivo</TableCell>
            <TableCell align="right">Descargar</TableCell>
            <TableCell align="right">Categoria</TableCell>
            <TableCell align="right">Subcategoria</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key={archivo.id}>
              <TableCell component="th" scope="row">
                {archivo.nombrearchivo}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
              <img className="br-100 h3 w3 dib" alt={archivo.nombrearchivo} src={process.env.PUBLIC_URL + archivo.rutadocumento} />
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
       
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {archivo.tipoarchivo}
              </TableCell>
                  <TableCell align="right"> <a href={archivo.rutadocumento} target="_blank">Descargar</a> </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {archivo.categoria}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {archivo.subcategoria}
              </TableCell>
            </TableRow>
        </TableBody>
        <TableFooter>

        </TableFooter>
      </Table>
    </TableContainer>
      </Container>
   
  );
}

export default Card;