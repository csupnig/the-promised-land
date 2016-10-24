// Type definitions for MessageFormat.js
// Project: https://github.com/SlexAxton/messageformat.js

interface MessageFormat {
    locale : any;
}

declare var MessageFormat: MessageFormat;

declare module 'messageformat' {
    export = MessageFormat;
}
