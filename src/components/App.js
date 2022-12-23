import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import '../index.css';
import { api } from '../utils/Api';

function App() {
  const [userAvatar, setUserAvatar] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [cards, setCards] = React.useState([]);

  const [isOpenAvatarPopup, isEditAvatarPopupOpen] = React.useState(false);
  const [isOpenProfilePopup, isEditProfilePopupOpen] = React.useState(false);
  const [isOpenPlacePopup, isAddPlacePopupOpen] = React.useState(false);
  const [isOpenCardPopup, isOpenCardPopupOpen] = React.useState(false);
  const [selectedCard, fixSelectedCard] = React.useState({});

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
        setCards(
          cards.map((card) => ({
            cardId: card._id,
            cardName: card.name,
            cardImg: card.link,
            cardLikes: card.likes,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardClick(card) {
    isOpenCardPopupOpen(true);
    fixSelectedCard(card);
  }

  function handleEditAvatarClick() {
    isEditAvatarPopupOpen(true);
    console.log(1231);
  }

  function handleEditProfileClick() {
    isEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    isAddPlacePopupOpen(true);
  }

  function closeAllPopups(evt) {
    if (evt.button === 0) {
      if (
        evt.target.classList.contains('popup_opened') ||
        evt.target.classList.contains('popup__close')
      ) {
        isEditProfilePopupOpen(false);
        isAddPlacePopupOpen(false);
        isEditAvatarPopupOpen(false);
        isOpenCardPopupOpen(false);
      }
    }
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        userAvatar={userAvatar}
        userName={userName}
        userDescription={userDescription}
        cards={cards}
      />
      <Footer />
      <PopupWithForm
        name="profile"
        title={'Редактировать профиль'}
        buttonText={'Сохранить'}
        isOpen={isOpenProfilePopup}
        onClose={closeAllPopups}
      >
        <input
          name="nameInput"
          defaultValue="Имя"
          id="name-input"
          className="form__input form__name"
          type="text"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
        />
        <div className="form__error-conteiner">
          <span
            id="name-input-error"
            className="form-input-message-error"
          ></span>
        </div>
        <input
          name="jobInput"
          defaultValue="Описание"
          id="job-input"
          className="form__input form__description"
          type="text"
          placeholder="Описание"
          required
          minLength="2"
          maxLength="200"
        />
        <div className="form__error-conteiner">
          <span
            id="job-input-error"
            className="form-input-message-error"
          ></span>
        </div>
      </PopupWithForm>
      <PopupWithForm
        name="card-add"
        title={'Новое место'}
        buttonText={'Сохранить'}
        isOpen={isOpenPlacePopup}
        onClose={closeAllPopups}
      >
        <input
          name="titleInput"
          id="title-input"
          defaultValue="Название"
          className="form__input form__title"
          type="text"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <div className="form__error-conteiner">
          <span
            id="title-input-error"
            className="form-input-message-error"
          ></span>
        </div>
        <input
          name="linkInput"
          id="link-inputCard"
          defaultValue="Ссылка на картинку"
          className="form__input form__link"
          type="url"
          placeholder="Ссылка на картинку"
          required
        />
        <div className="form__error-conteiner">
          <span
            id="link-inputCard-error"
            className="form-input-message-error"
          ></span>
        </div>
      </PopupWithForm>
      <PopupWithForm
        name="delete"
        title={'Вы уверены?'}
        buttonText={'Да'}
      ></PopupWithForm>
      <PopupWithForm
        name="сhangeAvatar"
        title={'Обновить аватар'}
        buttonText={'Сохранить'}
        isOpen={isOpenAvatarPopup}
        onClose={closeAllPopups}
      >
        <input
          name="linkInput"
          id="link-input"
          defaultValue="Ссылка на картинку"
          className="form__input form__link"
          type="url"
          placeholder="Ссылка на картинку"
          required
        />
        <div className="form__error-conteiner">
          <span
            id="link-input-error"
            className="form-input-message-error"
          ></span>
        </div>
      </PopupWithForm>
      <ImagePopup
        isOpen={isOpenCardPopup}
        card={selectedCard}
        onClose={closeAllPopups}
      ></ImagePopup>
    </div>
  );
}

export default App;
