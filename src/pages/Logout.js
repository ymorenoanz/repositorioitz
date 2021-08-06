
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

function Logout()
{
    return (
        <div className="App">
        <AmplifySignOut />
        </div>
    );
}

export default (Logout);
