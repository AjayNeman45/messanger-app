import React from 'react'
import { auth } from '../firebase.js'
import { Button } from '@material-ui/core'

function SignOut() {
    return (
        <div className="signOutDiv">
            <Button style={{ padding: '20px', fontSize: '15px', borderRadius: '0', fontWeight: '600' }} onClick={() => auth.signOut()}>Sign Out</Button>
        </div>
    )
}

export default SignOut
