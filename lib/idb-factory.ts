import { createStore, del, get, set } from 'idb-keyval';

export function createWorkspaceStore<T>(key: string) {
  const store = (workspaceId: string) => createStore(`ws-${workspaceId}`, 'default');

  return {
    get: (workspaceId: string) => get<T>(key, store(workspaceId)),
    set: (workspaceId: string, value: T) => set(key, value, store(workspaceId)),
    remove: (workspaceId: string) => del(key, store(workspaceId)),
  };
}
