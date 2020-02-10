module.exports = {
  // 10자리까지만 입력
  MaxLen10 : (value) => value.length <= 10,
  // 숫자만 입력
  OnlyNum : (value) => !(/[^0-9]/g.test(value)),
}