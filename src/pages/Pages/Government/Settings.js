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

    const [first_name, setFirst_name] = useState(null);
    const [middle_name, setMiddle_name] = useState(null);
    const [last_name, setLast_name] = useState(null);
    const [phone_one, setPhone_one] = useState(null);
    const [phone_two, setPhone_two] = useState(null);
    const [selected_state, setSelected_state] = useState(null);

    const [email, setEmail] = useState(null);
    const [isImage, setIsImage] = useState(false);

    const [permanent_address, setPermanent_Address] = useState(null);
    const [date, setDate] = useState();
    const [state_of_origin, setState_of_origin] = useState([]);
    const [local_gov, setLocal_gov] = useState([]);
    const [selected_lga, setSelected_lga] = useState(null);
    const [religion, setReligion] = useState(null);
    const [place_of_birth, setPlace_of_birth] = useState(null);
    const [city, setCity] = useState(null);
    const [nationality, setNationality] = useState(null);
    const [address, setAddress] = useState(null);
    const [gender, setGender] = useState(null);  // setGender(rs.gender);
    const [maritalStatus, setMaritalStatus] = useState(null);      // setMaritalStatus(rs.maritalStatus)
    const [maidenName, setMaidenName] = useState(null);     // setMaidenName(rs.maidenName)
    const [image, setImage] = useState(null);    // setImage(rs.passport);
    const [previousNames, setPreviousNames] = useState(null);   // setPreviousNames(rs.previousNames)
    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);

    const [aUser, setAUser] = useState([]);
    const [is_criminal_record, setIs_criminal_record] = useState(null);
    const [is_sentence_record, setIs_sentence_record] = useState(null);
    const [is_drug_issue, setIs_drug_issue] = useState(null);
    const [is_sign, setIs_sign] = useState(false);

    const [if_explain, setIf_explain] = useState(null);
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
        console.log(first_name, middle_name)
        if (first_name === null || gender === null || last_name === null || state_of_origin === null || phone_one === null || local_gov === null || city === null
            || maritalStatus === null || date === null || religion === null || nationality === null || address === null || place_of_birth === null || permanent_address === null
            || is_criminal_record === null || is_drug_issue === null || is_sentence_record === null
        ) {
            let msg = first_name === null ? 'First Name  is Compulsory' : last_name === null ? 'Surname is Compulsory' : phone_one === null ? 'Phone Number is Compulsory'
                : state_of_origin === null ? 'State of Origin is Compulsory' : local_gov === null ? 'Local Government is Compulsory' : city === null ? 'City is Compulsory' :
                    maritalStatus === null ? "Marital Status is Compulsory" : date === null ? 'Date of Birth is Compulsory' : religion === null ? 'Religion is Compulsory' :
                        nationality === null ? "Nationality is Compulsory" : address === null ? 'Address is Compulsory' : place_of_birth === null ? 'Place of Birth is Compulsory' :
                            permanent_address === null ? 'Permanent Address is Compulsory' : ''
                                // is_criminal_record === null ? 'Criminal Record is Compulsory' : is_drug_issue === null ? 'Drug use is Compulsory' : is_sentence_record === null ? "Sentence Record is Compulsory" : ''
                ;
            return MySwal.fire({
                title: 'Opps!',
                text: msg,
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
        if (first_name === null || gender === null || last_name === null || state_of_origin === null || phone_one === null || local_gov === null || city === null
            || maritalStatus === null || date === null || religion === null || nationality === null || address === null || place_of_birth === null || permanent_address === null
            || is_criminal_record === null || is_drug_issue === null || is_sentence_record === null
        ) {
            let msg = first_name === null ? 'First Name  is Compulsory' : last_name === null ? 'Surname is Compulsory' : phone_one === null ? 'Phone Number is Compulsory'
                : state_of_origin === null ? 'State of Origin is Compulsory' : local_gov === null ? 'Local Government is Compulsory' : city === null ? 'City is Compulsory' :
                    maritalStatus === null ? "Marital Status is Compulsory" : date === null ? 'Date of Birth is Compulsory' : religion === null ? 'Religion is Compulsory' :
                        nationality === null ? "Nationality is Compulsory" : address === null ? 'Address is Compulsory' : place_of_birth === null ? 'Place of Birth is Compulsory' :
                            permanent_address === null ? 'Permanent Address is Compulsory' : ''
                                // is_criminal_record === null ? 'Criminal Record is Compulsory' : is_drug_issue === null ? 'Drug use is Compulsory' : is_sentence_record === null ? "Sentence Record is Compulsory" : ''
                ;
            return MySwal.fire({
                title: 'Opps!',
                text: msg,
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
                                                                maxLength={11}
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
                                                                placeholder="Place of birth" value={place_of_birth}
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
                                                    {user_type !== 'facility' && user_type !== 'indexing' ?
                                                        <div>
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
                                                        </div>
                                                        : ''}

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