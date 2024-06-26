import { Login } from 'Interfaces/login';

class StorageService<T> {
  constructor(private storageKeyPrefix: string) {}

  private getStorageKey(key: string): string {
    return `${this.storageKeyPrefix}_${key}`;
  }

  saveData<K extends keyof T>(key: K, data: T[K]): void {
    const storageKey = this.getStorageKey(key.toString());
    sessionStorage.setItem(storageKey, JSON.stringify(data));
  }

  removeData<K extends keyof T>(key: K): void {
    const storageKey = this.getStorageKey(key.toString());
    sessionStorage.removeItem(storageKey);
  }

  getData<K extends keyof T>(key: K, validate?: (data: unknown) => data is T[K]): T[K] | null {
    const storageKey = this.getStorageKey(key.toString());
    const data = sessionStorage.getItem(storageKey);

    if (data === null) {
      return null;
    }
    try {
      const result: unknown = JSON.parse(data);
      if (validate) {
        return validate(result) ? result : null;
      }
      return result as T[K];
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  }

  toggleData<K extends keyof T>(key: K, data: T[K]): void {
    if (this.getData(key)) {
      this.removeData(key);
    } else {
      this.saveData(key, data);
    }
  }
}

export type SessionStorage = {
  user: Login;
};

export const sessionStorageService = new StorageService<SessionStorage>('FUN-CHAT_');
