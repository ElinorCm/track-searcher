import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

import AudioPlayer from 'src/components/AudioPlayer';
import Pagination from 'src/components/Pagination';

const TrackResults = ({ results, onPaginationClick }) => (
  <>
    <Card.Group centered itemsPerRow={4}>
      {results.items.map((track) => (
        <Card
          key={track.id}
          image={track.album.images[0].url}
          header={track.name}
          meta={track.artists[0].name}
          extra={<AudioPlayer url={track.preview_url} />}
        />
      ))}
    </Card.Group>
    <Pagination
      onPaginationClick={onPaginationClick}
    />
  </>
);

TrackResults.propTypes = {
  results: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        preview_url: PropTypes.string,
        album: PropTypes.shape({
          images: PropTypes.arrayOf(
            PropTypes.shape({
              url: PropTypes.string.isRequired,
            }).isRequired,
          ).isRequired,
        }).isRequired,
        artists: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
          }).isRequired,
        ).isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
  onPaginationClick: PropTypes.func.isRequired,
};

export default TrackResults;
