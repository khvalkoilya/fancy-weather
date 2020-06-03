import vars from './variables.js';
import getDates from './initialization.js';

export default function recognizerStart () {
  vars.micro.classList.remove('inactive-search');
  const recognizer = new webkitSpeechRecognition();
  recognizer.interimResults = true;
  const lang = vars.lang.toLowerCase();
  recognizer.lang = `${lang}_${lang.charAt(0).toUpperCase()}${lang.charAt(1)}`;
  recognizer.onresult = async function (event) {
    const result = event.results[event.resultIndex];
    if (result.isFinal) {
      vars.input.value = result[0].transcript;
      vars.previousCity = vars.city;
      vars.city = result[0].transcript;
      await getDates();
      vars.input.value = '';
      vars.micro.classList.add('inactive-search');
    }
  };
  recognizer.start();
}

