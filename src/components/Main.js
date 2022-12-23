import React from 'react';
import Card from './Card';

function Main(props) {
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image">
          <img
            src={props.userAvatar}
            alt="Фото профиля"
            className="profile__avatar"
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{props.userName}</h1>
          <p className="profile__text">{props.userDescription}</p>
          <button
            onClick={props.onEditProfile}
            className="button profile__editButton"
            type="button"
          ></button>
        </div>
        <button
          onClick={props.onAddPlace}
          className="button profile__addButton"
          type="button"
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card key={card.cardId} card={card} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
