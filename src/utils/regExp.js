export default {
  email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/,
  number: /^[+-]?(0|([1-9]\d*))(\.\d+)?$/,
  intNumber: /^[1-9]\d*$/,
};
