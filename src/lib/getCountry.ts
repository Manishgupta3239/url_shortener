import axios from "axios";

export const getCountry = async (ip : string)=>{
    try {
      console.log("ip",ip)
    const res = await axios.get(`https://ipapi.co/${ip}/json/`);
    console.log("country",res.data)
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