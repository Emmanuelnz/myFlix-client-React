import React from 'react';
import PropTypes from 'prop-types';

// React-router imports
import { Link } from 'react-router-dom';

// React-bootstrap imports
import { Col, Card, Button } from "react-bootstrap";

// Custom SCSS
import '../movie-card/movie-card.scss';

export class MovieCard extends React.Component {
  
  render() {
    const { movie } = this.props;

    return (
      <Col>
        <Card bg='dark' text='light'>
          <Link to={`movies/${movie._id}`} >
            <Card.Img
              className='card-img'
              variant='top' 
              crossOrigin='anonymous'
              src={movie.ImagePath} 
              />
          </Link>
            <Card.Title className='movie-card'>{movie.Title}</Card.Title>
          <Card.Footer>
            <Link to={`/movies/${movie._id}`}>
              <Button variant='outline-light'>Details</Button>
            </Link>
          </Card.Footer>
        </Card>
      </Col>
      );
    }
  }

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
  }).isRequired,
};
