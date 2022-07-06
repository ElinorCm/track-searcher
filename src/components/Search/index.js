import React from 'react';
import PropTypes from 'prop-types';

import { Input, Form, Image } from 'semantic-ui-react';

import logoSpotify from 'src/assets/logo_spotify.png';
import './search.scss';

const SearchBar = ({
  searchValue, setSearchValue, placeholder, onTracksSubmit,
}) => (
  <>
    <Image centered size="medium" src={logoSpotify} />
    <Form
      className="search__form"
      onSubmit={onTracksSubmit}
    >
      {/* Champ controlé classique, mais avec un <Input> de semantic ui */}
      <Input
        fluid
        icon="search"
        placeholder={placeholder}
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      />
    </Form>
  </>
);

SearchBar.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  onTracksSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
