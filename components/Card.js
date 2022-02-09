export default class Card {
    constructor(card, cardSelector, handleCardClick, userID, handleCardDelete, handleLikeCard) {  // принимает селектор карточки (чтобы конструктор был универсальным и мог работать с разными селекторами)
      this._name = card.name;
      this._link = card.link;
      this._likes = card.likes.length;
      this._cardOwnerID = card.owner._id; 
      this._userID = userID;
      this._cardID = card._id
      this._isLike = card.likes.some(item => item._id == this._userID);
      
      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._handleCardDelete = handleCardDelete;
      this._handleLikeCard = handleLikeCard;

      this._cardElement = document
        .querySelector(this._cardSelector)  // найдем темплейт эл-т с переданным селектором
        .content                            // извлекаем его содержимое 
        .querySelector('.element')          // в содержимом найдёт элемент с классом element
        .cloneNode(true);
      this._image = this._cardElement.querySelector('.element__image');
      this._like = this._cardElement.querySelector('.element__like');
      this._likesNumber = this._cardElement.querySelector('.element__likes-number');
      this._trash = this._cardElement.querySelector('.element__trash')
      if (this._isLike) {
        this._like.classList.add('element__like_active');
      }    
    }
    
    // метод удаления карточки
    removeCard() {
      this._cardElement.remove();   
    }
    
    // метод возвращающий ID карточки
    getCardID() {
      return this._cardID;
    }

    // метод возвращающий состояние лайка карточки
    getIsLike() {
      return this._isLike
    }

    // управление лайками
    handleLikeImg(card) {
      this._likesNumber.textContent = card.likes.length;
      this._isLike = !this._isLike
      if (this._isLike) {
        this._like.classList.add('element__like_active');
      } else {
        this._like.classList.remove('element__like_active');
      }
    }
    
    // метод добавления обработчиков
    _setEventListeners() {
      const data = { name: this._name, link: this._link };
      this._image.addEventListener('click', () => { // при клике на элемент открываем попап
        this._handleCardClick(data);
      });
       
      this._like.addEventListener('click', () => {  // при клике ставим лайк
        // this._handleLikeImg();
        this._handleLikeCard(this);                      
      });
      
      this._trash.addEventListener('click', () => {  // при клике вызываем удаление
        // this._handleRemoveCard();  
        this._handleCardDelete(this);                       
      });
    }


    // метод, добавляющий карточку в разметку
    generateCard() {
        // вызываем слушатели для карточки
        this._setEventListeners();           
        // Добавим данные
        this._image.src = this._link;
        this._cardElement.querySelector('.element__name').textContent = this._name;
        this._image.alt = this._name;
        this._likesNumber.textContent = this._likes;
        // Если карточка создана не вами, на ней нет иконки корзины 
        if(this._cardOwnerID !== this._userID) {
          this._trash.classList.add('element__trash_hide')
        }
        
        // Вернём элемент наружу
        return this._cardElement;
    }
}