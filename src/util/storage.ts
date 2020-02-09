export default {
  get: <T>(key: string, defaultValue?: any): Promise<T> =>
    new Promise((resolve, reject) =>
      chrome.storage.local.get({ [key]: defaultValue }, items => {
        resolve(items[key]);
      })
    ),
  set: (key: string, value: any) =>
    new Promise((resolve, reject) =>
      chrome.storage.local.set(
        {
          [key]: value,
        },
        resolve
      )
    ),
  remove: (key: string) =>
    new Promise((resolve, reject) => chrome.storage.local.remove(key, resolve)),
};
