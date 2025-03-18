import * as React from 'react';

import { Link, LinkProps } from '@tanstack/react-router';

interface FCLinkProps extends Omit<LinkProps, 'to'> {
    href: string;
}

const FCLink: React.FunctionComponent<FCLinkProps> = ({ href, children, ...rest }) => {
    return (
        // @ts-ignore
        <Link to={href} {...rest}>
            {children}
        </Link>
    );
};

export default FCLink;
