import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

import { api } from "../services/api"

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) { // estamos passando dentro de um objeto pq pq independe da ordem pode ser adicionado

    try {
      const response = await api.post("/sessions", { email, password});
      const { user, token } = response.data;

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      localStorage.setItem("@rocketnotes:token", token); // o token não precisa de conversão, ele já é um texto

      //inserindo um token do tipo Bearer de autorização do cabeçalho por padrão de todas requisições que o usuário fizer
      api.defaults.headers.authorization = `Bearer ${token}`;
      setData({ user, token })

    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert ('Não foi possível entrar.')
      }
    }

  }

  function signOut() {
    localStorage.removeItem("@rocketnotes:user");
    localStorage.removeItem("@rocketnotes:token");

    setData({}) // voltando o estado para vazio (tornando assim o user vazio)
  }

  async function updateProfile({ user }) {
    try {
      await api.put('/users', user);
      // subsitituindo os dados do local storage
      localStorage.setItem('@rocketnotes:user', JSON.stringify(user));
      setData({ user, token: data.token });
      alert('Perfil atualizado.');

    }  catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert ('Não foi possível atualizar o perfil.')
      }
    }
  }

  useEffect(() => {
    const user = localStorage.getItem("@rocketnotes:user");
    const token = localStorage.getItem("@rocketnotes:token");

    // condição para garantir que tanto o token quanto o user tenham sido informados
    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({
        token,
        user: JSON.parse(user)
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      signIn, 
      signOut,
      updateProfile,
      user: data.user
    }}
    >
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };