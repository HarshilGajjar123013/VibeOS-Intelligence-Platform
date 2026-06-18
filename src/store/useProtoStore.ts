import { create } from "zustand";

interface Toast {
  id: string;
  type: "success" | "info" | "warning" | "error";
  message: string;
}

interface ProtoState {
  role: "executive" | "hr" | "manager" | "employee";
  dashboardState: "success" | "loading" | "empty" | "error";
  toasts: Toast[];
  isDemoModalOpen: boolean;
  setRole: (role: "executive" | "hr" | "manager" | "employee") => void;
  setDashboardState: (state: "success" | "loading" | "empty" | "error") => void;
  addToast: (type: "success" | "info" | "warning" | "error", message: string) => void;
  removeToast: (id: string) => void;
  setDemoModalOpen: (open: boolean) => void;
}

export const useProtoStore = create<ProtoState>((set) => ({
  role: "executive",
  dashboardState: "success",
  toasts: [],
  isDemoModalOpen: false,
  setRole: (role) => set({ role }),
  setDashboardState: (dashboardState) => set({ dashboardState }),
  addToast: (type, message) => {
    const id = `toast-${Date.now()}`;
    set((state) => ({
      toasts: [...state.toasts, { id, type, message }]
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      }));
    }, 4000);
  },
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter((t) => t.id !== id)
  })),
  setDemoModalOpen: (isDemoModalOpen) => set({ isDemoModalOpen }),
}));
