import { GiphyFetch } from '@giphy/js-fetch-api'
import { Gif, Grid } from "@giphy/react-components"
import React, { useState } from "react";
import { render } from "react-dom";
import useDebounce from "react-use/lib/useDebounce";
import ResizeObserver from "react-resize-observer";
import './App.css';

const GIPHY_API = "yKtUX7bMFtaAKgeNEy330Ux3nDKZprUN";

const SEARCH_DEBOUNCE = 500;

const giphyFetch = new GiphyFetch(GIPHY_API)


function GridSearch({ onGifClick }) {
  const [debouncedInput, setDebouncedInput] = useState("");
  const [term, setTerm] = useState("");
  const [width, setWidth] = useState(window.innerWidth);

  useDebounce(() => setTerm(debouncedInput), SEARCH_DEBOUNCE, [debouncedInput]);
  let fetchGifs;
  if (debouncedInput.includes("/gif", 0)) {
    fetchGifs = async (offset) =>
      giphyFetch.search(term.replace('/gif', ''), { offset: 0, limit: 6 });
  }

  const NoResults = <div className="no-results">No Results for {term}</div>;
  return (
    <>
      {term && (
        <Grid
          onGifClick={onGifClick}
          className='grid'
          columns={3}
          noResultsMessage={NoResults}
          key={term}
          fetchGifs={fetchGifs}
          width={400}
          gutter={6}
        />
      )}
      <ResizeObserver
        onResize={({ width }) => {
          setWidth(width);
        }}
      />
      <input
        placeholder="/gif"
        onChange={({ target: { value } }) => setDebouncedInput(value)}
        value={debouncedInput}
      />
    </>
  );
}

function App() {
  const [modalGif, setModalGif] = useState();

  const time = new Date();
  const formattedTime = time.toLocaleTimeString();

  return (
    <>
      <GridSearch
        onGifClick={(gif, e) => {
          e.preventDefault();
          rootElement.innerHTML = "";
          setModalGif(gif);
        }}

      />
      {modalGif && (
        <div
          onClick={(e) => {
            e.preventDefault();
            setModalGif(undefined);
          }}
        >
          <div className='sent-gif'>
            <Gif gif={modalGif} width={200} />
            <p className='time'>{formattedTime}</p>
          </div>
          <input
            placeholder='Напишите сообщение...'
          />
        </div>
      )}
    </>
  );
}

let rootElement = document.getElementById("root");
render(<App />, rootElement);

export default App
