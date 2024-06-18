import axios from "axios";

export const getImageUrl = async (image : String) : Promise < string > => {
    const preset_key = 'grabandgo';
    const cloud_name = 'real-service-ltd';
    const formData = new FormData();
    formData.append('file', image as string);
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload?upload_preset=${preset_key}`, formData)
    console.log('Response image :', res?.data?.secure_url);
    return res?.data?.secure_url;
}