import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { message, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";

const ResearcherDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const effectRun = useRef(true);
    const [researcher, setResearcher] = useState({});

    //get doctor details
    const getResearcher = useCallback(async () => {
        try {
            const res = await axios.post(
                "/api/v1/admin/get-researcher-byId",
                {
                    researcherKey: params.researcherKey,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            if (res.data.success) {
                setResearcher(res.data.researcher);
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }, [params, setResearcher]);

    const changeStatusHandler = async (record, status) => {
        try {
            dispatch(showLoading());
            const res = await axios.post(
                "/api/v1/admin/change-researcher-status",
                {
                    key: record.nid,
                    newStatus: status,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log("Error: ", error);
        }
    };

    useEffect(() => {
        if (effectRun.current) {
            getResearcher();
        }

        return () => {
            effectRun.current = false;
        };
    }, [getResearcher, effectRun]);

    return (
        <Layout>
            <h3 className="p-2 text-center">
                Researcher Details <hr />
            </h3>
            <div className="m-3">
                <h5 className="">Researcher's App Details :</h5>
                <Row gutter="10" className="p-2">
                    <Col xs={10} md={10} lg={5}>
                        <div>
                            <p>
                                <b>Nid :</b> {researcher.nid}
                            </p>
                        </div>
                    </Col>
                    <Col xs={10} md={10} lg={5}>
                        <div>
                            <p>
                                <b>Type :</b> {researcher.userType}
                            </p>
                        </div>
                    </Col>
                    <Col xs={10} md={10} lg={5}>
                        <div>
                            <p>
                                <b>Status :</b> {researcher.status}
                            </p>
                        </div>
                    </Col>
                    <Col xs={10} md={10} lg={5}>
                        <div>
                            <p>
                                <b>Created At :</b> {researcher.createdAt}
                            </p>
                        </div>
                    </Col>
                </Row>
                <h5 className="">Researcher's Personal Details :</h5>
                <Row gutter="20" className="p-2">
                    <Col xs={10} md={10} lg={6}>
                        <div>
                            <p>
                                <b>Name :</b> {researcher.name}
                            </p>
                        </div>
                    </Col>
                    <Col xs={10} md={10} lg={6}>
                        <div>
                            <p>
                                <b>Email :</b> {researcher.email}
                            </p>
                        </div>
                    </Col>
                    <Col xs={10} md={10} lg={6}>
                        <div>
                            <p>
                                <b>Phone :</b> {researcher.phone}
                            </p>
                        </div>
                    </Col>
                </Row>
                <h5 className="">Doctor's Professional Details :</h5>
                <Row gutter="20" className="p-2">
                    <Col xs={24} md={24} lg={12}>
                        <div>
                            <p>
                                <b>Institute :</b> {researcher.address}
                            </p>
                        </div>
                    </Col>
                    <Col xs={10} md={10} lg={14}>
                        <div>
                            <p>
                                <b>Degree :</b> {researcher.degree}
                            </p>
                        </div>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center">
                    {researcher.userType === "candidate" ? (
                        <>
                            <button
                                className="btn btn-success m-1"
                                onClick={() =>
                                    changeStatusHandler(researcher, "approved")
                                }
                            >
                                Accept
                            </button>
                            <button
                                className="btn btn-danger m-1"
                                onClick={() =>
                                    changeStatusHandler(researcher, "rejected")
                                }
                            >
                                Reject
                            </button>
                        </>
                    ) : researcher.status === "blocked" ? (
                        <button
                            className="btn btn-success w-30 m-1"
                            onClick={() =>
                                changeStatusHandler(researcher, "approved")
                            }
                        >
                            Approve
                        </button>
                    ) : (
                        <button
                            className="btn btn-danger w-50 m-1"
                            onClick={() =>
                                changeStatusHandler(researcher, "blocked")
                            }
                        >
                            Block
                        </button>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default ResearcherDetails;
