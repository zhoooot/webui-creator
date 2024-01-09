export const otpValidation = (otp: string) : boolean => {
  const otpRegex = /^[0-9]{6}$/;
  return otpRegex.test(otp);
}