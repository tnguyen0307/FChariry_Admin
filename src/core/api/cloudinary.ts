import { FCConfig } from '../FCConfig';
import http from './http';

export type CloudinaryUploadRequest = {
    file: File;
    folderName: string;
    resourceType: string;
};

export const uploadFileMedia = async ({ file, folderName = 'default-folder', resourceType }: CloudinaryUploadRequest) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', FCConfig.CLOUDINARY_PRESET_NAME);
    formData.append('folder', folderName); // 🌟 Thêm folder tùy chỉnh
    formData.append('resource_type', resourceType);

    const isVideo = file.type.startsWith('video/');
    const uploadUrl = isVideo ? `${FCConfig.CLOUDINARY_URL.replace('/image/', '/video/')}` : FCConfig.CLOUDINARY_URL;

    const res = await http.post(uploadUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return res.data.secure_url as string; // Trả về URL file đã upload
};
