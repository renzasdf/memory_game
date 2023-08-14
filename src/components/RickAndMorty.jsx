export const RickAndMorty = (props) => {
  const { items, cardClicked, currentScore, highScore } = props;

  const handleClick = (characterName) => {
    cardClicked(characterName);
  };

  return (
    <>
      <div>
        <header>
          <h1 className='title'>Rick and Morty Memory Game</h1>
          <div className='score'>
            <p>Current Score: {currentScore}</p>
            <p>High Score: {highScore}</p>
          </div>
        </header>

        <div className='character-list'>
          {items.map((character) => (
            <div
              id='name'
              className='character-item'
              key={character.id}
              onClick={() => handleClick(character.name)}>
              <h3>{character.name}</h3>
              <img src={character.image} alt={character.name} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
