import React from 'react';

const Login: React.FC = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let code = params.get('code');
    let state = params.get('state');
    // console.log('code: ', code);
    // console.log('state: ', state);


////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <>
      <div className='Login-Box'>
          <label>I'm authorized!:</label>
        </div>
    </>
  );
};

export default Login;