import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import { getPokemonData, getPokemons } from './api';
import Pokedex from './components/Pokedex';


function App() {
  const [loading, setLoding] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const fetchPokemons = async () =>{
    try{
      setLoding(true);
      const data = await getPokemons();
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises); // Espera de todas as chamadas assicronas
      console.log('get pokemons', results)
      setPokemons(results);
      setLoding(false);

    }catch(error){
      console.log('error', error)
    }
  }

  useEffect(()=>{
    console.log("carregou");
    fetchPokemons();
  }, [])

  return (
    <div>
      <Navbar />
      <Searchbar />
      <Pokedex pokemons={pokemons} loading={loading} />
    </div>
  );
}

export default App;
