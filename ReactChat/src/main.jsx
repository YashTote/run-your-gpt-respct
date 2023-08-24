import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import Profile from './authO.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-6z87bnurvanrouhd.us.auth0.com"
    clientId="aYHpF9G38eJrTKj8BHtGiHsEjX0xqyXs"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <Profile className='profile'/>
    <App />
  </Auth0Provider>,
  
)
