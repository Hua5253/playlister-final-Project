import { useHistory } from "react-router-dom";

export default function SplashScreen() {
  const history = useHistory();

  function handleRegister() {
    history.push("/register/");
  }

  function handleLogin() {
    history.push("/login/");
  }

  return (
    <div id='splash-screen'>
      <div id='splash-screen-logo'>Playlister</div>
      <h1>Welcome to the Playlister App</h1>
      <p>
        an application for creating and playing playlists of YouTube music
        videos. The site will allow users to create, edit, and play playlists as
        well as share playlists so that others may then play and comment on
        them. The site will include a built-in YouTube player and will allow
        users to find others' playlists via multiple search criteria.
      </p>
      <div id='splash-screen-button'>
        <button
          className='button'
          id='register-button'
          type='button'
          onClick={handleRegister}
        >
          REGISTER
        </button>
        <button className='button' id='login-button' type="button" onClick={handleLogin}>
          LOGIN
        </button>
        <button className='button' id='guess-button' type="button">
          GUESS
        </button>
      </div>
    </div>
  );
}
