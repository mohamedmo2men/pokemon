import { React, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ClipLoader from "react-spinners/ClipLoader";
import PokemonList from "./components/PokemonList";
import Pagination from "./components/Pagination";
const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const[currentPageUrl , setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nxpageUrl ,setNxPageUrl ] = useState()
  const [prPageUrl ,setPrPageUrl ] = useState()
  useEffect(() => {  
   let cancel;
    setLoading(true)
    axios
      .get(currentPageUrl , { cancelToken : new axios.CancelToken((c)=> cancel =c) 

      })
      .then((response) => {
        setPokemon(response.data.results.map((p) => p.name));
        setLoading(false)
        setNxPageUrl(response.data.next)
        setPrPageUrl(response.data.previous)
        
        ;
      })

      .catch((error) => console.log(error));
    setLoading(false);
return ()=>{
  cancel()
}

  }, [currentPageUrl]);


  if (loading)
    return (
      <ClipLoader
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
    function goNextPage() {
      setCurrentPageUrl(nxpageUrl)
    }

    function goPrevPage() {
      setCurrentPageUrl(prPageUrl)
    }

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination   goToNxPage={nxpageUrl? goNextPage:null } 
      goToPrePage={prPageUrl?goPrevPage : null}
      />
    </>
  );
};

export default App;
