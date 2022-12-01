import React, { useEffect, useState } from "react";
import Navbar from "./componentes/Navbar";
import Footer from "./componentes/Footer";
import Personajes from "./componentes/Personajes";
import Paginacion from "./componentes/Paginacion";

function App() {
  //Funcion useState() nos ayuda a guardar en variables internas el estado del componente
  //que estamos controlando. Tiene 2 valores, el primero es el valor y el segundo la función para modificarla.
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});

  //Url con todos los datos raw.
  const initialUrl = "https://rickandmortyapi.com/api/character";

  //Funcion que trae toda la info 'personajes'
  const fetchCharacter = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((error) => console.log(error));
  };

  const onPrevious = () => {
    fetchCharacter(info.prev);
  };

  const onNext = () => {
    fetchCharacter(info.next);
  };

  //Se ejecuta por defecto por primera vez al renderizar el componente y en cada updateting.
  //Para controlar cuando ejecutarse lo hacemos en los [], usando un elemento de los que depende.
  //Ejemplo {count + 1} --->  [count].
  useEffect(() => {
    fetchCharacter(initialUrl);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="container mt-5">
        <Paginacion
          prev={info.prev}
          next={info.next}
          onPrevious={onPrevious}
          onNext={onNext}
        />
        <Personajes characters={characters} />
        <Paginacion
          prev={info.prev}
          next={info.next}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
