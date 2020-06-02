import vars from './variables.js';
import language from './translation/collector.js';

export default function translate() {
    const words = language[vars.lang.toLowerCase()];
    vars.dayFull = words.dayFull;
    vars.dayShort = words.dayShort;
    vars.month = words.month;
}
