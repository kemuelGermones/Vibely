function validateImages(images) {
  const PATTERN = /^image\/jpeg$|^image\/jpg$|^image\/png$/;

  for (let image of images) {
    if (!PATTERN.test(image.type)) {
      return false;
    }
  }

  return true;
}

export default validateImages;
