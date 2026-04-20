import { useEffect, useState } from "react";
import Card from "./Card";

const cardImages = [
  { src: "/img/1.png" },
  { src: "/img/2.png" },
  { src: "/img/3.png" },
  { src: "/img/4.png" },
  { src: "/img/5.png" },
  { src: "/img/6.png" }
];

export default function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);

  // Shuffle cards
  function shuffleCards() {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        id: Math.random(),
        matched: false
      }));

    setCards(shuffled);
    setTurns(0);
    setWon(false);
  }

  // Handle choice
  function handleChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // Compare choices
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prev) =>
          prev.map((card) =>
            card.src === choiceOne.src
              ? { ...card, matched: true }
              : card
          )
        );
        resetTurn();
      } else {
        setTimeout(resetTurn, 800);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset turn
  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((t) => t + 1);
    setDisabled(false);
  }

  // Check win
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setWon(true);
    }
  }, [cards]);

  // Start game
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="container">
      <h1>🧠 Memory Game</h1>

      <button onClick={shuffleCards}>New Game</button>
      <p>Moves: {turns}</p>

      {won && <p className="win">🎉 You Won in {turns} moves!</p>}

      <div className="grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne ||
              card === choiceTwo ||
              card.matched
            }
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}