const ls = {
  clear: () => window.localStorage.clear(),
  get: (key: any) => window.localStorage.getItem(key)!,
  remove: (key: any) => window.localStorage.removeItem(key),
  set: (key: any, value: any) => window.localStorage.setItem(key, value)
}

export default ls
