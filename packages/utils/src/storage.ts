/**
 * @description Storage 本地存储
 */
export class Storage {
  /**
   * Local
   */

  static getLocal<T>(key: string): Nullable<T> {
    const value = window.localStorage.getItem(key);
    try {
      if (typeof value === 'string') {
        return JSON.parse(value) as T;
      }
      return value;
    } catch (error) {
      return value as Nullable<T>;
    }
  }

  static setLocal(key: string, value: unknown) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  static removeLocal(key: string) {
    window.localStorage.removeItem(key);
  }

  static clearLocal() {
    window.localStorage.clear();
  }

  /**
   * Session
   */

  static getSession<T>(key: string) {
    const value = window.sessionStorage.getItem(key);
    try {
      if (typeof value === 'string') {
        return JSON.parse(value) as T;
      }
      return value;
    } catch (error) {
      return value as Nullable<T>;
    }
  }

  static setSession(key: string, value: unknown) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  static removeSession(key: string) {
    window.sessionStorage.removeItem(key);
  }

  static clearSession() {
    window.sessionStorage.clear();
  }
}
