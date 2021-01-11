import React, { useContext, useState } from "react";
import RegisterModal from "../../components/RegisterModal";

import { Context } from "../../context/auth.context";

export default function Login() {
  const { handleLogin } = useContext(Context);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [messageError, setMessageError] = useState("");
  const [modal, setModal] = useState(false);

  function handleModal(e) {
    if (!modal) {
      setModal(true);
      return;
    }
    setModal(false);
  }

  return (
    <div>
      <div>
        <button onClick={(e) => handleModal(e)}>Registrar</button>
        {!!modal && <RegisterModal modal={setModal} />}
      </div>
      <div>
        <form
          onSubmit={(e) => handleLogin(e, { email, senha }, setMessageError)}
        >
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button>Entrar</button>
          <span>{messageError}</span>
        </form>
      </div>
    </div>
  );
}
