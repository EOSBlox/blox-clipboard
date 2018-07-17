import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `blox-clipboard`
 * A webcomponent that copies the supplied text to the clipboard
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class BloxClipboard extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
    `;
  }
  static get properties() {
    return {
      text: {
        type: String,
        observer: '_copyTextToClipboard',
      },
    };
  }


  _fallbackCopyTextToClipboard() {
    var textArea = document.createElement("textarea");
    textArea.value = this.text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
  
    document.body.removeChild(textArea);
  }

  _copyTextToClipboard() {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(this.text);
      return;
    }
    navigator.clipboard.writeText(this.text)
    .then(function() {
      console.log('Copying to clipboard was successful!');
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
  }

} window.customElements.define('blox-clipboard', BloxClipboard);
