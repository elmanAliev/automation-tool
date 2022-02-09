import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__container');
        this._submitForm = submitForm;
        this._inputList = Array.from (this._form.querySelectorAll('.popup__input'));
    }

    _getInputValues = () => {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    close() {
        this._form.reset();
        super.close();
    }

    setEventListeners() {
        super.setEventListeners(); 
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        }); 
        
    }
}