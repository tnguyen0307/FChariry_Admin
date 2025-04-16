
import http from '../http';
import { TransferRequestModel } from '@/core/models/transferRequest';
import { Cloudinary } from "@cloudinary/url-gen/index";
import axios from "axios";
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const PRESET_NAME = import.meta.env.VITE_CLOUDINARY_PRESET_NAME;
const cloudinary = new Cloudinary({
  cloud: {
    cloudName: CLOUD_NAME,
  },
});
const ENDPOINT = '/transfer-requests';

export const transferRequestsApi = {
    getAll: async () => {
        const response = await http.get<TransferRequestModel[]>(`${ENDPOINT}`);
        return response.data;
    },

    // create: async (tag: TagModel) => {
    //     const response = await http.post(`${ENDPOINT}`, tag);
    //     return response.data;
    // },

    updateTransactionImage: async ({ id, transactionImage,note }:{id:string,transactionImage:string,note:string }) => {
        const response = await http.put(`${ENDPOINT}/${id}/update-transaction-image`,null,{
            params:{
                transactionImage: transactionImage,
                note: note,
            }
        });
        return response.data;
    },
    
    updateTransactionError: async ({ id, note }:{id:string,note:string }) => {
        const response = await http.put(`${ENDPOINT}/${id}/update-error-transfer`,null,{
            params:{
                note: note,
            }
        });
        return response.data;
    },

    delete: async (id: string) => {
        const response = await http.delete(`${ENDPOINT}/${id}`);
        return response.data;
    },
};
export const uploadFileMedia = async ({ file, folderName = "default-folder",resourceType }:{file:File, folderName:string, resourceType:string}) => {
    console.log("Uploading file:", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", folderName); // 🌟 Thêm folder tùy chỉnh
    formData.append("resource_type", resourceType);
  
    const isVideo = file.type.startsWith("video/");
    const uploadUrl = isVideo
      ? `${CLOUDINARY_URL.replace("/image/", "/video/")}`
      : CLOUDINARY_URL;
    console.log("up url", uploadUrl);
    try {
      const res = await axios.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Upload successful:", res.data);
      return res.data.secure_url; // Trả về URL file đã upload
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    }
  };