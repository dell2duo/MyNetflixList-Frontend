import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/auth.context";
import history from "../../history";
import api from "../../services/api";

export default function Profile() {
  const { user, handleProfile } = useContext(Context);
  const [profiles, setProfiles] = useState([]);
  const [nome, setNome] = useState("");
  const [nasc, setNasc] = useState("");
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    api.post("/list_profiles", { id_conta: user.id_conta }).then((profiles) => {
      setProfiles(profiles.data);
    });
  }, [user.id_conta]);

  async function createProfile(e) {
    e.preventDefault();
    if (!nome) {
      alert("Digite um nome para o perfil!");
      return;
    }
    if (!nasc) {
      alert("Digite a data de nascimento!");
      return;
    }

    const data = {
      id_conta: user.id_conta,
      nome: nome,
      data_nascimento: nasc,
    };

    await api
      .post("/create_profile", data)
      .then((result) => {
        setMessageError(result.data.msg);
        api
          .post("/list_profiles", { id_conta: user.id_conta })
          .then((profiles) => {
            setProfiles(profiles.data);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      {profiles.length === 0 ? (
        <div>
          <div>
            <span>Você não criou um perfil ainda, crie abaixo!</span>
          </div>
          <div>
            <form onSubmit={(e) => createProfile(e)}>
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                type="date"
                placeholder="Data de Nascimento"
                value={nasc}
                onChange={(e) => setNasc(e.target.value)}
              />
              <button type="submit">Criar Perfil</button>
              <span>{messageError}</span>
            </form>
          </div>
        </div>
      ) : (
        <div>
          {profiles.map((profile) => {
            return (
              <div key={profile.id} className="profile">
                <button
                  onClick={(e) => {
                    handleProfile(e, { id: profile.id, nome: profile.nome });
                    history.push("/home");
                  }}
                >
                  {profile.nome}
                </button>
              </div>
            );
          })}

          <div>
            <form onSubmit={(e) => createProfile(e)}>
              <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                type="date"
                placeholder="Data de Nascimento"
                value={nasc}
                onChange={(e) => setNasc(e.target.value)}
              />
              <button type="submit">Criar Perfil</button>
              <span>{messageError}</span>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
