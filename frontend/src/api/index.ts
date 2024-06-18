import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.DEV
        ? "http://localhost:8000"
        : "https://minds-machines-society.onrender.com/api/v1"
})
export const baseUrl = import.meta.env.VITE_API_URL as string;

export const apis = axios.create({
    baseURL:
      (import.meta.env.VITE_API_URL as string) ??
      "http://localhost:8000",
    headers: {
      "Content-Type": "application/json",
      
    },
  });


  export const AuthAPi = axios.create({
    baseURL:
      (import.meta.env.VITE_API_URL as string) ??
      "http://localhost:8000",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  
  export const getResError = (error?: any) => {
    if (!error) return "Something Went Wrong";
    const isNetError = error?.message?.includes("Network Error");
    if (isNetError) return "Network Error";
    return (
      error?.response?.data?.error ??
      error?.response?.data?.message ??
      error?.message ??
      "Something Went Wrong"
    );
  };
  //${baseUrl}/documents/download/${doc?.fileUrl}
  // download file by creating a blob url after fetching the file
  export const getFileUrl = (fileUrl: string) => {
    let url = "";
    AuthAPi.get(`${baseUrl}/documents/download/${fileUrl}`, {
      responseType: "blob",
    })
      .then((response) => {
        url = window.URL.createObjectURL(new Blob([response.data]));
        console.log("url", url);
        return url;
      })
      .catch((err) => {
        console.log(err);
        return "";
      });
  };