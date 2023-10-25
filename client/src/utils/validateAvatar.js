function validateAvatar(avatar) {
  const PATTERN = /^image\/jpeg$|^image\/jpg$|^image\/png$/;

  return PATTERN.test(avatar.type);
}

export default validateAvatar;
