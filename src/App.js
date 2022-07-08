import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import { getPokemonData, getPokemons } from './api';
import Pokedex from './components/Pokedex';
import { FavoriteProvider } from "./contexts/favoritesContext";

const favoritesKey = "f"
function App() {
  const [page, setPage] = useState(0  );
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoding] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);
  
  const itensPerPage = 99
  const fetchPokemons = async () =>{
    try{
      setLoding(true);
      setNotFound(false);
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises); // Espera de todas as chamadas assicronas
      setPokemons(results);
      setLoding(false);
      setTotalPages(Math.ceil(data.count / itensPerPage))
    }catch(error){
      console.log('error', error)
    }
  }

  useEffect(()=>{
    fetchPokemons();
  }, [page])

  const updateFavoritePokemons = (name) => {
    const updatedFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    if(favoriteIndex >= 0) {
      updatedFavorites.splice(favoriteIndex, 1);
    }else {
      updatedFavorites.push(name);
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites))
    setFavorites(updatedFavorites);
  }

  

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}>
      <div>
        <Navbar />
        <Searchbar />
        {notFound ? (
          <div class-name="not-found-text"> Meteu essa?! </div>
        ) : 
        (
          <Pokedex pokemons={pokemons} loading={loading} page={page} setPage={setPage} totalPages={totalPages}
        />)}
      </div>
    </FavoriteProvider>
  );
}

export default App;
