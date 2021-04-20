// 1. import the class
import { Auth } from 'aws-amplify'
 
// Sign the user out
await Auth.signOut()

// 1. Create initial state to hold user inputs
state = {username: '', password: '', email: '', phone_number: '', authCode: ''}
 
// 2. onChange handler for user input changes
onChange = e => {
  this.setState({ [e.target.name]: e.target.value })
}
 
// 3. Function to call Auth.signUp
signUp = async () => {
  const { username, password, email, phone_number } = this.state
  await Auth.signUp({
    username, password, attributes: { phone_number, email}
  })
  console.log('successfully signed up')
}
 
// 4. Function to call Auth.signUp
confirmSignUp = async () => {
  const { username, authCode } = this.state
  await Auth.confirmSignUp(username, authCode)
  console.log('successfully confirmed signed up')
}
 
// 5. In render method, create inputs with attributes to update state
//<input onChange={this.onChange} name='username'/>
 
// 6. Create buttons to call signUp and confirmSignUp methods
<button onClick={this.signUp}>Sign Up</button>