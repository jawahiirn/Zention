import { create } from 'zustand';

type SidebarStore = {
  isCollapsed: boolean;
  isResetting: boolean;
  onCollapse: () => void;
  onExpand: () => void;
  toggle: () => void;
  setResetting: (resetting: boolean) => void;
  setToggleCallback: (callback: () => void) => void;
  toggleCallback?: () => void;
};

export const useSidebar = create<SidebarStore>((set, get) => ({
  isCollapsed: false,
  isResetting: false,
  toggleCallback: undefined,
  onCollapse: () => set({ isCollapsed: true }),
  onExpand: () => set({ isCollapsed: false }),
  toggle: () => {
    const { toggleCallback } = get();
    if (toggleCallback) {
      toggleCallback();
    } else {
      set({ isCollapsed: !get().isCollapsed });
    }
  },
  setResetting: (resetting: boolean) => set({ isResetting: resetting }),
  setToggleCallback: (callback: () => void) => set({ toggleCallback: callback }),
}));
