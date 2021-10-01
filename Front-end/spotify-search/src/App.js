import { useState } from 'react'; 
import getSpotifyToken from './util/getSpotifyToken';
import spotify from './assets/spotify.png'
import Card from './components/Card'

const baseURL = (pesquisa) => `https://api.spotify.com/v1/search?q=${pesquisa}&type=track&limit=8`

function App() {
  const [pesquisa, setPesquisa] = useState('');
  const [tracks, setTracks] = useState([]); 
  const [erro, setErro] = useState();
  const [estado, setEstado] = useState(null);

  async function handleSubmit(event) {
    setErro();
    try {
      event.preventDefault();
      
      if (!pesquisa) return;
      setEstado('carregando'); 
      
      const token = await getSpotifyToken();
      const response = await fetch(baseURL(pesquisa), { 
        headers: { 
          'Authorization': token
        }
      })
      const { tracks: data } = await response.json(); 
      setTracks(data.items);
      setEstado(null); 
      //!tracks.length && setEstado('nao-encontrado')   Pq o tracks não tá atualizando automaticamente? 
      !data.items.length && setEstado('nao-encontrado')
      setPesquisa('')
    } catch (error) {
      setErro(error.message)
      setTracks([])
      setEstado('erro')
    }
  }
  
  return (
    <div className="App">
      <div>
        <img className="spotify-logo" src={spotify} alt="" />
        <form className="search__form" onSubmit={handleSubmit} >
          <label htmlFor="search">Busque músicas no spotify!</label>
          <input 
            className="search-input" 
            type="text" 
            name="search" 
            id="search" 
            value={pesquisa} 
            onChange={ e => setPesquisa(e.target.value)}
          />
          <button className="search-button" type="submit">Pesquisar</button>
        </form>
      </div>
      <div className="cards">
        { tracks.map((track, index) => <Card track={track} key={index} />) }
         {
          estado === 'carregando' && 
            <div className="alert">
             <span>Carregando...</span>
            </div>         
         }
         {
          estado === 'erro' && 
            <div className="alert">
              <span>{erro}</span>
            </div>
         }
         {
           estado === 'nao-encontrado' &&
            <div className="alert">
              <span>Nenhuma faixa encontrada!</span>
            </div>
         }

      </div>
    </div>
  );
}
export default App;
