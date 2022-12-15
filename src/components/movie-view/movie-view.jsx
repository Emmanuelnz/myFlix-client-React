import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// React-router imports
import { Link } from 'react-router-dom';

// React-bootstrap imports 
import { Container, Row, Col, Card, Button, } from 'react-bootstrap';

// Icon import
import { BsQuestionCircle } from "react-icons/bs";

// Custom SCSS
import '../movie-view/movie-view.scss';


export class MovieView extends React.Component {

  addFavorite(movie) {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem('user');

    axios.post( `https://starfish-app-8hgap.ondigitalocean.app/users/${username}/movies/${movie._id}`, "", 
      {headers: { Authorization: `Bearer ${token}` }}
      )
      .then((response) => {
        console.log(response);
        alert('Successfully added to favorite list!');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

   render() {
    const { movie, onBackClick, } = this.props;
  
    return (
      <Container fluid>
        <Row>
          <Col>
            <Card className='movieView-card' bg='dark' text='light'>
              <Card.Img
                className='movie-img'
                crossOrigin='anonymous' 
                src={ movie.ImagePath } />
                <Card.Body>
                <Card.Title className='pt-1'>
                  <Col className='card-title mt-2'>{ movie.Title }</Col>
                  </Card.Title>
                  <Card.Text className='mt-2'>
                    <span className='mview-text'>Description: </span>
                    { movie.Description } 
                  </Card.Text>

                  <Card.Text>
                  <span className='mview-text'>Director: </span> { movie.Directors.Name } 
                    <Link to={`/directors/${movie.Directors.Name}`}>
                      <Button
                        className='movieView-icon' 
                        variant='dark'
                        ><BsQuestionCircle/>
                      </Button>
                    </Link> 
                  </Card.Text>

                  <Card.Text>
                  <span className='mview-text'>Genre: </span> { movie.Genre.Name }
                    <Link to={`/genre/${movie.Genre.Name}`}>
                      <Button
                        className='movieView-icon' 
                        variant='dark'
                        ><BsQuestionCircle/>
                      </Button>
                    </Link>  
                  </Card.Text>
              </Card.Body>
              <Card.Footer> 
                <Button 
                  variant='outline-light' 
                  onClick={ () => {onBackClick(); }}
                  >« Back 
                </Button>
                <Button
                  className='fav-btn'
                  variant='outline-light'
                  onClick={() => this.addFavorite(movie)}
                  >Favorites + 
                </Button>
              </Card.Footer>
            </Card> 
          </Col>
        </Row>
      </Container>
    )

   }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};