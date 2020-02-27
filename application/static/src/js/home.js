import {MDCRipple} from '@material/ripple/index';

const ripple = new MDCRipple(document.querySelector('.mdc-button'));


// Topbar
import {MDCTopAppBar} from '@material/top-app-bar';

// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

/** 
 * Service Worker
 */

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('Service Worker is registered', registration);
      })
      .catch(err => {
        console.error('Registration failed:', err);
      });
    });
  }
