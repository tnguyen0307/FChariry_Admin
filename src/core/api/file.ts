import { FileModel } from '../models/file';
import http from './http';

const ENDPOINT = '/api/files';

export const fileApi = {
    getOrganizationFiles: async (organizationId: string) => {
        const res = await http.get<FileModel[]>(`${ENDPOINT}/organizations/${organizationId}`);

        return res?.data;
    },
};
