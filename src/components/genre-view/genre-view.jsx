import React from 'react';
import PropTypes from 'prop-types';

// React-bootstrap imports
import { Container, Card, Button } from 'react-bootstrap';

// Custom SCSS 
import '../genre-view/genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;
    
    return (
      <Container>
        <Card bg='dark' text='light' className='mt-4'>
          <Card.Header className='title'>Genre</Card.Header>
            <Card.Body>
              <Card.Text><span>Type: </span>{genre.Name}</Card.Text>
              <Card.Text><span>Description: </span>{genre.Description}</Card.Text>
            </Card.Body>
          <Card.Footer>
            <Button 
              variant='outline-light'
              onClick={() => {onBackClick();}} 
            > « Back
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired
}
