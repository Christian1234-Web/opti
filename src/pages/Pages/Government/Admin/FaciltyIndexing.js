import React, { useCallback, useEffect, useState } from "react";
import { CardBody, Row, Col, Card, Table, CardHeader, Container } from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import MetaTags from 'react-meta-tags';
import { Link, useParams } from "react-router-dom";
import Header from "./Layout";
import logoDark from "../../../../assets/images/odorbnlogowhite.png";
import logoLight from "../../../../assets/images/odorbnlogo.png";
import { request } from "../../../../services/utilities";
import { LoaderGrow } from "../../../AdvanceUi/Loader/loader";
import { FileText } from "react-feather";

const FacilityIndexing = () => {

    const [idDetails, setIdDetails] = useState(null)
    const [loading, setLoading] = useState(false)


    //Print the Invoice
    const printInvoice = () => {
        window.print();
    };

    const id = useParams();
    const type = useParams();

    const downloadFile = (e) => {
        const linkSource = e;
        const downloadLink = document.createElement('a');
        const fileName = 'test';
        downloadLink.href = linkSource;
        downloadLink.setAttribute('target', '_blank')
        downloadLink.setAttribute('ref', 'noreferrer noopene')
        downloadLink.download = fileName;
        downloadLink.click();
    }
    const fetchDetailsOfId = useCallback(async () => {
        setLoading(true);
        const url = `practices/${parseInt(id.id)}`;
        try {
            const rs = await request(url, 'GET', true);
            setIdDetails(rs.data);
            setLoading(false);

        }
        catch (err) {
            setLoading(false);
            console.log(err)
        }
    }, [id.id]);

    useEffect(() => {
        fetchDetailsOfId();
    }, [fetchDetailsOfId])
    return (
        <div className="page-content">
            <Header />
            {/* <MetaTags> 
          <title>Invoice Details | Velzon - React Admin & Dashboard Template</title>
      </MetaTags> */}
            <Container fluid>
                {/* <BreadCrumb title="Invoice Details" pageTitle="Invoices" /> */}
                <>{loading === true ? <LoaderGrow /> : " "}</>
                <Row className="justify-content-center">
                    <Col xxl={9}>
                        <Card id="demo">
                            <CardHeader className="border-bottom-dashed p-4">
                                <div className="d-sm-flex">
                                    <div className="flex-grow-1">
                                        <Link to='/admin-dashboard'>
                                            <img
                                                src={logoDark}
                                                className="card-logo card-logo-dark"
                                                alt="logo dark"
                                                height="50"
                                            />
                                        </Link>
                                        <Link to='/admin-dashboard'>
                                            <img
                                                src={logoLight}
                                                className="card-logo card-logo-light"
                                                alt="logo light"
                                                height="50"
                                            />
                                        </Link>
                                        <div className="mt-sm-5 mt-4">
                                            <h6 className="text-muted text-uppercase fw-semibold">
                                                Address
                                            </h6>
                                            {idDetails !== null ? <p className="text-muted mb-1">
                                                {idDetails?.user?.address}, {idDetails?.user?.nationality}
                                            </p> :
                                                <p className="text-muted mb-1">
                                                    --
                                                </p>}
                                            {/* <p className="text-muted mb-0">Zip-code: 90201</p> */}
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 mt-sm-0 mt-3">
                                        <h6>
                                            <span className="text-muted text-uppercase fw-normal">
                                                <> {type.type} register user :</>
                                            </span>{" "}
                                            {idDetails !== null ? <>{idDetails?.user?.firstName} {idDetails?.user?.surname}</> :
                                                '--'
                                            }

                                        </h6>
                                        <h6>
                                            <span className="text-muted text-uppercase fw-normal">
                                                <> {type.type} registration no :</>
                                            </span>{" "}
                                            {idDetails === null ? '--' : <>
                                                <>{idDetails.id}</>
                                            </>}

                                        </h6>
                                        <h6>
                                            <span className="text-muted fw-normal text-uppercase">User ID :</span>{" "}
                                            {idDetails !== null ? <>{idDetails.user.id}</> :
                                                '--'
                                            }
                                        </h6>
                                        <h6>
                                            <span className="text-muted fw-normal text-uppercase">Email :</span>{" "}
                                            {idDetails !== null ? <>{idDetails.user.email}</> :
                                                '--'
                                            }
                                        </h6>

                                        <h6 className="mb-0">
                                            <span className="text-muted fw-normal text-uppercase">Contact No :</span>{" "}
                                            {idDetails !== null ? <>{idDetails.user.phone} </> :
                                                '--'
                                            }

                                        </h6>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="p-4">
                                <Row className="g-3">
                                    {/* <Col lg={3} xs={6}>
                                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                                            User Id
                                        </p>
                                        {idDetails !== null ? <h5 className="fs-14 mb-0">{idDetails.id}</h5> :
                                            <h5 className="fs-14 mb-0">#VL25000355</h5>

                                        }
                                    </Col> */}
                                    <Col lg={3} xs={6}>
                                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                                            {type.type} Registered Date
                                        </p>
                                        {idDetails === null ? <h5 className="fs-14 mb-0">
                                            23 Nov, 2021
                                        </h5>
                                            :
                                            <>
                                                <h5 className="fs-14 mb-0">{new Date(idDetails?.createdAt).toDateString()}</h5>
                                            </>
                                        }

                                    </Col>
                                    <Col lg={3} xs={6}>
                                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                                            Approve By S.D
                                        </p>
                                        {idDetails === null ? <span className="badge badge-soft-danger fs-11">No</span> :
                                            <>
                                                {type.type === 'practice' ? idDetails.isApprovedBySD === true ? <span className="badge badge-soft-success fs-11">Yes</span> :
                                                    <span className="badge badge-soft-danger fs-11">No</span> : ""
                                                }
                                            </>
                                        }

                                    </Col>
                                    <Col lg={3} xs={6}>
                                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                                            Approve By H.O.D
                                        </p>
                                        {idDetails === null ? <span className="badge badge-soft-danger fs-11">No</span> :
                                            <>
                                                {type.type === 'practice' ? idDetails.isApprovedByHOD === true ? <span className="badge badge-soft-success fs-11">Yes</span> :
                                                    <span className="badge badge-soft-danger fs-11">No</span> : ""
                                                }
                                            </>
                                        }

                                    </Col> <Col lg={3} xs={6}>
                                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                                            Approve By Admin
                                        </p>
                                        {idDetails === null ? <span className="badge badge-soft-danger fs-11">No</span> :
                                            <>
                                                {type.type === 'practice' ? idDetails.isApprovedByAdmin === true ? <span className="badge badge-soft-success fs-11">Yes</span> :
                                                    <span className="badge badge-soft-danger fs-11">No</span> : ""
                                                }
                                            </>
                                        }

                                    </Col>
                                </Row>
                            </CardBody>

                            <CardBody className="p-4 border-top border-top-dashed">
                                <Row className="g-3">
                                    <Col sm={4}>
                                        <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                            User Informations
                                        </h6>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">First Name:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.firstName}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Other Name:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.otherNames}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Surname:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.surname}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Email:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.email}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Phone:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.phone}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Gender:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.sex}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Date of Birth:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{new Date(idDetails.dateOfBirth).toDateString()}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">State of Origin:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.stateOfOrigin}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Local Government:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.lgaOrigin}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Home Address:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.address}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Office/ Practice Address:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.officeAddress}</> : "--"}</p>
                                        </div>
                                    </Col>
                                    <Col sm={4}>
                                        <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                            User Information
                                        </h6>

                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Marital Status :</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.maritalStatus}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Maiden Name :</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.maidenName}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Do you have a previous conviction or criminal records?:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null && idDetails.isConvicted === true ? "Yes" : "No"}</p>
                                        </div>

                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Have you ever been sentenced for any crime?:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null && idDetails.isSentenced === true ? "Yes" : "No"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="text-muted mb-2">Are you currently or have you had any issues with drug use? :</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null && idDetails.hasDrugIssue === true ? "Yes" : "No"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null && idDetails.hasDrugIssue === true ? <>{idDetails.drugUseDetails}</> :
                                                " "}</p>
                                        </div>

                                    </Col>
                                    <Col sm={4}>
                                        <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                            User Information / Practice
                                        </h6>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Name of Practice:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.name} </> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Type of Practice:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.type} </> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Address of Practice:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.address} </> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">State of Practice:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.state} </> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">L.G.A of Practice:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.lga} </> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Email of Practice:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.email} </> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Phone No. of Practice:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.phone} </> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">
                                                IS THE PRACTICE ATTACHED TO A GENERAL MEDICAL PRACTICE:</p>
                                            {idDetails === null ? <span className="badge badge-soft-danger fs-11">No</span> :
                                                <>
                                                    {type.type === 'practice' ? idDetails.isAttachedToGMP === true ? <span className="badge badge-soft-success fs-11">Yes</span> :
                                                        <span className="badge badge-soft-danger fs-11">No</span> : ""
                                                    }
                                                </>
                                            }
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Name OF REGISTERED PRACTITIONER IN-CHARGE:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.nameOfRegPractitionerInCharge} </> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">QUALIFICATION OF PRACTITIONER(S) IN-CHARGE :</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.qualificationOfPractitionerInCharge} </> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">REG. NO. WITH NIGERIAN OPTOMETRIC ASSOCIATION :</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.optometricRegNum} </> : "--"}</p>
                                        </div>

                                    </Col>
                                </Row>
                            </CardBody>
                            <CardBody className="p-4">
                                <div className="">
                                    <h6 className="">PART A: DIRECTORS SECTION</h6>
                                </div>
                                <div className="table-responsive">
                                    <Table className="table-borderless  table-nowrap align-middle mb-0">
                                        <thead>
                                            <tr className="table-active">
                                                <th scope="col" style={{ width: "50px" }}>
                                                    #
                                                </th>
                                                <th scope="col"> NAME</th>
                                                <th scope="col">ADDRESS</th>

                                            </tr>
                                        </thead>

                                        {idDetails?.directors?.map((e, i) => {
                                            return (
                                                <tbody key={i}>
                                                    <tr>
                                                        <td className="fw-medium">{i + 1}</td>
                                                        <td className="text-start">
                                                            <p className="text-muted mb-0">
                                                                {e.name}
                                                            </p>
                                                        </td>
                                                        <td>{e.address}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                    </Table>
                                </div>
                                <div>
                                    <h6 className="mt-4">PART B: FACILITIES SECTION:</h6>
                                </div>
                                <div className="table-responsive">
                                    <Table className="table-borderless  table-nowrap align-middle mb-0">
                                        <thead>
                                            <tr className="table-active">
                                                <th scope="col" style={{ width: "50px" }}>
                                                    #
                                                </th>
                                                <th scope="col">NAME</th>
                                            </tr>
                                        </thead>
                                        {idDetails?.facilities?.map((e, i) => {
                                            return (
                                                <tbody key={i}>
                                                    <tr>
                                                        <td className="fw-medium">{i + 1}</td>
                                                        <td className="col">{e.name}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                    </Table>
                                </div>

                                <div>
                                    <h6 className="mt-4">PART D: DOCUMENTS:</h6>
                                </div>
                                <div className="table-responsive">
                                    <Table className="table-borderless table-nowrap align-middle mb-0">
                                        <thead>
                                            <tr className="table-active">
                                                <th scope="col" style={{ width: "50px" }}>
                                                    #
                                                </th>
                                                <th scope="col">DOCUMENT</th>
                                                <th scope="col">NAME OF DOCUMENT</th>

                                                <th scope="col">ACTIONS</th>

                                            </tr>
                                        </thead>
                                        {idDetails?.documents?.map((e, i) => {
                                            return (
                                                <tbody key={i}>
                                                    <tr>
                                                        <td className="fw-medium">{i + 1}</td>
                                                        <td> <FileText size='28' /></td>
                                                        <td> {e.name}</td>
                                                        <td> <Link to="#" onClick={() => downloadFile(e.file)} className="btn btn-primary">
                                                            <i className="ri-download-2-line align-bottom "></i>{" "}
                                                            Download
                                                        </Link></td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })}

                                        <div className="w-100">
                                            {/* {`Available results ${idDetails.documents.length}`} */}
                                        </div>
                                    </Table>
                                </div>

                                <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                                    <Link
                                        to="#"
                                        onClick={printInvoice}
                                        className="btn btn-success"
                                    >
                                        <i className="ri-printer-line align-bottom me-1"></i> Print
                                    </Link>
                                    {/* <Link to="#" className="btn btn-primary">
                                        <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                                        Download
                                    </Link> */}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
    );
};

export default FacilityIndexing;
