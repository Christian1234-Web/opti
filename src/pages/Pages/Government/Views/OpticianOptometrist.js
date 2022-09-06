import React, { useCallback, useEffect, useState } from "react";
import { CardBody, Row, Col, Card, Table, CardHeader, Container } from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import MetaTags from 'react-meta-tags';
import { Link, useParams } from "react-router-dom";
import logoDark from "../../../../assets/images/odorbnlogowhite.png";
import logoLight from "../../../../assets/images/odorbnlogo.png";
import { request } from "../../../../services/utilities";
import { LoaderGrow } from "../../../AdvanceUi/Loader/loader";
import { FileText } from "react-feather";
import { USER_COOKIE } from "../../../../services/constants";
import SSRStorage from "../../../../services/storage";
const storage = new SSRStorage();


const OpticianOptometrist = () => {
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

    const makePayment = async () => {
        const user = await storage.getItem(USER_COOKIE);
        const data = { userId: user.id, planId: 2 }
        try {
            const rs = await request('payment/remita/initialize', 'POST', false, data);
            window.location.href = rs.url;
        } catch (err) {
            console.log(err);
        }
    }
    const fetchDetailsOfId = useCallback(async () => {
        setLoading(true);
        const url = `${type.type}s/${parseInt(id.id)}`;
        try {
            const rs = await request(url, 'GET', true);
            setIdDetails(rs.data);
            setLoading(false);

        }
        catch (err) {
            setLoading(false);
            console.log(err)
        }
    }, [id.id, type.type])

    useEffect(() => {
        fetchDetailsOfId();
    }, [fetchDetailsOfId])
    return (
        <div className="page-content">
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
                                                {type.type === 'optician' ? <>{idDetails?.id}</> :
                                                    <>
                                                        {idDetails?.id}
                                                    </>
                                                }
                                            </>}

                                        </h6>
                                        <h6>
                                            <span className="text-muted fw-normal text-uppercase">User ID :</span>{" "}
                                            {idDetails !== null ? <>{idDetails?.id}</> :
                                                '-'
                                            }
                                        </h6>
                                        <h6>
                                            <span className="text-muted fw-normal text-uppercase">Email :</span>{" "}
                                            {idDetails !== null ? <>{idDetails?.email}</> :
                                                '--'
                                            }
                                        </h6>

                                        <h6 className="mb-0">
                                            <span className="text-muted fw-normal text-uppercase">Contact No :</span>{" "}
                                            {idDetails !== null ? <>{idDetails?.phone} </> :
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
                                            --
                                        </h5>
                                            :
                                            <>
                                                {type.type === 'optician' ?
                                                    <h5 className="fs-14 mb-0">{new Date(idDetails?.createdAt).toDateString()}</h5> :
                                                    <h5 className="fs-14 mb-0">  {new Date(idDetails?.createdAt).toDateString()} </h5>
                                                }
                                            </>
                                        }

                                    </Col>
                                    <Col lg={3} xs={6}>
                                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                                            Approve By S.D
                                        </p>
                                        {idDetails === null ? <span className="badge badge-soft-danger fs-11">No</span> :
                                            <>
                                                {type.type === 'optician' ? idDetails.isApprovedBySD === true ? <span className="badge badge-soft-success fs-11">Yes</span> :
                                                    <span className="badge badge-soft-danger fs-11">No</span> : ""
                                                }
                                                {type.type === 'optometrist' ? idDetails.isApprovedBySD === true ? <span className="badge badge-soft-success fs-11">Yes</span> :
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
                                                {type.type === 'optician' ? idDetails.isApprovedByHOD === true ? <span className="badge badge-soft-success fs-11">Yes</span> :
                                                    <span className="badge badge-soft-danger fs-11">No</span> : ""
                                                }
                                                {type.type === 'optometrist' ? idDetails.isApprovedByHOD === true ? <span className="badge badge-soft-success fs-11">Yes</span> :
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
                                                {type.type === 'optician' ? idDetails.isApprovedByAdmin === true ? <span className="badge badge-soft-success fs-11">Yes</span> :
                                                    <span className="badge badge-soft-danger fs-11">No</span> : ""
                                                }
                                                {type.type === 'optometrist' ? idDetails.isApprovedByAdmin === true ? <span className="badge badge-soft-success fs-11">Yes</span> :
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
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.user.firstName}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Other Name:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.user.otherNames}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Surname:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.user.surname}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Email:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.user.email}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Phone:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.user.phone}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Gender:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.user.sex}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Date of Birth:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{new Date(idDetails.user.dateOfBirth).toDateString()}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">State of Origin:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.user.stateOfOrigin}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Local Government:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.user.lgaOrigin}</> : "--"}</p>
                                        </div>
                                    </Col>
                                    <Col sm={4}>
                                        <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                            User Information
                                        </h6>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Home Address:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.user?.address}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Office/ Practice Address:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.user?.officeAddress}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Marital Status:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.user?.maritalStatus}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Maiden Name:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.user?.maidenName}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Emergency Contact Name:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.user?.emergencyName}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Emergency Contact Address:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.user?.emergencyAddress}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Means of Identification:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.user?.meansOfIdentification}</> : "--"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Means of Identification:</p>
                                            <p className="text-muted mb-1 mx-2">
                                                {idDetails === null ? '333344' : <>
                                                    {type.type === 'optician' ? <>{idDetails.user?.meansOfIdentification}</> :
                                                        <>
                                                            {idDetails.user?.meansOfIdentification}
                                                        </>
                                                    }
                                                </>}
                                            </p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2"> Identification Number:</p>
                                            <p className="text-muted mb-1 mx-2">
                                                {idDetails === null ? '333344' : <>
                                                    {type.type === 'optician' ? <>{idDetails.user?.identificationNumber}</> :
                                                        <>
                                                            {idDetails.user?.identificationNumber}
                                                        </>
                                                    }
                                                </>}
                                            </p>
                                        </div>
                                    </Col>
                                    <Col sm={4}>
                                        <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                            User Information
                                        </h6>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Do you have a previous conviction or criminal records?:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null && idDetails.user?.isConvicted === true ? "Yes" : "No"}</p>
                                        </div>

                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Have you ever been sentenced for any crime?:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null && idDetails.user?.isSentenced === true ? "Yes" : "No"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="text-muted mb-2">Are you currently or have you had any issues with drug use? :</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null && idDetails.user?.hasDrugIssue === true ? "Yes" : "No"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null && idDetails.user?.hasDrugIssue === true ? <>{idDetails.user?.drugUseDetails}</> :
                                                " "}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardBody className="p-4">
                                <div className="">
                                    <h6 className="">PART B: ACADEMIC RECORDS (PRIMARY TO TERTIARY)</h6>
                                </div>
                                <div className="table-responsive">
                                    <Table className="table-borderless text-center table-nowrap align-middle mb-0">
                                        <thead>
                                            <tr className="table-active">
                                                <th scope="col" style={{ width: "50px" }}>
                                                    #
                                                </th>
                                                <th scope="col">NAME of INSTITUTION</th>
                                                <th scope="col">DATE ATTENDED</th>
                                                <th scope="col">CERTIFICATE OBTAINED AND GRADES</th>

                                            </tr>
                                        </thead>
                                        {idDetails?.academic?.map((e, i) => {
                                            return (
                                                <tbody key={i}>
                                                    <tr>
                                                        <td className="fw-medium">{i + 1}</td>
                                                        <td>{e.institutionName}</td>
                                                        <td>{new Date(e.startDate).toDateString()} - {new Date(e.endDate).toDateString()}</td>
                                                        <td>{e.grade}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })}
                                    </Table>
                                </div>

                                <div>
                                    <h6 className="mt-4">POST GRADUATE TRAINING/EXPERIENCE - INTERNSHIP/NYSC/ADDITIONAL QUALIFICATIONS:</h6>
                                </div>
                                <div className="table-responsive">
                                    <Table className="table-borderless text-center table-nowrap align-middle mb-0">
                                        <thead>
                                            <tr className="table-active">
                                                <th scope="col" style={{ width: "50px" }}>
                                                    #
                                                </th>
                                                <th scope="col">NAME of INSTITUTION/ESTABLISHMENT</th>
                                                <th scope="col">NAME OF SUPERVISOR/HOD</th>
                                                <th scope="col">PERIOD COVERED</th>

                                            </tr>
                                        </thead>

                                        {idDetails?.certifications?.map((e, i) => {
                                            return (
                                                <tbody key={i}>
                                                    <tr>
                                                        <td className="fw-medium">{i + 1}</td>
                                                        <td>{e.institutionName}</td>
                                                        <td>{e.supervisorName}</td>
                                                        <td>{new Date(e.startDate).toDateString()} - {new Date(e.endDate).toDateString()}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })}

                                    </Table>
                                </div>
                                <div>
                                    <h6 className="mt-4">PART D: REFEREES:</h6>
                                </div>
                                <div className="table-responsive">
                                    <Table className="table-borderless text-center table-nowrap align-middle mb-0">
                                        <thead>
                                            <tr className="table-active">
                                                <th scope="col" style={{ width: "50px" }}>
                                                    #
                                                </th>
                                                <th scope="col">NAME</th>
                                                <th scope="col">FULL ADDRESS</th>
                                                <th scope="col">OCCUPATION</th>
                                                <th scope="col">PHONE NO. & EMAIL ADDRESS</th>
                                            </tr>
                                        </thead>
                                        {idDetails?.referees?.map((e, i) => {
                                            return (
                                                <tbody key={i}>
                                                    <tr>
                                                        <td className="fw-medium">{i + 1}</td>
                                                        <td>{e.refereeName}</td>
                                                        <td>{e.refereeAddress}</td>
                                                        <td>{e.refereeOccupation}</td>
                                                        <td>{e.refereeEmail}</td>
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
                                    </Table>
                                </div>

                                <div className="hstack gap-2 justify-content-between d-print-none mt-4">
                                    <Link to={`/${idDetails?.user?.type}-dashboard`} className="btn btn-danger">
                                        <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                                        Cancel
                                    </Link>
                                    <Link
                                        to="#"
                                        onClick={makePayment}
                                        className="btn btn-success"
                                    >
                                        <i className="ri-printer-line align-bottom me-1"></i> Make Payment
                                    </Link>

                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default OpticianOptometrist;
