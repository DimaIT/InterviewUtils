/**
 * @param {string} str
 * @returns {Promise<string>}
 */
function asyncFn(str) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof str !== 'string') {
        reject(new Error('only strings accepted'));
      } else if (str.includes('error')) {
        reject(new Error(str));
      } else {
        resolve(`async ${str}`);
      }
    }, 25);
  });
}

module.exports.asyncHandlerCatch = function (input) {
  return asyncFn(input)
    .catch(e => {
      const messageWithoutError = e.message.split('error').join('');
      return `catch ${messageWithoutError}`;
    });
};

module.exports.asyncHandlerThrow = function (input) {
  return asyncFn(input)
    .then(msg => {
      if (msg.includes('throw')) {
        return `${msg} error`;
      }
      return msg;
    })
    .then(asyncFn);
};

module.exports.asyncHandlerResolve = function (input) {
  return Promise.resolve(input)
    .then(asyncFn)
    .catch(e => {
      const messageWithoutError = e.message.split('error').join('');
      return `catch ${messageWithoutError}`;
    })
    .then(asyncFn);
};


module.exports.asyncHandler = function (input) {
  return asyncFn(input)
    .then(asyncFn)
    .catch(e => {
      const messageWithoutError = e.message.split('error').join('');
      return `catch ${messageWithoutError}`;
    })
    .then(msg => {
      if (msg.includes('throw')) {
        return `${msg} error`;
      }
      return msg;
    })
    .then(asyncFn);
};
