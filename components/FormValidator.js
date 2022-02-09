export default class FormValidator {
  constructor(settings, form) {  // принимает селектор карточки (чтобы конструктор был универсальным и мог работать с разными селекторами)
    this._form = form;
    this._input = settings.inputSelector;
    this._submitButton = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._input));
    this._buttonElement = this._form.querySelector(this._submitButton);
  }
  

  // метод показа ошибки 
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`); // получаем span (Находим элемент ошибки внутри самой функции)
    inputElement.classList.add(this._inputErrorClass); // добавляем полю класс (стили невалидного поля)
    errorElement.textContent = errorMessage; // в span добавляем текст ошибки
    errorElement.classList.add(this._errorClass); // показваем span
  };


  // метод скрытия ошибки 
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);  // получаем span (Находим элемент ошибки внутри самой функции)
    inputElement.classList.remove(this._inputErrorClass); // удаляем у поля класс (стили невалидного поля)
    errorElement.classList.remove(this._errorClass); // скрываем span
    errorElement.textContent = ''; // в span добавляем пустую строку
  };


  // метод проверки на валидность 
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      // если поле не проходит валидацию, вызываем метод показа ошибки
      // inputElement.validationMessage - это сообщение об ошибке конкретного поля
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // если проходит валидацию, вызываем метод скрытия ошибки
      this._hideInputError(inputElement);
    }
  }

  // метод добавления обработчиков на все поля ввода
  _setEventListeners() {
    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля (чтобы до начала ввода данных она была неактивна)
    this._toggleButtonState();
    
    // Обойдём все поля ввода формы
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем checkInputValidity, передав проверяемый элемент
        this._checkInputValidity(inputElement);

        //Нужно сверять состояние кнопки при каждом изменении полей формы. 
        // Поэтому toggleButtonState вызывают внутри обработчика события input. 
        //чтобы проверять его при изменении любого из полей
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true. Обход массива прекратится и вся ф hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    }); 
  }
  
  // метод делает кнопку активной/неактивной
  // Для этого функция hasInvalidInput проверяет валидность полей и возвращает true или false. 
  // На их основе toggleButtonState меняет состояние кнопки
  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.classList.remove(this._inactiveButtonClass); 
      this._buttonElement.disabled = false;
    } 
  }
  
  // метод включения валидации
  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      // У формы отменим стандартное поведение
      evt.preventDefault();
    });
    this._setEventListeners();
  }
  
  //удаление ошибок валидации, возникающих при повторном открытии попапа
  resetValidation() {
    this._toggleButtonState(); 
    this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
    });
  }
}





