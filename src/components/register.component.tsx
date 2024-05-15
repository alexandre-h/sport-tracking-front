import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './helpers/authProvider';
import './register.css';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event.target ::: ", event.target)
    // setUsername(event.target.value);
    // setUsernameError(validateUsername(event.target.value));
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setEmail(event.target.value);
    setEmailError(validateEmail(event.target.value));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setPassword(event.target.value);
    setPasswordError(validatePassword(event.target.value));
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError(validateConfirmPassword(password, event.target.value));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const usernameValidationError = validateUsername(username);
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    const confirmPasswordValidationError = validateConfirmPassword(password, confirmPassword);

    if (usernameValidationError || emailValidationError || passwordValidationError || confirmPasswordValidationError) {
      // Display validation errors
      setUsernameError(usernameValidationError);
      setEmailError(emailValidationError);
      setPasswordError(passwordValidationError);
      setConfirmPasswordError(confirmPasswordValidationError);
      return;
    }

    try {
      const userData = register(username, email, password);
      // Handle successful registration response
      console.log('Registration successful:', userData);
      // Redirect to home page or login page
      navigate('/home');
    } catch (error: any) {
      // Handle registration error
      setErrorMessage(error.message);
    }
  };

  const validateUsername = (username: string): string => {
    // Basic validation for username (e.g., minimum length)
    return username.length >= 3 ? '' : 'Please enter a valid username (minimum 3 characters)';
  };

  const validateEmail = (email: string): string => {
    // Basic email validation using regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email) ? '' : 'Please enter a valid email address';
  };

  const validatePassword = (password: string): string => {
    // Basic validation for password (e.g., minimum length)
    return password.length >= 6 ? '' : 'Password must be at least 6 characters long';
  };

  const validateConfirmPassword = (password: string, confirmPassword: string): string => {
    // Validate password confirmation
    return password === confirmPassword ? '' : 'Passwords do not match';
  };

  return (

    <div className="vh-100 d-flex page vw-100 register">
    <div className="container d-flex flex-column w-25 justify-content-center">
      <div className="card p-5">
        <h2 className="d-flex justify-content-center">Register</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              placeholder=""
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
              autoComplete='off'
            />
            <label htmlFor="username" className="form-label">Username</label>
            {usernameError && <div className="alert alert-danger" role="alert">{usernameError}</div>}
          </div>
          <div className="form-floating mb-3">
            <input
              placeholder=""
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <label htmlFor="email" className="form-label">Email address</label>
            {emailError && <div className="alert alert-danger" role="alert">
              {emailError}
            </div>
            }
          </div>
          <div className="form-floating mb-3">
            <input
              placeholder=""
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <label htmlFor="password" className="form-label">Password</label>
            {passwordError && <div className="alert alert-danger" role="alert">{passwordError}</div>}
          </div>
          <div className="form-floating mb-3">
            <input
              placeholder=""
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            {confirmPasswordError && <div className="alert alert-danger" role="alert">{confirmPasswordError}</div>}
          </div>
          <div className="d-flex flex-inline">
            <button type="submit" className="btn btn-primary w-50 me-2 fw-bold">Register</button>
            <button className="btn btn-outline-primary w-50 ms-2 fw-bold" onClick={() => navigate("/login")}>Sign In</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default RegisterForm;
