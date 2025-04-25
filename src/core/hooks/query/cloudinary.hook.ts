import { useMutation } from '@tanstack/react-query';

import { uploadFileMedia } from '@/core/api/cloudinary';

export const useUploadFile = () => {
    return useMutation({
        mutationFn: uploadFileMedia,
    });
};
