export default class Popup {
    constructor(popupSelector) {  
      this._popup = document.querySelector(popupSelector);
      this._closeButton = this._popup.querySelector('.popup__button_type_close');
      this._popupOverlay = this._popup.querySelector('.popup__overlay');
    }
    
    open() {
        this._disableScroll();
        this._popup.classList.add ('popup_opened'); 
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        
        this._popup.classList.remove ('popup_opened'); 
        this._enableScroll()
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if(evt.key === "Escape") {
            this.close();                         
        }
    }
    
    setEventListeners () {
        this._closeButton.addEventListener('click', () => {
            this.close();
        });
        
        this._popupOverlay.addEventListener('click', () => {
            this.close();
        });
    }

    _disableScroll() {
        let pagePosition = window.scrollY;
        let paddingValue = window.innerWidth - document.querySelector('.page').offsetWidth + 'px';
        document.body.classList.add('disable-scroll');
        document.body.dataset.position = pagePosition;
        document.body.style.top = -pagePosition + 'px';
        document.querySelector('.root').style.paddingRight = paddingValue;
    }
    
    _enableScroll() {
        let pagePosition = parseInt(document.body.dataset.position, 10);
        document.body.style.top = 'auto';
        document.body.classList.remove('disable-scroll');
        window.scroll({ top: pagePosition, left: 0 });
        document.body.removeAttribute('data-position');
        document.querySelector('.root').style.paddingRight = 0;
    }
}
