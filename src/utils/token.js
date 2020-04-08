/**
 * Token对象
 * 1.过期时间
 * 2.token
 * 3.是否可用
 * author: Tony
 */
export default class Token {
  constructor(token, expireTime) {
    this.token = token;
    this.expireTime = expireTime;
  }
  /* 检查token是否有效，检查规则为当前时间和过期时间进行是对比(毫秒级比较) */
  isValid() {
    return !!this.token && Date.now() < this.expireTime;
  }
}
