import * as React from 'react';

import { ButtonProps, Modal, ModalProps } from 'antd';

interface ModalBuilderProps extends Omit<ModalProps, 'children'> {
    btnLabel: string | React.ReactNode;
    title?: string;
    btnProps?: React.HTMLAttributes<HTMLSpanElement>;
    children: React.ReactNode | ((close: () => void) => React.ReactNode);
    className?: string;
    width?: string | number;
    style?: React.CSSProperties;
}

const ModalBuilder: React.FC<ModalBuilderProps> = ({ btnLabel, title: modalTitle, children, className, width, btnProps, style, ...rest }) => {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    return (
        <>
            <div onClick={() => setIsDrawerOpen(true)}>
                <span {...btnProps}>{btnLabel}</span>
            </div>
            {isDrawerOpen && (
                <Modal
                    {...rest}
                    width={width}
                    className={className}
                    open={isDrawerOpen}
                    footer={null}
                    onCancel={() => setIsDrawerOpen(false)}
                    onClose={() => setIsDrawerOpen(false)}
                    title={modalTitle}
                    style={style}
                >
                    {isDrawerOpen && <>{typeof children === 'function' ? children(() => setIsDrawerOpen(false)) : children}</>}
                </Modal>
            )}
        </>
    );
};

export default ModalBuilder;
