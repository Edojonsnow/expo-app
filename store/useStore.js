import { create } from "zustand";
import { getCurrentUser } from "../lib/appwrite";

const useStore = create((set) => ({
  isLogged: false,
  user: null,
  loading: true,

  // Actions
  setIsLogged: (value) => set({ isLogged: value }),
  setUser: (user) => set({ user }),
  setLoading: (value) => set({ loading: value }),

  // Initialize user session
  initializeSession: async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        set({
          isLogged: true,
          user,
          loading: false,
        });
      } else {
        set({
          isLogged: false,
          user: null,
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
      set({
        isLogged: false,
        user: null,
        loading: false,
      });
    }
  },
}));

export default useStore;
