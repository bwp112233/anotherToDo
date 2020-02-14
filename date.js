exports.getDate = function () {
  return new Promise((resolve, reject) => {
    const today = new Date();

    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    };

    resolve(today.toLocaleDateString('en-US', options));
  });
};

exports.getDay = function () {
  return new Promise((resolve, reject) => {
    const today = new Date();

    const options = {
      weekday: 'long'
    };

    resolve(today.toLocaleDateString('en-US', options));
  });
};
