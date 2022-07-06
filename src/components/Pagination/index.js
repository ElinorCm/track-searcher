import React from 'react';
import PropTypes from 'prop-types';
import { Pagination as PaginationUI, Segment } from 'semantic-ui-react';

import './pagination.scss';

function Pagination({ onPaginationClick }) {
  return (
    <Segment
      className="pagination-segment"
    >
      <PaginationUI
        defaultActivePage={1}
        disabled
        totalPages={5}
        onClick={(evt) => onPaginationClick(evt)}
      />
    </Segment>
  );
}

Pagination.propTypes = {
  onPaginationClick: PropTypes.func.isRequired,
};

export default Pagination;
