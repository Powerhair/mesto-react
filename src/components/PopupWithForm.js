function PopupWithForm(props) {
  return (
    <div
      onClick={props.onClose}
      className={`popup popup_${props.name} ${
        props.isOpen ? `popup_opened` : ''
      }`}
    >
      <form className="form" name={props.name} noValidate>
        <h3 className="popup__title">{props.title}</h3>
        {props.children}
        <button className="popup__button-submit" type="submit">
          {props.buttonText}
        </button>
        <button
          className="popup__close popup__close_profile"
          type="button"
        ></button>
      </form>
    </div>
  );
}
export default PopupWithForm;
