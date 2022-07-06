// == Import npm
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Message } from 'semantic-ui-react';

import Login from 'src/components/Login';
import Loading from 'src/components/Loading';
import Search from 'src/components/Search';
import TrackResults from 'src/components/TrackResults';

import trackSearch from 'src/data/track_search';

import 'semantic-ui-css/semantic.min.css';
import './app.scss';

// == Composant
const App = () => {
  const [search, setSearch] = useState('');
  const [token, setToken] = useState('BQCQub5-Kl4TtvyaYtLQC86Xp0jvvS1Z828nBlrU_Dgr8Udf5xUMhMJp5XpmKon65t8foYxD_jT5gOv382U8pUY1kn4XqswAOjCij9L5Fol_NjZaQRs54U9HUS4zCz3B25gK82f3OwpSbxx36BwjOLLeR1m6E6Sg2LCKgfLRvbY');
  const [tracks, setTracks] = useState(trackSearch.tracks);
  const [pageCounter, setPageCounter] = useState(1);
  const [tracksPerPage, setTracksPerPage] = useState(10);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleTracksSubmit = () => {
    if (!search) {
      return;
    }
    setLoading(true);
    const settings = {
      url: `https://api.spotify.com/v1/search?q=${search}&type=track&limit=${tracksPerPage}&offset=${pageCounter}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(settings)
      .then((response) => {
        setTracks(response.data.tracks);
        setErrorMessage('');
        setLoading(false);
      });
  };

  const handlePaginationClick = (evt) => {
    if (!search) {
      setErrorMessage('Veuillez lancer une recherche');
      return;
    }
    const pageRequired = evt.target.getAttribute('value');
    setLoading(true);
    const settings = {
      url: `https://api.spotify.com/v1/search?q=${search}&type=track&limit=${tracksPerPage}&offset=${(pageRequired * tracksPerPage) + 1}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(settings)
      .then((response) => {
        setTracks(response.data.tracks);
        setLoading(false);
        setPageCounter(pageRequired);
      });
  };

  return (
    <div className="app">
      <Login
        accessToken={token}
        setAccessToken={setToken}
      />
      <Search
        searchValue={search}
        setSearchValue={setSearch}
        placeholder="Chercher une chanson"
        onTracksSubmit={handleTracksSubmit}
      />
      {
        loading && <Loading />
      }
      {
        errorMessage.length > 0 && <Message color="orange">{errorMessage}</Message>
      }
      <TrackResults
        results={tracks}
        onPaginationClick={handlePaginationClick}
      />
    </div>
  );
};

// == Export
export default App;
