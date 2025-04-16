import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { TextAlignJustified } from 'akar-icons';
import { Button, Dropdown, Popover, Table, Upload, Typography, Tag, Modal, Flex, Card, Divider, Form, Input } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { toast } from 'react-toastify';

import { useGetAllTransfers, useUpdateTransactionError, useUpdateTransactionImage } from '@/core/hooks/query/admin-transfers.hook';
import { FCRouter } from '@/core/FCRouter';
import { useFCRouter } from '@/core/routing/hooks/FCRouter';
import { uploadFileMedia } from '@/core/api/admin/transferRequests'; // Đảm bảo đã import đúng
import { TransferRequestModel } from '@/core/models/transferRequest';
import { UploadIcon } from 'lucide-react';

export const Route = createFileRoute('/_admin-layout/dashboard/transfers/')({
    component: TransferManagement,
});

function TransferManagement() {
    const { data } = useGetAllTransfers();
    const router = useFCRouter();
    const [confirmForm] = Form.useForm();
    const [reportForm] = Form.useForm();
    const [openModal, setOpenModal] = React.useState(false);
    const [selectedTransfer, setSelectedTransfer] = React.useState<TransferRequestModel | null>(null);
    const updateImageMutation = useUpdateTransactionImage();
    const updateErrorMutation = useUpdateTransactionError();
    const [uploadedUrl, setUploadedUrl] = React.useState(null);

    const handleImageUpload = async (info) => {
        const file = info.fileList[info.fileList.length-1].originFileObj;
        console.log(info)
        toast.info("Uploading image...");

        try {
            const url = await uploadFileMedia({
                file,
                folderName: 'transaction-images',
                resourceType: 'image',
            });

            if (url) {
                setUploadedUrl(url);
                toast.success("Image uploaded successfully!");
            } else {
                toast.error("Failed to upload image.");
            }
        } catch (err) {
            toast.error("Error uploading image.");
            console.error(err);
        }
    };

    const handleUpload = async (values) => {
        try {
            toast.info('Processing...');

            if (!uploadedUrl) {
                toast.error("Please upload an image first.");
                return;
            }
            console.log("Uploaded URL:", uploadedUrl);
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

    const handleReportError = async (values: any) => {
        console.log("Report error values:", values);
        if (!selectedTransfer) return;
        try {
            await updateErrorMutation.mutateAsync({
                id: selectedTransfer.id,
                note: "Error report from admin: " + values.noteError,
            });
            toast.success('Reported error successfully!');
        } catch (error) {
            toast.error('Failed to report error.');
        } finally {
            setOpenModal(false);
            setSelectedTransfer(null);
        }
    }
    return (
        <div className="space-y-3">
            <Typography.Title level={3}>Transfer Management</Typography.Title>
            <Table
                rowKey="id"
                bordered
                dataSource={data}
                columns={[
                    // {
                    //     title: 'Transfer ID',
                    //     dataIndex: 'id',
                    //     key: 'id',
                    // },
                    {
                        title: 'Project',
                        dataIndex: 'project',
                        key: 'project',
                        render: (project: string) => <span>{project.projectName}</span>,
                    },
                    {
                        title: 'Request Title',
                        dataIndex: 'requestTitle',
                        key: 'requestTitle',
                    },
                    {
                        title: 'Amount',
                        dataIndex: 'amount',
                        key: 'amount',
                    },
                    // {
                    //     title: 'Reason',
                    //     dataIndex: 'reason',
                    //     key: 'reason',
                    // },
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
                        render: (status: string) => {
                            return (
                                <Tag >{status}</Tag>
                            )
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
                                    <img src={img} alt="transaction" className="h-12 w-12 object-cover rounded" />
                                </Popover>
                            ) : (
                                <span>No image</span>
                            ),
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (_: any, record) => {
                            const items = [
                                (record.status === 'PENDING_ADMIN_APPROVAL' || record.status === "ERROR") && {
                                    key: record.status !== "ERROR" ? 'Send confirm request' : 'Resend confirm request',
                                    label: record.status !== "ERROR" ? 'Send confirm request' : 'Resend confirm request',
                                    onClick: () => {
                                        setOpenModal(true);
                                        setSelectedTransfer(record);
                                    }
                                }
                            ].filter(Boolean);

                            return (
                                <div className="flex gap-2 items-center">
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
                                            {/* Phần hiển thị thông tin tài khoản */}
                                            <div>
                                                <Typography.Text strong>Account Information</Typography.Text>
                                                <Card>
                                                    <p><strong>Bank BIN:</strong> {selectedTransfer?.bankBin}</p>
                                                    <p><strong>Bank Account:</strong> {selectedTransfer?.bankAccount}</p>
                                                    <p><strong>Bank Owner:</strong> {selectedTransfer?.bankOwner}</p>
                                                </Card>
                                            </div>

                                            {/* Phần hiển thị thông tin giao dịch */}
                                            <div className="mt-4">
                                                <Typography.Text strong>Transfer Information</Typography.Text>
                                                <Card>
                                                    <p><strong>Request Title:</strong> {selectedTransfer?.requestTitle}</p>
                                                    <p><strong>Current Image:</strong> {selectedTransfer?.transactionImage ?
                                                        <Popover content={<img src={selectedTransfer?.transactionImage} className="max-w-xs" />}>
                                                            <img src={selectedTransfer?.transactionImage} alt="Transaction" className="h-12 w-12 object-cover rounded" />
                                                        </Popover> : "No image"}</p>
                                                </Card>
                                            </div>

                                            {/* Phần Upload Image */}
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
                                                            beforeUpload={() => false} // prevent default upload behavior
                                                            onChange={handleImageUpload}
                                                        >
                                                            <Button type="primary" style ={{backgroundColor:"white",color:"black", borderColor:"black"}}>Upload Image</Button>
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

                                            </div>

                                            <Divider style={{ borderTop: '1px solid rgba(0, 0, 0, 0.85)' }} />


                                            {/* Form Report lỗi */}
                                            <div className="mt-4">
                                                {selectedTransfer?.status === "ERROR" && selectedTransfer.note.includes("Error report from user:") && (
                                                    <>
                                                        <Typography.Text strong>Error report from user</Typography.Text>
                                                        <Card>
                                                            <p><strong>Reported Error:</strong> {selectedTransfer?.note.replace("Error report from user:", "")}</p>
                                                        </Card>
                                                    </>
                                                )}
                                                <Typography.Text strong>If there is an issue, please fill out the form below to report the error:</Typography.Text>
                                                <Form form={reportForm} onFinish={handleReportError}
                                                    initialValues={
                                                        {
                                                            noteError: selectedTransfer?.note.includes("Error report from admin:")
                                                                ? selectedTransfer?.note.replace("Error report from admin:", "")
                                                                : ""
                                                        }
                                                    }
                                                    >
                                                    <Form.Item name="noteError">
                                                        <Input.TextArea
                                                            placeholder="noteError"
                                                        />
                                                    </Form.Item>
                                                    <Form.Item>
                                                        <Button htmlType="submit" type="primary">
                                                            Report Error
                                                        </Button>
                                                    </Form.Item>
                                                </Form>
                                            </div>
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
