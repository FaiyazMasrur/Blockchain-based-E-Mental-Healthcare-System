import React, { useState } from "react";
import axios from "axios";
import { Col, Form, Input, Row, TimePicker, message, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import dayjs from "dayjs";

const ApplyDoctor = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [valueStart, setValueStart] = useState(null);
    const [valueEnd, setValueEnd] = useState(null);

    const onChangeStart = (time) => {
        setValueStart(dayjs(time).format("HH:mm"));
    };
    const onChangeEnd = (time) => {
        setValueEnd(dayjs(time).format("HH:mm"));
    };

    //handle form
    const handleSubmit = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post("/api/v1/user/apply-doctor", {
                ...values,
                consultationStartTime: valueStart,
                consultationEndTime: valueEnd,
            });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                navigate("/login");
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something Went Wrong!");
        }
    };
    return (
        <>
            <h3 className="text-center">
                Apply Form
                <hr />
            </h3>
            <div className="form-container">
                <Form className="m-3" layout="vertical" onFinish={handleSubmit}>
                    <h5 className="">Doctor's Personal Details :</h5>
                    <Row gutter="20">
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item
                                name="name"
                                label="Name"
                                required
                                rules={[{ required: true }]}
                            >
                                <Input type="text" placeholder="Enter name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item
                                name="email"
                                label="Email"
                                required
                                rules={[{ required: true }]}
                            >
                                <Input type="email" placeholder="Enter email" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item
                                name="phone"
                                label="Phone"
                                required
                                rules={[{ required: true }]}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter phone number"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item
                                name="degree"
                                label="Degree"
                                required
                                rules={[{ required: true }]}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter all the degrees (comma separated)"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item name="website" label="Website">
                                <Input
                                    type="text"
                                    placeholder="Optional: Enter website url"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h5 className="">Doctor's Professional Details :</h5>
                    <Row gutter="20">
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item
                                name="address"
                                label="Chamber"
                                required
                                rules={[{ required: true }]}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter chamber address"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item
                                name="specialization"
                                label="Specialization"
                                required
                                rules={[{ required: true }]}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter specializations with comma"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item
                                name="experience"
                                label="Experience"
                                required
                                rules={[{ required: true }]}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter experiences"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item
                                name="fees"
                                label="Fees"
                                required
                                rules={[{ required: true }]}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter fees per consultation"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item
                                name="consultationDuration"
                                label="Per Consultation Duration (Minutes)"
                                required
                                rules={[{ required: true }]}
                            >
                                <InputNumber min={15} defaultValue={15} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item
                                name="consultationStartTime"
                                label="Consultation Start Time"
                                required
                            >
                                <TimePicker
                                    defaultValue={dayjs("00:00", "HH:mm")}
                                    onChange={onChangeStart}
                                    format={"HH:mm"}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item
                                name="consultationEndTime"
                                label="Consultation End Time"
                                required
                            >
                                <TimePicker
                                    defaultValue={dayjs("00:00", "HH:mm")}
                                    onChange={onChangeEnd}
                                    format={"HH:mm"}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h5 className="">Doctor's App Details :</h5>
                    <Row gutter="20">
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item
                                name="nid"
                                label="User Id"
                                required
                                rules={[{ required: true }]}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter nid number"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item
                                name="password"
                                label="Password"
                                required
                                rules={[{ required: true }]}
                            >
                                <Input
                                    type="password"
                                    placeholder="Enter password"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={28} md={28} lg={8}>
                            <button
                                className="btn btn-primary apply-form-btn"
                                type="submit"
                            >
                                Submit
                            </button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
};

export default ApplyDoctor;
