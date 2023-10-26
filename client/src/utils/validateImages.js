function validateImages(images) {
  const PATTERN = /^image\/jpeg$|^image\/jpg$|^image\/png$/;

  for (let image of images) {
    if (!(PATTERN.test(image.type) && image.size < 4000000)) {
      return false;
    }
  }

  return true;
}

export default validateImages;
