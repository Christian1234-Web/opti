import React, { useContext, useRef } from 'react';
import IdleTimer from 'react-idle-timer'
//import Scss
import { USER_COOKIE, TOKEN_COOKIE } from './services/constants';
import './assets/scss/themes.scss';

//imoprt Route
import Route from './Routes';
import SSRStorage from './services/storage';
import { Store } from './services/store';
import { useHistory } from 'react-router-dom';
const storage = new SSRStorage();

function App() {
  const store = useContext(Store);
  const [user_type, setUser_type] = store.user_type;
  const [adminType, setAdminType] = store.adminType;

  const history = useHistory();
  const idleTimerRef = useRef(null);
  
  const onIdle = () => {
    // const user = await(new SSRStorage()).getItem(USER_COOKIE);
    console.log('you have been  active for a while');
    // storage.removeItem(USER_COOKIE);
    // storage.removeItem(TOKEN_COOKIE); 
    // if (adminType === 'admin') {
    //   return history.push(`/admin-login`);
    // }
    // if (user_type !== null) {
    //   return history.push(`/${user_type}-login`);
    // } else {
    //   return history.push(`/${`facility`}-login`);
    // }

  }

  return (
    <React.Fragment>
      <Route />
      <IdleTimer
        ref={idleTimerRef} timeout={20 * 10000} onIdle={onIdle}
      />
    </React.Fragment>
  );
}

export default App;
