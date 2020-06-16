const MovieDisplay = (props) => {
  const contents = props.movie.map(eachMovie =>
    <div className="movie-show mx-2" key={eachMovie.id} ><p className="text-wrap">{eachMovie.title}</p><p>{eachMovie.year}</p><img src={eachMovie.img_src}/></div>)
  return (
    <React.Fragment>{contents}</React.Fragment>
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
      movie: [{}]
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
    // event.preventDefault();
    const searchItem = this.state.searchItem.toLowerCase()
    fetch(`https://www.omdbapi.com/?s=${searchItem}&apikey=19cda37e`)
    .then((response) => {
      if(response.ok){
        return response.json()
      }
       throw new Error('Something is wrong here');
    })
    .then((data) => {
      const movieArray = data.Search
      const movie =[]
      movieArray.forEach((data)=>{
        const insertObj = {};
        insertObj.title = data.Title
        insertObj.year = data.Year
        insertObj.img_src = data.Poster
        insertObj.id = data.imdbID
        console.log(insertObj);
        movie.push(insertObj)
      })
      this.setState ({
        movie: movie
      })
    })

    .catch((error)=>{
      console.log(error);
    })
  }

  render(){
      const movie = this.state.movie.slice()
      const searchItem = this.state.searchItem
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
              <MovieDisplay movie={movie} key={movie.id}/>
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

// foreach止める
// li issues

// Movie finder structure
// —fetch api
// —get request
// —react element
//
// Props
// this.state = {
//     movie:{
//     Name: “”,
//     Year: “”,
//     Description: ,
//     Img-src:
// }
// }
//
// <layout class>
//     Basic layout : done
//         Input reflection function :done
//             Movie fetch function : “GET” request return object
//                 Movie display function: return <HTML> modifies object returned from fetch
//     <Search class>
//     Inherit props.movie
//         Inherit  Movie fetch function
//     <display class>
//         Inherit props.movie
//         Inherit movie display function:
