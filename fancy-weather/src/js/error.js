import vars from './variables.js';

function closeByClickOnScreen(e) {
  if (e.target.className !== 'error'
  && e.target.className !== 'error__simple-text'
  && e.target.className !== 'error__error-text') {
    vars.errorBlock.classList.add('none');
  }
}

export default function createErrorMessage(error) {
  vars.city = vars.previousCity;
  vars.errorBlock.classList.remove('none');
  vars.errorText.innerHTML = error;
  vars.closeErrorBlock.addEventListener('click', () => vars.errorBlock.classList.add('none'));
  vars.body.addEventListener('click', (e) => closeByClickOnScreen(e));
}
