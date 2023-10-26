function validateAvatar(avatar) {
  const PATTERN = /^image\/jpeg$|^image\/jpg$|^image\/png$/;

  return PATTERN.test(avatar.type) && avatar.size < 4000000;
}

export default validateAvatar;
