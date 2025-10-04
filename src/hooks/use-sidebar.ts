import { create } from 'zustand';

type SidebarStore = {
  isCollapsed: boolean;
  isResetting: boolean;
  onCollapse: () => void;
  onExpand: () => void;
  toggle: () => void;
  setResetting: (resetting: boolean) => void;
};

export const useSidebar = create<SidebarStore>((set, get) => ({
  isCollapsed: false,
  isResetting: false,
  onCollapse: () => set({ isCollapsed: true }),
  onExpand: () => set({ isCollapsed: false }),
  toggle: () => set({ isCollapsed: !get().isCollapsed }),
  setResetting: (resetting: boolean) => set({ isResetting: resetting }),
}));
