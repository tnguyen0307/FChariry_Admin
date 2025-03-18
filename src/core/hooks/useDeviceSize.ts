import * as React from 'react';

import { useWindowSize } from 'usehooks-ts';

type SizeType = 'sm' | 'md' | 'lg' | 'xl';

export const useDeviceSize = (): SizeType => {
    const size = useWindowSize();
    const [device, setDevice] = React.useState<SizeType>('md');

    React.useEffect(() => {
        if (size.width < 640) {
            setDevice('sm');
            return;
        }
        if (size.width < 768) {
            setDevice('md');
            return;
        }
        if (size.width < 1024) {
            setDevice('lg');
            return;
        }
        setDevice('xl');
    }, [size]);

    return device;
};
