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

const IndexingFacility = () => {
    const [idDetails, setIdDetails] = useState(null)
    const [loading, setLoading] = useState(false)
    const [documents, setDocuments] = useState([])



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
        const url = `users/${parseInt(id.id)}`;
        try {

            const rs = await request(url, 'GET', true);
            const urlf = `indexings/${rs.data.indexing.id}`
            const fl = await request(urlf, 'GET', true);
            setIdDetails(rs.data);
            setDocuments(fl.data.documents);
            setLoading(false);

        }
        catch (err) {
            setLoading(false);
            console.log(err)
        }
    }, [idDetails, id.id])

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
                                        <img
                                            src={logoDark}
                                            className="card-logo card-logo-dark"
                                            alt="logo dark"
                                            height="50"
                                        />
                                        <img
                                            src={logoLight}
                                            className="card-logo card-logo-light"
                                            alt="logo light"
                                            height="50"
                                        />
                                        <div className="mt-sm-5 mt-4">
                                            <h6 className="text-muted text-uppercase fw-semibold">
                                                Address
                                            </h6>
                                            {idDetails !== null ? <p className="text-muted mb-1">
                                                {idDetails.address}, {idDetails.nationality}
                                            </p> :
                                                <p className="text-muted mb-1">
                                                    California, United States
                                                </p>}
                                            {/* <p className="text-muted mb-0">Zip-code: 90201</p> */}
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 mt-sm-0 mt-3">
                                        <h6>
                                            <span className="text-muted text-uppercase fw-normal">
                                                <> {type.type} register user :</>
                                            </span>{" "}
                                            {idDetails !== null ? <>{idDetails.firstName} {idDetails.surname}</> :
                                                'Mr George'
                                            }

                                        </h6>
                                        <h6>
                                            <span className="text-muted text-uppercase fw-normal">
                                                <> {type.type} registration no :</>
                                            </span>{" "}
                                            {idDetails === null ? '0002' : <>
                                                <>{idDetails.indexing.id}</>
                                            </>}

                                        </h6>
                                        <h6>
                                            <span className="text-muted fw-normal text-uppercase">User ID :</span>{" "}
                                            {idDetails !== null ? <>{idDetails.id}</> :
                                                '1'
                                            }
                                        </h6>
                                        <h6>
                                            <span className="text-muted fw-normal text-uppercase">Email :</span>{" "}
                                            {idDetails !== null ? <>{idDetails.email}</> :
                                                'xxx@gmailcom'
                                            }
                                        </h6>

                                        <h6 className="mb-0">
                                            <span className="text-muted fw-normal text-uppercase">Contact No :</span>{" "}
                                            {idDetails !== null ? <>{idDetails.phone} </> :
                                                '+(01) 234 6789'
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
                                                <h5 className="fs-14 mb-0">{new Date(idDetails.indexing.createdAt).toDateString()}</h5>
                                            </>
                                        }

                                    </Col>
                                    <Col lg={3} xs={6}>
                                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                                            Approve By S.D
                                        </p>
                                        {idDetails === null ? <span className="badge badge-soft-danger fs-11">No</span> :
                                            <>
                                                {type.type === 'indexing' ? idDetails.indexing.isApprovedBySD === true ? <span className="badge badge-soft-success fs-11">Yes</span> :
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
                                                {type.type === 'indexing' ? idDetails.indexing.isApprovedByHOD === true ? <span className="badge badge-soft-success fs-11">Yes</span> :
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
                                                {type.type === 'indexing' ? idDetails.indexing.isApprovedByAdmin === true ? <span className="badge badge-soft-success fs-11">Yes</span> :
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
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.firstName}</> : "George"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Other Name:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.otherNames}</> : "Zara"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Surname:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.surname}</> : "web"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Email:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.email}</> : "web@gmail.com"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Phone:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.phone}</> : "+234 090887"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Gender:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.sex}</> : "Male"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Date of Birth:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{new Date(idDetails.dateOfBirth).toDateString()}</> : "24-5-2000"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">State of Origin:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.stateOfOrigin}</> : "Kaduna"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Local Government:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.lgaOrigin}</> : "boki"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Home Address:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.address}</> : "maitama"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Office/ Practice Address:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.officeAddress}</> : "maitama"}</p>
                                        </div>
                                    </Col>
                                    <Col sm={4}>
                                        <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                            User Information
                                        </h6>

                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Marital Status :</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.maritalStatus}</> : "Single"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Maiden Name :</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.maidenName}</> : "non"}</p>
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
                                            User Information / Indexing
                                        </h6>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Institution Code Number: ODORBN :</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.indexing.institutionCode} </> : "ixxx009"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Address of Training Institution :</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.indexing.institutionAddress} </> : "maitama"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Matriculation Number:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.indexing.matricNum} </> : "xx1111"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Date Admitted Into The Training Institution:</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{new Date(idDetails.indexing.dateAdmitted).toDateString()} </> : "15-05-2022"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Sponsor First Name :</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.indexing.sponsorFirstName} </> : "15-05-2022"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Sponsor Surname :</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.indexing.sponsorSurname} </> : "15-05-2022"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Sponsor Address :</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.indexing.sponsorAddress} </> : "15-05-2022"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Next of Kin First Name :</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.indexing.nokFirstName} </> : "15-05-2022"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Next of Kin Surname :</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.indexing.nokSurname} </> : "15-05-2022"}</p>
                                        </div>
                                        <div className="d-flex">
                                            <p className="fw-medium mb-2">Next of Kin Address :</p>
                                            <p className="text-muted mb-1 mx-2">{idDetails !== null ? <>{idDetails.indexing.nokAddress} </> : "15-05-2022"}</p>
                                        </div>

                                    </Col>
                                </Row>
                            </CardBody>
                            <CardBody className="p-4">

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

                                        {idDetails === null ? <tbody>
                                            <tr>
                                                <th scope="row">01</th>
                                                <td>img ctv.png</td>
                                                <td> <Link to="#" className="btn btn-primary">
                                                    <i className="ri-download-2-line align-bottom "></i>{" "}
                                                    Download
                                                </Link></td>

                                            </tr>

                                        </tbody> : <>
                                            {<>  {documents.map((e, i) => {
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
                                            })}</>
                                            }
                                        </>}

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
        </div>
    );
};

export default IndexingFacility;
