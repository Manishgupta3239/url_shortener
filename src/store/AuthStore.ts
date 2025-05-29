import { create } from "zustand";

type User = {
  name: string | null;
  email: string | null;
  photo?: string | null;
  plan?: string;
  _id?: string;
  createdAt?: Date;
};
type State = {
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
  setLoading: (val: boolean) => void;
  clearUser: () => void;
};

const useAuthStore = create<State>((set) => ({
  loading: false,
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  setLoading: (val) => set({ loading: val }),
}));

type UrlState = {
    loading : boolean,
    getUrls : ()=>void,
    url ?: []
}

const useUrlStore = create<UrlState>((set) => ({
  loading: false,
  url: [],
  getUrls: async () => {
    try {
        set({loading : true});
      const res = await fetch("/api/getUrls", {
        method: "GET",
        });
        
      set({loading:false})
      const data = await res.json(); 
      console.log("zustand",data.urls)
     set({url : data.urls})
    } catch (err) {
      console.log(err);
    }
  },
}));
export { useAuthStore,useUrlStore };
