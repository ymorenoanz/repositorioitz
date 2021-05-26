import React, { useState, useEffect, Fragment } from 'react';
import { withAuthenticator} from '@aws-amplify/ui-react'
import { API, Storage} from 'aws-amplify';
import { listTodos } from '../graphql/queries';
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation } from '../graphql/mutations';

const initialFormState = { nombrearchivo: '', tipoarchivo:'', archivo: '', tamanoarchivo: parseFloat}

function Search() 
{
  
  const [notas, setNotas] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  
      const category = this.props.category;
      return (
        <tr>
          <th colSpan="2">
          </th>
        </tr>
      );
  }
  
  export default withAuthenticator(Search);
  

  
  