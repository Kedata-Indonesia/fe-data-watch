const timeLeftConvert = seconds => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const second = Math.floor(seconds - hours * 3600 - minutes * 60);

  let timeLeft = `${second || 0} sec`;
  if (minutes) {
    timeLeft = `${minutes ?? 0} min ${timeLeft}`;
  }
  if (hours) {
    timeLeft = `${hours ?? 0} hr ${timeLeft}`;
  }

  return `${timeLeft} remaining`;
};

export default timeLeftConvert;
