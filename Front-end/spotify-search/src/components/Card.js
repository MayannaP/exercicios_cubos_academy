export default function Card(props) {
  
  const url = props.track.external_urls.spotify;
  const [ img ] = props.track.album.images;
  let artistsArray = []; 
  for (let artist of props.track.artists) {    
    artistsArray.push(artist.name)
  }
  const artists = artistsArray.join(', ');

  return(
    <div className="card">
      <a href={url}>
        <img className="card__img" src={img.url} alt="" />
      </a>
      <div className="card__info">
        <span className="card__music">{props.track.name}</span>
        <span className="card__artist">{artists}</span>
      </div>
    </div>
  )
}
