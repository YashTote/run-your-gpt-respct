import { useAuth0 } from "@auth0/auth0-react";
import './css/authO.css'

//AuthO api for authentication.
const Profile = () => {
  const { user, isAuthenticated, isLoading,loginWithRedirect,logout } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  var userName = 'Log Out';
  if(isAuthenticated){userName = `Log Out > ${user.name}`}
  return (
  <>
    {(isAuthenticated) ? (<><button className="btn-primary" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
     {userName}
    </button></>) : (<button className="btn-primary" onClick={() => loginWithRedirect()}>Log In</button>)}
  </>
    
  );
};

export default Profile;



