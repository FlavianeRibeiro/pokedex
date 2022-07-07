import React, { useState } from "react";
import { searchPokemon } from "../api"

const Searchbar = () => {
    const [search, setSearch] = useState("dito");
    const [pokemon, setPokemon] = useState()
    const onChangeHander = (e) =>{
        setSearch(e.target.value);
    }

    const onButtonClickHandler = async () =>{
        onSearchHendler(search)
    }

    const onSearchHendler = async (pokemon) =>{
        const result = await searchPokemon(pokemon);
        setPokemon(result)
    
      }
    return (
        <div className="searchbar-container">
            <div  className="searchbar">
                <input placeholder="Buscar Pokemon" onChange={onChangeHander} />
            </div>
            <div className="searchbar-btn">
                <button onClick={onButtonClickHandler}>Buscar</button>
            </div>
            {pokemon ? (
                <div>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                    <div>Nome: {pokemon.name}</div>
                    <div>Peso: {pokemon.weigth}</div>
                </div>
            ) : null}
        </div>
    )
}
export default Searchbar;