import create from "zustand";

const useGeneralStore = create((set) => ({
  isAuthenticated: false,
  invoice: {},
  setInvoice: (invoice) =>
    set((state) => ({ invoice })),
  setIsAuthenticated: (isAuthenticated) =>
    set((state) => ({ isAuthenticated })),
}));

export default useGeneralStore;
