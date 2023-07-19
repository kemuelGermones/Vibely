function validateImages(images) {
  if (!images.length || images.length > 5) {
    return false;
  }

  const pattern = /^image\/jpeg$|^image\/jpg$|^image\/png$/;

  for (let image of images) {
    if (!pattern.test(image.type)) {
      return false;
    }
  }

  return true;
}

export default validateImages;
