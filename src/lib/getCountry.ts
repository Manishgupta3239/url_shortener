import axios from "axios";

export const getCountry = async (ip : string)=>{
    try {
    const res = await axios.get(`https://ipapi.co/${ip}/json/`);
    return res.data.country_name || "Unknown";
  } catch (err : unknown) {
    if(err instanceof Error){
    console.error("Failed to fetch country:", err.message);}
    else{
      console.error("Failed to fetch country:", err);
    }
    return "Unknown";
  }
}