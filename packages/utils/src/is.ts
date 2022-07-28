const toString = Object.prototype.toString;

/**
 * 判断值的类型
 * @param {any} val 值
 * @param {string} type 类型
 */
export default function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * 正则判断URL
 * @param {string} path
 */
export function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}

/**
 * 正则判断手机号
 * @param {string} path
 */
export function isPhone(phone: string): boolean {
  const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}|^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/;
  return reg.test(phone);
}

/**
 * 正则判断email
 * @param {string} path
 */
export function isEmail(email: string): boolean {
  const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
  return reg.test(email);
}
