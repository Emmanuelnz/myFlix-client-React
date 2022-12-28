import React from 'react';

// Reducers Imports 
import { connect } from 'react-redux';

// Actions Imports 
import { setFilter } from '../../actions/actions';

// React-bootstrap imports 
import Form from 'react-bootstrap/Form';

function VisibilityFilterInput(props) {
  return <Form.Control
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="Search..."
  />;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);