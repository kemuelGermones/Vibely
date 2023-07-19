function validateAvatar(avatar) {
  if (!avatar) {
    return false;
  }

  const pattern = /^image\/jpeg$|^image\/jpg$|^image\/png$/;

  return pattern.test(avatar.type);
}

export default validateAvatar;
