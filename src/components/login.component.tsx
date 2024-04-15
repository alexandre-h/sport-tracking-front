import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './helpers/authProvider';


const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      login(email, password);
      navigate('/home')
    } catch (error: any) {
      if (error.response.status == '401') {
        setErrorMessage('Invalide email ou mot de passe');
      } else {
        setErrorMessage("Une erreur c'est produite merci si le problème persite, contacter le support");
      }
    }
  };

  return (
    <div className="container d-flex flex-column w-25 login justify-content-center">
      <div className="card p-5">
        <h2 className="d-flex justify-content-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} placeholder="name@example.com" required />
            <label htmlFor="email" className="">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} placeholder="" required />
            <label htmlFor="password" className="form-label">Password</label>
          </div>
          {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
          <div className="d-flex d-flex-inline justify-content-space-between">
            <button type="submit" className="btn btn-primary w-50 justify-content-center me-2 fw-bold">Login</button>
            <button className="btn btn-outline-primary w-50 justify-content-center ms-2 fw-bold" onClick={() => navigate("/register")}>Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
