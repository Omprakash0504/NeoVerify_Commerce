import create from 'zustand';

const useUser = create((set) => ({
  user: {},
  setUser: (user) => set((state) => ({ user: user })),
}));

export default useUser;