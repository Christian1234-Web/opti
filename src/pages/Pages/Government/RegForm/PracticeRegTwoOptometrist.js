import React, { useEffect, useState, useContext, useCallback, Fragment } from 'react'
import { request } from '../../../../services/utilities';
import { USER_COOKIE } from '../../../../services/constants';
import SSRStorage from '../../../../services/storage';
import { Store } from '../../../../services/store';
import classnames from "classnames";
import { useHistory } from 'react-router-dom';
import RepeatingAcademicForm from './RepeatingAcademicFormOptometrist';
import RepeatingPostGraduateForm from './RepeatingPostGraduateFormOptometrist';
import FullRegReference from './FullRegReferenceOptometrist';
import withReactContent from 'sweetalert2-react-content';
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
import { useDropzone } from 'react-dropzone';
import { FileText, X, DownloadCloud } from 'react-feather';
import Swal from 'sweetalert2';
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
import { Link } from 'react-router-dom';
const MySwal = withReactContent(Swal);


function PracticeRegTwoOptometrist({ optometrists, existPageOptometrist, idx, oneOptometrist, id_meansOpto, setId_meansOpto, id_noOpto, setId_noOpto, user
}) {
    const store = useContext(Store);
    const [read_only_optometrist, setRead_only_optometrist] = store.read_only_optometrist;
    let [optometrist_approval, setOptometrist_approval] = store.optometrist_approval
    let [optometrist_btn_save, setOptometrist_btn_save] = store.optometrist_btn_save;
    let [academic_formOptometrist, setAcademic_formOptometrist] = store.academic_formOptometrist;
    let [post_graduateOptometrist, setPost_graduateOptometrist] = store.post_graduateOptometrist
    let [referenceOptometrist, setReferenceOptometrist] = store.referenceOptometrist;
    const history = useHistory();
    const [check, setCheck] = useState(false);
    const [first_name, setFirst_name] = useState('');
    const [middle_name, setMiddle_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [user_email, setUser_email] = useState('');
    const [user_phone, setUser_phone] = useState('');
    const [loading, setLoading] = useState(false);
    const [date_of_birth, setDate_of_birth] = useState('');
    const [any_nme, setAny_name] = useState('');
    const [home_address, setHome_address] = useState('');
    const [permanent_address, setPermanent_address] = useState('');
    const [postal_address, setPostal_address] = useState('');
    const [lga, setLga] = useState('');
    const [state, setState] = useState('');
    const [marital_status, setMarital_status] = useState('');
    const [maiden_name, setMaiden_name] = useState('');
    const [emergency_name, setEmergency_name] = useState('');
    const [emergency_address, setEmergency_address] = useState('');

    const [is_criminal_record, setIs_criminal_record] = useState(false);
    const [is_sentence_record, setIs_sentence_record] = useState(false);
    const [is_drug_issue, setIs_drug_issue] = useState(false);
    const [is_sign, setIs_sign] = useState(false);

    const [if_explain, setIf_explain] = useState('');
    const [sex, setSex] = useState('');
    const [count, setCount] = useState(0);
    const arr = [];

    // academic form section
    const [name_academic, setName_academic] = useState('');
    const [from_academic, setFrom_academic] = useState();
    const [to_academic, setTo_academic] = useState();
    const [grade_academic, setGrade_academic] = useState('');
    const [switchAcademicBtn, setSwitchAcademicBtn] = useState(false);
    const [academic_id, setAcademic_id] = useState(null);
    const [academic_index, setAcademic_index] = useState(null);

    // end of academic form

    // post graduate form section
    const [name_post_graduate, setName_post_graduate] = useState('');
    const [from_post_graduate, setFrom_post_graduate] = useState();
    const [to_post_graduate, setTo_post_graduate] = useState();
    const [hod_post_graduate, setHod_post_graduate] = useState('');
    const [switchPostGraduateBtn, setSwitchPostgraduateBtn] = useState(false);
    const [post_graduate_id, setPost_graduate_id] = useState(null);
    const [post_graduate_index, setPost_graduate_index] = useState(null);

    // end of post graduate form

    // referee section
    const [name_referee, setName_referee] = useState('');
    const [address_referee, setAddress_referee] = useState('');
    const [occupation_referee, setOccupation_referee] = useState('');
    const [phoneE_referee, setPhoneE_referee] = useState('');
    const [referee_index, setReferee_index] = useState(null);
    const [referee_id, setReferee_id] = useState(null);
    const [switchRefereeBtn, setSwitchRefereeBtn] = useState(false);

    // end of referee section

    const [activeArrowTab, setactiveArrowTab] = useState(4);
    const [passedarrowSteps, setPassedarrowSteps] = useState([1]);
    // const [count, setCount] = useState(0);
    const [files, setFiles] = useState([]);
    const [imgSix, setImgSix] = useState('');
    const [, setDocArr] = useState([]);
    const docArr = [];
    const [allFiles, setAllFiles] = useState([])
    // const arr = [];

    function toggleArrowTab(tab) {
        if (activeArrowTab !== tab) {
            var modifiedSteps = [...passedarrowSteps, tab];

            if (tab >= 4 && tab <= 8) {
                setactiveArrowTab(tab);
                setPassedarrowSteps(modifiedSteps);
            }
        }
    }

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
            text: ' Please sign the form!',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000
        })
    }
    const addAcademic = (academic_formData) => {
        academic_formOptometrist.push(academic_formData);
        setCount(count + 1);
        // console.log(academic_formData);
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
    const addPostGraduate = (post_graduateData) => {
        post_graduateOptometrist.push(post_graduateData);
        setCount(count + 1);
        // console.log(post_graduateData);

    }

    const addReference = (referenceData) => {
        referenceOptometrist.push(referenceData);
        setCount(count + 1);
        // console.log(referenceData);

    }
    const removeReference = (i) => {
        referenceOptometrist.splice(i, 1);
        setCount(count + 1);
    }
    const removePostGraduate = (i) => {
        post_graduateOptometrist.splice(i, 1);
        setCount(count + 1);
    }
    const removeAcademicForm = (i) => {
        academic_formOptometrist.splice(i, 1);
        setCount(count + 1);
    }
    const deleteAcademicForm = async (id, i) => {

        const url = `optometrists/academic/${id}`;
        if (window.confirm('are you sure')) {
            try {
                const rs = await request(url, 'DELETE', true);
                // console.log(rs);
                removeAcademicForm(i);
                alert('deleted successful');
            } catch (err) {
                removeAcademicForm(i);
                alert('opps something went wrong');
                console.log(err);
            }
        }

    }
    const editAcademicOptometrist = (i) => {
        setAcademic_index(i);
        let item = academic_formOptometrist[i];
        // console.log(item);
        setName_academic(item.institutionName);
        setTo_academic(item.endDate);
        setFrom_academic(item.startDate);
        setGrade_academic(item.grade);
        setAcademic_id(item.id);
        setSwitchAcademicBtn(true);
    }

    const deletePostGraduateForm = async (id, i) => {

        const url = `optometrists/certification/${id}`;
        if (window.confirm('are you sure')) {
            try {
                const rs = await request(url, 'DELETE', true);
                // console.log(rs);
                removePostGraduate(i);
                alert('deleted successful');
            } catch (err) {
                removeAcademicForm(i);
                alert('opps something went wrong');
                console.log(err);
            }
        }

    }
    const editPostGraduateOptometrist = (i) => {
        setPost_graduate_index(i);
        let item = post_graduateOptometrist[i];
        setName_post_graduate(item.institutionName);
        setTo_post_graduate(item.endDate);
        setFrom_post_graduate(item.startDate);
        setHod_post_graduate(item.supervisorName);
        setPost_graduate_id(item.id);
        setSwitchPostgraduateBtn(true);
    }
    const deleteRefereeForm = async (id, i) => {

        const url = `optometrists/referee/${id}`;
        if (window.confirm('are you sure')) {
            try {
                const rs = await request(url, 'DELETE', true);
                // console.log(rs);
                removeReference(i);
                alert('deleted successful');
            } catch (err) {
                removeAcademicForm(i);
                alert('opps something went wrong');
                console.log(err);
            }
        }

    }
    const editRefereeOptometrist = (i) => {
        setReferee_index(i);
        let item = referenceOptometrist[i];
        setName_referee(item.refereeName);
        setAddress_referee(item.refereeAddress);
        setOccupation_referee(item.refereeOccupation);
        setPhoneE_referee(item.refereeEmail);
        setReferee_id(item.id);
        setSwitchRefereeBtn(true);
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: acceptedFiles => {
            setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
        }
    })

    const renderFilePreview = file => {
        if (file.type.startsWith('image')) {
            return <img className='rounded' id='img_upload' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
        } else {
            return <FileText size='28' />
        }
    }

    const handleRemoveFile = file => {
        const uploadedFiles = files
        const filtered = uploadedFiles.filter(i => i.name !== file.name)
        setFiles([...filtered])
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
    const uploadedFiles = () => {
        setLoading(true);
        let count = 0;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
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
                    let dataFile = { name: data.original_filename, file: data.secure_url }
                    allFiles.push(dataFile);
                    // console.log(data.secure_url);
                    count++
                    if (count === files.length) {
                        console.log(count);
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

    const handleFullReg = async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);
        const id_sign = document.getElementById('id_sign');
        const data = {
            userId: user.id, meansOfIdentification: id_meansOpto, identificationNumber: id_noOpto, academics: academic_formOptometrist,
            certifications: post_graduateOptometrist, referees: referenceOptometrist, status: 'Pending', documents: allFiles
        }
        if (id_sign.checked === false) {
            return warningError();
        }
        // console.log(data);
        try {
            setLoading(true);
            const url = `optometrists/create?senderid=${user.id}`;
            const rs = await request(url, 'POST', true, data);
            setLoading(false);
            // handleSuccess();
            history.push(`/optometrist-dashboard/oo/optometrist/${rs?.data?.id}`)
            setId_meansOpto(' ');
            setId_noOpto(' ');
            setEmergency_name(' ');
            setEmergency_address(' ');
            setIf_explain(' ');
            setAcademic_formOptometrist([]);
            setReferenceOptometrist([]);
            setPost_graduateOptometrist([]);
            existPageOptometrist();
        }
        catch (err) {
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
            handleError();
            console.log(err);
        }
    }
    const saveAndExitFullReg = async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);
        const id_sign = document.getElementById('id_sign');
        const data = {
            userId: user.id, meansOfIdentification: id_meansOpto, identificationNumber: id_noOpto, academics: academic_formOptometrist,
            certifications: post_graduateOptometrist, referees: referenceOptometrist, status: 'Continue', documents: allFiles
        }
        if (id_sign.checked === false) {
            return warningError();
        }
        // console.log(data);
        try {
            setLoading(true);
            const url = `optometrists/create?senderid=${user.id}`;
            const rs = await request(url, 'POST', true, data);
            setLoading(false);
            history.push(`/optometrist-dashboard/oo/optometrist/${rs?.data?.id}`)
            // handleSuccess();
            setId_meansOpto('');
            setId_noOpto('');
            setEmergency_name('');
            setEmergency_address('');
            setIf_explain('');
            setAcademic_formOptometrist([]);
            setReferenceOptometrist([]);
            setPost_graduateOptometrist([]);
            existPageOptometrist();
        }
        catch (err) {
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
            handleError();
            console.log(err);
        }
    }

    const updateFullReg = async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);
        const id_sign = document.getElementById('id_sign');
        const data = {
            userId: user.id, meansOfIdentification: id_meansOpto, identificationNumber: id_noOpto, academics: academic_formOptometrist,
            certifications: post_graduateOptometrist, referees: referenceOptometrist, status: 'Pending'
        }
        if (id_sign.checked === false) {
            return warningError();
        }
        // console.log(data);
        try {
            setLoading(true);
            const url = `optometrists/update/${oneOptometrist.id}?senderid=${user.id}`;
            const rs = await request(url, 'PATCH', true, data);
            setLoading(false);
            handleSuccess();
            setId_meansOpto('');
            setId_noOpto('');
            setEmergency_name('');
            setEmergency_address('');
            setIf_explain('');
            setAcademic_formOptometrist([]);
            setReferenceOptometrist([]);
            setPost_graduateOptometrist([]);
            existPageOptometrist();
        }
        catch (err) {
            setLoading(false);
            handleError();
            console.log(err);
        }
    }
    const updateAndExitFullReg = async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);
        const id_sign = document.getElementById('id_sign');
        const data = {
            userId: user.id, meansOfIdentification: id_meansOpto, identificationNumber: id_noOpto, academics: academic_formOptometrist,
            certifications: post_graduateOptometrist, referees: referenceOptometrist, status: 'Continue'
        }
        if (id_sign.checked === false) {
            return warningError();
        }
        // console.log(data);
        try {
            setLoading(true);
            const url = `optometrists/update/${oneOptometrist.id}?senderid=${user.id}`;
            const rs = await request(url, 'PATCH', true, data);
            setLoading(false);
            handleSuccess();
            setId_meansOpto('');
            setId_noOpto('');
            setEmergency_name('');
            setEmergency_address('');
            setIf_explain('');
            setAcademic_formOptometrist([]);
            setReferenceOptometrist([]);
            setPost_graduateOptometrist([]);
            existPageOptometrist();
        }
        catch (err) {
            setLoading(false);
            handleError();
            console.log(err);
        }
    }
    const refreshUpdate = async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);
        try {
            setLoading(true);
            const url = `optometrists/${oneOptometrist.id}`;
            const rs = await request(url, 'GET', true);
            setAcademic_formOptometrist(rs.data.user.optometrist.academic);
            setPost_graduateOptometrist(rs.data.user.optometrist.certifications);
            setReferenceOptometrist(rs.data.user.optometrist.referees);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            alert('Poor internet connection');
            console.log(err);
        }
    }
    const [msg, setMsg] = useState("");
    const [startDate, setStartDate] = useState(null);

    const dateCountDown = useCallback(() => {
        // console.log(optometrists)
        if (optometrists === null) {
            return setMsg('0d  0h 0m 0s');
        } else {
            let timeSet = new Date(optometrists.createdAt).toUTCString().split(' ');
            // console.log(optometrists)

            let xx = `${timeSet[2]} ${timeSet[1]} ${parseInt(timeSet[3]) + 1} ${timeSet[4]}`;
            setStartDate(xx)

            let countDownDate = new Date(xx).getTime();

            let x = setInterval(function () {
                // Get today's date and time
                let now = new Date().getTime();

                // Find the distance between now and the count down date
                let distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                let days = Math.floor(distance / (1000 * 60 * 60 * 24));
                let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setMsg(days + "d " + hours + "h "
                    + minutes + "m " + seconds + "s ");
                // If the count down is finished, write some text
                if (distance < 0) {
                    clearInterval(x);
                    // document.getElementById("demo").innerHTML = "EXPIRED";
                    setMsg("Expired")
                }
            }, 1000);
        }
    }, [optometrists])
    const fetchUserDetails = useCallback(() => {
        try {
            // console.log(optometrists);
            setFirst_name(user.firstName);
            setMiddle_name(user.otherNames);
            setLast_name(user.surname);
            setUser_email(user.email);
            setUser_phone(user.phone);
            setDate_of_birth(new Date(user.dateOfBirth).toDateString());
            setState(user.stateOfOrigin);
            setLga(user.lgaOrigin);
            setHome_address(user.address);
            setPermanent_address(user.addressOrigin);
            setAny_name(user.previousNames);
            setSex(user.gender);
            setMaiden_name(user.maidenName);
            setMarital_status(user.maritalStatus);
            setIs_criminal_record(user.isConvicted);
            setIs_sentence_record(user.isSentenced);
            setIs_drug_issue(user.hasDrugIssue);
            setIf_explain(user.drugUseDetails);
        } catch (err) {
            console.log(err)
        }
    }, [user.firstName, user.otherNames, user.surname, user.email, user.phone, user.dateOfBirth, user.stateOfOrigin,
    user.lgaOrigin, user.address, user.addressOrigin, user.previousNames, user.gender, user.maidenName, user.maritalStatus, user.isConvicted,
    user.isSentenced, user.hasDrugIssue, user.drugUseDetails])

    useEffect(() => {
        fetchUserDetails();
        dateCountDown();
    }, [fetchUserDetails, dateCountDown]);
    return (
        <>
            <CardBody className="form-steps">
                {msg === "Expired" ? <Form>
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
                                    Form
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
                                    Documents Upload
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                    <TabContent activeTab={activeArrowTab}>
                        <TabPane id="steparrow-gen-info" tabId={4}>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="live-preview">
                                                <div className="row gy-4">
                                                    <div className="col-xxl-4 col-md-6">
                                                        <div>
                                                            <label htmlFor="basiInput" className="form-label"
                                                            >First Name </label>
                                                            <input type="text" value={first_name}
                                                                // onChange={(e) => setName(e.target.value)}
                                                                className="form-control" id="basiInput"
                                                                // placeholder='enter first name'
                                                                readOnly
                                                                style={{ background: '#fff' }}

                                                            />

                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-4 col-md-6">
                                                        <div>
                                                            <label htmlFor="basiInput" className="form-label"
                                                            >Middle Name</label>
                                                            <input type="text" value={middle_name}
                                                                // onChange={(e) => setName(e.target.value)}
                                                                className="form-control" id="basiInput"
                                                                // placeholder='enter middle name'
                                                                readOnly
                                                                style={{ background: '#fff' }}

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-4 col-md-6">
                                                        <div>
                                                            <label htmlFor="basiInput" className="form-label"
                                                            >Surname</label>
                                                            <input type="text" value={last_name}
                                                                // onChange={(e) => setName(e.target.value)}
                                                                className="form-control" id="basiInput"
                                                                // placeholder='enter surname'
                                                                readOnly
                                                                style={{ background: '#fff' }}


                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-xxl-12 col-md-12">
                                                        <div>
                                                            <label htmlFor="placeholderInput" className="form-label">Previous Name if Any</label>
                                                            <input type="text" className="form-control"
                                                                value={any_nme}
                                                                readOnly
                                                                id="placeholderInput" style={{ background: '#fff' }}
                                                                placeholder=" Enter previous name" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-4 col-md-4">
                                                        <div>
                                                            <label htmlFor="exampleInputdate" className="form-label">Date of Birth</label>
                                                            <input type="text" value={date_of_birth}
                                                                // onChange={(e => setDate_of_birth(e.target.value))}
                                                                readOnly
                                                                style={{ background: '#fff' }}

                                                                className="form-control" id="exampleInputdate" />

                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-4 col-md-4">
                                                        <label htmlFor="placeholderInput" className="form-label" >Sex</label>
                                                        <input type="text" value={sex}
                                                            readOnly
                                                            style={{ background: '#fff' }}

                                                            className="form-control" id="exampleInputdate" />
                                                    </div>
                                                    <div className="col-xxl-4 col-md-4">
                                                        <label htmlFor="placeholderInput" className="form-label">State of Origin</label>
                                                        <input type="text" value={state}
                                                            readOnly
                                                            style={{ background: '#fff' }}

                                                            className="form-control" id="exampleInputdate" />
                                                    </div>
                                                    <div className="col-xxl-4 col-md-4">
                                                        <label htmlFor="placeholderInput" className="form-label">Local Government</label>

                                                        <input type="text" value={lga}
                                                            readOnly
                                                            style={{ background: '#fff' }}
                                                            className="form-control" id="exampleInputdate" />
                                                    </div>
                                                    <div className="col-xxl-4 col-md-4">
                                                        <div>
                                                            <label htmlFor="placeholderInput" className="form-label">E-mail address</label>
                                                            <input type="text" value={user_email}
                                                                // onChange={(e) => setEmail(e.target.value)}
                                                                className="form-control"
                                                                id="placeholderInput"
                                                                // placeholder="qq@gmail.com"
                                                                readOnly
                                                                style={{ background: '#fff' }}

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-4 col-md-4">
                                                        <div>
                                                            <label htmlFor="placeholderInput" className="form-label">Phone number</label>
                                                            <input type="text" value={user_phone}
                                                                // onChange={(e) => setPhone(e.target.value)}
                                                                className="form-control"
                                                                id="placeholderInput"
                                                                // placeholder="+234 5655"
                                                                readOnly
                                                                style={{ background: '#fff' }}

                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-xxl-6 col-md-5">
                                                        <label htmlFor="placeholderInput" className="form-label">Means Of Identification</label>
                                                        {optometrist_approval === 'Pending' || optometrist_approval === 'processing' ? <input type="text" value={id_meansOpto}
                                                            className="form-control"
                                                            id="placeholderInput"
                                                            readOnly={read_only_optometrist}
                                                            style={{ background: '#fff' }}

                                                        /> : <select className="form-select mb-3" onChange={(e) => setId_meansOpto(e.target.value)} aria-label="Default select example">
                                                            <option selected="">Select  Identification </option>
                                                            <option value="Driving License">Driving License</option>
                                                            <option value="National Identification Number">National Identification Number</option>
                                                            <option value="International Passport">International Passport</option>
                                                            <option value="Voters Card">Voters Card</option>
                                                        </select>}

                                                    </div>
                                                    <div className="col-xxl-6 col-md-8">
                                                        <div>
                                                            <label htmlFor="placeholderInput" className="form-label">Identification Number</label>
                                                            <input type="text" onChange={(e) => setId_noOpto(e.target.value)}
                                                                value={oneOptometrist !== null ? id_noOpto : id_noOpto} readOnly={read_only_optometrist} style={{ background: '#fff' }}
                                                                className="form-control" id="placeholderInput" placeholder="Enter identification number" />
                                                        </div>
                                                    </div>


                                                    <div className="col-xxl-12 col-md-12">
                                                        <div>
                                                            <label htmlFor="placeholderInput" className="form-label">Home Address</label>
                                                            <input type="text" value={home_address}
                                                                // onChange={(e) => setHome_address(e.target.value)}
                                                                className="form-control" id="placeholderInput"
                                                                // placeholder="Enter home address"
                                                                readOnly
                                                                style={{ background: '#fff' }}

                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-12 col-md-12">
                                                        <div>
                                                            <label htmlFor="placeholderInput" className="form-label">Office / Practice Address</label>
                                                            <input type="text" value={permanent_address}
                                                                // onChange={(e) => setPermanent_address(e.target.value)}
                                                                className="form-control" id="placeholderInput"
                                                                // placeholder=" Enter permanent address"
                                                                readOnly
                                                                style={{ background: '#fff' }}

                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-xxl-4 col-md-4">
                                                        <label htmlFor="placeholderInput" className="form-label">Marital Status</label>
                                                        <input type="text" value={marital_status}
                                                            className="form-control" id="placeholderInput"
                                                            readOnly
                                                            style={{ background: '#fff' }}
                                                        />
                                                    </div>
                                                    <div className="col-xxl-8 col-md-8">
                                                        <div>
                                                            <label htmlFor="placeholderInput" className="form-label">If Married, State Maiden Name</label>
                                                            <input type="text" value={maiden_name}
                                                                className="form-control" id="placeholderInput" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-6 col-md-6">
                                                        <div>
                                                            <label htmlFor="placeholderInput" className="form-label">Emergency Contact Name</label>
                                                            <input type="text" value={emergency_name} onChange={(e) => setEmergency_name(e.target.value)}
                                                                className="form-control" id="placeholderInput" placeholder="Enter emergency contact name" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-6 col-md-6">
                                                        <div>
                                                            <label htmlFor="placeholderInput" className="form-label">Emergency Contact Address</label>
                                                            <input type="text" value={emergency_address} onChange={(e) => setEmergency_address(e.target.value)}
                                                                className="form-control" id="placeholderInput" placeholder="Enter emergency contact address" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-12 col-md-6 box-shadow" >
                                                        <div className='mb-4'>
                                                            <RepeatingAcademicForm
                                                                academic_formOptician={academic_formOptometrist}
                                                                addAcademic={addAcademic}
                                                                academic_index={academic_index}
                                                                name_academic={name_academic}
                                                                setName_academic={setName_academic}
                                                                from_academic={from_academic}
                                                                setFrom_academic={setFrom_academic}
                                                                to_academic={to_academic}
                                                                setTo_academic={setTo_academic}
                                                                grade_academic={grade_academic}
                                                                setGrade_academic={setGrade_academic}
                                                                switchAcademicBtn={switchAcademicBtn}
                                                                setSwitchAcademicBtn={setSwitchAcademicBtn}
                                                                academic_id={academic_id}
                                                                userId={user.id}
                                                                count={count}
                                                                setCount={setCount}
                                                                refreshUpdate={refreshUpdate}
                                                                oneOptometrist={oneOptometrist}
                                                            />
                                                        </div>

                                                        <div className="col-xl-12">
                                                            <div className="table-responsive mt-4 mt-xl-0">
                                                                <table className="table table-success table-striped table-nowrap align-middle mb-0">
                                                                    <thead >
                                                                        <tr>
                                                                            <th scope="col">ID</th>
                                                                            <th scope="col">NAME of INSTITUTION</th>
                                                                            <th scope="col">DATE ATTENDED</th>
                                                                            <th scope="col">CERTIFICATE OBTAINED AND GRADES</th>

                                                                            <th scope='col'>
                                                                                <div>Action</div>
                                                                            </th>

                                                                        </tr>
                                                                    </thead>
                                                                    {academic_formOptometrist.map((e, i) => {
                                                                        return (
                                                                            <tbody key={i}>
                                                                                <tr>
                                                                                    <td className="fw-medium">{i + 1}</td>
                                                                                    <td>{e.institutionName}</td>
                                                                                    <td>{new Date(e.startDate).toDateString()} - {new Date(e.endDate).toDateString()}</td>
                                                                                    <td>{e.grade}</td>
                                                                                    <td>
                                                                                        <div className="hstack gap-3 flex-wrap">
                                                                                            {optometrist_approval === 'Continue' ? <Link className="link-success fs-15"><i onClick={() => editAcademicOptometrist(i)} className="ri-edit-2-line"></i></Link>
                                                                                                : " "}

                                                                                            {optometrist_approval === 'Continue' ? <Link className="link-danger fs-15"><i
                                                                                                onClick={() => deleteAcademicForm(e.id, i)}
                                                                                                className="ri-delete-bin-line"></i></Link> :
                                                                                                " "}
                                                                                            {optometrist_approval === ' ' ? <Link className="link-danger fs-15"><i
                                                                                                onClick={() => removeAcademicForm(i)}
                                                                                                className="ri-delete-bin-line"></i></Link> : ' '}
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        )
                                                                    })}
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-12 col-md-6">
                                                        <div className='mb-4'>
                                                            <RepeatingPostGraduateForm
                                                                post_graduateOptician={post_graduateOptometrist}
                                                                addPostGraduate={addPostGraduate}
                                                                post_graduate_id={post_graduate_id}
                                                                post_graduate_index={post_graduate_index}
                                                                userId={user.id}
                                                                switchPostGraduateBtn={switchPostGraduateBtn}
                                                                setSwitchPostgraduateBtn={setSwitchPostgraduateBtn}
                                                                name_post_graduate={name_post_graduate}
                                                                setName_post_graduate={setName_post_graduate}
                                                                hod_post_graduate={hod_post_graduate}
                                                                setHod_post_graduate={setHod_post_graduate}
                                                                from_post_graduate={from_post_graduate}
                                                                setFrom_post_graduate={setFrom_post_graduate}
                                                                to_post_graduate={to_post_graduate}
                                                                setTo_post_graduate={setTo_post_graduate}
                                                                refreshUpdate={refreshUpdate}
                                                                oneOptometrist={oneOptometrist}
                                                            />
                                                        </div>
                                                        <div className="col-xl-12">
                                                            <div className="table-responsive mt-4 mt-xl-0">
                                                                <table className="table table-success table-striped table-nowrap align-middle mb-0">
                                                                    <thead >
                                                                        <tr>
                                                                            <th scope="col">ID</th>
                                                                            <th scope="col">NAME of INSTITUTION/ESTABLISHMENT</th>
                                                                            <th scope="col">NAME OF SUPERVISOR/HOD</th>
                                                                            <th scope="col">PERIOD COVERED</th>
                                                                            <th scope='col'> Action </th>
                                                                        </tr>
                                                                    </thead>
                                                                    {post_graduateOptometrist.map((e, i) => {
                                                                        return (
                                                                            <tbody key={i}>
                                                                                <tr>
                                                                                    <td className="fw-medium">{i + 1}</td>
                                                                                    <td>{e.institutionName}</td>
                                                                                    <td>{e.supervisorName}</td>
                                                                                    <td>{new Date(e.startDate).toDateString()} - {new Date(e.endDate).toDateString()}</td>
                                                                                    <td>
                                                                                        <div className="hstack gap-3 flex-wrap">
                                                                                            <div className="hstack gap-3 flex-wrap">
                                                                                                {optometrist_approval === 'Continue' ? <Link className="link-success fs-15"><i onClick={() => editPostGraduateOptometrist(i)} className="ri-edit-2-line"></i></Link>
                                                                                                    : " "}
                                                                                                {optometrist_approval === 'Continue' ? <Link className="link-danger fs-15"><i
                                                                                                    onClick={() => deletePostGraduateForm(e.id, i)}
                                                                                                    className="ri-delete-bin-line"></i></Link> :
                                                                                                    " "}
                                                                                                {optometrist_approval === ' ' ? <Link className="link-danger fs-15"><i
                                                                                                    onClick={() => removePostGraduate(i)}
                                                                                                    className="ri-delete-bin-line"></i></Link> : ' '}

                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        )
                                                                    })}
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-12 col-md-6">
                                                        <div className='mb-4'>
                                                            <FullRegReference
                                                                referenceOptician={referenceOptometrist}
                                                                addReference={addReference}
                                                                referee_id={referee_id}
                                                                referee_index={referee_index}
                                                                switchRefereeBtn={switchRefereeBtn}
                                                                setSwitchRefereeBtn={setSwitchRefereeBtn}
                                                                name_referee={name_referee}
                                                                setName_referee={setName_referee}
                                                                address_referee={address_referee}
                                                                setAddress_referee={setAddress_referee}
                                                                occupation_referee={occupation_referee}
                                                                setOccupation_referee={setOccupation_referee}
                                                                phoneE_referee={phoneE_referee}
                                                                setPhoneE_referee={setPhoneE_referee}
                                                                userId={user.id}
                                                                refreshUpdate={refreshUpdate}
                                                                oneOptometrist={oneOptometrist}
                                                            />
                                                        </div>
                                                        <div className="col-xl-12">
                                                            <div className="table-responsive mt-4 mt-xl-0">
                                                                <table className="table table-success table-striped table-nowrap align-middle mb-0">
                                                                    <thead >
                                                                        <tr>
                                                                            <th scope="col">ID</th>
                                                                            <th scope="col">NAME</th>
                                                                            <th scope="col">FULL ADDRESS</th>
                                                                            <th scope="col">OCCUPATION</th>
                                                                            <th scope='col'> PHONE NO. & EMAIL ADDRESS </th>
                                                                            <th scope="col">ACTION</th>
                                                                        </tr>
                                                                        {/* editRefereeOptometrist */}
                                                                    </thead>
                                                                    {referenceOptometrist.map((e, i) => {
                                                                        return (
                                                                            <tbody key={i}>
                                                                                <tr>
                                                                                    <td className="fw-medium">{i + 1}</td>
                                                                                    <td>{e.refereeName}</td>
                                                                                    <td>{e.refereeAddress}</td>
                                                                                    <td>{e.refereeOccupation}</td>
                                                                                    <td>{e.refereePhone}</td>
                                                                                    <td>
                                                                                        <div className="hstack gap-3 flex-wrap">
                                                                                            <div className="hstack gap-3 flex-wrap">
                                                                                                {optometrist_approval === 'Continue' ? <Link className="link-success fs-15" disabled={read_only_optometrist}><i onClick={() => editRefereeOptometrist(i)} className="ri-edit-2-line"></i></Link>
                                                                                                    : " "}

                                                                                                {optometrist_approval === 'Continue' ? <Link className="link-danger fs-15"><i
                                                                                                    onClick={() => deleteRefereeForm(e.id, i)}
                                                                                                    className="ri-delete-bin-line"></i></Link> :
                                                                                                    " "}
                                                                                                {optometrist_approval === ' ' ? <Link className="link-danger fs-15"><i
                                                                                                    onClick={() => removeReference(i)}
                                                                                                    className="ri-delete-bin-line"></i></Link> : ' '}
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        )
                                                                    })}
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 col-md-6">
                                                        <div>
                                                            <div className="col-lg-12">
                                                                <fieldset className="row mb-3 mr-3">
                                                                    <legend className="col-form-label col-sm-8 pt-0">  Do you have a previous conviction or criminal records?</legend>
                                                                    <div className="col-sm-4">
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input"
                                                                                // value={is_criminal_record}
                                                                                checked={is_criminal_record === true ? true : null} disabled={true}
                                                                                type="radio" />
                                                                            <label className="form-check-label" htmlFor="allTransactions">Yes</label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input"
                                                                                // value={is_criminal_record}
                                                                                checked={is_criminal_record === false ? true : null} disabled={true}
                                                                                type="radio" />
                                                                            <label className="form-check-label" htmlFor="allTransactions">No</label>
                                                                        </div>

                                                                    </div>
                                                                </fieldset>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div className="col-lg-12">
                                                                <fieldset className="row mb-3 mr-3">
                                                                    <legend className="col-form-label col-sm-8 pt-0">  Have you ever been sentenced for any crime?</legend>
                                                                    <div className="col-sm-4">
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input"
                                                                                // value={is_sentence_record}
                                                                                checked={is_sentence_record === true ? true : null} disabled={true}
                                                                                type="radio" />
                                                                            <label className="form-check-label" htmlFor="allTransactions">Yes</label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input"
                                                                                // value={is_sentence_record}
                                                                                checked={is_sentence_record === false ? true : null} disabled={true}
                                                                                type="radio" />
                                                                            <label className="form-check-label" htmlFor="allTransactions">No</label>
                                                                        </div>

                                                                    </div>
                                                                </fieldset>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="col-lg-12">
                                                                <fieldset className="row mb-3 mr-3">
                                                                    <legend className="col-form-label col-sm-8 pt-0">  Are you currently or have you had any issues with drug use?</legend>
                                                                    <div className="col-sm-4">
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input"
                                                                                // value={is_drug_issue}
                                                                                checked={is_drug_issue === true ? true : null} disabled={true}
                                                                                type="radio" />
                                                                            <label className="form-check-label" htmlFor="allTransactions">Yes</label>
                                                                        </div>
                                                                        <div className="form-check form-check-inline">
                                                                            <input className="form-check-input"
                                                                                // value={is_drug_issue}
                                                                                checked={is_drug_issue === false ? true : null} disabled={true}
                                                                                type="radio" />
                                                                            <label className="form-check-label" htmlFor="allTransactions">No</label>
                                                                        </div>

                                                                    </div>
                                                                </fieldset>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xxl-12 col-md-12">
                                                        <div>
                                                            <label htmlFor="placeholderInput" className="form-label">If yes, explain and state current position </label>
                                                            <input type="text" value={if_explain} readOnly style={{ background: "#fff" }}
                                                                // onChange={(e) => setIf_explain(e.target.value)}
                                                                className="form-control" id="placeholderInput" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-md-6">
                                                        <div>
                                                            <div className="form-check">
                                                                <input className="form-check-input"
                                                                    type="checkbox" id="id_sign" />
                                                                <label className="form-check-label" >
                                                                    I HEREBY ACCEPT RESPONSIBILITY FOR ANY WRONG INFORMATION INCLUDED IN THIS FORM.
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 d-flex justify-content-between">
                                                        <div className="text-end">
                                                            <button type="button" onClick={() => existPageOptometrist()} className="btn btn-danger" >Cancel</button>
                                                        </div>
                                                        <div>
                                                            {optometrist_approval !== ' ' && optometrist_btn_save === true ?
                                                                <div className="text-end">
                                                                    <div className='text-end'>
                                                                        <button type="button" onClick={() => updateAndExitFullReg()} disabled={read_only_optometrist} className="btn mx-2" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}>Update and Exit</button>
                                                                        <button type="button" onClick={() => updateFullReg()} disabled={read_only_optometrist} className="btn mx-2" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}>Update and Submit</button>
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div className="text-end">
                                                                    <button type="button" onClick={() => saveAndExitFullReg()} className="btn" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}>Save and Exit</button>
                                                                    <button type="button" onClick={() => handleFullReg()} className="btn mx-2" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}>Submit</button>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPane>

                        <TabPane id="pills-experience" tabId={5}>
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
                                {files.length ? (
                                    <Fragment>
                                        <ListGroup className='my-2'>{fileList}</ListGroup>
                                        <div className='d-flex justify-content-end'>
                                            <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                                                Remove All
                                            </Button>
                                            <Button color='primary' onClick={() => uploadedFiles()}>Upload Files</Button>
                                        </div>
                                    </Fragment>
                                ) : null}
                                {/* <Button color='success' className='mt-2' onClick={() => sendUploadedFiles()}>Submit</Button> */}

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
                                <div className="text-end">
                                    <button type="button" onClick={() => existPageOptometrist()} className="btn btn-danger" >Cancel</button>
                                </div>
                                {optometrist_approval !== ' ' && optometrist_btn_save === true ?

                                    <div className='right  ms-auto'>
                                        <button
                                            type="button"
                                            className="btn  right ms-auto mx-2"
                                            style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}
                                            onClick={() => {
                                                updateAndExitFullReg();
                                                // toggleArrowTab(activeArxxxrowTab + 1);
                                            }}
                                            disabled={read_only_optometrist}
                                        >
                                            Update and Exit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn right ms-auto"
                                            style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}
                                            onClick={() => {
                                                updateFullReg();
                                                // toggleArrowTab(activeArrowTab + 1);
                                            }}
                                            disabled={read_only_optometrist}
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
                                                saveAndExitFullReg();
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
                                                handleFullReg();
                                                // toggleArrowTab(activeArrowTab + 1);
                                            }}
                                        >
                                            Submit
                                        </button>
                                    </div>}
                            </div>
                        </TabPane>
                    </TabContent>
                </Form> :
                    <div className='text-center' style={{ height: '15rem' }}>
                        <h1 className='' style={{ fontSize: "5rem", marginTop: '10rem' }}>{msg}</h1>
                    </div>
                }
            </CardBody>
        </>
    )
}

export default PracticeRegTwoOptometrist;