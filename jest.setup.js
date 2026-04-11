const { Buffer } = require('buffer');
globalThis.Buffer = Buffer;

const crypto = require('crypto');
if (!globalThis.crypto) {
  globalThis.crypto = {
    webcrypto: {
      getRandomValues: arr => crypto.randomFillSync(arr),
    },
  };
}
