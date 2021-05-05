import React, {useState, useContext} from 'react';
import { FaArrowRight } from 'react-icons/fa';
import {MessagesContext} from './MessagesProvider';
import ButtonsPast from './Buttons/ButtonsPast';

interface Props {
  input: string
}

interface IUser {
  first_name: string
  last_name: string
  email: string
  username: string
  password: string
  access_token: string
  refresh_token: string
}

function Register({input}: Props) {
  const {user, incrementMessagingPhase, updateUser, addContentToBeDisplayed, chattyMessagesPhase} = useContext(MessagesContext);
  //CHANGING THE INPUT VALUE BEING PASSED AS A PROP TO THE FORMAT FOR THE 
  //ASSOCIATED PROPERTY NAME ON OUR CONTEXT PROVIDER
  const inputName = input.replace(' ', '_')
  const [formData, setFormData] = useState({[inputName]: ''});
  const inputType = input === 'password' ? 'password' : 'text';

  //UPDATING THE VALUE ON OUR INPUT AS THE USER TYPES
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {name, value} = e.target as HTMLTextAreaElement;
    setFormData(data => ({
      ...data,
      [name]:value
    }));
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    if (formData[inputName] === '') return;
    user[inputName as keyof IUser] = formData[inputName]
    updateUser(inputName, formData[inputName]);
    const hiddenPassword = '\u{2022}'.repeat(user.password.length);
    addContentToBeDisplayed([<ButtonsPast key={'r' + chattyMessagesPhase} buttonText={inputName === 'password' ? hiddenPassword : formData[inputName]}/>])
    incrementMessagingPhase(1);
  };

////////////////////////////////////////////////////  RETURN  ////////////////////////////////////////////////////

  return (
    <div className='Register-Container'>
      <form className='Register-Form' onSubmit={handleSubmit}>
        <div className='Register-Box'>
          <input 
            type={inputType}
            id='RegisterVal'
            placeholder={input}
            name={inputName}
            value={formData[inputName]}
            onChange={handleChange}
            className='Register-Form-Input'
          />
  
          <button type='submit'>
            <FaArrowRight color='#ffe0d7' />
          </button>
        </div>

      </form>

      {/* <div className="Register-Button-Container">
        <button className="Register-Button-Box" onClick={handleSubmit}>
          <div className="Register-Button-Overlay"></div>
          <h1 className="Register-Button">Submit</h1>
        </button>
      </div> */}

    </div>
  );
};

export default Register;