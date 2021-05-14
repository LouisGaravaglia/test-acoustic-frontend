import React, {useState} from 'react';
// import Backend from '../Backend';
import {IoIosArrowRoundForward} from 'react-icons/io';


const Login: React.FC = () => {
  const INITIAL_VALUE = {
      username: '',
      password: '',
  };
  const [formData, setFormData] = useState(INITIAL_VALUE);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {name, value} = e.target as HTMLTextAreaElement;
    setFormData(data => ({
      ...data,
      [name]:value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const data = formData;
    try {
      // const response = await Backend.loginUser(data);
      // console.log('the response', response);
    } catch (e) {
      console.log('hit error', e);
    };
  };


////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <div className='Login-Container'>
      <div className="Login-Content">
        <div className='Login-Message-Box'>
          <p className='Login-Message'>Welcome back! Please login here to access your playlists.</p>
        </div>
        <form className='Login-Form' onSubmit={handleSubmit}>
          <div className='Login-Box'>
            <input 
              type='text'
              id='LoginVal'
              name='username'
              value={formData.username}
              onChange={handleChange}
              className='Login-Form-Input'
              placeholder='username'
            />
          </div>
          <div className='Login-Box'>
            <input 
              type='password'
              id='LoginVal'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='Login-Form-Input'
              placeholder='password'
            />
          </div>
            <button className="Login-Button-Box">
              <h1 className="Login-Button">Login</h1>
              <IoIosArrowRoundForward color='#181718' className='Login-Arrow'/>
            </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

