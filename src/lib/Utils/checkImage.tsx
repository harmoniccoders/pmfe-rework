const checkIfImageExists = (
  url: string,
  callback: (exists: boolean) => void
) => {
  const img = new Image();
  img.src = url;

  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };

    img.onerror = () => {
      callback(false);
    };
  }
};

export default checkIfImageExists;
