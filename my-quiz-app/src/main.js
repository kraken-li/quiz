import './style.css';

// Impor SDK Farcaster dari npm
import { sdk } from '@farcaster/frame-sdk';
window.FarcasterMiniApps = sdk;

// Impor logika quiz dari app.js
import './app.js';

console.log("Aplikasi dan SDK telah dimuat.");