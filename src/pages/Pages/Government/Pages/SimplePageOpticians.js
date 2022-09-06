import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, CardBody, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Nav, NavItem, NavLink, Row, TabContent, Table, TabPane, UncontrolledDropdown } from 'reactstrap';
import classnames from 'classnames';
import SwiperCore, { Autoplay } from "swiper";
import MetaTags from 'react-meta-tags';
import { USER_COOKIE } from '../../../../services/constants';
import SSRStorage from '../../../../services/storage';
import { Store } from '../../../../services/store';
import Comment from '../EmailInbox';

//Images
import profileBg from '../../../../assets/images/profile-bg.jpg';
import avatar1 from '../../../../assets/images/users/avatar-1.jpg';
import { request } from '../../../../services/utilities';
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
import ListTables from '../ListTables';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Optician from '../Views/Optician';
import TabOptician from '../RegForm/TabOptician';
const MySwal = withReactContent(Swal);

const SimplePage = () => {
    const store = useContext(Store);
    let [read_only_optician, setRead_only_optician] = store.read_only_optician;
    let [read_only_opticianIntern, setRead_only_opticianIntern] = store.read_only_opticianIntern;
    let [optician_approval, setOptician_approval] = store.optician_approval
    let [optometrist_approval, setOptometrist_approval] = store.optometrist_approval;
    let [optician_btn_save, setOptician_btn_save] = store.optician_btn_save;
    let [optician_btn_update, setOptician_btn_update] = store.optician_btn_update;


    const [loading, setLoading] = useState(false);
    const [idx, setIdx] = useState(null);
    const [oneOptician, setOneOptician] = useState(null);
    const [trainingDocuments, setTrainingDocuments] = useState([])
    const [error, setError] = useState('');
    const [aUser, setAUser] = useState([]);

    const [lga, setLga] = useState([]);
    const [state, setState] = useState([]);

    const [opticians, setOpticians] = useState(null);
    const [opticianTraining, setOpticianTraining] = useState(null);
    const [selected_state, setSelected_state] = useState('');
    const [selected_lga, setSelected_lga] = useState('');
    const history = useHistory();
    // opticians state
    const [id_no, setId_no] = useState('');
    const [id_means, setId_means] = useState('');
    const [academic_formOptician, setAcademic_formOptician] = store.academic_formOptician;
    const [post_graduateOptician, setPost_graduateOptician] = store.post_graduateOptician;
    const [referenceOptician, setReferenceOptician] = store.referenceOptician;
    const [color_one_optician, setColor_one_optician] = useState('text-success');
    const [color_two_optician, setColor_two_optician] = useState('');


    // internship  section
    const [supervisor_phone, setSupervisor_phone] = useState('');
    const [supervisor_date_of_resumption, setSupervisor_date_of_resumption] = useState('');
    const [supervisor_board_no, setSupervisor_board_no] = useState('');
    const [supervisor_email, setSupervisor_email] = useState('');
    const [supervisor_middle_name, setSupervisor_middle_name] = useState('');
    const [supervisor_first_name, setSupervisor_first_name] = useState(' ');
    const [supervisor_last_name, setSupervisor_last_name] = useState('');

    const [hospital_email, setHospital_email] = useState('');
    const [hospital_name, setHospital_name] = useState(' ');
    const [hospital_address, setHospital_address] = useState('');
    const [hospital_phone, setHospital_phone] = useState('');


    const [user_school_optician, setUser_school_optician] = useState('');
    const [user_date_of_orientation_optician, setUser_date_of_orientation_optician] = useState('');
    // end of opticians


    const practiceRef = useRef();
    const optimRef = useRef();


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

    const showEditOptician = (i) => {
        let item = opticians;
        setOneOptician(item);
        setOptician_approval(item.status);
        practiceRef.current.style.display = 'none';
        optimRef.current.style.display = 'block';
        if (item.dateOfOrientation) {
            setOptician_btn_update(true);
            setOptician_btn_save(false);
            setUser_date_of_orientation_optician(item.dateOfOrientation);
            setUser_school_optician(item.schoolAttended);

            setSupervisor_first_name(item.supervisors[0].firstName);
            setSupervisor_middle_name(item.supervisors[0].otherNames);
            setSupervisor_last_name(item.supervisors[0].surname);

            setSupervisor_email(item.supervisors[0].email);
            setSupervisor_phone(item.supervisors[0].phone);
            setSupervisor_board_no(item.supervisors[0].boardNumber);
            setSupervisor_date_of_resumption(item.supervisors[0].dateOfResumption)

            setHospital_name(item.hospitals[0].name);
            setHospital_address(item.hospitals[0].address);
            setHospital_email(item.hospitals[0].email);
            setHospital_phone(item.hospitals[0].phone);

            setId_no('');
            setId_means('');
            setAcademic_formOptician([])
            setPost_graduateOptician([])
            setReferenceOptician([]);
            if (item.status === 'Pending') {
                setRead_only_opticianIntern(true);
            } else {
                setRead_only_opticianIntern(false);
            }
        }
        else {
            setOptician_btn_save(true);
            setOptician_btn_update(false);
            setId_no(item.identificationNumber);
            setId_means(item.meansOfIdentification);
            setAcademic_formOptician(item.academics)
            setPost_graduateOptician(item.certifications)
            setReferenceOptician(item.referees);



            setSupervisor_first_name('');
            setSupervisor_middle_name('');
            setSupervisor_last_name('');
            setSupervisor_email('');
            setSupervisor_phone('');
            setSupervisor_board_no('');

            setHospital_name('');
            setHospital_address('');
            setHospital_email('');
            setHospital_phone('');

            if (item.status !== 'Continue') {
                setRead_only_optician(true);
            } else {
                setRead_only_optician(false);
            }
        }
    }

    const showInternshipOptician = () => {
        setOptician_approval(' ');
        setRead_only_optician(false);
        setOneOptician(null);
        setId_means('');
        setId_no('');
        setAcademic_formOptician([])
        setPost_graduateOptician([])
        setReferenceOptician([]);

        setSupervisor_first_name('');
        setSupervisor_middle_name('');
        setSupervisor_last_name('');
        setSupervisor_email('');
        setSupervisor_phone('');
        setSupervisor_board_no('');

        setHospital_name('');
        setHospital_address('');
        setHospital_email('');
        setHospital_phone('');
        practiceRef.current.style.display = 'none';
        optimRef.current.style.display = 'block';

    }

    const existPageOptician = () => {
        setOptician_approval(' ');
        setRead_only_optician(false);
        setOneOptician(null);
        setId_means('');
        setId_no('')
        fetchUser();
        setAcademic_formOptician([]);
        setPost_graduateOptician([]);
        setReferenceOptician([]);

        setSupervisor_first_name('');
        setSupervisor_middle_name('');
        setSupervisor_last_name('');
        setSupervisor_email('');
        setSupervisor_phone('');
        setSupervisor_board_no('');

        setHospital_name('');
        setHospital_address('');
        setHospital_email('');
        setHospital_phone('');

        optimRef.current.style.display = 'none';
        practiceRef.current.style.display = 'block';
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
        if (user.type !== 'optician') {
            return history.push(`/${user.type}-dashboard`)
        }
        await setIdx(user.id);
        try {
            setLoading(true);
            const url = `users/${user.id}`;
            const rs = await request(url, 'GET', true);
            // console.log(rs);
            setAUser(rs.data);
            const urf = `documents/user/${user.id}`;
            const fls = await request(urf, 'GET', true);
            setOpticianTraining(rs.data.training);
            setOpticians(rs.data.training);
            setTrainingDocuments(fls.data.documents);
            setColor_one_optician('');
            setColor_two_optician('text-success');

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
                                    <h3 className="text-white mb-1 text-capitalize">{aUser.firstName} {aUser.surname}</h3>
                                    <p className="text-white-75">Owner & Founder</p>
                                    <div className="hstack text-white-50 gap-1">
                                        <div className="me-2"><i
                                            className="ri-map-pin-user-line me-1 text-white-75 fs-16 align-middle text-capitalize "></i>{aUser.city}
                                            {aUser.nationality}</div>
                                        <div><i
                                            className="ri-building-line me-1 text-white-75 fs-16 align-middle  text-capitalize"></i>{aUser.addressOrigin}
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
                                                                        <td className="text-muted text-capitalize">{aUser.firstName} {aUser.surname}</td>

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

                                                        {/* optician section */}
                                                        <div ref={practiceRef} style={{ display: '' }}>
                                                            <div className="card bg-primary">
                                                                <div className="card-body p-0">
                                                                    <div className="alert alert-danger rounded-top alert-solid alert-label-icon border-0 rounded-0 m-0 d-flex align-items-center" role="alert">
                                                                        <i className="ri-error-warning-line label-icon"></i>
                                                                        <div className="flex-grow-1 text-truncate">
                                                                            {/* Your Subscription expires in <b>315</b> days. */}
                                                                        </div>
                                                                        <div className="flex-shrink-0">
                                                                            <a href="#" className="text-reset text-decoration-underline" onClick={() => showInternshipOptician()}><b>New Training Registration</b></a>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row align-items-end">
                                                                        <div className="col-sm-8">
                                                                            <div className="p-3">
                                                                                <p className="fs-16 lh-base text-white">Welcome!<span className="fw-semibold text-capitalize"> {aUser.firstName}</span> {aUser.surname}</p>

                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-4">

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <Optician
                                                                opticians={opticians}
                                                                showEditOptician={showEditOptician}
                                                                idx={idx}
                                                                user={aUser}
                                                                setOpticians={setOpticians}
                                                                color_one_optician={color_one_optician}
                                                                setColor_one_optician={setColor_one_optician}
                                                                color_two_optician={color_two_optician}
                                                                setColor_two_optician={setColor_two_optician}

                                                            />

                                                        </div>
                                                        <div className='' ref={optimRef} style={{ display: 'none' }}>
                                                            <TabOptician
                                                                opticians={opticians}
                                                                existPageOptician={existPageOptician}
                                                                opticianTraining={opticianTraining}
                                                                oneOptician={oneOptician}
                                                                id_means={id_means}
                                                                setId_means={setId_means}
                                                                id_no={id_no}
                                                                setId_no={setId_no}
                                                                academic_formOptician={academic_formOptician}
                                                                setAcademic_formOptician={setAcademic_formOptician}
                                                                post_graduateOptician={post_graduateOptician}
                                                                setPost_graduateOptician={setPost_graduateOptician}
                                                                referenceOptician={referenceOptician}
                                                                setReferenceOptician={setReferenceOptician}
                                                                user={aUser}
                                                                user_date_of_orientation_optician={user_date_of_orientation_optician}
                                                                setUser_date_of_orientation_optician={setUser_date_of_orientation_optician}
                                                                user_school_optician={user_school_optician}
                                                                setUser_school_optician={setUser_school_optician}

                                                                supervisor_first_name={supervisor_first_name}
                                                                setSupervisor_first_name={setSupervisor_first_name}
                                                                supervisor_middle_name={supervisor_middle_name}
                                                                setSupervisor_middle_name={setSupervisor_middle_name}
                                                                supervisor_last_name={supervisor_last_name}
                                                                setSupervisor_last_name={setSupervisor_last_name}
                                                                supervisor_email={supervisor_email}
                                                                setSupervisor_email={setSupervisor_email}
                                                                supervisor_board_no={supervisor_board_no}
                                                                setSupervisor_board_no={setSupervisor_board_no}
                                                                supervisor_date_of_resumption={supervisor_date_of_resumption}
                                                                setSupervisor_date_of_resumption={setSupervisor_date_of_resumption}
                                                                supervisor_phone={supervisor_phone}
                                                                setSupervisor_phone={setSupervisor_phone}

                                                                hospital_name={hospital_name}
                                                                setHospital_name={setHospital_name}
                                                                hospital_address={hospital_address}
                                                                setHospital_address={setHospital_address}
                                                                hospital_email={hospital_email}
                                                                setHospital_email={setHospital_email}
                                                                hospital_phone={hospital_phone}
                                                                setHospital_phone={setHospital_phone}

                                                            />
                                                        </div>
                                                        {/* End of opticians section */}
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
                                                                    {(trainingDocuments || []).map((item, key) => (
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
                                                            <p>{`Available result ${trainingDocuments.length}`}</p>
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
                                        <Comment
                                            user={aUser}
                                        />
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