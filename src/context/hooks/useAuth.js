import { useState, useEffect } from "react";

import api from "../../services/api";
import history from "../../history";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [perfil, setPerfil] = useState({});
  const API_KEY = "fb034f86285a9f87f4c7c29c9a20eed5";
  const LANG = "pt-BR";

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);

      setUser(JSON.parse(localStorage.getItem("User")));
      history.push("/profile"); //Usuário já estava logado e retornou ao site
    } else {
      history.push("/");
    }
    setLoading(false);
  }, []);

  async function handleLogin(e, data, callOnError) {
    e.preventDefault();

    api
      .post("/login", data)
      .then((res) => {
        const { jwt, nome, id_conta } = res.data;

        localStorage.setItem("User", JSON.stringify({ nome, id_conta }));
        setUser({ nome, id_conta });

        localStorage.setItem("Token", JSON.stringify(jwt));
        api.defaults.headers.Authorization = `Bearer ${jwt}`;
        setAuthenticated(true);
        history.push("/profile");
      })
      .catch((err) => callOnError(err.response.data.msg));
  }

  async function handleLogOut() {
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
    api.defaults.headers.Authorization = undefined;
    setAuthenticated(false);
    history.push("/");
  }

  async function putMovie(e, data) {
    e.preventDefault();

    await api
      .post("/put_movie", data)
      .then(() => {
        alert(`${data.title} adicionado à sua lista com sucesso!`);
      })
      .catch((err) => {
        alert("Houve algum erro, tente mais tarde.");
        console.log(err);
      });
  }

  async function handleProfile(e, data) {
    e.preventDefault();
    setPerfil(data);
  }

  return {
    loading,
    authenticated,
    user,
    API_KEY,
    LANG,
    perfil,
    handleLogin,
    handleLogOut,
    putMovie,
    handleProfile,
  };
}
