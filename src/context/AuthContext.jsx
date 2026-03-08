import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// disable eslint error
// eslint-disable-next-line
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(() => {
    return localStorage.getItem('token') || null;
  });

  const userTokenHandler = token => {
    localStorage.setItem('token', token);
    setUserToken(token);
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    setUserToken(null);
    navigate('/login');
  };


  return (
    <AuthContext.Provider
      value={{ userToken, userTokenHandler, logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
