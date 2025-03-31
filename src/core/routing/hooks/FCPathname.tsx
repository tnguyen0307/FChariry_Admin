import { useRouter } from '@tanstack/react-router';

export const useFCPathname = () => {
    return useRouter().history.location.pathname;
};
