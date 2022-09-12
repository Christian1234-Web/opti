import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane, UncontrolledDropdown } from 'reactstrap';
import classnames from 'classnames';
import SwiperCore, { Autoplay } from "swiper";
import MetaTags from 'react-meta-tags';
import { USER_COOKIE } from '../../../../services/constants';
import SSRStorage from '../../../../services/storage';
import { Store } from '../../../../services/store';

//Images
import profileBg from '../../../../assets/images/profile-bg.jpg';
import avatar1 from '../../../../assets/images/users/avatar-1.jpg';

import { request } from '../../../../services/utilities';
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
import ListTables from '../ListTables';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Optometrist from '../Views/Optometrist';
import TabOptometrist from '../RegForm/TabOptometrist';
import Comment from '../EmailInbox';
const MySwal = withReactContent(Swal);

const SimplePage = () => {
    const store = useContext(Store);
    let [read_only_optometristIntern, setRead_only_optometristIntern] = store.read_only_optometristIntern;
    const history = useHistory();
    let [optometrist_approval, setOptometrist_approval] = store.optometrist_approval;
    let [read_only_optometrist, setRead_only_optometrist] = store.read_only_optometrist;
    let [optometrist_btn_save, setOptometrist_btn_save] = store.optometrist_btn_save;
    let [optometrist_btn_update, setOptometrist_btn_update] = store.optometrist_btn_update;
    let [optometrist_countdown, setOptometrist_countdown] = store.optometrist_countdown

    let [academic_formOptometrist, setAcademic_formOptometrist] = store.academic_formOptometrist;
    let [post_graduateOptometrist, setPost_graduateOptometrist] = store.post_graduateOptometrist
    let [referenceOptometrist, setReferenceOptometrist] = store.referenceOptometrist;

    const [loading, setLoading] = useState(false);
    const [idx, setIdx] = useState(null);
    const [oneOptometrist, setOneOptometrist] = useState(null);
    const [internshipDocuments, setInternshipDocuments] = useState([]);
    const [error, setError] = useState('');
    const [aUser, setAUser] = useState([]);

    const [lga, setLga] = useState([]);
    const [state, setState] = useState([]);
    const [optometrists, setOptometrists] = useState(null);
    const [optometristTraining, setOptometristTraining] = useState(null);
    const [selected_state, setSelected_state] = useState('');
    const [selected_lga, setSelected_lga] = useState('');

    // optometrist secton
    const [id_meansOpto, setId_meansOpto] = useState('');
    const [id_noOpto, setId_noOpto] = useState('');
    const [color_one_optometrist, setColor_one_optometrist] = useState('text-success');
    const [color_two_optometrist, setColor_two_optometrist] = useState('');


    // internship  section
    const [supervisor_phone_optometrist, setSupervisor_phone_optometrist] = useState('');
    const [supervisor_date_of_resumption_optometrist, setSupervisor_date_of_resumption_optometrist] = useState();
    const [supervisor_board_no_optometrist, setSupervisor_board_no_optometrist] = useState('');
    const [supervisor_email_optometrist, setSupervisor_email_optometrist] = useState('');
    const [supervisor_middle_name_optometrist, setSupervisor_middle_name_optometrist] = useState('');
    const [supervisor_first_name_optometrist, setSupervisor_first_name_optometrist] = useState('');
    const [supervisor_last_name_optometrist, setSupervisor_last_name_optometrist] = useState('');

    const [hospital_email_optometrist, setHospital_email_optometrist] = useState('');
    const [hospital_name_optometrist, setHospital_name_optometrist] = useState('');
    const [hospital_address_optometrist, setHospital_address_optometrist] = useState('');
    const [hospital_phone_optometrist, setHospital_phone_optometrist] = useState('');

    // end of internship

    const [user_school_optometrist, setUser_school_optometrist] = useState('');
    const [user_date_of_orientation_optometrist, setUser_date_of_orientation_optometrist] = useState('');
    // end of optometrist

    const optimRefTwo = useRef();
    const optometristRef = useRef();


    SwiperCore.use([Autoplay]);

    const handleError = () => {
        return MySwal.fire({
            title: 'Sorry!',
            text: ' Failed to load user details!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })
    }
    const [activeTab, setActiveTab] = useState('1');
    const [activityTab, setActivityTab] = useState('1');

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };


    const showEditOptometrist = (i) => {
        let item = optometrists;
        setOneOptometrist(item);
        setOptometrist_approval(item.status);

        optometristRef.current.style.display = 'none';
        optimRefTwo.current.style.display = 'block';

        if (item.dateOfOrientation) {
            setOptometrist_btn_update(true);
            setOptometrist_btn_save(false);
            setUser_date_of_orientation_optometrist(item.dateOfOrientation);
            setUser_school_optometrist(item.schoolAttended);

            setSupervisor_first_name_optometrist(item.supervisors[0].firstName);
            setSupervisor_middle_name_optometrist(item.supervisors[0].otherNames);
            setSupervisor_last_name_optometrist(item.supervisors[0].surname);
            setSupervisor_email_optometrist(item.supervisors[0].email);
            setSupervisor_phone_optometrist(item.supervisors[0].phone);
            setSupervisor_board_no_optometrist(item.supervisors[0].boardNumber);
            setSupervisor_date_of_resumption_optometrist(item.supervisors[0].dateOfResumption)

            setHospital_name_optometrist(item.hospitals[0].name);
            setHospital_address_optometrist(item.hospitals[0].address);
            setHospital_email_optometrist(item.hospitals[0].email);
            setHospital_phone_optometrist(item.hospitals[0].phone);

            setId_meansOpto('');
            setId_noOpto('');
            setAcademic_formOptometrist([])
            setPost_graduateOptometrist([])
            setReferenceOptometrist([]);

            if (item.status === 'Pending') {
                setRead_only_optometristIntern(true);
            } else {
                setRead_only_optometristIntern(false);
            }
        }
        else {
            setOptometrist_btn_save(true);
            setOptometrist_btn_update(false);
            setId_noOpto(item.identificationNumber);
            setId_meansOpto(item.meansOfIdentification);
            setAcademic_formOptometrist(item.academics);
            setPost_graduateOptometrist(item.certifications);
            setReferenceOptometrist(item.referees);

            setUser_date_of_orientation_optometrist('');
            setUser_school_optometrist('');

            setSupervisor_first_name_optometrist('');
            setSupervisor_email_optometrist('');
            setSupervisor_phone_optometrist('');
            setSupervisor_board_no_optometrist('');

            setHospital_name_optometrist('');
            setHospital_address_optometrist('');
            setHospital_email_optometrist('');
            setHospital_phone_optometrist('');

            if (item.status !== 'Continue') {
                setRead_only_optometrist(true);
            } else {
                setRead_only_optometrist(false);
            }
        }
        // console.log(optometrist_btn_save, supervisor_first_name_optometrist);
    }

    const showInternshipOptometrist = () => {
        setOptometrist_approval(' ');
        setRead_only_optometrist(false);
        setOneOptometrist(null);
        setId_meansOpto('');
        setId_noOpto('');
        setAcademic_formOptometrist([])
        setPost_graduateOptometrist([])
        setReferenceOptometrist([]);
        // setUser_date_of_orientation_optometrist('');
        setUser_school_optometrist('');

        setSupervisor_first_name_optometrist('');
        setSupervisor_email_optometrist('');
        setSupervisor_phone_optometrist('');
        setSupervisor_board_no_optometrist('');

        setHospital_name_optometrist('');
        setHospital_address_optometrist('');
        setHospital_email_optometrist('');
        setHospital_phone_optometrist('');

        optometristRef.current.style.display = 'none';
        optimRefTwo.current.style.display = 'block';
    }
    const existPageOptometrist = () => {
        setOptometrist_approval(' ');
        setRead_only_optometrist(false);
        setOneOptometrist(null);
        setId_meansOpto('');
        setId_noOpto('')
        fetchUser();
        setAcademic_formOptometrist([])
        setPost_graduateOptometrist([])
        setReferenceOptometrist([]);
        setUser_date_of_orientation_optometrist('');
        setUser_school_optometrist('');

        setSupervisor_first_name_optometrist('');
        setSupervisor_email_optometrist('');
        setSupervisor_phone_optometrist('');
        setSupervisor_board_no_optometrist('');

        setHospital_name_optometrist('');
        setHospital_address_optometrist('');
        setHospital_email_optometrist('');
        setHospital_phone_optometrist('');

        optimRefTwo.current.style.display = 'none';
        optometristRef.current.style.display = 'block';
    }

    const downLoadFIle = (e) => {
        const linkSource = e;
        const downloadLink = document.createElement('a');
        const fileName = 'test';
        downloadLink.href = linkSource;
        downloadLink.setAttribute('target', '_blank')
        downloadLink.setAttribute('ref', 'noreferrer noopene')
        downloadLink.download = fileName;
        downloadLink.click();
    }

    const fetchUser = useCallback(async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);
        if (user === null) {
            return history.push(`/signin#facility`);
        }
        if (user.type !== 'optometrist') {
            return history.push(`/${user.type}-dashboard`);
        }
        await setIdx(user.id);
        try {
            setLoading(true);
            const url = `users/${user.id}`;
            const rs = await request(url, 'GET', true);
            setAUser(rs.data);
            const urf = `documents/user/${user.id}`;
            const fls = await request(urf, 'GET', true);
            setOptometrists(rs.data.internship);
            setOptometristTraining(rs.data.internship);
            setInternshipDocuments(fls.data.documents);
            setColor_one_optometrist('text-success');
            setColor_two_optometrist('');
            // console.log(fls);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            handleError();
            console.log(err);
        }
    }, [history]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Profile | Dashboard | ORORBN</title>
                </MetaTags>
                <>{loading === true ? <LoaderGrow /> : ''}</>
                <Container fluid >
                    <div className="profile-foreground position-relative mx-n4 mt-n4">
                        <div className="profile-wid-bg">
                            <img src={profileBg} alt="" className="profile-wid-img" />
                        </div>
                    </div>
                    <div className="pt-4 mb-4 mb-lg-3 pb-lg-4">
                        <Row className="g-4">
                            <div className="col-auto">
                                <div className="avatar-lg">
                                    <img src={aUser.passport === null || aUser.passport === undefined || aUser.passport === '[NULL]' ? avatar1 : aUser.passport} alt="user-img"
                                        className="img-thumbnail rounded-circle" />
                                </div>
                            </div>

                            <Col>
                                <div className="p-2">
                                    <h3 className="text-white mb-1">{aUser.firstName} {aUser.surname}</h3>
                                    <p className="text-white-75">Owner & Founder</p>
                                    <div className="hstack text-white-50 gap-1">
                                        <div className="me-2"><i
                                            className="ri-map-pin-user-line me-1 text-white-75 fs-16 align-middle"></i>{aUser.city}
                                            {aUser.nationality}</div>
                                        <div><i
                                            className="ri-building-line me-1 text-white-75 fs-16 align-middle"></i>{aUser.addressOrigin}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <Row>
                        <Col lg={12}>
                            <div>
                                <div className="d-flex">
                                    <Nav pills className="animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1"
                                        role="tablist">
                                        <NavItem>
                                            <NavLink
                                                href="#dashboard"
                                                className={classnames({ active: activeTab === '1' })}
                                                onClick={() => { toggleTab('1'); }}
                                            >
                                                <i className="ri-airplay-fill d-inline-block d-md-none"></i> <span
                                                    className="d-none d-md-inline-block">Dashboard</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#payments"
                                                className={classnames({ active: activeTab === '2' })}
                                                onClick={() => { toggleTab('2'); }}
                                            >
                                                <i className="ri-list-unordered d-inline-block d-md-none"></i> <span
                                                    className="d-none d-md-inline-block">Payments</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#documents"
                                                className={classnames({ active: activeTab === '3' })}
                                                onClick={() => { toggleTab('3'); }}
                                            >
                                                <i className="ri-price-tag-line d-inline-block d-md-none"></i> <span
                                                    className="d-none d-md-inline-block">Documents</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#update-logs"
                                                className={classnames({ active: activeTab === '4' })}
                                                onClick={() => { toggleTab('4'); }}
                                            >
                                                <i className="ri-folder-4-line d-inline-block d-md-none"></i> <span
                                                    className="d-none d-md-inline-block">Update log</span>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                href="#messages"
                                                className={classnames({ active: activeTab === '5' })}
                                                onClick={() => { toggleTab('5'); }}
                                            >
                                                <i className="ri-folder-4-line d-inline-block d-md-none"></i> <span
                                                    className="d-none d-md-inline-block">Messages</span>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <div className="flex-shrink-0">
                                        <Link to={`dashboard-profile/edit/${idx}`} className="btn btn-success"><i
                                            className="ri-edit-box-line align-bottom"></i> Edit Profile</Link>
                                    </div>
                                </div>

                                <TabContent activeTab={activeTab} className="pt-4">
                                    <TabPane tabId="1">
                                        <Row>
                                            <Col xxl={3}>

                                                <Card>
                                                    <CardBody>
                                                        <h5 className="card-title mb-3">Info</h5>
                                                        <div className="table-responsive">
                                                            <Table className="table-borderless mb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Full Name :</th>
                                                                        <td className="text-muted">{aUser.firstName} {aUser.surname}</td>

                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Mobile :</th>
                                                                        <td className="text-muted">{aUser.phone}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">E-mail :</th>
                                                                        <td className="text-muted">{aUser.email}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Location :</th>
                                                                        <td className="text-muted">{aUser.city}{aUser.addressOrigin}
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th className="ps-0" scope="row">Joining Date</th>
                                                                        <td className="text-muted">24 Nov 2021</td>
                                                                    </tr>
                                                                </tbody>
                                                            </Table>
                                                        </div>
                                                    </CardBody>
                                                </Card>

                                            </Col>
                                            <Col xxl={9}>
                                                <Row>
                                                    <Col lg={12} >

                                                        {/* optometrist section */}

                                                        <div ref={optometristRef} style={{ display: '' }}>
                                                            <div className="card bg-primary">
                                                                <div className="card-body p-0">
                                                                    <div className="alert alert-danger rounded-top alert-solid alert-label-icon border-0 rounded-0 m-0 d-flex align-items-center" role="alert">
                                                                        <i className="ri-error-warning-line label-icon"></i>
                                                                        <div className="flex-grow-1 text-truncate">
                                                                            {/* Your Subscription expires in <b>315</b> days. */}
                                                                        </div>
                                                                        <div className="flex-shrink-0">
                                                                            <a href={`/optometrist-dashboard#${optometristTraining === null ? `internship` : 'optometrist'}`} className="text-reset text-decoration-underline" onClick={() => showInternshipOptometrist()}><b>New {optometristTraining === null ? 'Internship' : 'Full'} Registration</b></a>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row align-items-center">
                                                                        <div className="col-sm-8">
                                                                            <div className="p-3">
                                                                                <p className="fs-16 lh-base text-white">Welcome!<span className="fw-semibold"> {aUser.firstName}</span> {aUser.surname}</p>

                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-4">
                                                                            <p className="fs-16 lh-base text-white"> {optometristTraining === null || optometristTraining?.isApprovedByAdmin === false ? '' : optometrist_countdown === 'Expired' ? 'You can now register for full registration' : <>full registration {optometrist_countdown}</>} </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Optometrist
                                                                optometrists={optometrists}
                                                                optometristTraining={optometristTraining}
                                                                showEditOptometrist={showEditOptometrist}
                                                                idx={idx}
                                                                user={aUser}
                                                                setOptometrists={setOptometrists}
                                                                color_one_optometrist={color_one_optometrist}
                                                                setColor_one_optometrist={setColor_one_optometrist}
                                                                color_two_optometrist={color_two_optometrist}
                                                                setColor_two_optometrist={setColor_two_optometrist}
                                                            />

                                                        </div>
                                                        <div ref={optimRefTwo} style={{ display: 'none' }}>
                                                            <TabOptometrist
                                                                optometrists={optometrists}
                                                                existPageOptometrist={existPageOptometrist}
                                                                idx={idx}
                                                                oneOptometrist={oneOptometrist}
                                                                optometristTraining={optometristTraining}
                                                                id_meansOpto={id_meansOpto}
                                                                setId_meansOpto={setId_meansOpto}
                                                                id_noOpto={id_noOpto}
                                                                setId_noOpto={setId_noOpto}
                                                                user={aUser}
                                                                user_date_of_orientation_optometrist={user_date_of_orientation_optometrist}
                                                                setUser_date_of_orientation_optometrist={setUser_date_of_orientation_optometrist}
                                                                user_school_optometrist={user_school_optometrist}
                                                                setUser_school_optometrist={setUser_school_optometrist}
                                                                academic_formOptometrist={academic_formOptometrist}
                                                                setAcademic_formOptometrist={setAcademic_formOptometrist}
                                                                post_graduateOptometrist={post_graduateOptometrist}
                                                                setPost_graduateOptometrist={setPost_graduateOptometrist}
                                                                referenceOptometrist={referenceOptometrist}
                                                                setReferenceOptometrist={setReferenceOptometrist}

                                                                supervisor_first_name={supervisor_first_name_optometrist}
                                                                setSupervisor_first_name={setSupervisor_first_name_optometrist}
                                                                supervisor_middle_name={supervisor_middle_name_optometrist}
                                                                setSupervisor_middle_name={setSupervisor_middle_name_optometrist}
                                                                supervisor_last_name={supervisor_last_name_optometrist}
                                                                setSupervisor_last_name={setSupervisor_last_name_optometrist}
                                                                supervisor_email={supervisor_email_optometrist}
                                                                setSupervisor_email={setSupervisor_email_optometrist}
                                                                supervisor_board_no={supervisor_board_no_optometrist}
                                                                setSupervisor_board_no={setSupervisor_board_no_optometrist}
                                                                supervisor_date_of_resumption={supervisor_date_of_resumption_optometrist}
                                                                setSupervisor_date_of_resumption={setSupervisor_date_of_resumption_optometrist}
                                                                supervisor_phone={supervisor_phone_optometrist}
                                                                setSupervisor_phone={setSupervisor_phone_optometrist}

                                                                hospital_name={hospital_name_optometrist}
                                                                setHospital_name={setHospital_name_optometrist}
                                                                hospital_address={hospital_address_optometrist}
                                                                setHospital_address={setHospital_address_optometrist}
                                                                hospital_email={hospital_email_optometrist}
                                                                setHospital_email={setHospital_email_optometrist}
                                                                hospital_phone={hospital_phone_optometrist}
                                                                setHospital_phone={setHospital_phone_optometrist}

                                                            />
                                                        </div>
                                                        {/*End of optometrist section */}
                                                    </Col>

                                                </Row>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <ListTables
                                            user={aUser?.id}
                                        />
                                    </TabPane>

                                    <TabPane tabId="3">
                                        <Card>
                                            <CardBody>
                                                <div className="d-flex align-items-center mb-4">
                                                    <h5 className="card-title flex-grow-1 mb-0">Documents</h5>
                                                    <div className="flex-shrink-0">
                                                    </div>
                                                </div>
                                                <Row>
                                                    <Col lg={12}>
                                                        <div className="table-responsive">
                                                            <Table className="table-borderless align-middle mb-0">
                                                                <thead className="table-light">
                                                                    <tr>
                                                                        <th scope="col">File Name</th>
                                                                        <th scope="col">Upload Date</th>
                                                                        <th scope="col">Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {(internshipDocuments || []).map((item, key) => (
                                                                        <tr key={key}>
                                                                            <td>
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="avatar-sm">
                                                                                        <div
                                                                                            className={`avatar-title bg-soft-danger text-danger rounded fs-20`}>
                                                                                            <i className='ri-file-pdf-fill'></i>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="ms-3 flex-grow-1">
                                                                                        <h6 className="fs-15 mb-0"><Link to="#">{item.name}</Link>
                                                                                        </h6>
                                                                                    </div>
                                                                                </div>
                                                                            </td>

                                                                            <td>{new Date(item.createdAt).toDateString()}</td>
                                                                            <td>
                                                                                <UncontrolledDropdown direction='start'>
                                                                                    <DropdownToggle tag="a" className="btn btn-light btn-icon" id="dropdownMenuLink15" role="button">
                                                                                        <i className="ri-equalizer-fill"></i>
                                                                                    </DropdownToggle>
                                                                                    <DropdownMenu>
                                                                                        <DropdownItem onClick={() => downLoadFIle(item.file)}><i className="ri-eye-fill me-2 align-middle text-muted" />View</DropdownItem>
                                                                                        <DropdownItem divider />
                                                                                        <DropdownItem onClick={() => downLoadFIle(item.file)}><i className="ri-download-2-fill me-2 align-middle text-muted" />Download</DropdownItem>
                                                                                    </DropdownMenu>
                                                                                </UncontrolledDropdown>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                            <p>{`Available result ${internshipDocuments.length}`}</p>
                                                        </div>
                                                        {/* <div className="text-center mt-3">
                                                            <Link to="#" className="text-success "><i
                                                                className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>
                                                                Load more </Link>
                                                        </div> */}
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </TabPane>

                                    <TabPane tabId="4">
                                    </TabPane>
                                    <TabPane tabId="5">
                                        <Comment user={aUser} />
                                    </TabPane>
                                </TabContent>
                            </div>
                        </Col>
                    </Row>

                </Container>
            </div>
        </React.Fragment>
    );
};

export default SimplePage;