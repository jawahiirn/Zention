import type { WorkspaceMemberList } from '@/services/types';
import { createWorkspaceStore } from '../idb-factory';

export const memberStore = createWorkspaceStore<WorkspaceMemberList>('members');

export const getMembers = memberStore.get;
export const setMembers = memberStore.set;
