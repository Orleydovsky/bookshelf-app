/** @jsxImportSource @emotion/react */
import { Button } from '../components/styledComponents';
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { auth } from "../../firebase-config";

export function Header({logout}) {
  return <div css={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#8080ff',
    color: 'white',
    padding: '1em',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
  }}>
    <div css={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
      }}>
          <FaUser css={{
          marginRight: '15px',
          padding: '10px',
          borderRadius: '15px',
          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
        }} />
          Welcome, <br />
          {auth.currentUser.email.split('@').slice(0, 1).join()}!
      </div>
         <Button onClick={logout}>
            <FaSignOutAlt />
         </Button>
    </div>;
}
  