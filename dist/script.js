DOM = {
  passwInput: document.querySelector('.password-strength__input'),
  passwVisibility: document.querySelector('.password-strength__visibility') };


const getPasswordVal = () => {
  console.log(DOM.passwInput.value);
  return DOM.passwInput.value;
};

DOM.passwInput.addEventListener('input', () => {
  getPasswordVal();
});

DOM.passwVisibility.addEventListener('click', () => {

});