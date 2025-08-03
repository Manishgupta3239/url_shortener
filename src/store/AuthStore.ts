import { create } from "zustand";
import { userType } from "../../types/userType";

type urlType = {

  clicks: number,
  createdBy: string,
  createdAt: Date,
  expiry: Date,
  longUrl: string,
  shortUrl: string
  _id: string
}

type UrlState = {
  loading: boolean,
  url: urlType[],
  credits: number,
  devices: { _id: string, count: number }[],
  totalClicks: number,
  clicksToday: number,
  countries: { _id: string, count: number }[],
  userAgent: { _id: string, count: number }[],
  totalUrls: number,
  User: userType | null
  getUrls: (limit?: number, page?: number) => void,
  getAnalytics: (day?: string, _id?: string | null) => void,
  getUser: () => void,
  deleteUrl: (id: string) => void,
}


const useUrlStore = create<UrlState>((set, get) => ({
  loading: true,
  credits: 0,
  url: [],
  countries: [],
  userAgent: [],
  devices: [],
  totalClicks: 0,
  clicksToday: 0,
  totalUrls: 0,
  User: null,

  getUrls: async (limit, page) => {
    try {
      set({ loading: true });
      const res = await fetch(`/api/getUrls?limit=${limit}&page=${page}`, {
        method: "GET",
      });
      const data = await res.json();
      set({ url: data.urls, credits: data.credits, totalUrls: data.total })
      set({ loading: false })
    } catch (err) {
      console.log(err);
    } finally {
      set({ loading: false })
    }
  },

  deleteUrl: async (id) => {
    try {
      set({ loading: true })
      await fetch(`/api/delete/${id}`, {
        method: "DELETE"
      });
      get().getUrls()
    } catch (err) {
      console.log("error in delete fuction zustand", err);
    }
  },

  getAnalytics: async (day, _id) => {
    try {
      set({ loading: true });
      const url = _id ? (`/api/getAnalytics/${_id}?day=${day}`) : (`/api/getAnalytics?day=${day}`);
      const res = await fetch(url, {
        method: "GET"
      })
      const data = await res.json();
      // console.log("analytics of url",data.clicks[0]);
      set({
        countries: data.clicks[0].country,
        devices: data.clicks[0].devices,
        totalClicks: data.clicks[0].totalClicks[0]?.count ?? 0,
        userAgent: data.clicks[0].userAgent,
        clicksToday: data.clicks[0].clicksToday[0]?.count ?? 0,
      })
      set({ loading: false });
    } catch (error) {
      console.error("errro while fecthing alaytics", error);
    } finally {
      set({ loading: false })
    }
  },

  getUser: async () => {
    try {
      set({ loading: true });
      const res = await fetch("/api/profile", {
        method: "GET",
      });
      const data = await res.json();
      console.log(data);
      set({ User: data.user });
      set({ loading: false })
    } catch (err) {
      console.log(err);
    } finally {
      set({ loading: false })
    }
  }
  
}));
export { useUrlStore };