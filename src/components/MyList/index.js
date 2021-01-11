import React from "react";
import api from "../../services/api";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

import { Card, Title, Image, Container, Buttons } from "./styles";

export default function MyList(props) {
  async function watched(e, filme) {
    console.log(filme);
    api.post("/watched", filme).then((result) => {
      props.update();
      alert(result.data.msg);
    });
  }

  return (
    <Container>
      {props.list.map((movie) => (
        <Card key={movie.id}>
          <Title>{movie.nome}</Title>
          <Image src={`https://image.tmdb.org/t/p/w500${movie.poster}`} />
          <Buttons>
            <button onClick={(e) => watched(e, movie)}>
              {movie.assistido ? "Assistido" : "Não assistiu"}
            </button>
            <FacebookShareButton
              url={"https://www.facebook.com/"}
              quote={
                movie.assistido
                  ? `Acabei de assistir ${movie.nome}!`
                  : `Acabei de colocar ${movie.nome} na minha lista!`
              }
              hashtag="#MyNetflixList"
            >
              <FacebookIcon size={30} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
              url={"https://www.facebook.com/"}
              title={
                movie.assistido
                  ? `Acabei de assistir ${movie.nome}!`
                  : `Acabei de colocar ${movie.nome} na minha lista!`
              }
              hashtags={["MyNetflixList"]}
            >
              <TwitterIcon size={30} round={true} />
            </TwitterShareButton>
          </Buttons>
        </Card>
      ))}
    </Container>
  );
}
