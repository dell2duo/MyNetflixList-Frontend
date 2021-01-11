import React, { useContext, useEffect, useState } from "react";

import apiMovies from "../../services/apiMovies";

import { Context } from "../../context/auth.context";
import api from "../../services/api";
import MovieCard from "../../components/MovieCard";

import { ResultSearchBar, ResultSearchGenre, Genres, TopList } from "./styles";
import MyList from "../../components/MyList";
import history from "../../history";

export default function Home() {
  const { API_KEY, LANG, perfil, handleLogOut } = useContext(Context);
  // const [messageError, setMessageError] = useState("");
  const [generos, setGeneros] = useState([]);
  const [genero, setGenero] = useState("");
  const [descubertas, setDescubertas] = useState([]);
  const [descubertasPage, setDescubertasPage] = useState(1);
  const [pesquisarPage, setPesquisarPage] = useState(1);
  const [pesquisar, setPesquisar] = useState("");
  const [resultadoPesquisarNome, setResultadoPesquisarNome] = useState([]);
  const [resultadoPesquisarGenero, setResultadoPesquisarGenero] = useState([]);
  const [lista, setLista] = useState([]);

  useEffect(() => {
    api.post("/list_movies", { id_perfil: perfil.id }).then((result) => {
      setLista(result.data);
    });

    apiMovies
      .get(`/genre/movie/list?api_key=${API_KEY}&language=${LANG}`)
      .then((result) => {
        setGeneros(result.data.genres);
      });

    apiMovies
      .get(
        `/discover/movie?api_key=${API_KEY}&language=${LANG}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${descubertasPage}`
      )
      .then((result) => {
        setDescubertas(result.data.results);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function searchByName(e) {
    e.preventDefault();

    if (!pesquisar) {
      setResultadoPesquisarNome("");
      alert("Digite o nome de algum filme antes de pesquisar!");
      return;
    }

    await apiMovies
      .get(
        `/search/movie?api_key=${API_KEY}&language=${LANG}&query=${pesquisar}&page=1&include_adult=false`
      )
      .then((result) => {
        setResultadoPesquisarNome(result.data.results);
      });
  }

  async function searchByGenre(e, genreId) {
    await apiMovies
      .get(
        `/discover/movie?api_key=${API_KEY}&language=${LANG}&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`
      )
      .then((result) => {
        setResultadoPesquisarGenero(result.data.results);
      });
  }

  async function nextDescPage(e) {
    setDescubertasPage(descubertasPage + 1);
    await apiMovies
      .get(
        `/discover/movie?api_key=${API_KEY}&language=${LANG}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${descubertasPage}`
      )
      .then((result) => {
        setDescubertas(result.data.results);
      });
  }

  async function previousDescPage(e) {
    if (descubertasPage === 1) {
      return;
    }

    setDescubertasPage(descubertasPage - 1);
    await apiMovies
      .get(
        `/discover/movie?api_key=${API_KEY}&language=${LANG}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${descubertasPage}`
      )
      .then((result) => {
        setDescubertas(result.data.results);
      });
  }

  async function nextSearchNamePage(e) {
    setPesquisarPage(pesquisarPage + 1);

    await apiMovies
      .get(
        `/search/movie?api_key=${API_KEY}&language=${LANG}&query=${pesquisar}&page=${pesquisarPage}&include_adult=false`
      )
      .then((result) => {
        setResultadoPesquisarNome(result.data.results);
      });
  }

  async function previousSearchNamePage(e) {
    if (pesquisarPage === 1) {
      return;
    }

    setPesquisarPage(pesquisarPage - 1);

    await apiMovies
      .get(
        `/search/movie?api_key=${API_KEY}&language=${LANG}&query=${pesquisar}&page=${pesquisarPage}&include_adult=false`
      )
      .then((result) => {
        setResultadoPesquisarNome(result.data.results);
      });
  }

  function updateMyList(e) {
    api.post("/list_movies", { id_perfil: perfil.id }).then((result) => {
      setLista(result.data);
    });
  }

  return (
    <div>
      <div>
        <button onClick={(e) => handleLogOut(e)}>Sair</button>
        <button onClick={(e) => history.push("/profile")}>Mudar Perfil</button>
      </div>
      <div className="my-list">
        <h1>Minha Lista:</h1>
        <MyList list={lista} update={updateMyList} />
      </div>
      <div className="search">
        <form onSubmit={(e) => searchByName(e)}>
          <input
            type="text"
            placeholder="Pesquise por filmes!"
            value={pesquisar}
            onChange={(e) => setPesquisar(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </div>

      {resultadoPesquisarNome.length > 0 && (
        <>
          <h1>Filmes encontrados:</h1>

          <ResultSearchBar>
            <button onClick={(e) => previousSearchNamePage(e)} type="button">
              Voltar
            </button>
            {resultadoPesquisarNome.map((resultado) => (
              <MovieCard
                key={resultado.id_filme}
                id={resultado.id}
                nome={resultado.title}
                perfil={perfil.id}
                poster={resultado.poster_path}
                update={updateMyList}
                list={setLista}
              />
            ))}
            <button onClick={(e) => nextSearchNamePage(e)} type="button">
              Mais Filmes
            </button>
          </ResultSearchBar>
        </>
      )}

      <Genres>
        <h1>Filmes por Gênero:</h1>
        {generos.length &&
          generos.map((genero) => (
            <div key={genero.id} className="card">
              <button
                onClick={(e) => {
                  searchByGenre(e, genero.id);
                  setGenero(genero.name);
                }}
                type="button"
              >
                {genero.name}
              </button>
            </div>
          ))}
      </Genres>

      {resultadoPesquisarGenero.length && (
        <>
          <h1>Filmes de {genero}:</h1>
          <ResultSearchGenre>
            {resultadoPesquisarGenero.map((resultado) => (
              <MovieCard
                key={resultado.id_filme}
                id={resultado.id}
                nome={resultado.title}
                perfil={perfil.id}
                poster={resultado.poster_path}
                update={updateMyList}
                list={setLista}
              />
            ))}
          </ResultSearchGenre>
        </>
      )}

      <div className="descubra">
        <h1>Filmes em Alta:</h1>

        <TopList>
          <button onClick={(e) => previousDescPage(e)} type="button">
            Voltar
          </button>
          {descubertas.length &&
            descubertas.map((descuberta) => (
              <MovieCard
                key={descuberta.id_filme}
                id={descuberta.id}
                nome={descuberta.title}
                perfil={perfil.id}
                poster={descuberta.poster_path}
                update={updateMyList}
                list={setLista}
              />
            ))}
          <button onClick={(e) => nextDescPage(e)} type="button">
            Mais Filmes
          </button>
        </TopList>
      </div>
    </div>
  );
}
