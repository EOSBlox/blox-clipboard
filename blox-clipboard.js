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
        observer: '_copyToClipboard',
      },
    };
  }


  _fallbackCopyTextToClipboard() {
    var textArea = document.createElement("textarea");
    textArea.value = this.text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  _copyToClipboard() {
    if (!navigator.clipboard) {
      this._fallbackCopyTextToClipboard(this.text);
      return;
    }
    navigator.clipboard.writeText(this.text);
  }

} window.customElements.define('blox-clipboard', BloxClipboard);
