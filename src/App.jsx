import { RickAndMorty } from './components/RickAndMorty';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [cardsClicked, setCardsClicked] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const cardClicked = (name) => {
    if (cardsClicked.includes(name)) {
      if (currentScore > highScore) {
        setHighScore(currentScore);
      }
      setCurrentScore(0);
      setCardsClicked([]);
      handleShuffle();
    } else {
      setCurrentScore((currentScore) => currentScore + 1);
      setCardsClicked([...cardsClicked, name]);
      handleShuffle();
      if (currentScore === 12) {
        setHighScore(currentScore);
        setCurrentScore(0);
        setCardsClicked([]);
        handleShuffle();
      }
    }
  };

  const handleShuffle = () => {
    const shuffledItems = [...characters];
    shuffleArray(shuffledItems);
    setCharacters(shuffledItems);
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await axios.get(
          'https://rickandmortyapi.com/api/character'
        );
        const characterData = response.data.results.slice(0, 12);

        setCharacters(characterData);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    }

    fetchCharacters();
  }, []);

  return (
    <>
      <RickAndMorty
        items={characters}
        cardClicked={cardClicked}
        currentScore={currentScore}
        highScore={highScore}
      />
    </>
  );
}

export default App;
