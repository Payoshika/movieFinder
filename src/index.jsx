const MovieDisplay = (props) => {
  return (
    <React.Fragment>{props.contents}</React.Fragment>
  )
}

class Input extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const {searchItem ,searchInput} = this.props;
    return(
      <input className="search-area input-group-lg mx-2" placeholder="search movie" type="text" value={searchItem} onChange={searchInput}/>
    )
  }
}

class SearchBtn extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    const movieSearch = this.props.movieSearch
    return(
      <React.Fragment>
        <button className="search-btn btn btn-info btn-lg mx-2" onClick={movieSearch}>
          Search
        </button>
      </React.Fragment>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchItem: "",
      movies: []
    }
    this.searchInput = this.searchInput.bind(this)
    this.movieSearch = this.movieSearch.bind(this)
  }

  searchInput (event) {
    const inputText = event.target.value;
    this.setState ({
      searchItem: inputText
    })
  }

  movieSearch (event){
    const searchItem = this.state.searchItem.toLowerCase().trim()
    fetch(`https://www.omdbapi.com/?s=${searchItem}&apikey=19cda37e`)
    .then((response) => {
      if(response.ok){
        return response.json()
      }
       throw new Error('Something is wrong here');
    })
    .then((data) => {
        if (data.Response === 'False') {
          throw new Error(data.Error);
        }
        const movieArray = data.Search
        const movie =[]
        movieArray.forEach((data)=>{
          const insertObj = {};
          insertObj.title = data.Title
          insertObj.year = data.Year
          insertObj.img_src = data.Poster
          insertObj.id = data.imdbID
          movie.push(insertObj)
        })
      this.setState ({
        movies: movie
      })
    })
    .catch((error)=>{
      const message = `there is no match for ${searchItem}`
      const movie = [{
        title: message,
        id: "unknown",
      }]
      this.setState({
        movies: movie
      })
    })
  }

  render(){
      const movies = this.state.movies.slice()
      const searchItem = this.state.searchItem
      const contents = movies.map(eachMovie => {return (<div className="movie-show mx-2" key={eachMovie.id} ><p className="text-wrap">{eachMovie.title}</p><p>{eachMovie.year}</p><img src={eachMovie.img_src}/></div>)})
    return(
      <div className="container-fuild w-100">
        <div className="row w100">
          <div className="col-12 mx-5">
            <h2 className="text-center my-2">Movie Finder</h2>
            <div className="search-container d-flex justify-content-center my-4">
              <Input searchItem={searchItem} searchInput={this.searchInput}/>
              <SearchBtn movieSearch={this.movieSearch} />
            </div>
            <div className="search-result-container rounded-circle d-flex justify-content-center align-items-center flex-wrap">
              <MovieDisplay contents={contents}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
)
