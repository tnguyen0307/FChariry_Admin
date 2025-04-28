import React from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { TextAlignJustified } from 'akar-icons';
import { Button, Card, Divider, Dropdown, Flex, Form, Input, Modal, Popover, Table, Tag, Typography, Upload } from 'antd';
import type { UploadProps } from 'antd/es/upload/interface';
import { toast } from 'react-toastify';

import { uploadFileMedia } from '@/core/api/admin/transferRequests';
import { WithdrawRequestStatusTag } from '@/core/components/tags/WithdrawRequestStatusTag';
import { useGetAllWithdraws, useWithdrawUpdateTransactionError, useWithdrawUpdateTransactionImage } from '@/core/hooks/query/admin-withdraws.hook';
import { TransferRequestModel } from '@/core/models/transferRequest';
import { WithdrawRequestStatus } from '@/core/models/withdrawRequest';

interface Project {
    projectName: string;
}

interface UploadFormValues {
    id: string;
    note: string;
}

interface ReportFormValues {
    noteError: string;
}

export const Route = createFileRoute('/_admin-layout/dashboard/withdraw/')({
    component: TransferManagement,
});

function TransferManagement() {
    const { data } = useGetAllWithdraws();
    const [confirmForm] = Form.useForm<UploadFormValues>();
    const [reportForm] = Form.useForm<ReportFormValues>();
    const [openModal, setOpenModal] = React.useState(false);
    const [selectedTransfer, setSelectedTransfer] = React.useState<TransferRequestModel | null>(null);
    const updateImageMutation = useWithdrawUpdateTransactionImage();
    const updateErrorMutation = useWithdrawUpdateTransactionError();
    const [uploadedUrl, setUploadedUrl] = React.useState<string | null>(null);
    const [navigateError,setNavigateError] = React.useState(false);
    const handleImageUpload: UploadProps['onChange'] = async (info) => {
        const file = info.fileList[info.fileList.length - 1].originFileObj;
        if (!file) {
            toast.error('No file selected');
            return;
        }
        console.log(info);
        toast.info('Uploading image...');

        try {
            const url = await uploadFileMedia({
                file: file as File,
                folderName: 'transaction-images',
                resourceType: 'image',
            });

            if (url) {
                setUploadedUrl(url);
                toast.success('Image uploaded successfully!');
            } else {
                toast.error('Failed to upload image.');
            }
        } catch (err) {
            toast.error('Error uploading image.');
            console.error(err);
        }
    };

    const handleUpload = async (values: UploadFormValues) => {
        try {
            toast.info('Processing...');

            if (!uploadedUrl) {
                toast.error('Please upload an image first.');
                return;
            }
            console.log('Uploaded URL:', uploadedUrl);
            await updateImageMutation.mutateAsync({
                id: values.id,
                transactionImage: uploadedUrl,
                note: values.note,
            });

            toast.success("Confirm sent donation's fund successful!");
            setOpenModal(false);
            setSelectedTransfer(null);
        } catch (err) {
            toast.error("An error occurred during confirm sent donation's fund.");
            console.error(err);
        }
    };

    const handleReportError = async (values: ReportFormValues) => {
        console.log('Report error values:', values);
        if (!selectedTransfer) return;
        try {
            await updateErrorMutation.mutateAsync({
                id: selectedTransfer.id,
                note: 'Error report from admin: ' + values.noteError,
            });
            toast.success('Reported error successfully!');
        } catch (error) {
            toast.error('Failed to report error.');
        } finally {
            setOpenModal(false);
            setSelectedTransfer(null);
        }
    };

    const getDropdownItems = (record: TransferRequestModel) => {
        console.log(record);
        const items = [];
        if (record.status === 'PENDING_ADMIN_APPROVAL' || record.status === 'ERROR') {
            items.push({
                key: record.status !== 'ERROR' ? 'Send confirm request' : 'Resend confirm request',
                label: record.status !== 'ERROR' ? 'Send confirm request' : 'Resend confirm request',
                onClick: () => {
                    setOpenModal(true);
                    setSelectedTransfer(record);
                },
            });
        }
        return items;
    };

    return (
        <div className="space-y-3">
            <Typography.Title level={3}>Withdraw Management</Typography.Title>
            <Table
                rowKey="id"
                bordered
                dataSource={data}
                columns={[
                    {
                        title: 'Project',
                        dataIndex: 'project',
                        key: 'projectName',
                        render: (project: Project) => <span>{project.projectName}</span>,
                    },
                    {
                        title: 'Amount',
                        dataIndex: 'amount',
                        key: 'amount',
                    },
                    {
                        title: 'Note',
                        dataIndex: 'note',
                        key: 'note',
                    },
                    {
                        title: 'Bank Account',
                        dataIndex: 'bankAccount',
                        key: 'bankAccount',
                    },
                    {
                        title: 'Bank BIN',
                        dataIndex: 'bankBin',
                        key: 'bankBin',
                    },
                    {
                        title: 'Bank Owner',
                        dataIndex: 'bankOwner',
                        key: 'bankOwner',
                    },
                    {
                        title: 'Status',
                        dataIndex: 'status',
                        key: 'status',
                        render: (status: WithdrawRequestStatus) => {
                            return <WithdrawRequestStatusTag status={status} />;
                        },
                    },
                    {
                        title: 'Created Date',
                        dataIndex: 'createdDate',
                        key: 'createdDate',
                        render: (date: string) => new Date(date).toLocaleString(),
                    },
                    {
                        title: 'Updated Date',
                        dataIndex: 'updatedDate',
                        key: 'updatedDate',
                        render: (date: string) => new Date(date).toLocaleString(),
                    },
                    {
                        title: 'Image',
                        dataIndex: 'transactionImage',
                        key: 'transactionImage',
                        render: (img: string) =>
                            img ? (
                                <Popover content={<img src={img} className="max-w-xs" />}>
                                    <img src={img} alt="transaction" className="h-12 w-12 rounded object-cover" />
                                </Popover>
                            ) : (
                                <span>No image</span>
                            ),
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (_: any, record: TransferRequestModel) => {
                            const items = getDropdownItems(record);

                            return (
                                <div className="flex items-center gap-2">
                                    <Dropdown menu={{ items }}>
                                        <Button className="p-1">
                                            <TextAlignJustified />
                                        </Button>
                                    </Dropdown>
                                    <Modal
                                        title="Upload Transaction Image"
                                        open={openModal}
                                        onCancel={() => {
                                            setOpenModal(false);
                                            setSelectedTransfer(null);
                                        }}
                                        footer={null}
                                    >
                                        <Flex vertical>
                                            <div>
                                                <Typography.Text strong>Account Information</Typography.Text>
                                                <Card>
                                                    <p>
                                                        <strong>Bank BIN:</strong> {selectedTransfer?.bankBin}
                                                    </p>
                                                    <p>
                                                        <strong>Bank Account:</strong> {selectedTransfer?.bankAccount}
                                                    </p>
                                                    <p>
                                                        <strong>Bank Owner:</strong> {selectedTransfer?.bankOwner}
                                                    </p>
                                                </Card>
                                            </div>

                                            <div className="mt-4">
                                                <Typography.Text strong>Withdraw Information</Typography.Text>
                                                <Card>
                                                    <p>
                                                        <strong>Request Title:</strong> {selectedTransfer?.requestTitle}
                                                    </p>
                                                    <p>
                                                        <strong>Current Image:</strong>{' '}
                                                        {selectedTransfer?.transactionImage ? (
                                                            <Popover content={<img src={selectedTransfer?.transactionImage} className="max-w-xs" />}>
                                                                <img
                                                                    src={selectedTransfer?.transactionImage}
                                                                    alt="Transaction"
                                                                    className="h-12 w-12 rounded object-cover"
                                                                />
                                                            </Popover>
                                                        ) : (
                                                            'No image'
                                                        )}
                                                    </p>
                                                </Card>
                                            </div>

                                           {!navigateError ? (
                                             <div className="mt-4">
                                             <Form form={confirmForm} onFinish={handleUpload}>
                                                 <Form.Item name="id" initialValue={selectedTransfer?.id} hidden>
                                                     <Input placeholder="id" />
                                                 </Form.Item>
                                                 <Form.Item>
                                                     <Upload
                                                         accept="image/*"
                                                         showUploadList={false}
                                                         multiple={false}
                                                         beforeUpload={() => false}
                                                         onChange={handleImageUpload}
                                                     >
                                                         <Button
                                                             type="primary"
                                                             style={{
                                                                 backgroundColor: 'white',
                                                                 color: 'black',
                                                                 borderColor: 'black',
                                                             }}
                                                         >
                                                             Upload Image
                                                         </Button>
                                                     </Upload>
                                                 </Form.Item>

                                                 <Form.Item name="note">
                                                     <Input.TextArea placeholder="Note" />
                                                 </Form.Item>

                                                 <Form.Item>
                                                     <Button htmlType="submit" type="primary">
                                                         Confirm Sent
                                                     </Button>
                                                 </Form.Item>
                                             </Form>
                                             <span>Is there any error has occurs? Click <a onClick={() => setNavigateError(true)}>here</a> to report error</span>
                                         </div>
                                           ):(
                                            <div className="mt-4">
                                            {selectedTransfer?.status === 'ERROR' &&
                                                selectedTransfer.note?.includes('Error report from user:') && (
                                                    <>
                                                        <Typography.Text strong>Error report from user</Typography.Text>
                                                        <Card>
                                                            <p>
                                                                <strong>Reported Error:</strong>{' '}
                                                                {selectedTransfer?.note.replace('Error report from user:', '')}
                                                            </p>
                                                        </Card>
                                                    </>
                                                )}
                                            <Typography.Text strong>
                                                If there is an issue, please fill out the form below to report the error:
                                            </Typography.Text>
                                            <Form
                                                form={reportForm}
                                                onFinish={handleReportError}
                                                initialValues={{
                                                    noteError: selectedTransfer?.note?.includes('Error report from admin:')
                                                        ? selectedTransfer?.note?.replace('Error report from admin:', '')
                                                        : '',
                                                }}
                                            >
                                                <Form.Item name="noteError">
                                                    <Input.TextArea placeholder="noteError" />
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button htmlType="submit" type="primary">
                                                        Report Error
                                                    </Button>
                                                </Form.Item>
                                            </Form>
                                            <span>Go back? Click <a onClick={() => setNavigateError(false)}>here</a> to go back</span>
                                        </div>
                                           )}

                                        </Flex>
                                    </Modal>
                                </div>
                            );
                        },
                    },
                ]}
            />
        </div>
    );
}
