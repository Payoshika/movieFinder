var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovieDisplay = function MovieDisplay(props) {
  return React.createElement(
    React.Fragment,
    null,
    props.contents
  );
};

var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input(props) {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));
  }

  _createClass(Input, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          searchItem = _props.searchItem,
          searchInput = _props.searchInput;

      return React.createElement("input", { className: "search-area input-group-lg mx-2", placeholder: "search movie", type: "text", value: searchItem, onChange: searchInput });
    }
  }]);

  return Input;
}(React.Component);

var SearchBtn = function (_React$Component2) {
  _inherits(SearchBtn, _React$Component2);

  function SearchBtn(props) {
    _classCallCheck(this, SearchBtn);

    return _possibleConstructorReturn(this, (SearchBtn.__proto__ || Object.getPrototypeOf(SearchBtn)).call(this, props));
  }

  _createClass(SearchBtn, [{
    key: "render",
    value: function render() {
      var movieSearch = this.props.movieSearch;
      return React.createElement(
        React.Fragment,
        null,
        React.createElement(
          "button",
          { className: "search-btn btn btn-info btn-lg mx-2", onClick: movieSearch },
          "Search"
        )
      );
    }
  }]);

  return SearchBtn;
}(React.Component);

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App(props) {
    _classCallCheck(this, App);

    var _this3 = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this3.state = {
      searchItem: "",
      movies: []
    };
    _this3.searchInput = _this3.searchInput.bind(_this3);
    _this3.movieSearch = _this3.movieSearch.bind(_this3);
    return _this3;
  }

  _createClass(App, [{
    key: "searchInput",
    value: function searchInput(event) {
      var inputText = event.target.value;
      this.setState({
        searchItem: inputText
      });
    }
  }, {
    key: "movieSearch",
    value: function movieSearch(event) {
      var _this4 = this;

      var searchItem = this.state.searchItem.toLowerCase().trim();
      fetch("https://www.omdbapi.com/?s=" + searchItem + "&apikey=19cda37e").then(function (response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something is wrong here');
      }).then(function (data) {
        if (data.Response === 'False') {
          throw new Error(data.Error);
        }
        var movieArray = data.Search;
        var movie = [];
        movieArray.forEach(function (data) {
          var insertObj = {};
          insertObj.title = data.Title;
          insertObj.year = data.Year;
          insertObj.img_src = data.Poster;
          insertObj.id = data.imdbID;
          movie.push(insertObj);
        });
        _this4.setState({
          movies: movie
        });
      }).catch(function (error) {
        var message = "there is no match for " + searchItem;
        var movie = [{
          title: message,
          id: "unknown"
        }];
        _this4.setState({
          movies: movie
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var movies = this.state.movies.slice();
      var searchItem = this.state.searchItem;
      var contents = movies.map(function (eachMovie) {
        return React.createElement(
          "div",
          { className: "movie-show mx-2", key: eachMovie.id },
          React.createElement(
            "p",
            { className: "text-wrap" },
            eachMovie.title
          ),
          React.createElement(
            "p",
            null,
            eachMovie.year
          ),
          React.createElement("img", { src: eachMovie.img_src })
        );
      });
      return React.createElement(
        "div",
        { className: "container-fuild w-100" },
        React.createElement(
          "div",
          { className: "row w100" },
          React.createElement(
            "div",
            { className: "col-12 mx-5" },
            React.createElement(
              "h2",
              { className: "text-center my-2" },
              "Movie Finder"
            ),
            React.createElement(
              "div",
              { className: "search-container d-flex justify-content-center my-4" },
              React.createElement(Input, { searchItem: searchItem, searchInput: this.searchInput }),
              React.createElement(SearchBtn, { movieSearch: this.movieSearch })
            ),
            React.createElement(
              "div",
              { className: "search-result-container rounded-circle d-flex justify-content-center align-items-center flex-wrap" },
              React.createElement(MovieDisplay, { contents: contents })
            )
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));