import React, { useEffect, useState, useContext, useCallback, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import classnames from "classnames";
import { Store } from '../../../../services/store';
import SSRStorage from '../../../../services/storage';
import { USER_COOKIE } from '../../../../services/constants';
import { request } from '../../../../services/utilities';
import Flatpickr from "react-flatpickr";


import {
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    Input,
    Label,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
    ListGroup, ListGroupItem, Button
} from "reactstrap";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
import { useDropzone } from 'react-dropzone';
import { FileText, X, DownloadCloud } from 'react-feather';
const MySwal = withReactContent(Swal)


function WizardOptician(props) {

    const store = useContext(Store);
    let [read_only_opticianIntern, setRead_only_opticianIntern] = store.read_only_opticianIntern;

    let [optician_approval, setOptician_approval] = store.optician_approval;
    let [optician_btn_update, setOptician_btn_update] = store.optician_btn_update;
    const [loading, setLoading] = useState(false);
    const [activeArrowTab, setactiveArrowTab] = useState(4);
    const [passedarrowSteps, setPassedarrowSteps] = useState([1]);
    const [supervisor, setSupervisor] = useState([]);
    const [hospital, setHospital] = useState([]);
    const history = useHistory();
    const [files, setFiles] = useState([]);
    const [imgSix, setImgSix] = useState('');
    const [, setDocArr] = useState([]);
    const docArr = [];
    const [allFiles, setAllFiles] = useState([]);

    const [first_name, setFirst_name] = useState(props.user.firstName);
    const [middle_name, setMiddle_name] = useState(props.user.otherNames);
    const [last_name, setLast_name] = useState(props.user.surname);
    const [user_email, setUser_email] = useState(props.user.email);
    const [user_phone, setUser_phone] = useState(props.user.phone);
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(' ');

    const handleSuccess = () => {
        return MySwal.fire({
            title: 'Good job!',
            text: 'Posting Registration Form Submitted!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        })
    }
    const handleError = () => {
        return MySwal.fire({
            title: 'Opps!',
            text: ' Something went wrong!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })
    }
    const warningError = () => {
        return MySwal.fire({
            title: 'Warning!',
            text: ' Please fill the forms!',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000
        })
    }
    const handleErrorEmail = () => {
        return MySwal.fire({
            title: 'Opps!',
            text: 'User Already Enrolled In Another Program Different Kindly Register Again With Another Email!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2800
        })
    }
    function toggleArrowTab(tab) {
        if (activeArrowTab !== tab) {
            var modifiedSteps = [...passedarrowSteps, tab];

            if (tab >= 4 && tab <= 8) {
                setactiveArrowTab(tab);
                setPassedarrowSteps(modifiedSteps);
            }
        }
    }

    const addSupervisor = () => {
        const data = {
            firstName: props.supervisor_first_name, otherNames: props.supervisor_middle_name, surname: props.supervisor_last_name,
            dateOfResumption: props.supervisor_date_of_resumption, email: props.supervisor_email,
            phone: props.supervisor_phone, boardNumber: props.supervisor_board_no
        }
        let x = new Array(data);
        setSupervisor(x);
        // console.log(supervisor);
    }

    const addHospital = () => {
        const data = {
            name: props.hospital_name, address: props.hospital_address, email: props.hospital_email, phone: props.hospital_phone
        }
        let x = new Array(data);
        setHospital(x);
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: acceptedFiles => {
            documents.push(...acceptedFiles.map(file => Object.assign(file)));
            setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))]);
        }
    });

    const renderFilePreview = file => {
        if (file.type.startsWith('image')) {
            return <img className='rounded' id='img_upload' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
        } else {
            return <FileText size='28' />
        }
    }

    const handleRemoveFile = async file => {
        if (window.confirm('are you sure')) {
            if (!file.id) {
                const filteredF = files.filter(i => i.name !== file.name)
                const filteredD = documents.filter(i => i.name !== file.name)
                setFiles([...filteredF]);
                setDocuments([...filteredD]);
            } else {
                try {
                    setLoading(true);
                    const filteredD = documents.filter(i => i.name !== file.name);
                    const url = `documents/delete/${file.id}`;
                    const rs = await request(url, 'DELETE', true);
                    if (rs.success === true) {
                        setDocuments([...filteredD]);
                    }
                    setLoading(false);
                } catch (err) {
                    setLoading(false);
                    console.log(err);
                }

            }

        }
    }

    const renderFileSize = size => {
        if (Math.round(size / 100) / 10 > 1000) {
            return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
        } else {
            return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
        }
    }

    const fileList = files.map((file, index) => (
        <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
            <div className='file-details d-flex align-items-center'>
                <div className='file-preview me-1'>{renderFilePreview(file)}</div>
                <div>
                    <p className='file-name mb-0'>{file.name}</p>
                    <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
                </div>
            </div>
            <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
                <X size={14} />
            </Button>
        </ListGroupItem>
    ))

    const handleRemoveAllFiles = () => {
        setFiles([])
    }
    const DocumentList = documents.map((file, index) => (
        <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
            <div className='file-details d-flex align-items-center'>
                <div className='file-preview me-1'> <FileText size='28' /></div>
                <div>
                    <p className='file-name mb-0'>{file.name}</p>
                    {/* <p className='file-size mb-0'>{renderFileSize(file.size)}</p> */}
                </div>
            </div>
            <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
                <X size={14} />
            </Button>
        </ListGroupItem>
    ));
    const uploadedFiles = () => {
        setLoading(true);
        let count = 0;
        const filteredD = documents.filter(i => !i.id)
        const files_ = documents.length > 1 ? filteredD : files;
        console.log(files_);
        const formData = new FormData();
        for (let i = 0; i < files_.length; i++) {
            let file = files_[i];
            formData.append("file", file);
            formData.append("upload_preset", "geekyimages");
            fetch(`https://api.cloudinary.com/v1_1/doxlmaiuh/image/upload`, {
                method: "POST",
                body: formData
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let dataFile = { name: data.original_filename, file: data.secure_url };
                    if (dataFile?.name !== null) {
                        allFiles.push(dataFile);
                    }
                    count++
                    console.log(count);
                    if (count === files_.length) {
                        setLoading(false);
                        return MySwal.fire({
                            title: 'Good job!',
                            text: 'Files Uploaded Successfully!',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }
                });

        }
    }

    const createInternship = async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);
        if (hospital === [] || supervisor === []) {
            return warningError();
        }
        if (props.hospital_name === '' || props.supervisor_first_name === '') {
            return warningError();
        }
        const data = {
            userId: user.id, schoolAttended: props.user_school_optician, dateOfOrientation: props.user_date_of_orientation_optician, supervisors: supervisor, status: 'Pending',
            hospitals: hospital, documents: allFiles
        }
        // console.log(data);
        try {
            setLoading(true)
            const url = `trainings/create?senderid=${user.id}`;
            const rs = await request(url, 'POST', true, data);
            // console.log(rs);
            setError('Successful!');
            setLoading(false);
            history.push(`/optician-dashboard/training/${rs?.data?.id}`);
            // handleSuccess();
            // props.existPageOptician();

        } catch (err) {
            setLoading(false);
            if (err.message === 'user already enrolled for another program') {
                return handleErrorEmail();
            }
            if (err.message === 'you need approval to update records, kindly contact support') {
                return MySwal.fire({
                    title: 'Opps!',
                    text: 'You need approval to update records, kindly contact support!',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2800
                });
            }
            setError('Failed!');
            handleError();
            console.log(err);
        }
    }
    const createInternshipAndExit = async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);
        if (hospital === [] || supervisor === []) {
            return warningError();
        }
        if (props.hospital_name === '' || props.supervisor_first_name === '') {
            return warningError();
        }

        const data = {
            userId: user.id, schoolAttended: props.user_school_optician, dateOfOrientation: props.user_date_of_orientation_optician,
            supervisors: supervisor, hospitals: hospital, status: 'Continue', documents: allFiles
        }
        // console.log(data);
        try {
            setLoading(true);
            const url = `trainings/create?senderid=${user?.id}`;
            const rs = await request(url, 'POST', true, data);
            setError('Successful!');
            setLoading(false);
            history.push(`optician-dashboard/training/${rs?.data?.id}`);
            // handleSuccess();
            // props.existPageOptician();
        } catch (err) {
            setLoading(false);
            if (err.message === 'user already enrolled for another program') {
                return handleErrorEmail();
            }
            if (err.message === 'you need approval to update records, kindly contact support') {
                return MySwal.fire({
                    title: 'Opps!',
                    text: 'You need approval to update records, kindly contact support!',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2800
                });
            }
            setError('Failed!');
            handleError();
            console.log(err);
        }

    }
    const updateInternship = async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);

        if (props.hospital_name === '' || props.supervisor_first_name === '') {
            return warningError();
        }
        const data = {
            userId: user.id, schoolAttended: props.user_school_optician, dateOfOrientation: props.user_date_of_orientation_optician, supervisors: supervisor, status: 'Pending',
            hospitals: hospital
        }

        const dataHos = {
            name: props.hospital_name, address: props.hospital_address, email: props.hospital_email, phone: props.hospital_phone
        }
        const dataSup = {
            firstName: props.supervisor_first_name, otherNames: props.supervisor_middle_name, surname: props.supervisor_last_name, dateOfResumption: props.supervisor_date_of_resumption, email: props.supervisor_email,
            phone: props.supervisor_phone, boardNumber: props.supervisor_board_no
        }
        const docu = { documents: allFiles };

        try {
            setLoading(true);
            const url_sup = `trainings/supervisor/${props.oneOptician.supervisors[0].id}?senderid=${user.id}`;
            const url_hos = `trainings/hospital/${props.oneOptician.hospitals[0].id}?senderid=${user.id}`;
            const url = `trainings/update/${props.oneOptician.id}?senderid=${user.id}`;

            const rsh = await request(url_hos, 'PATCH', true, dataHos);
            const rss = await request(url_sup, 'PATCH', true, dataSup);
            const rs = await request(url, 'PATCH', true, data);
            const fs = await request(`documents/upload?name=training&id=${props.oneOptician?.id}`, 'POST', true, docu);
            setError('Successful!');
            setFiles([]);
            setLoading(false);
            handleSuccess();
            props.existPageOptician();

        } catch (err) {
            setLoading(false);
            setError('Failed!');
            if (err.message === 'you need approval to update records, kindly contact support') {
                return MySwal.fire({
                    title: 'Opps!',
                    text: 'You need approval to update records, kindly contact support!',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2800
                });
            }
            handleError();
            console.log(err);
        }

    }
    const updateInternshipAndExit = async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);

        if (props.hospital_name === '' || props.supervisor_first_name === '') {
            return warningError();
        }
        const data = {
            userId: user.id, schoolAttended: props.user_school_optician, dateOfOrientation: props.user_date_of_orientation_optician, supervisors: supervisor, status: 'Continue',
            hospitals: hospital
        };
        const dataHos = {
            name: props.hospital_name, address: props.hospital_address, email: props.hospital_email, phone: props.hospital_phone
        }
        const dataSup = {
            firstName: props.supervisor_first_name, otherNames: props.supervisor_middle_name, surname: props.supervisor_last_name, dateOfResumption: props.supervisor_date_of_resumption, email: props.supervisor_email,
            phone: props.supervisor_phone, boardNumber: props.supervisor_board_no
        };
        const docu = { documents: allFiles };
        try {
            setLoading(true);
            const url_sup = `trainings/supervisor/${props.oneOptician.supervisors[0].id}?senderid=${user.id}`;
            const url_hos = `trainings/hospital/${props.oneOptician.hospitals[0].id}?senderid=${user.id}`;
            const url = `trainings/update/${props.oneOptician.id}?senderid=${user.id}`;

            const rsh = await request(url_hos, 'PATCH', true, dataHos);
            const rss = await request(url_sup, 'PATCH', true, dataSup);
            const rs = await request(url, 'PATCH', true, data);
            const fs = await request(`documents/upload?name=training&id=${props.oneOptician?.id}`, 'POST', true, docu);
            setError('Successful!');
            setFiles([]);
            setLoading(false);
            handleSuccess();
            props.existPageOptician();
        } catch (err) {
            setLoading(false);
            setError('Failed!');
            if (err.message === 'you need approval to update records, kindly contact support') {
                return MySwal.fire({
                    title: 'Opps!',
                    text: 'You need approval to update records, kindly contact support!',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2800
                });
            }
            handleError();
            console.log(err);
        }

    }

    const fetchUserDetails = useCallback(async () => {
        try {
            setLoading(true);
            const url = `trainings/${props.oneOptician?.id}`;
            const rs = await request(url, 'GET', true);
            setDocuments(rs.data.documents);

            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }, [props.oneOptician?.id, setDocuments])

    useEffect(() => {
        fetchUserDetails();
    }, [fetchUserDetails]);
    return (
        <>
            <Col xl={12}>
                <Card>
                    <CardHeader>
                        <h4 className="card-title mb-0">Supervised Ophthalmic Laboratory Experience Form</h4>
                    </CardHeader>
                    {loading === true ? <LoaderGrow /> : ''}
                    <CardBody className="form-steps">
                        <Form>
                            <div className="mb-4">
                                <Nav
                                    className="nav nav-tabs nav-tabs-custom nav-success nav-justified mb-3"
                                    role="tablist"
                                >
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            id="steparrow-gen-info-tab"
                                            className={classnames({
                                                active: activeArrowTab === 4,
                                                done: activeArrowTab <= 7 && activeArrowTab > 3,
                                            })}
                                            onClick={() => {
                                                toggleArrowTab(4);
                                            }}
                                        >
                                            Intern
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            id="steparrow-gen-info-tab"
                                            className={classnames({
                                                active: activeArrowTab === 5,
                                                done: activeArrowTab <= 7 && activeArrowTab > 4,
                                            })}
                                            onClick={() => {
                                                toggleArrowTab(5);
                                            }}
                                        >
                                            Supervisor
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            id="steparrow-gen-info-tab"
                                            className={classnames({
                                                active: activeArrowTab === 6,
                                                done: activeArrowTab <= 7 && activeArrowTab > 5,
                                            })}
                                            onClick={() => {
                                                toggleArrowTab(6);
                                            }}
                                        >
                                            Clinical/Hospital
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            href="#"
                                            id="steparrow-gen-info-tab"
                                            className={classnames({
                                                active: activeArrowTab === 7,
                                                done: activeArrowTab <= 7 && activeArrowTab > 6,
                                            })}
                                            onClick={() => {
                                                toggleArrowTab(7);
                                            }}
                                        >
                                            Upload Documents
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>

                            <TabContent activeTab={activeArrowTab}>
                                <TabPane id="steparrow-gen-info" tabId={4}>
                                    <div>
                                        <Row>
                                            <Col lg={4}>
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="steparrow-gen-info-email-input"
                                                    >
                                                        First Name
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="steparrow-gen-info-email-input"
                                                        // placeholder="Enter name"
                                                        value={props.user?.firstName}
                                                        readOnly
                                                        style={{ background: '#fff' }}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="steparrow-gen-info-username-input"
                                                    >
                                                        Middle Name
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="steparrow-gen-info-username-input"
                                                        // placeholder=" Enter name"
                                                        value={props.user?.otherNames}
                                                        readOnly
                                                        style={{ background: '#fff' }}

                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="steparrow-gen-info-email-input"
                                                    >
                                                        Surname
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="steparrow-gen-info-email-input"
                                                        // placeholder="Enter surname"
                                                        value={props.user?.surname}
                                                        readOnly
                                                        style={{ background: '#fff' }}

                                                    />
                                                </div>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col lg={6}>
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="steparrow-gen-info-email-input"
                                                    >
                                                        Email Address
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="steparrow-gen-info-email-input"
                                                        // placeholder="Enter email"
                                                        value={props.user?.email}
                                                        readOnly
                                                        style={{ background: '#fff' }}

                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="steparrow-gen-info-username-input"
                                                    >
                                                        Phone Number
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="steparrow-gen-info-username-input"
                                                        // placeholder=" Enter phone number"
                                                        value={props.user?.phone}
                                                        readOnly
                                                        style={{ background: '#fff' }}

                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="steparrow-gen-info-email-input"
                                                    >
                                                        School Attended
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="steparrow-gen-info-email-input"
                                                        placeholder="Enter school attended"
                                                        value={props.user_school_optician}
                                                        onChange={(e) => props.setUser_school_optician(e.target.value)}
                                                        readOnly={read_only_opticianIntern}
                                                        style={{ background: '#fff' }}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="steparrow-gen-info-email-input"
                                                    >
                                                        Date of Orientation
                                                    </Label>
                                                    <Flatpickr
                                                        className="form-control"
                                                        options={{
                                                            dateFormat: "d M, Y"
                                                        }}
                                                        disabled={read_only_opticianIntern}
                                                        style={{ background: '#fff' }}
                                                        value={props.user_date_of_orientation_optician}
                                                        onChange={e => props.setUser_date_of_orientation_optician(e)}
                                                    />

                                                </div>
                                            </Col>
                                        </Row>

                                    </div>
                                    <div className="d-flex align-items-start gap-3 mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-label previestab"
                                            onClick={() => props.existPageOptician()}
                                        >
                                            <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                            Go Back
                                        </button>
                                        <button
                                            type="button"
                                            className="btn  btn-label right ms-auto nexttab nexttab"
                                            style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} onClick={() => {
                                                if (props.user_date_of_orientation_optician !== '') {
                                                    toggleArrowTab(activeArrowTab + 1);
                                                }
                                            }}
                                        >
                                            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                            Next
                                        </button>
                                    </div>
                                </TabPane>

                                <TabPane id="steparrow-description-info" tabId={5}>
                                    <div>
                                        <Row>
                                            <Col lg={4}>
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="steparrow-gen-info-email-input"
                                                    >
                                                        Supervisor  First Name
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="steparrow-gen-info-email-input"
                                                        placeholder="Enter supervisor name"
                                                        value={props.supervisor_first_name}
                                                        onChange={(e) => props.setSupervisor_first_name(e.target.value)}
                                                        readOnly={read_only_opticianIntern}
                                                        style={{ background: '#fff' }}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="steparrow-gen-info-username-input"
                                                    >
                                                        Supervisor   Middle Name
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="steparrow-gen-info-username-input"
                                                        placeholder=" Enter supervisor middle name"
                                                        value={props.supervisor_middle_name}
                                                        onChange={(e) => props.setSupervisor_middle_name(e.target.value)}
                                                        readOnly={read_only_opticianIntern}
                                                        style={{ background: '#fff' }}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={4}>
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="steparrow-gen-info-email-input"
                                                    >
                                                        Surname
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="steparrow-gen-info-email-input"
                                                        placeholder="Enter supervisor surname"
                                                        value={props.supervisor_last_name}
                                                        onChange={(e) => props.setSupervisor_last_name(e.target.value)}
                                                        readOnly={read_only_opticianIntern}
                                                        style={{ background: '#fff' }}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg={6}>
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="steparrow-gen-info-email-input"
                                                    >
                                                        Board Number
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="steparrow-gen-info-email-input"
                                                        placeholder="Enter board number"
                                                        value={props.supervisor_board_no}
                                                        onChange={e => props.setSupervisor_board_no(e.target.value)}
                                                        readOnly={read_only_opticianIntern}
                                                        style={{ background: '#fff' }}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="steparrow-gen-info-username-input"
                                                    >
                                                        Email Address
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="steparrow-gen-info-username-input"
                                                        placeholder=" Enter supervisor email address"
                                                        value={props.supervisor_email}
                                                        onChange={e => props.setSupervisor_email(e.target.value)}
                                                        readOnly={read_only_opticianIntern}
                                                        style={{ background: '#fff' }}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="steparrow-gen-info-email-input"
                                                    >
                                                        Phone Number
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="steparrow-gen-info-email-input"
                                                        placeholder="Enter supervisor phone number"
                                                        value={props.supervisor_phone}
                                                        onChange={e => props.setSupervisor_phone(e.target.value)}
                                                        readOnly={read_only_opticianIntern}
                                                        style={{ background: '#fff' }}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="steparrow-gen-info-email-input"
                                                    >
                                                        Date of Resumption
                                                    </Label>

                                                    <Flatpickr
                                                        className="form-control"
                                                        options={{
                                                            dateFormat: "d M, Y"
                                                        }}
                                                        disabled={read_only_opticianIntern}
                                                        style={{ background: '#fff' }}
                                                        value={props.supervisor_date_of_resumption}
                                                        onChange={e => props.setSupervisor_date_of_resumption(e)}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>

                                    </div>
                                    <div className="d-flex align-items-start gap-3 mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-light btn-label previestab"
                                            onClick={() => {
                                                toggleArrowTab(activeArrowTab - 1);
                                            }}
                                        >
                                            <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                            Previous
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-label right ms-auto nexttab nexttab"
                                            style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}
                                            onClick={() => {
                                                addSupervisor();
                                                toggleArrowTab(activeArrowTab + 1);
                                            }}
                                        >
                                            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                            Next
                                        </button>
                                    </div>
                                </TabPane>

                                <TabPane id="steparrow-gen-info" tabId={6}>
                                    <div>
                                        <Row>
                                            <Col lg={12}>
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="steparrow-gen-info-email-input"
                                                    >
                                                        Name
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="steparrow-gen-info-email-input"
                                                        placeholder="Enter name"
                                                        value={props.hospital_name}
                                                        onChange={e => props.setHospital_name(e.target.value)}
                                                        readOnly={read_only_opticianIntern}
                                                        style={{ background: '#fff' }}
                                                    />
                                                </div>
                                            </Col>

                                        </Row>

                                        <Row>
                                            <Col lg={6}>
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="steparrow-gen-info-email-input"
                                                    >
                                                        Email Address
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="steparrow-gen-info-email-input"
                                                        placeholder="Enter email"
                                                        value={props.hospital_email}
                                                        onChange={e => props.setHospital_email(e.target.value)}
                                                        readOnly={read_only_opticianIntern}
                                                        style={{ background: '#fff' }}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="steparrow-gen-info-username-input"
                                                    >
                                                        Phone Number
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="steparrow-gen-info-username-input"
                                                        placeholder=" Enter phone number"
                                                        value={props.hospital_phone}
                                                        onChange={e => props.setHospital_phone(e.target.value)}
                                                        readOnly={read_only_opticianIntern}
                                                        style={{ background: '#fff' }}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={12}>
                                                <div className="mb-3">
                                                    <Label
                                                        className="form-label"
                                                        htmlFor="steparrow-gen-info-email-input"
                                                    >
                                                        Hospital Address
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="steparrow-gen-info-email-input"
                                                        placeholder="Enter address"
                                                        value={props.hospital_address}
                                                        onChange={e => props.setHospital_address(e.target.value)}
                                                        readOnly={read_only_opticianIntern}
                                                        style={{ background: '#fff' }}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>

                                    </div>
                                    <div className="d-flex align-items-start gap-3 mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-light btn-label previestab"
                                            onClick={() => {
                                                toggleArrowTab(activeArrowTab - 1);
                                            }}
                                        >
                                            <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                            Previous
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-label right ms-auto nexttab nexttab"
                                            style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}
                                            onClick={() => {
                                                addHospital();
                                                toggleArrowTab(activeArrowTab + 1);
                                            }}
                                        >
                                            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                            Next
                                        </button>
                                    </div>
                                </TabPane>

                                <TabPane id="pills-experience" tabId={7}>
                                    <Col xxl={12}>
                                        <div {...getRootProps({ className: 'dropzone' })}>
                                            <input {...getInputProps()} />
                                            <div className='d-flex align-items-center justify-content-center flex-column'>
                                                <DownloadCloud size={64} />
                                                <h5>Drop Files here or click to upload</h5>
                                                <p className='text-secondary'>
                                                    Drop files here or click{' '}
                                                    <a href='/' onClick={e => e.preventDefault()}>
                                                        browse
                                                    </a>{' '}
                                                    thorough your machine
                                                </p>
                                            </div>
                                            <div>
                                                <ol>
                                                    <li>A Copy of detailed result endorsed by the appropriate Education Authority
                                                        as evidence of Educational qualification</li>
                                                    <li>A copy of Admission later into the programme issued  by the admitting authority</li>
                                                    <li>A certified copy of Birth Certificate / Statutory Declaration of Age</li>
                                                    <li>A copy of testimonial from the Principal of last school attended</li>
                                                    <li>A copy of marriage Certification / Addidavit ( if married )</li>
                                                    <li>A copy of recent Passport Size Photograph</li>

                                                </ol>
                                            </div>
                                        </div>
                                        {files.length || documents.length ? (
                                            <Fragment>
                                                <ListGroup className='my-2'>{documents?.length >= 1 ? DocumentList : fileList}</ListGroup>
                                                <div className='d-flex justify-content-end'>
                                                    <div></div>
                                                    {/* <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                                                        Remove All
                                                    </Button> */}
                                                    <Button color='primary' onClick={() => uploadedFiles()}>Upload Files</Button>
                                                </div>
                                            </Fragment>
                                        ) : null}

                                    </Col>
                                    <div className="d-flex align-items-start gap-3 mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-light btn-label previestab"
                                            onClick={() => {
                                                toggleArrowTab(activeArrowTab - 1);
                                            }}
                                        >
                                            <i className="ri-arrow-left-line label-icon align-middle fs-16 me-2"></i>{" "}
                                            Previous
                                        </button>
                                        {/* <div className="text-end">
                                            <button type="button" onClick={() => props.existPageOptician()} className="btn btn-danger" >Cancel</button>
                                        </div> */}
                                        {optician_approval !== ' ' && optician_btn_update === true ?

                                            <div className='right  ms-auto'>
                                                <button
                                                    type="button"
                                                    className="btn  right ms-auto mx-2"
                                                    style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}
                                                    onClick={() => {
                                                        updateInternshipAndExit();
                                                        // toggleArrowTab(activeArxxxrowTab + 1);
                                                    }}
                                                    disabled={read_only_opticianIntern}
                                                >
                                                    Update and Exit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn right ms-auto"
                                                    style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}
                                                    onClick={() => {
                                                        updateInternship();
                                                        // toggleArrowTab(activeArrowTab + 1);
                                                    }}
                                                    disabled={read_only_opticianIntern}
                                                >
                                                    Update and Submit
                                                </button>
                                            </div>
                                            :
                                            <div className='right  ms-auto'>
                                                <button
                                                    type="button"
                                                    className="btn  right ms-auto mx-2"
                                                    style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}
                                                    onClick={() => {
                                                        createInternshipAndExit();
                                                        // toggleArrowTab(activeArxxxrowTab + 1);
                                                    }}
                                                >
                                                    Save and Exit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn right ms-auto"
                                                    style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}
                                                    onClick={() => {
                                                        createInternship();
                                                        // toggleArrowTab(activeArrowTab + 1);
                                                    }}
                                                >
                                                    Submit
                                                </button>
                                            </div>}

                                    </div>
                                </TabPane>
                            </TabContent>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    )
}

export default WizardOptician;