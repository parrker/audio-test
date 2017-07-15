export default (func) => {
  const params = { audio: true, video: false };

  navigator.getUserMedia(params, func, (error) => {
    console.error(error);
  });
};

