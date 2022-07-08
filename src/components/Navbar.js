import React, { useContext } from "react";
import FavoriteContext from "../contexts/favoritesContext";

const Navbar = () =>{
    const { favoritePokemons } = useContext(FavoriteContext);
    const logo = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
    return (
        <nav>
            <div>
                <img src={logo} alt="logo-pokedex" className="navbar-img"/>
                <div>{favoritePokemons.length} ❤️</div>
            </div>
        </nav>
    )
}

export default Navbar;