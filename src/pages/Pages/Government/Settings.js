import React, { useEffect, useState, useCallback, useContext } from 'react';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from "classnames";
import MetaTags from 'react-meta-tags';
import Flatpickr from "react-flatpickr";
import { request } from '../../../services/utilities';


//import images
import progileBg from '../../../assets/images/profile-bg.jpg';
import avatar1 from '../../../assets/images/users/avatar-1.jpg';
import { LoaderGrow } from '../../AdvanceUi/Loader/loader';
import SSRStorage from '../../../services/storage';
import { TOKEN_COOKIE, USER_COOKIE } from '../../../services/constants';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Store } from '../../../services/store';
const MySwal = withReactContent(Swal);

const storage = new SSRStorage();


const Settings = () => {
    const store = useContext(Store);
    const [user_type, setUser_type] = store.user_type;

    const [first_name, setFirst_name] = useState('');
    const [middle_name, setMiddle_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [phone_one, setPhone_one] = useState('');
    const [phone_two, setPhone_two] = useState('');
    const [selected_state, setSelected_state] = useState('');

    const [email, setEmail] = useState('');
    const [isImage, setIsImage] = useState(false);

    const [permanent_address, setPermanent_Address] = useState('');
    const [date, setDate] = useState();
    const [state_of_origin, setState_of_origin] = useState([]);
    const [local_gov, setLocal_gov] = useState([]);
    const [selected_lga, setSelected_lga] = useState('');
    const [religion, setReligion] = useState('');
    const [place_of_birth, setPlace_of_birth] = useState('');
    const [city, setCity] = useState('');
    const [nationality, setNationality] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');  // setGender(rs.gender);
    const [maritalStatus, setMaritalStatus] = useState('');      // setMaritalStatus(rs.maritalStatus)
    const [maidenName, setMaidenName] = useState('');     // setMaidenName(rs.maidenName)
    const [image, setImage] = useState(null);    // setImage(rs.passport);
    const [previousNames, setPreviousNames] = useState('');   // setPreviousNames(rs.previousNames)
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState('');

    const [aUser, setAUser] = useState([]);
    const [is_criminal_record, setIs_criminal_record] = useState(null);
    const [is_sentence_record, setIs_sentence_record] = useState(null);
    const [is_drug_issue, setIs_drug_issue] = useState(null);
    const [is_sign, setIs_sign] = useState(false);

    const [if_explain, setIf_explain] = useState('');
    const id = useParams();
    const history = useHistory();
    const [activeTab, setActiveTab] = useState("1");
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const token = query.get('token');



    const tabChange = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const handleSuccess = () => {
        return MySwal.fire({
            title: 'Good job!',
            text: 'Update Successful!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        })
    }
    const handleError = () => {
        return MySwal.fire({
            title: 'Sorry!',
            text: ' Can not update profile!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })
    }
    const handleErrorVerify = () => {
        return MySwal.fire({
            title: 'Opps!',
            text: ' Please verify your email!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2500
        })
    }
    const cancel = () => {
        console.log(phone_one);
        if (first_name === '' || first_name === null || last_name === '' || last_name === null || phone_one === '' || phone_one === null) {
            return MySwal.fire({
                title: 'Opps!',
                text: ' Please fill the form completely!',
                icon: 'warning',
                showConfirmButton: false,
                timer: 2500
            })
        } else {
            let x = `/${user_type}-dashboard`;
            history.push(x);
        }
    }

    const updateAdmin = async () => {
        const data = {
            firstName: first_name, otherNames: middle_name, surname: last_name, phone: phone_one, phone2: phone_one,
            addressOrigin: permanent_address, dateOfBirth: date, stateOfOrigin: selected_state, lgaOrigin: selected_lga, city, nationality, address,
            passport: image, maritalStatus, previousNames, maidenName, gender: gender, religion, placeOfBirth: place_of_birth, isConvicted: is_criminal_record,
            isSentenced: is_sentence_record, hasDrugIssue: is_drug_issue, drugUseDetails: if_explain
        }
        // console.log(data.passport)
        if (first_name === '' || first_name === null || last_name === '' || last_name === null || phone_one === '' || phone_one === null) {
            return MySwal.fire({
                title: 'Opps!',
                text: ' Please fill the form completely!',
                icon: 'warning',
                showConfirmButton: false,
                timer: 2500
            })
        }
        try {
            setLoading(true)
            const url = `users/update/${id.id}?senderid=${id.id}`;
            const rs = await request(url, 'PATCH', true, data);
            setLoading(false);
            handleSuccess();
            history.push(`/${user_type}-dashboard`);
        } catch (err) {
            setLoading(false);
            if (err.message === 'please verify your email before updating profile') {
                return handleErrorVerify()
            }
            else {
                handleError();
            }
            console.log(err);
        }
    }
    const uploadImage = (e) => {
        setLoading(true)
        const formData = new FormData();
        let file = e;
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
                // console.log(data);
                setLoading(false);
                setImage(data.secure_url);
                setIsImage(true)
                setLoading(false);
                return MySwal.fire({
                    title: 'Good job!',
                    text: 'Image Uploaded Successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                })
            });
    }
    const onChange = e => {
        const reader = new FileReader(),
            files = e.target.files;
        setImage(e.target.files[0]);
        uploadImage(e.target.files[0]);
        reader.onload = function () {
            setAvatar(reader.result);
        }
        reader.readAsDataURL(files[0]);
    }

    const fetchStates = async () => {
        const url = `migrations/states`;
        try {
            const rs = await request(url, 'GET', true);
            // console.log(rs);
            setState_of_origin(rs.states);

        } catch (err) {
            console.log(err);
        }
    }
    const fetchLga = async (state) => {
        const url = `migrations/lgas?state=${state}`;
        try {
            const rs = await request(url, 'GET', true);
            // console.log(rs);
            setLocal_gov(rs.lgas);
        } catch (err) {
            console.log(err);
        }
    }
    const fetchEditUser = useCallback(async () => {
        if (token !== null) {
            const setToken = { accessToken: token }
            storage.setItem(TOKEN_COOKIE, setToken);
        }
        try {
            setLoading(true);
            const url = `users/${id.id}`;
            const rs = await request(url, 'GET', true);
            const userData = rs.data;
            storage.setItem(USER_COOKIE, userData);
            // console.log(rs.data)
            setAUser(rs.data)
            setEmail(rs.data.email)
            setFirst_name(rs.data.firstName);
            setMiddle_name(rs.data.otherNames);
            setLast_name(rs.data.surname);
            setPhone_one(rs.data.phone);
            setPhone_two(rs.data.phone2);
            setSelected_lga(rs.data.lgaOrigin);
            setSelected_state(rs.data.stateOfOrigin);
            setCity(rs.data.city);
            setDate(rs.data.dateOfBirth);
            setAddress(rs.data.address);
            setReligion(rs.data.religion);
            setPlace_of_birth(rs.data.placeOfBirth)
            setNationality(rs.data.nationality);
            setPermanent_Address(rs.data.addressOrigin);
            setGender(rs.data.gender);
            setMaritalStatus(rs.data.maritalStatus)
            setMaidenName(rs.data.maidenName)
            setImage(rs.data.passport);
            setPreviousNames(rs.data.previousNames);
            setIs_criminal_record(rs.data.isConvicted);
            setIs_sentence_record(rs.data.isSentenced);
            setIs_drug_issue(rs.data.hasDrugIssue);
            setIf_explain(rs.data.drugUseDetails)
            setUser_type(rs.data.type)
            setLoading(false)

        } catch (err) {
            setLoading(false);
            handleError();
            console.log(err);
        }
    }, [id.id, token, setUser_type])

    useEffect(() => {
        fetchEditUser();
        fetchStates();
    }, [fetchEditUser]);
    return (
        <React.Fragment>
            <div className="page-content">
                <MetaTags>
                    <title>Profile Settings | ORORBN</title>
                </MetaTags>
                <>{loading === true ? <LoaderGrow /> : ''}</>

                <Container fluid>
                    <div className="position-relative mx-n4 mt-n4">
                        <div className="profile-wid-bg profile-setting-img">
                            <img src={progileBg} className="profile-wid-img" alt="" />
                        </div>
                    </div>
                    <Row>
                        <Col xxl={3}>
                            <Card className="mt-n5">
                                <CardBody className="p-4">
                                    <div className="text-center">
                                        {/* <button type="button" onClick={() => uploadImage()}
                                            className="btn mx-2 mt-5" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}>
                                            Save</button> */}
                                        <div className="profile-user position-relative d-inline-block mx-auto  mb-4">

                                            <img src={image === null || image === undefined ? avatar1 : image}
                                                className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                                                alt="user-profile" />
                                            <div className="avatar-xs p-0 rounded-circle profile-photo-edit">

                                                <Input id="profile-img-file-input" type="file" onChange={onChange} hidden accept='image/*'
                                                    className="profile-img-file-input" />
                                                <Label htmlFor="profile-img-file-input"
                                                    className="profile-photo-edit avatar-xs">
                                                    <span className="avatar-title rounded-circle bg-light text-body">
                                                        <i className="ri-camera-fill"></i>
                                                    </span>
                                                </Label>
                                            </div>
                                        </div>

                                        <h5 className="fs-16 mb-1 text-capitalize">{aUser.firstName} {aUser.surname}</h5>
                                        {/* <p className="text-muted mb-0">Lead Designer / Developer</p> */}
                                    </div>
                                </CardBody>
                            </Card>


                        </Col>

                        <Col xxl={9}>
                            <Card className="mt-xxl-n5">
                                <CardHeader>
                                    <Nav className="nav-tabs-custom rounded card-header-tabs border-bottom-0"
                                        role="tablist">
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: activeTab === "1" })}
                                                onClick={() => {
                                                    tabChange("1");
                                                }}>
                                                <i className="fas fa-home"></i>
                                                Personal Details
                                            </NavLink>
                                        </NavItem>
                                        {/* <NavItem>
                                            <NavLink to="#"
                                                className={classnames({ active: activeTab === "2" })}
                                                onClick={() => {
                                                    tabChange("2");
                                                }}
                                                type="button">
                                                <i className="far fa-user"></i>
                                                Change Password
                                            </NavLink>
                                        </NavItem>
                                        <NavItem >
                                            <NavLink to="#"
                                                className={classnames({ active: activeTab === "3" })}
                                                onClick={() => {
                                                    tabChange("3");
                                                }}
                                                type="button">
                                                <i className="far fa-envelope"></i>
                                                Experience
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink to="#"
                                                className={classnames({ active: activeTab === "4" })}
                                                onClick={() => {
                                                    tabChange("4");
                                                }}
                                                type="button">
                                                <i className="far fa-envelope"></i>
                                                Privacy Policy
                                            </NavLink>
                                        </NavItem> */}
                                    </Nav>
                                </CardHeader>
                                <CardBody className="p-4">
                                    <TabContent activeTab={activeTab}>
                                        <TabPane tabId="1">
                                            <Form>
                                                <Row>
                                                    <Col lg={4}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="firstnameInput" className="form-label">First
                                                                Name</Label>
                                                            <Input type="text" className="form-control" id="firstnameInput"
                                                                placeholder="Enter your firstname"
                                                                value={first_name}
                                                                onChange={(e) => setFirst_name(e.target.value)} />
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="firstnameInput" className="form-label">Middle
                                                                Name</Label>
                                                            <Input type="text" className="form-control" id="firstnameInput"
                                                                placeholder="Enter your Middle Name" value={middle_name}
                                                                onChange={(e) => setMiddle_name(e.target.value)}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="lastnameInput" className="form-label">Last
                                                                Name</Label>
                                                            <Input type="text" className="form-control" id="lastnameInput"
                                                                placeholder="Enter your last name" value={last_name}
                                                                onChange={(e) => setLast_name(e.target.value)}
                                                            />
                                                        </div>
                                                    </Col>

                                                    <Col lg={4}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="phonenumberInput" className="form-label">Gender
                                                            </Label>
                                                            <select className="form-select mb-3" onChange={(e) => setGender(e.target.value)}>
                                                                <option >Select your Gender </option>
                                                                <option value='Male'>Male</option>
                                                                <option value="Female">Female</option>
                                                            </select>
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="phonenumberInput" className="form-label">Phone
                                                                Number</Label>
                                                            <Input type="text" className="form-control"
                                                                id="phonenumberInput"
                                                                placeholder="Enter your phone number"
                                                                value={phone_one}
                                                                onChange={(e) => setPhone_one(e.target.value)}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="emailInput" className="form-label">Email
                                                                Address</Label>
                                                            <Input type="email" className="form-control" id="emailInput"
                                                                placeholder="Enter your email"
                                                                value={email}
                                                                readOnly
                                                                style={{ background: '#fff' }}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="skillsInput" className="form-label">State of Origin</Label>
                                                            <select className="form-select mb-3 text-capitalize" value={selected_state} onChange={(e) => {
                                                                setSelected_state(e.target.value);
                                                                fetchLga(e.target.value);
                                                            }} aria-label="Default select example">
                                                                {state_of_origin.map(e => {
                                                                    return (
                                                                        <option key={e.id} className=' text-capitalize'>{e}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="skillsInput" className="form-label">Local Government</Label>
                                                            <select className="form-select mb-3 text-capitalize" value={selected_lga} onChange={(e) => setSelected_lga(e.target.value)} aria-label="Default select example">
                                                                {local_gov.map(e => {
                                                                    return (
                                                                        <option className='text-capitalize' key={e.id} >{e}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="skillsInput" className="form-label">City</Label>
                                                            <Input type="text" className="form-control" id="emailInput"
                                                                placeholder="Enter city"
                                                                value={city}
                                                                onChange={(e) => setCity(e.target.value)}
                                                                style={{ background: '#fff' }}
                                                            />
                                                            {/* <select className="form-select mb-3">
                                                                <option >Select your City </option>
                                                                <option value='karu'>Karu</option>
                                                                <option value="Wuse">Wuse</option>
                                                                <option value="Maitama">Maitama</option>
                                                                <option value="Area One">Area One</option>
                                                                <option value="Pape">Pape</option>
                                                            </select> */}
                                                        </div>
                                                    </Col>

                                                    <Col lg={4}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="skillsInput" className="form-label" >Marital Status</Label>
                                                            <select className="form-select mb-3" onChange={(e) => setMaritalStatus(e.target.value)}>
                                                                <option >Select your Marital Status </option>
                                                                <option value='Married'>Married</option>
                                                                <option value="Single">Single</option>
                                                            </select>
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="emailInput" className="form-label">Maiden Name if Married</Label>
                                                            <Input type="email" className="form-control" id="emailInput"
                                                                placeholder="Enter maiden name if married"
                                                                value={maidenName}
                                                                onChange={(e) => setMaidenName(e.target.value)}
                                                                style={{ background: '#fff' }}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="emailInput" className="form-label">Previous Name if Any  </Label>
                                                            <Input type="email" className="form-control" id="emailInput"
                                                                placeholder="Enter  previous name"
                                                                value={previousNames}
                                                                onChange={e => setPreviousNames(e.target.value)}
                                                                style={{ background: '#fff' }}
                                                            />
                                                        </div>
                                                    </Col>


                                                    <Col lg={4}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="JoiningdatInput" className="form-label">Date of
                                                                Birth</Label>
                                                            <Flatpickr
                                                                className="form-control"
                                                                options={{
                                                                    dateFormat: "d M, Y"
                                                                }}
                                                                value={date}
                                                                onChange={e => setDate(e)}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="skillsInput" className="form-label" >Religion</Label>
                                                            <select className="form-select mb-3" onChange={(e) => setReligion(e.target.value)}>
                                                                <option >Select your Religion </option>
                                                                <option value='Islam'>Islam</option>
                                                                <option value="Christianity">Christianity</option>
                                                                <option value="Others">Others</option>
                                                            </select>
                                                        </div>
                                                    </Col>
                                                    <Col lg={4}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="cityInput" className="form-label">Nationality</Label>
                                                            <Input type="text" className="form-control" id="cityInput"
                                                                placeholder="Nationality" value={nationality}
                                                                onChange={e => setNationality(e.target.value)}
                                                            />
                                                        </div>
                                                    </Col>

                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="designationInput"
                                                                className="form-label">Address</Label>
                                                            <Input type="text" className="form-control"
                                                                id="designationInput" placeholder="Address"
                                                                value={address}
                                                                onChange={e => setAddress(e.target.value)}
                                                            />
                                                        </div>
                                                    </Col>

                                                    <Col lg={6}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="cityInput" className="form-label">Place of Birth</Label>
                                                            <Input type="text" className="form-control" id="cityInput"
                                                                placeholder="Nationality" value={place_of_birth}
                                                                onChange={e => setPlace_of_birth(e.target.value)}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="websiteInput1"
                                                                className="form-label">Permanent Address</Label>
                                                            <Input type="text" className="form-control" id="websiteInput1"
                                                                placeholder="permanent address" value={permanent_address}
                                                                onChange={e => setPermanent_Address(e.target.value)}
                                                            />
                                                        </div>
                                                    </Col>
                                                    {user_type !== 'facility' ? <div>
                                                        <div className="col-lg-12 col-md-6">
                                                            <div>
                                                                <div className="col-lg-12">
                                                                    <fieldset className="row mb-3 mr-3">
                                                                        <legend className="col-form-label col-sm-8 pt-0">  Do you have a previous conviction or criminal records?</legend>
                                                                        <div className="col-sm-4">
                                                                            <div className="form-check form-check-inline">
                                                                                <input className="form-check-input"
                                                                                    value={email !== null ? is_criminal_record : is_criminal_record}
                                                                                    checked={is_criminal_record === true ? true : null}
                                                                                    onChange={() => setIs_criminal_record(true)}
                                                                                    type="radio" />
                                                                                <label className="form-check-label" htmlFor="allTransactions">Yes</label>
                                                                            </div>
                                                                            <div className="form-check form-check-inline">
                                                                                <input className="form-check-input"
                                                                                    value={email !== null ? is_criminal_record : is_criminal_record}
                                                                                    checked={is_criminal_record === false ? true : null}
                                                                                    onChange={() => setIs_criminal_record(false)}
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
                                                                                    value={email !== null ? is_sentence_record : is_sentence_record}
                                                                                    checked={is_sentence_record === true ? true : null}
                                                                                    onChange={() => setIs_sentence_record(true)}
                                                                                    type="radio" />
                                                                                <label className="form-check-label" htmlFor="allTransactions">Yes</label>
                                                                            </div>

                                                                            <div className="form-check form-check-inline">
                                                                                <input className="form-check-input"
                                                                                    value={email !== null ? is_sentence_record : is_sentence_record}
                                                                                    checked={is_sentence_record === false ? true : null}
                                                                                    onChange={() => setIs_sentence_record(false)}
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
                                                                                    value={email !== null ? is_drug_issue : is_drug_issue}
                                                                                    checked={is_drug_issue === true ? true : null}
                                                                                    // value={is_drug_issue}
                                                                                    onChange={() => setIs_drug_issue(true)}
                                                                                    type="radio" />
                                                                                <label className="form-check-label" htmlFor="allTransactions">Yes</label>
                                                                            </div>
                                                                            <div className="form-check form-check-inline">
                                                                                <input className="form-check-input"
                                                                                    value={email !== null ? is_drug_issue : is_drug_issue}
                                                                                    checked={is_drug_issue === false ? true : null}
                                                                                    onChange={() => setIs_drug_issue(false)}
                                                                                    type="radio" />
                                                                                <label className="form-check-label" htmlFor="allTransactions">No</label>
                                                                            </div>

                                                                        </div>
                                                                    </fieldset>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xxl-12 col-md-12 mb-4">
                                                            <div>
                                                                <label htmlFor="placeholderInput" className="form-label">If yes, explain and state current position </label>
                                                                <input type="text" value={if_explain} onChange={(e) => setIf_explain(e.target.value)}
                                                                    className="form-control" id="placeholderInput" placeholder="Explain" />
                                                            </div>
                                                        </div>
                                                    </div> : ''}

                                                    <Col lg={12}>
                                                        <div className="hstack gap-2 justify-content-end">
                                                            <button type="button" onClick={() => updateAdmin()}
                                                                className="btn" style={{ background: ' rgb(0, 58, 3)', color: '#fff', borderColor: '1px solid rgb(0,58,3)' }}>Update Profile</button>
                                                            <Link to='#' onClick={cancel}>
                                                                <button type="button"
                                                                    className="btn btn-soft-danger" >Cancel</button>
                                                            </Link>

                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </TabPane>

                                        {/* <TabPane tabId="2">
                                            <Form>
                                                <Row className="g-2">
                                                    <Col lg={4}>
                                                        <div>
                                                            <Label htmlFor="oldpasswordInput" className="form-label">Old
                                                                Password*</Label>
                                                            <Input type="password" className="form-control"
                                                                id="oldpasswordInput"
                                                                placeholder="Enter current password" />
                                                        </div>
                                                    </Col>

                                                    <Col lg={4}>
                                                        <div>
                                                            <Label htmlFor="newpasswordInput" className="form-label">New
                                                                Password*</Label>
                                                            <Input type="password" className="form-control"
                                                                id="newpasswordInput" placeholder="Enter new password" />
                                                        </div>
                                                    </Col>

                                                    <Col lg={4}>
                                                        <div>
                                                            <Label htmlFor="confirmpasswordInput" className="form-label">Confirm
                                                                Password*</Label>
                                                            <Input type="password" className="form-control"
                                                                id="confirmpasswordInput"
                                                                placeholder="Confirm password" />
                                                        </div>
                                                    </Col>

                                                    <Col lg={12}>
                                                        <div className="mb-3">
                                                            <Link to="#"
                                                                className="link-primary text-decoration-underline">Forgot
                                                                Password ?</Link>
                                                        </div>
                                                    </Col>

                                                    <Col lg={12}>
                                                        <div className="text-end">
                                                            <button type="button" className="btn btn-success">Change
                                                                Password</button>
                                                        </div>
                                                    </Col>

                                                </Row>

                                            </Form>
                                            <div className="mt-4 mb-3 border-bottom pb-2">
                                                <div className="float-end">
                                                    <Link to="#" className="link-primary">All Logout</Link>
                                                </div>
                                                <h5 className="card-title">Login History</h5>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="flex-shrink-0 avatar-sm">
                                                    <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                        <i className="ri-smartphone-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>iPhone 12 Pro</h6>
                                                    <p className="text-muted mb-0">Los Angeles, United States - March 16 at
                                                        2:47PM</p>
                                                </div>
                                                <div>
                                                    <Link to="#">Logout</Link>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="flex-shrink-0 avatar-sm">
                                                    <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                        <i className="ri-tablet-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Apple iPad Pro</h6>
                                                    <p className="text-muted mb-0">Washington, United States - November 06
                                                        at 10:43AM</p>
                                                </div>
                                                <div>
                                                    <Link to="#">Logout</Link>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="flex-shrink-0 avatar-sm">
                                                    <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                        <i className="ri-smartphone-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Galaxy S21 Ultra 5G</h6>
                                                    <p className="text-muted mb-0">Conneticut, United States - June 12 at
                                                        3:24PM</p>
                                                </div>
                                                <div>
                                                    <Link to="#">Logout</Link>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="flex-shrink-0 avatar-sm">
                                                    <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                                                        <i className="ri-macbook-line"></i>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6>Dell Inspiron 14</h6>
                                                    <p className="text-muted mb-0">Phoenix, United States - July 26 at
                                                        8:10AM</p>
                                                </div>
                                                <div>
                                                    <Link to="#">Logout</Link>
                                                </div>
                                            </div>
                                        </TabPane> */}

                                        {/* <TabPane tabId="3">
                                            <form>
                                                <div id="newlink">
                                                    <div id="1">
                                                        <Row>
                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="jobTitle" className="form-label">Job
                                                                        Title</Label>
                                                                    <Input type="text" className="form-control"
                                                                        id="jobTitle" placeholder="Job title"
                                                                        defaultValue="Lead Designer / Developer" />
                                                                </div>
                                                            </Col>

                                                            <Col lg={6}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="companyName" className="form-label">Company
                                                                        Name</Label>
                                                                    <Input type="text" className="form-control"
                                                                        id="companyName" placeholder="Company name"
                                                                        defaultValue="Themesbrand" />
                                                                </div>
                                                            </Col>

                                                            <Col lg={6}>
                                                                <div className="mb-3">
                                                                    <label htmlFor="experienceYear"
                                                                        className="form-label">Experience Years</label>
                                                                    <Row>
                                                                        <Col lg={5}>
                                                                            <select className="form-control" data-choices
                                                                                data-choices-search-false
                                                                                name="experienceYear"
                                                                                id="experienceYear">
                                                                                <option defaultValue="">Select years</option>
                                                                                <option value="Choice 1">2001</option>
                                                                                <option value="Choice 2">2002</option>
                                                                                <option value="Choice 3">2003</option>
                                                                                <option value="Choice 4">2004</option>
                                                                                <option value="Choice 5">2005</option>
                                                                                <option value="Choice 6">2006</option>
                                                                                <option value="Choice 7">2007</option>
                                                                                <option value="Choice 8">2008</option>
                                                                                <option value="Choice 9">2009</option>
                                                                                <option value="Choice 10">2010</option>
                                                                                <option value="Choice 11">2011</option>
                                                                                <option value="Choice 12">2012</option>
                                                                                <option value="Choice 13">2013</option>
                                                                                <option value="Choice 14">2014</option>
                                                                                <option value="Choice 15">2015</option>
                                                                                <option value="Choice 16">2016</option>
                                                                                <option value="Choice 17" >2017</option>
                                                                                <option value="Choice 18">2018</option>
                                                                                <option value="Choice 19">2019</option>
                                                                                <option value="Choice 20">2020</option>
                                                                                <option value="Choice 21">2021</option>
                                                                                <option value="Choice 22">2022</option>
                                                                            </select>
                                                                        </Col>

                                                                        <div className="col-auto align-self-center">
                                                                            to
                                                                        </div>

                                                                        <Col lg={5}>
                                                                            <select className="form-control" data-choices
                                                                                data-choices-search-false
                                                                                name="choices-single-default2">
                                                                                <option defaultValue="">Select years</option>
                                                                                <option value="Choice 1">2001</option>
                                                                                <option value="Choice 2">2002</option>
                                                                                <option value="Choice 3">2003</option>
                                                                                <option value="Choice 4">2004</option>
                                                                                <option value="Choice 5">2005</option>
                                                                                <option value="Choice 6">2006</option>
                                                                                <option value="Choice 7">2007</option>
                                                                                <option value="Choice 8">2008</option>
                                                                                <option value="Choice 9">2009</option>
                                                                                <option value="Choice 10">2010</option>
                                                                                <option value="Choice 11">2011</option>
                                                                                <option value="Choice 12">2012</option>
                                                                                <option value="Choice 13">2013</option>
                                                                                <option value="Choice 14">2014</option>
                                                                                <option value="Choice 15">2015</option>
                                                                                <option value="Choice 16">2016</option>
                                                                                <option value="Choice 17">2017</option>
                                                                                <option value="Choice 18">2018</option>
                                                                                <option value="Choice 19">2019</option>
                                                                                <option value="Choice 20">2020</option>
                                                                                <option value="Choice 21">2021</option>
                                                                                <option value="Choice 22">2022</option>
                                                                            </select>
                                                                        </Col>
                                                                    </Row>
                                                                </div>
                                                            </Col>

                                                            <Col lg={12}>
                                                                <div className="mb-3">
                                                                    <Label htmlFor="jobDescription" className="form-label">Job
                                                                        Description</Label>
                                                                   
                                                                </div>
                                                            </Col>

                                                            <div className="hstack gap-2 justify-content-end">
                                                                <Link className="btn btn-success"
                                                                    to="#">Delete</Link>
                                                            </div>
                                                        </Row>
                                                    </div>
                                                </div>
                                                <div id="newForm" style={{ "display": "none" }}>
                                                </div>

                                                <Col lg={12}>
                                                    <div className="hstack gap-2">
                                                        <button type="submit" className="btn btn-success">Update</button>
                                                        <Link to="#" className="btn btn-primary">Add
                                                            New</Link>
                                                    </div>
                                                </Col>
                                            </form>
                                        </TabPane> */}

                                        {/* <TabPane tabId="4">
                                            <div className="mb-4 pb-2">
                                                <h5 className="card-title text-decoration-underline mb-3">Security:</h5>
                                                <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0">
                                                    <div className="flex-grow-1">
                                                        <h6 className="fs-14 mb-1">Two-factor Authentication</h6>
                                                        <p className="text-muted">Two-factor authentication is an enhanced
                                                            security meansur. Once enabled, you'll be required to give
                                                            two types of identification when you log into Google
                                                            Authentication and SMS are Supported.</p>
                                                    </div>
                                                    <div className="flex-shrink-0 ms-sm-3">
                                                        <Link to="#"
                                                            className="btn btn-sm btn-primary">Enable Two-facor
                                                            Authentication</Link>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                                                    <div className="flex-grow-1">
                                                        <h6 className="fs-14 mb-1">Secondary Verification</h6>
                                                        <p className="text-muted">The first factor is a password and the
                                                            second commonly includes a text with a code sent to your
                                                            smartphone, or biometrics using your fingerprint, face, or
                                                            retina.</p>
                                                    </div>
                                                    <div className="flex-shrink-0 ms-sm-3">
                                                        <Link to="#" className="btn btn-sm btn-primary">Set
                                                            up secondary method</Link>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
                                                    <div className="flex-grow-1">
                                                        <h6 className="fs-14 mb-1">Backup Codes</h6>
                                                        <p className="text-muted mb-sm-0">A backup code is automatically
                                                            generated for you when you turn on two-factor authentication
                                                            through your iOS or Android Twitter app. You can also
                                                            generate a backup code on twitter.com.</p>
                                                    </div>
                                                    <div className="flex-shrink-0 ms-sm-3">
                                                        <Link to="#"
                                                            className="btn btn-sm btn-primary">Generate backup codes</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <h5 className="card-title text-decoration-underline mb-3">Application Notifications:</h5>
                                                <ul className="list-unstyled mb-0">
                                                    <li className="d-flex">
                                                        <div className="flex-grow-1">
                                                            <label htmlFor="directMessage"
                                                                className="form-check-label fs-14">Direct messages</label>
                                                            <p className="text-muted">Messages from people you follow</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input className="form-check-input" type="checkbox"
                                                                    role="switch" id="directMessage" defaultChecked />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex mt-2">
                                                        <div className="flex-grow-1">
                                                            <Label className="form-check-label fs-14"
                                                                htmlFor="desktopNotification">
                                                                Show desktop notifications
                                                            </Label>
                                                            <p className="text-muted">Choose the option you want as your
                                                                default setting. Block a site: Next to "Not allowed to
                                                                send notifications," click Add.</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input className="form-check-input" type="checkbox"
                                                                    role="switch" id="desktopNotification" defaultChecked />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex mt-2">
                                                        <div className="flex-grow-1">
                                                            <Label className="form-check-label fs-14"
                                                                htmlFor="emailNotification">
                                                                Show email notifications
                                                            </Label>
                                                            <p className="text-muted"> Under Settings, choose Notifications.
                                                                Under Select an account, choose the account to enable
                                                                notifications for. </p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input className="form-check-input" type="checkbox"
                                                                    role="switch" id="emailNotification" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex mt-2">
                                                        <div className="flex-grow-1">
                                                            <Label className="form-check-label fs-14"
                                                                htmlFor="chatNotification">
                                                                Show chat notifications
                                                            </Label>
                                                            <p className="text-muted">To prevent duplicate mobile
                                                                notifications from the Gmail and Chat apps, in settings,
                                                                turn off Chat notifications.</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input className="form-check-input" type="checkbox"
                                                                    role="switch" id="chatNotification" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex mt-2">
                                                        <div className="flex-grow-1">
                                                            <Label className="form-check-label fs-14"
                                                                htmlFor="purchaesNotification">
                                                                Show purchase notifications
                                                            </Label>
                                                            <p className="text-muted">Get real-time purchase alerts to
                                                                protect yourself from fraudulent charges.</p>
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div className="form-check form-switch">
                                                                <Input className="form-check-input" type="checkbox"
                                                                    role="switch" id="purchaesNotification" />
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="card-title text-decoration-underline mb-3">Delete This
                                                    Account:</h5>
                                                <p className="text-muted">Go to the Data & Privacy section of your profile
                                                    Account. Scroll to "Your data & privacy options." Delete your
                                                    Profile Account. Follow the instructions to delete your account :
                                                </p>
                                                <div>
                                                    <Input type="password" className="form-control" id="passwordInput"
                                                        placeholder="Enter your password" defaultValue="make@321654987"
                                                        style={{ maxWidth: "265px" }} />
                                                </div>
                                                <div className="hstack gap-2 mt-3">
                                                    <Link to="#" className="btn btn-soft-danger">Close &
                                                        Delete This Account</Link>
                                                    <Link to="#" className="btn btn-light">Cancel</Link>
                                                </div>
                                            </div>
                                        </TabPane> */}

                                    </TabContent>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment >
    );
};

export default Settings;