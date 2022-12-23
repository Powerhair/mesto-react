function Card({ card, onCardClick }) {
  function handleCardClick() {
    onCardClick(card);
  }

  return [
    <div className="element" key={card.cardId}>
      <button className="element__trash" id="btnDelete" type="button"></button>
      <img
        alt={card.cardName}
        src={card.cardImg}
        onClick={handleCardClick}
        className="element__image"
      />
      <div className="element__container">
        <h2 className="element__title">{card.cardName}</h2>
        <div className="element__like-section">
          <button className="element__like" id="btnLike" type="button"></button>
          <p className="element__like-counter">{card.cardLikes.length}</p>
        </div>
      </div>
    </div>,
  ];
}

export default Card;
