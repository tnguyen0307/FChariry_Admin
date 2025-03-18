import * as React from 'react';

import _get from 'lodash/get';

import NKLink from '@/core/routing/components/NKLink';

interface FieldLinkProps {
    value: string;
    apiAction?: (value: any) => any;
    formatter?: (value: any) => any;
}

const FieldLink: React.FC<FieldLinkProps> = ({ value, apiAction }) => {
    const [link, setLink] = React.useState<string>('');
    const [label, setLabel] = React.useState<string>('');
    React.useEffect(() => {
        (async () => {
            if (apiAction) {
                const res = await apiAction(value);
                setLink(_get(res, 'link'));
                setLabel(_get(res, 'label'));
            }
        })();
    }, [apiAction, value]);
    return (
        <div>
            {Boolean(link) ? (
                <NKLink params href={link}>
                    {label}
                </NKLink>
            ) : (
                <span>{label}</span>
            )}
        </div>
    );
};

export default FieldLink;
