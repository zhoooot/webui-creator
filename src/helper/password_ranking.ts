export const passwordRanking = (password: string): number => {
  //test the password for strength
  let strength = 0;
  if (password.length > 5) strength += 20;
  //if password contains both lower and uppercase characters, increase strength value
  if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 20;
  //if it has numbers and characters, increase strength value
  if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 20;
  //if it has one special character, increase strength value
  if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 20;
  //if it has two special characters, increase strength value
  if (password.match(/(.*[!,%,&,@,#,$,^,*,?,_,~].*[!,%,&,@,#,$,^,*,?,_,~])/))
    strength += 20;
  //now we have calculated strength value, we can return messages
  return strength;
};
