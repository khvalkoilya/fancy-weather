import vars from '../variables.js';
export default function clocks () {
    setInterval(function() {
        const time = getTime();
        let h = time.getHours();
        let m = time.getMinutes();
        let s = time.getSeconds();
        if(h.length<2) {
            h = `0${h}`;
        }
        if(m.length<2) {
            m = `0${m}`;
        }
        if(s.length<2) {
            s = `0${s}`;
        }
        vars.clockHTML.innerHTML = `${h}.${m}.${s}`;
    }, 1000)
}

function getTime() {
    const myDate = new Date();
    const differense = myDate.getTimezoneOffset() * 60000;
    const offset = vars.offset * 1000;
    const time = new Date(Date.parse(myDate) + differense + offset);
    return time;
}
