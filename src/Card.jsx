export default function Card({ card, handleChoice, flipped, disabled }) {
  function handleClick() {
    if (!disabled) handleChoice(card);
  }

  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={handleClick}>
      <div className="card-inner">
        <img className="front" src={card.src} alt="card" />
        <img className="back" src="/img/cover.png" alt="cover" />
      </div>
    </div>
  );
}