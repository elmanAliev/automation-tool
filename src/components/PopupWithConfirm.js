import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._button = this._popup.querySelector('.main-button');
    }
    
    setEventListeners() {
        super.setEventListeners(); 
        this._button.addEventListener('click', () => {
            this.close();
        }); 
        
    }
}