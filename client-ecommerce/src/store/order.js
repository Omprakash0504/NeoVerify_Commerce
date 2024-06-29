import create from 'zustand';

const useOrder = create((set) => ({
  order: [],
  setOrder: (order) => set((state) => ({ order })),
}));

export default useOrder;