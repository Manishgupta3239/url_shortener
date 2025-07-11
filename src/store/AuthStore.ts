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

type urlType = {

    clicks :number,
    createdBy :string,
    createdAt:Date,
    expiry:Date,
    longUrl:string,
    shortUrl:string
    _id:string
}

type UrlState = {
    loading : boolean,
    getUrls : ()=>void,
    url :urlType[],
    deleteUrl : (id:string)=>void,
}


const useUrlStore = create<UrlState>((set,get) => ({
  loading: true,
  url: [],
  getUrls: async () => {
    try {
        set({loading : true});
      const res = await fetch("/api/getUrls", {
        method: "GET",
        });    
    const data = await res.json(); 
     set({url : data.urls})
      set({loading:false})
    } catch (err) {
      console.log(err);
    }finally{
      set({loading : false})
    }
  },
  deleteUrl : async (id)=>{
    try{
      set({loading : true})
      const res = await fetch(`/api/delete/${id}`,{
        method : "DELETE"
      });
      console.log(res)
      get().getUrls()
  
    }catch(err){
      console.log("error in delete fuction zustand",err);
    }
  }
}));
export { useAuthStore,useUrlStore };
