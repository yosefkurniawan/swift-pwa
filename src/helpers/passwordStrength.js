import { passwordStrength } from "@config";
import zxcvbn from "./zxcvbn";

const { minValue, maxValue, numberOfRequiredClass } = passwordStrength;

const lower = "(?=.*[a-z])";
const upper = "(?=.*[A-Z])";
const number = "(?=.*[0-9])";
const special = "(?=.*[!@#$%^&=?<>+.*_-])";

const getScore = (password) => {
  if (password === "" || !password) {
    return 0;
  }

  const valid1 = new RegExp(
    `^(${lower}|${upper}|${number}|${special})(?=.{${minValue},})`
  );

  const valid2 = new RegExp(
    `^((${lower + upper})|(${lower + number})|(${number + upper})|(${
      lower + special
    })|(${special + upper}))(?=.{${minValue},})`
  );

  const valid3 = new RegExp(
    `^((${lower + upper + number})|(${lower + upper + special})|(${
      special + lower + number
    })|(${special + upper + number}))(?=.{${minValue},})`
  );

  const valid4 = new RegExp(
    `^(${lower + upper + number + special})(?=.{${minValue},})`
  );

  let valid;

  switch (numberOfRequiredClass) {
    case 1:
      valid = valid1.test(password);
      break;
    case 2:
      valid = valid2.test(password);
      break;
    case 3:
      valid = valid3.test(password);
      break;
    case 4:
      valid = valid4.test(password);
      break;
  }

  const zxcvbnScore = zxcvbn(password).score;
  return (valid === true) & (zxcvbnScore > 0) ? zxcvbnScore : 1;
};

export default (password) => {
  const score = getScore(password);
  switch (score) {
    case 0:
      return {
          status : "No Password",
      };
      break;
    case 1:
      return {
        status: "Weak",
        message: `Password must be ${minValue} caracters and required ${numberOfRequiredClass} of class (Uppercase, Lowercase, Numeric or Special caracters)`,
      };
      break;
    case 2:
      return {
          status : "Medium"
      };
      break;
    case 3:
      return {
          status : "Strong"
      };
      break;
    case 4:
      return {
          status : "Very Strong"
      };
      break;
  }
};
