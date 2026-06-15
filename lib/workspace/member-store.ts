import type { WorkspaceMemberList } from '@/services/types';
import { createWorkspaceStore } from '../idb-factory';

export const memberStore = createWorkspaceStore<WorkspaceMemberList>('members');

export const getCachedMembers = memberStore.get;
export const setCachedMembers = memberStore.set;
