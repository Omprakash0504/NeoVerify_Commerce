import create from 'zustand';

const useItem = create((set) => ({
  item: [],
  setItem: (item) => set((state) => ({ item })),
}));

export default useItem;