// import './index.css';

import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Api from "../components/Api.js";

//-------------------------------------------------------------------
const footerButton = document.querySelector('.footer__button');
const validationConfig = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.main-button',
    inactiveButtonClass: 'button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const popupTypeSend = new PopupWithForm ('.popup_type_send', submitAddCardForm);
const popupTypeMessage = new PopupWithConfirm ('.popup_type_message');

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-35/users/me',
    headers: {
        authorization: '38cb0870-aa41-456b-9f9f-084af1a40bb1', 
        'Content-Type': 'application/json',
    },
});


// универсальный валидатор
const formValidators = {}

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement)
        const formName = formElement.getAttribute('name')

        formValidators[formName] = validator;
        validator.enableValidation();
    });
};
enableValidation(validationConfig);


// отправка сообщения на сервер
function submitAddCardForm(inpuyValues) {
    api.postMessage(inpuyValues)
        .then(() => {
            popupTypeSend.close();
            popupTypeMessage.open()
        })
        .catch((err) => {
            console.log(`Невозможно отправить сообщение ${err}`);
        });
}


// слушателт
footerButton.addEventListener('click', function() {
    formValidators['send'].resetValidation();
    popupTypeSend.open();
});

popupTypeSend.setEventListeners();
popupTypeMessage.setEventListeners();

