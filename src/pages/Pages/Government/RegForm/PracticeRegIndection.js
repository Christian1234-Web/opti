import React, { useState, useContext, Fragment, useCallback, useEffect } from 'react'
import { request } from '../../../../services/utilities';
import { Store } from '../../../../services/store';
import Flatpickr from "react-flatpickr";
import classnames from "classnames";
import { Form, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, Row, Col, Input, Label, Button, ListGroup, ListGroupItem } from "reactstrap";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
import UploadImg from "../../../../assets/images/upload-img.png";
import FileIcon from "../../../../assets/images/file-img.png";
// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud } from 'react-feather'
import { useHistory } from 'react-router-dom';

// import { FileText } from 'react-feather'

const MySwal = withReactContent(Swal);

function PracticeRegIndection({ existPage, practice, idx, name, setName, type, setType, address, setAddress, lga, setLga, state, setState, dateCommenced,
    setDateCommenced, nameOfRegPractitionerInCharge, setNameOfRegPractitionerInCharge, optometricRegNum, setOptometricRegNum, email, setEmail, phone, setPhone,
    isAttachedToGHP, setIsAttachedToGHP, qualificationOfPractitionerInCharge, setQualificationOfPractitionerInCharge, cacRegNum, setCacRegNum, director, setDirector,
    facility, setFacilty, selected_state, setSelected_state, selected_lga, setSelected_lga, user
}) {
    const store = useContext(Store);
    let [indexing_approval, setIndexing_approval] = store.indexing_approval;
    const [read_only_indexing] = store.read_only_indexing;
    const [count, setCount] = useState(0);
    const history = useHistory();
    const [activeArrowTab, setactiveArrowTab] = useState(4);
    const [passedarrowSteps, setPassedarrowSteps] = useState([1]);

    const [imgSix, setImgSix] = useState('');
    const [loading, setLoading] = useState(false);
    const [, setDocArr] = useState([]);
    const docArr = [];
    const arr = [];
    const [files, setFiles] = useState([]);
    const [allFiles, setAllFiles] = useState([])
    const [documents, setDocuments] = useState([]);



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
    const handleSuccess = () => {
        return MySwal.fire({
            title: 'Good job!',
            text: 'Indexing Registration Form Submitted!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
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
    const handleUpdate = () => {
        return MySwal.fire({
            title: 'Good job!',
            text: 'Update Successful!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        })
    }
    const is_signError = () => {
        return MySwal.fire({
            title: 'Warning!',
            text: ' Please sign the form!',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000
        })
    }

    function toggleArrowTab(tab) {
        const id_sign_one = document.getElementById('id_sign_one');

        if (id_sign_one.checked === false) {
            return is_signError();
        }
        if (activeArrowTab !== tab) {
            var modifiedSteps = [...passedarrowSteps, tab];

            if (tab >= 4 && tab <= 8) {
                setactiveArrowTab(tab);
                setPassedarrowSteps(modifiedSteps);
            }
        }
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: acceptedFiles => {
            documents.push(...acceptedFiles.map(file => Object.assign(file)))
            setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))]);
        }
    })

    const renderFilePreview = file => {
        if (file.type.startsWith('image')) {
            return <img className='rounded' id='img_upload' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
        } else {
            return <FileText size='28' />
        }
    }

    const uploadedFiles = () => {
        setLoading(true);
        let count = 0;
        const filteredD = documents.filter(i => !i.id)
        const files_ = documents.length > 1 ? filteredD : files;
        const formData = new FormData();
        for (let i = 0; i < files_.length; i++) {
            let file = files_[i];
            // count++
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

    const createIndexing = async () => {
        const id_sign_two = document.getElementById('id_sign_two');

        if (id_sign_two.checked === false) {
            return is_signError();
        }
        const data = {
            dateAdmitted: dateCommenced, sponsorAddress: cacRegNum, institutionCode: email, optometricRegNum, nokName: nameOfRegPractitionerInCharge,
            institutionAdress: address, matricNum: phone, nokAddress: optometricRegNum, sponsorName: name, userId: idx, documents: allFiles, status: "Pending"
        }
        try {
            setLoading(true);
            const url = `indexings/create?senderid=${idx}`;
            const rs = await request(url, 'POST', true, data);
            setFiles([]);
            setLoading(false);
            history.push(`/indexing-dashboard/indexing/${rs?.data?.userId}`);
            // handleSuccess();
            // existPage();
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
    const submitExistIndexing = async () => {
        const id_sign_two = document.getElementById('id_sign_two');
        if (id_sign_two.checked === false) {
            return is_signError();
        }
        const data = {
            dateAdmitted: dateCommenced, sponsorAddress: cacRegNum, institutionCode: email, nokName: nameOfRegPractitionerInCharge,
            institutionAdress: address, matricNum: phone, nokAddress: optometricRegNum, sponsorName: name, userId: idx, documents: allFiles, status: "Continue"
        }
        try {
            setLoading(true);
            const url = `indexings/create?senderid=${idx}`;
            const rs = await request(url, 'POST', true, data);
            setLoading(false);
            history.push(`/indexing-dashboard/indexing/${rs?.data?.userId}`);
            setFiles([]);
            // handleSuccess();
            // existPage();
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
            console.log(err)
        }
    }
    const updateIndexing = async () => {
        const id_sign_two = document.getElementById('id_sign_two');

        if (id_sign_two.checked === false) {
            return is_signError();
        } const data = {
            dateAdmitted: dateCommenced, sponsorAddress: cacRegNum, institutionCode: email, optometricRegNum, nokName: nameOfRegPractitionerInCharge,
            institutionAdress: address, matricNum: phone, nokAddress: optometricRegNum, sponsorName: name, userId: idx, status: "Pending"
        }
        const docu = { documents: allFiles };

        try {
            setLoading(true);
            const url = `indexings/update/${practice.id}?senderid=${idx}`;
            const rs = await request(url, 'PATCH', true, data);
            const fs = await request(`documents/upload?name=indexing&id=${practice?.id}`, 'POST', true, docu);
            setLoading(false);
            setFiles([]);
            // handleUpdate();
            // existPage();
        }
        catch (err) {
            setLoading(false);

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
    const updateExit = async () => {
        const id_sign_two = document.getElementById('id_sign_two');

        if (id_sign_two.checked === false) {
            return is_signError();
        } const data = {
            dateAdmitted: dateCommenced, sponsorAddress: cacRegNum, institutionCode: email, optometricRegNum, nokName: nameOfRegPractitionerInCharge,
            institutionAdress: address, matricNum: phone, nokAddress: optometricRegNum, sponsorName: name, userId: idx, status: "Continue"
        }
        const docu = { documents: allFiles };
        try {
            setLoading(true);
            const url = `indexings/update/${practice.id}?senderid=${idx}`;
            const rs = await request(url, 'PATCH', true, data);
            const fs = await request(`documents/upload?name=indexing&id=${practice?.id}`, 'POST', true, docu);
            setLoading(false);
            setFiles([]);
            handleUpdate();
            existPage();
        }
        catch (err) {
            setLoading(false);
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

    const refreshUpdate = useCallback(async () => {
        try {
            setLoading(true);
            const url = `indexings/${practice?.id}`;
            const rs = await request(url, 'GET', true);
            setDocuments(rs.data.documents);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }, [practice?.id]);

    useEffect(() => {
        refreshUpdate();
    }, [refreshUpdate]);
    return (
        <>
            <Card>
                <CardBody>
                    <div className="row">
                        <>{loading === true ? <LoaderGrow /> : ' '}</>
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
                                            Indexing Registration
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
                                            Documents Uploads
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                            <TabContent activeTab={activeArrowTab}>
                                <TabPane id="steparrow-gen-info" tabId={4}>
                                    <div className="col-lg-12">
                                        <div className="card">
                                            <div className="card-header align-items-center d-flex">
                                                <h4 className="card-title mb-0 flex-grow-1">Indexing Registration Form</h4>

                                            </div>
                                            <div className="card-body">
                                                <div className="live-preview">
                                                    <div className="row gy-4">
                                                        <div className="col-xxl-4 col-md-4">
                                                            <div>
                                                                <label htmlFor="basiInput" className="form-label">First Name</label>
                                                                <input type="text" value={user.firstName}
                                                                    className="form-control" id="basiInput"
                                                                    readOnly={true}
                                                                    style={{ background: '#fff' }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-md-4">
                                                            <div>
                                                                <label htmlFor="basiInput" className="form-label">Middle Name</label>
                                                                <input type="text" value={user.otherNames}
                                                                    className="form-control" id="basiInput"
                                                                    // placeholder='Enter middle name'
                                                                    readOnly={true}
                                                                    style={{ background: '#fff' }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-md-4">
                                                            <div>
                                                                <label htmlFor="basiInput" className="form-label">Surname</label>
                                                                <input type="text" value={user.surname}
                                                                    className="form-control" id="basiInput"
                                                                    // placeholder='Enter surname'
                                                                    readOnly={true}
                                                                    style={{ background: '#fff' }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-md-4">
                                                            <div>
                                                                <label htmlFor="placeholderInput" className="form-label">Institution Code Number: ODORBN</label>
                                                                <input type="text" value={practice !== null ? email : email} onChange={(e) => setEmail(e.target.value)} className="form-control"
                                                                    id="placeholderInput" placeholder="Enter institution code number" readOnly={read_only_indexing} style={{ background: '#fff' }} />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-md-4">
                                                            <div>
                                                                <label htmlFor="placeholderInput" className="form-label">Matriculation Number</label>
                                                                <input type="text" value={practice !== null ? phone : phone} onChange={(e) => setPhone(e.target.value)} className="form-control"
                                                                    id="placeholderInput" placeholder="Enter matriculation number" readOnly={read_only_indexing} style={{ background: '#fff' }} />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-md-4">
                                                            <div>
                                                                <label htmlFor="placeholderInput" className="form-label">Phone number</label>
                                                                <input type="text" value={user.phone} className="form-control"
                                                                    id="placeholderInput" readOnly={true}
                                                                    // placeholder="Enter phone number"  
                                                                    style={{ background: '#fff' }} />
                                                            </div>
                                                        </div>

                                                        <div className="col-xxl-4 col-md-4">
                                                            <label htmlFor="placeholderInput" className="form-label">Marital Status</label>
                                                            <input type="text" value={user.maritalStatus}
                                                                className="form-control" id="basiInput"
                                                                // placeholder='Name of practice'
                                                                style={{ background: '#fff' }} readOnly={true}
                                                            />
                                                        </div>
                                                        <div className="col-xxl-4 col-md-4">
                                                            <label htmlFor="placeholderInput" className="form-label">Sex</label>
                                                            <input type="text" value={user.gender}
                                                                className="form-control" id="basiInput"
                                                                // placeholder='Name of practice'
                                                                style={{ background: '#fff' }} readOnly={true}

                                                            />
                                                        </div>
                                                        <div className="col-xxl-4 col-md-4">
                                                            <label htmlFor="placeholderInput" className="form-label">Religion</label>
                                                            {indexing_approval === 'Pending' || indexing_approval === 'processing' ? <input type="text" value={practice.type}
                                                                className="form-control" id="basiInput" placeholder='Name of practice'
                                                                style={{ background: '#fff' }} readOnly

                                                            /> : <select className="form-select mb-3" aria-label="Default select example" onChange={(e) => setType(e.target.value)}>
                                                                <option selected="">Select Religion </option>
                                                                <option value="Islam">Islam</option>
                                                                <option value="Christianity">Christianity</option>
                                                                <option value="Others">Others</option>

                                                            </select>}

                                                        </div>
                                                        <div className="col-xxl-4 col-md-4">
                                                            <div>
                                                                <label htmlFor="placeholderInput" className="form-label">E-mail Address</label>
                                                                <input type="text" className="form-control"
                                                                    value={user.email}
                                                                    // onChange={(e) => setAddress(e.target.value)} placeholder="Enter email address"
                                                                    id="placeholderInput"
                                                                    readOnly={true} style={{ background: '#fff' }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-xxl-4 col-md-4">
                                                            <label htmlFor="placeholderInput" className="form-label" >State of Origin</label>
                                                            <input type="text" className="form-control"
                                                                value={user.state}
                                                                id="placeholderInput"
                                                                //  placeholder="Indexing address"
                                                                readOnly={true} style={{ background: '#fff' }}
                                                            />

                                                        </div>
                                                        <div className="col-xxl-4 col-md-4">
                                                            <label htmlFor="placeholderInput" className="form-label">L.G.A of Origin</label>
                                                            <input type="text" className="form-control"
                                                                value={user.lgaOrigin}
                                                                id="placeholderInput" placeholder="Indexing address"
                                                                readOnly style={{ background: '#fff' }} />
                                                        </div>
                                                        <div className="col-xxl-4 col-md-4">
                                                            <div>
                                                                <label htmlFor="exampleInputdate" className="form-label">Date of Birth</label>

                                                                <input type="text" className="form-control"
                                                                    value={new Date(user.dateOfBirth).toDateString()}
                                                                    id="placeholderInput"
                                                                    // placeholder="Indexing address"
                                                                    readOnly={true} style={{ background: '#fff' }} />

                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-8 col-md-8">
                                                            <div>
                                                                <label htmlFor="basiInput" className="form-label">Place of Birth: L.G.A</label>
                                                                <input type="text"
                                                                    // value={user.placeOfBirth}
                                                                    readOnly={true} style={{ background: '#fff' }}
                                                                    className="form-control" id="basiInput"
                                                                // placeholder='Enter place of birth'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-12 col-md-12">
                                                            <div>
                                                                <label htmlFor="basiInput" className="form-label">Permanent Home Address</label>
                                                                <input type="text"
                                                                    value={user.addressOrigin}
                                                                    readOnly={true} style={{ background: '#fff' }}
                                                                    className="form-control" id="basiInput"
                                                                // placeholder='Enter permanent home address'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-8 col-md-8">
                                                            <div>
                                                                <label htmlFor="validationDefaultUsername" className="form-label">Address of Training Institution</label>
                                                                <input type="text"
                                                                    value={practice !== null ? address : address}
                                                                    onChange={(e) => setAddress(e.target.value)}
                                                                    readOnly={read_only_indexing} style={{ background: '#fff' }}
                                                                    className="form-control" id="validationDefaultUsername" placeholder='Enter training address'
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-md-4">
                                                            <div>
                                                                <label htmlFor="exampleInputdate" className="form-label">Date Admitted Into The Training Institution</label>
                                                                <Flatpickr
                                                                    className="form-control"
                                                                    options={{
                                                                        dateFormat: "d M, Y"
                                                                    }}
                                                                    value={practice !== null ? dateCommenced : dateCommenced}
                                                                    onChange={(e => setDateCommenced(e))}
                                                                    disabled={read_only_indexing}
                                                                    style={{ background: '#fff' }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-md-4">
                                                            <div>
                                                                <label htmlFor="basiInput" className="form-label">Sponsor First Name</label>
                                                                <input type="text" value={practice !== null ? name : name} onChange={(e) => setName(e.target.value)}
                                                                    className="form-control" id="basiInput" placeholder='Enter sponsor first name'
                                                                    readOnly={read_only_indexing}
                                                                    style={{ background: '#fff' }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-md-4">
                                                            <div>
                                                                <label htmlFor="basiInput" className="form-label">Sponsor Middle Name</label>
                                                                <input type="text"
                                                                    // value={practice !== null ? name : name} onChange={(e) => setName(e.target.value)}
                                                                    className="form-control" id="basiInput" placeholder='Enter sponsor middle name'
                                                                    readOnly={read_only_indexing}
                                                                    style={{ background: '#fff' }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-md-4">
                                                            <div>
                                                                <label htmlFor="basiInput" className="form-label">Sponsor Surname</label>
                                                                <input type="text"
                                                                    // value={practice !== null ? name : name}
                                                                    // onChange={(e) => setName(e.target.value)}
                                                                    className="form-control" id="basiInput" placeholder='Enter sponsor surname'
                                                                    readOnly={read_only_indexing}
                                                                    style={{ background: '#fff' }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-12 col-md-12">
                                                            <div>
                                                                <label htmlFor="basiInput" className="form-label">Address of Sponsor</label>
                                                                <input type="text"
                                                                    value={practice !== null ? cacRegNum : cacRegNum}
                                                                    onChange={(e) => setCacRegNum(e.target.value)}
                                                                    readOnly={read_only_indexing} style={{ background: '#fff' }}
                                                                    className="form-control" id="basiInput" placeholder='Enter sponsor address' />
                                                            </div>
                                                        </div>

                                                        <div className="col-xxl-4 col-md-4">
                                                            <div>
                                                                <label htmlFor="basiInput" className="form-label">Next of Kin First Name</label>
                                                                <input type="text" value={practice !== null ? nameOfRegPractitionerInCharge : nameOfRegPractitionerInCharge}
                                                                    onChange={(e) => setNameOfRegPractitionerInCharge(e.target.value)}
                                                                    className="form-control" id="basiInput" placeholder='Enter next of kin first name'
                                                                    readOnly={read_only_indexing}
                                                                    style={{ background: '#fff' }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-md-4">
                                                            <div>
                                                                <label htmlFor="basiInput" className="form-label">Next of Kin Middle Name</label>
                                                                <input type="text"
                                                                    // value={practice !== null ? name : name} onChange={(e) => setName(e.target.value)}
                                                                    className="form-control" id="basiInput" placeholder='Enter next of kin middle name'
                                                                    readOnly={read_only_indexing}
                                                                    style={{ background: '#fff' }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-4 col-md-4">
                                                            <div>
                                                                <label htmlFor="basiInput" className="form-label">Next of Kin Surname</label>
                                                                <input type="text"
                                                                    // value={practice !== null ? name : name} onChange={(e) => setName(e.target.value)}
                                                                    className="form-control" id="basiInput" placeholder='Enter next of kin surname'
                                                                    readOnly={read_only_indexing}
                                                                    style={{ background: '#fff' }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-12 col-md-12">
                                                            <div>
                                                                <label htmlFor="basiInput" className="form-label">Address of Next of Kin</label>
                                                                <input type="text"
                                                                    value={practice !== null ? optometricRegNum : optometricRegNum}
                                                                    onChange={(e) => setOptometricRegNum(e.target.value)}
                                                                    readOnly={read_only_indexing} style={{ background: '#fff' }}
                                                                    className="form-control" id="basiInput" placeholder='Enter next of kin address' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-6">
                                        <div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="id_sign_one" />
                                                <label className="form-check-label" htmlFor="gridCheck">
                                                    I HEREBY DECLARE THAT THE INFORMATION GIVEN IN THIS APPLICATION IS CORRECT TO THE BEST OF MY KNOWLEDGE .
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-start gap-3 mt-4">
                                        <div className="text-end">
                                            <button type="button" onClick={() => existPage()} className="btn btn-primary" >Go Back</button>
                                        </div>
                                        <button
                                            type="button"
                                            className="btn  btn-label right ms-auto nexttab nexttab"
                                            style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }} onClick={() => {
                                                toggleArrowTab(activeArrowTab + 1);
                                            }}
                                        >
                                            <i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>
                                            Next
                                        </button>
                                    </div>
                                </TabPane>

                                <TabPane id="steparrow-description-info" tabId={5}>
                                    <div>
                                        <div className="card-header align-items-center d-flex">
                                            <h4 className="card-title mb-0 flex-grow-1">Indexing Registration Documents Uploads</h4>
                                        </div>
                                        <Row>
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
                                            <Row>
                                                <div className="col-lg-12 col-md-6">
                                                    <div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="checkbox" id="id_sign_two" />
                                                            <label className="form-check-label" htmlFor="gridCheck">
                                                                I HEREBY DECLARE THAT THE INFORMATION GIVEN IN THIS APPLICATION IS CORRECT TO THE BEST OF MY KNOWLEDGE .
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Row>
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

                                        {indexing_approval !== ' ' ?

                                            <div className='right  ms-auto'>
                                                <button
                                                    type="button"
                                                    className="btn  right ms-auto mx-2"
                                                    style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}
                                                    onClick={() => {
                                                        updateExit();
                                                        // toggleArrowTab(activeArxxxrowTab + 1);
                                                    }}
                                                    disabled={read_only_indexing}
                                                >
                                                    Update and Exit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn right ms-auto"
                                                    style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}
                                                    onClick={() => {
                                                        updateIndexing();
                                                        // toggleArrowTab(activeArrowTab + 1);
                                                    }}
                                                    disabled={read_only_indexing}
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
                                                        submitExistIndexing();
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
                                                        createIndexing();
                                                    }}
                                                >
                                                    Submit
                                                </button>
                                            </div>}

                                    </div>
                                </TabPane>
                            </TabContent>
                        </Form>
                    </div>
                </CardBody>
            </Card>
        </>
    )
}

export default PracticeRegIndection