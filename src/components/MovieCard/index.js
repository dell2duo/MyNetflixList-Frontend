import React, { useContext } from "react";

import { Card, Title, Image } from "./styles";

import claque from "../../assets/movie.jpg";
import { Context } from "../../context/auth.context";

export default function MovieCard(props) {
  const { putMovie } = useContext(Context);

  async function addMovieToList(e) {
    putMovie(e, {
      title: props.nome,
      id_perfil: props.perfil,
      id: props.id,
      poster: props.poster,
    }).then(() => {
      props.update(e); //atualiza a lista de filmes exibida no perfil.
    });
  }

  return (
    <Card>
      <button onClick={(e) => addMovieToList(e)} type="button">
        <Title>{props.nome}</Title>
        {props.poster ? (
          <Image src={`https://image.tmdb.org/t/p/w500${props.poster}`} />
        ) : (
          <Image src={claque} />
        )}
      </button>
    </Card>
  );
}
