
import {create} from 'zustand';
import { useQueryClient } from '@tanstack/react-query';



interface User{
    id:number;
    name: string;
    email: string;
    list?: string[];
    tasks?: any[];
    profilePicture?: string;
}
interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

const useUserStore = create<UserStore>((set)=> ({

    
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    

}));




export default useUserStore;