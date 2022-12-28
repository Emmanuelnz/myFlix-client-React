import React from "react";
import axios from "axios";

// React-router Imports 
import { BrowserRouter as Router, Route, Redirect } from 
"react-router-dom";

// Redux Imports 
import { connect } from "react-redux";

// Actions Imports 
import { setMovies, setUser, setUserData, getToken } from "../../actions/actions";

// Custom Components Imports 
import { NavBar } from '../navbar/navbar';
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { ProfileView } from "../profile-view/profile-view";
import { MovieView } from "../movie-view/movie-view";
import { DirectorsView } from "../directors-view/directors-view";
import { GenreView } from "../genre-view/genre-view";
import MoviesList from "../movies-list/movies-list";

// React-bootstrap Imports 
import { Row, Col,} from "react-bootstrap";

// Custom SCSS 
import "../main-view/main-view.scss";

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null,
      isFavorite: false,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get("https://starfish-app-8hgap.ondigitalocean.app/movies", 
    {headers: { Authorization: `Bearer ${token}` }})
    .then((response) => {
      this.props.setMovies(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    let { user } = this.state;
    let { movies } = this.props;

    return (
      <Router>
        <NavBar user={ user } />
        <Row className="main-view justify-content-md-center gap-2">

          {/* ================= LOGIN ================= */}
          <Route exact path='/' render={() => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              </Col>
            );

            if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies} />;
            }} />

          {/* ================= REGISTER ================= */}
          <Route path="/register" render={(match) => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          {/* ================= USERS/PROFILE ================= */}
          <Route path={`/users/${user}`} render={({ history }) => {
              if (!user) return <Redirect to="/" />;

              return (
                <Col>
                  <ProfileView
                    user={user}
                    movies={movies}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }} />

          {/* ================= MOVIES ================= */}
          <Route path='/movies/:movieId' render={({ match, history }) => {
            if (!user) return <Redirect to="/" />

            if (movies.length === 0) return <div className="main-view" />;

            return <Col>
              <MovieView 
                movie={movies.find(m => m._id === match.params.movieId)}
                onBackClick={() => history.goBack()}
                addFavorite={this.addFavorite} 
              />
            </Col>
          }} />

          {/* ================= DIRECTORS ================= */}
          <Route path='/directors/:name' render={({ match, history }) => {
            if (!user) return <Redirect to="/" />

            if (movies.length === 0) return <div className='main-view' /> 

            return <Col>
              <DirectorsView directors={movies.find(m => m.Directors.Name === match.params.name).Directors} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* ================= GENRE ================= */}
          <Route path='/genre/:Name' render={({ match, history }) => {
            if (!user) return <Redirect to="/" />

            if (movies.length === 0) return <div className='main-view' />

            return (
              <Col>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.Name).Genre} 
                onBackClick={() => history.goBack()} />
              </Col>
            )
          }} />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user, userData: state.userData };
};

export default connect(mapStateToProps, { setMovies, setUser, setUserData, getToken })(
  MainView
);