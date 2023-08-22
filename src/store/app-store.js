import { create } from 'zustand';
import { getActiveUsers } from './actions/get-active-users';
import { createUser } from './actions/create-user';

export const useAppStore = create(set => ({
    // visual state data, get and set
    //iFaceMode: "view", // "view" or "edit" or any other view you want to add to add sub-components to a section's view
    iFaceLang: "fr", // "en" or "fr"
    setIFaceLang: (lang) => set({ iFaceLang: lang }),
    isLoading: false,
    setIsLoading: (loading) => set({ isLoading: loading }),
    currentStep: 0,
    setCurrentStep: (step) => set({ currentStep: step }),
    // for notifications, get and set
    toasts: [],
    addToast: (toast) => set((state) => ({ toasts: [...state.toasts, toast] })),

    // for user management, get and set
    RWUsers: [],
    ROUsers: [],
    HUsers: [],
    setRWUsers: (users) => set({ RWUsers: users }),
    setROUsers: (users) => set({ ROUsers: users }),
    setHUsers: (users) => set({ HUsers: users }),
    users: [],
    userName: "",
    setUserName: (name) => set({ userName: name }),
    getActiveUsers: async(group_name) => {
        set({ isLoading: true });
        let res = await getActiveUsers(group_name);
        if (res) {
            set({ users: res, isLoading: false });
            return true
        }
        set({ isLoading: false });
        return false
    },
    createUser: async(name) => {
        set({ isLoading: true });
        let res = await createUser(name);
        if (res) {
            set({ isLoading: false });
            return true
        }
        set({ isLoading: false });
        return false
    }
}))