import * as React from 'react';

import { Button, ButtonProps, Drawer, Modal } from 'antd';

interface ModalBuilderProps {
    btnLabel: string | React.ReactNode;
    title?: string;
    btnProps?: ButtonProps;
    children: React.ReactNode | ((close: () => void) => React.ReactNode);
    className?: string;
    width?: string | number;
    style?: React.CSSProperties;
}

const ModalBuilder: React.FC<ModalBuilderProps> = ({ btnLabel, title: modalTitle, btnProps, children, className, width, style }) => {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    return (
        <>
            <Button {...btnProps} onClick={() => setIsDrawerOpen(true)}>
                {btnLabel}
            </Button>
            {isDrawerOpen && (
                <Modal
                    width={width}
                    className={className}
                    open={isDrawerOpen}
                    footer={null}
                    onCancel={() => setIsDrawerOpen(false)}
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
