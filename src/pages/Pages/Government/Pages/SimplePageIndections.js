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
import PracticeReg from '../RegForm/PracticeRegIndection';
import { request } from '../../../../services/utilities';
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
import ListTables from '../ListTables';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Indexing from '..//Views/Indection';
import Comment from '../EmailInbox';

const MySwal = withReactContent(Swal);

const SimplePageIndections = () => {
    const store = useContext(Store);
    let [indexing_approval, setIndexing_approval] = store.indexing_approval;
    let [read_only_indexing, setRead_only_indexing] = store.read_only_indexing;
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [idx, setIdx] = useState(null);
    const [practices, setPractices] = useState(null);

    const [practice, setPractice] = useState(null);
    const [error, setError] = useState('');
    const [aUser, setAUser] = useState([]);

    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [address, setAddress] = useState('');
    const [lga, setLga] = useState([]);
    const [state, setState] = useState([]);
    const [dateCommenced, setDateCommenced] = useState();
    const [nameOfRegPractitionerInCharge, setNameOfRegPractitionerInCharge] = useState('')
    const [optometricRegNum, setOptometricRegNum] = useState('');
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('');
    const [isAttachedToGHP, setIsAttachedToGHP] = useState(null);
    const [qualificationOfPractitionerInCharge, setQualificationOfPractitionerInCharge] = useState(false);


    const [cacRegNum, setCacRegNum] = useState('');
    const [director, setDirector] = useState([]);
    const [facility, setFacilty] = useState([]);
    const [indexingDocuments, setIndexingDocuments] = useState([]);

    const [opticians, setOpticians] = useState([]);
    const [optometrists, setOptometrists] = useState([]);
    const [optometristTraining, setOptometristTraining] = useState([]);
    const [selected_state, setSelected_state] = useState('');
    const [selected_lga, setSelected_lga] = useState('');


    const intenshipRef = useRef();
    const facilityRef = useRef();


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


    const showEditFacility = (i) => {
        let item = practices;
        // console.log(item);
        setIndexing_approval(item.status);
        setPractice(item);
        setName(item.sponsorName);
        setAddress(item.institutionAdress);
        setDateCommenced(item.dateAdmitted);
        setNameOfRegPractitionerInCharge(item.nokName);
        setOptometricRegNum(item.nokAddress);
        setEmail(item.institutionCode);
        setPhone(item.matricNum);
        // setIsAttachedToGHP(item.isAttachedToGMP);
        setCacRegNum(item.sponsorAddress);

        if (item.status !== 'Continue') {
            setRead_only_indexing(true);
        } else {
            setRead_only_indexing(false);

        }
        facilityRef.current.style.display = 'none';
        intenshipRef.current.style.display = 'block';
    }

    const showFacility = () => {
        setIndexing_approval(' ');
        setPractice(null);
        setRead_only_indexing(false);
        setName('');
        setAddress('');
        setType('');
        setDateCommenced(null);
        setNameOfRegPractitionerInCharge('');
        setOptometricRegNum('');
        setEmail('');
        setPhone('');
        setIsAttachedToGHP(false);
        setQualificationOfPractitionerInCharge('');
        setCacRegNum('');
        setDirector([]);
        setFacilty([]);
        setSelected_lga('');
        setSelected_state('');
        facilityRef.current.style.display = 'none';
        intenshipRef.current.style.display = 'block';
    }
    const existPage = () => {
        setIndexing_approval(' ');
        setPractice(null);
        setRead_only_indexing(false);
        fetchUser();
        setName('');
        setAddress('');
        setType('');
        setDateCommenced(null);
        setNameOfRegPractitionerInCharge('');
        setOptometricRegNum('');
        setEmail('');
        setPhone('');
        setIsAttachedToGHP(false);
        setQualificationOfPractitionerInCharge(' ');
        setCacRegNum(' ');
        setDirector([]);
        setFacilty([]);
        setSelected_lga(' ');
        setSelected_state(' ');
        intenshipRef.current.style.display = 'none';
        facilityRef.current.style.display = 'block';
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
        if (user.type !== 'indexing') {
            return history.push(`/${user.type}-dashboard`)
        }
        await setIdx(user.id);
        try {
            setLoading(true);
            const url = `users/${user.id}`;
            const rs = await request(url, 'GET', true);
            setAUser(rs.data);
            // console.log(rs);
            setPractices(rs.data.indexing);

            if (rs.data.indexing !== null) {
                const urf = `indexings/${rs.data.indexing.id}`;
                const fls = await request(urf, 'GET', true);
                setIndexingDocuments(fls.data.documents);
            }
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

                                                <div className="col-xl-12" ref={facilityRef} style={{ display: '' }}>
                                                    <div className="card bg-primary">
                                                        <div className="card-body p-0">
                                                            <div className="alert alert-danger rounded-top alert-solid alert-label-icon border-0 rounded-0 m-0 d-flex align-items-center" role="alert">
                                                                <i className="ri-error-warning-line label-icon"></i>
                                                                <div className="flex-grow-1 text-truncate">
                                                                    {/* Your Subscription expires in <b>315</b> days. */}
                                                                </div>
                                                                <div className="flex-shrink-0">
                                                                    <Link className="text-reset text-decoration-underline" onClick={() => showFacility()}><b>New Indexing</b></Link>
                                                                </div>
                                                            </div>

                                                            <div className="row align-items-end">
                                                                <div className="col-sm-8">
                                                                    <div className="p-3">
                                                                        <p className="fs-16 lh-base text-white">Welcome!<span className="fw-semibold"> {aUser.firstName}</span> {aUser.surname}</p>

                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-4">

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Indexing
                                                        practices={practices}
                                                        error={error}
                                                        showEditFacility={showEditFacility}
                                                        idx={idx}
                                                        user={aUser}

                                                    />

                                                </div>
                                                <Row>
                                                    <Col lg={12} >
                                                        <div className="col-xl-12" ref={intenshipRef} style={{ display: 'none' }}>

                                                            <PracticeReg
                                                                existPage={existPage}
                                                                practice={practice}
                                                                idx={idx}
                                                                name={name}
                                                                setName={setName}
                                                                type={type}
                                                                setType={setType}
                                                                address={address}
                                                                setAddress={setAddress}
                                                                lga={lga}
                                                                setLga={setLga}
                                                                state={state}
                                                                setState={setState}
                                                                dateCommenced={dateCommenced}
                                                                setDateCommenced={setDateCommenced}
                                                                nameOfRegPractitionerInCharge={nameOfRegPractitionerInCharge}
                                                                setNameOfRegPractitionerInCharge={setNameOfRegPractitionerInCharge}
                                                                optometricRegNum={optometricRegNum}
                                                                setOptometricRegNum={setOptometricRegNum}
                                                                email={email}
                                                                setEmail={setEmail}
                                                                phone={phone}
                                                                setPhone={setPhone}
                                                                isAttachedToGHP={isAttachedToGHP}
                                                                setIsAttachedToGHP={setIsAttachedToGHP}
                                                                qualificationOfPractitionerInCharge={qualificationOfPractitionerInCharge}
                                                                cacRegNum={cacRegNum}
                                                                setCacRegNum={setCacRegNum}
                                                                director={director}
                                                                setDirector={setDirector}
                                                                facility={facility}
                                                                setFacilty={setFacilty}
                                                                selected_state={selected_state}
                                                                setSelected_state={setSelected_state}
                                                                selected_lga={selected_lga}
                                                                setSelected_lga={setSelected_lga}
                                                                user={aUser}
                                                            />
                                                        </div>

                                                        {/* end of facilities section */}
                                                    </Col>

                                                </Row>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <ListTables user={aUser?.id}
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
                                                                    {(indexingDocuments || []).map((item, key) => (

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
                                    <TabPane tabId='5'>
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

export default SimplePageIndections;