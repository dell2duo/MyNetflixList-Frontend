import React, { useEffect, useState } from "react";
import api from "../../services/api";

import { Container, Form, Title, Input, Button, InputSenha } from "./styles";

export default function RegisterModal(props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConf, setSenhaConf] = useState("");
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [match, setMatch] = useState(true);

  useEffect(() => {
    if (senhaConf !== senha) {
      setMatch(false);
    } else {
      setMatch(true);
    }
  }, [senhaConf, senha]);

  async function handleRegister(e) {
    e.preventDefault();

    if (!match) {
      alert("As senhas não batem! Digite novamente.");
      return;
    } //Se as senhas não forem iguais, não executa

    const data = {
      nome: nome,
      email: email,
      senha: senha,
      data_nascimento: dataNascimento,
    };

    await api
      .post("/create_account", data)
      .then((result) => {
        console.log(result.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });

    props.modal(false);
  }

  return (
    <Container>
      <Form onSubmit={(e) => handleRegister(e)}>
        <Title>Preencha abaixo:</Title>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputSenha
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          match={match}
        />
        <InputSenha
          type="password"
          placeholder="Confirmar Senha"
          value={senhaConf}
          onChange={(e) => setSenhaConf(e.target.value)}
          match={match}
        />
        <Input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Data de Nascimento"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
        />
        <Button type="submit">Criar Conta</Button>
      </Form>
    </Container>
  );
}
