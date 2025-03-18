import * as React from 'react';

import { NKConstant } from '../NKConstant';

export interface IGlobalDataContextContext {
    companyId: string | null;
    getCompanyId: () => void;
    setCompanyId: (companyId: string | null) => void;
}

export const GlobalDataContext = React.createContext<IGlobalDataContextContext>({
    companyId: null,
    getCompanyId: () => {},
    setCompanyId: () => {},
});

interface GlobalDataProviderProps {
    children: React.ReactNode;
}

export const GlobalDataProvider: React.FC<GlobalDataProviderProps> = ({ children }) => {
    const [companyId, setCompanyId] = React.useState<string | null>(localStorage.getItem(NKConstant.LOCAL_STORAGE_COMPANY_ID_KEY) || null);

    const handleToSetCompanyId = (companyId: string | null) => {
        localStorage.setItem(NKConstant.LOCAL_STORAGE_COMPANY_ID_KEY, companyId || '');
        setCompanyId(companyId);
    };

    const getCompanyId = () => {
        const companyId = localStorage.getItem(NKConstant.LOCAL_STORAGE_COMPANY_ID_KEY);

        if (companyId) {
            setCompanyId(companyId);
        }
    };

    return (
        <GlobalDataContext.Provider
            value={{
                companyId,
                getCompanyId: getCompanyId,
                setCompanyId: handleToSetCompanyId,
            }}
        >
            {children}
        </GlobalDataContext.Provider>
    );
};

export const useGlobalData = () => React.useContext(GlobalDataContext);
