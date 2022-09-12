import React, { useState, useRef, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { httpRequest } from '../../../services/utilities';
// import { Card, Col, Container, Input, Label, Row, Button } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import AuthSlider from '../authCarousel';
import SSRStorage from '../../../services/storage';
import { TOKEN_COOKIE, USER_COOKIE } from '../../../services/constants';
// import { facebook, google } from "../../../";
import { google, facebook } from '../../../config';
import { GoogleLogin } from "react-google-login";

import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { LoaderGrow } from '../../AdvanceUi/Loader/loader';
import classnames from "classnames";
import { Card, Col, Container, Row, Nav, NavItem, NavLink, Form, Input, Label, Button } from 'reactstrap';
import { Store } from '../../../services/store';
const MySwal = withReactContent(Swal);
const storage = new SSRStorage();


const CoverSignIn = ({ location }) => {
    const hash = location.hash.split('#');
    const active_tab = hash[1];
    const store = useContext(Store);
    const [user_type, setUser_type] = store.user_type;
    const [email, setEmail] = useState(null);

    const [password, setPassword] = useState(null);
    const [key, setKey] = useState('password');
    const [regNo, setRegNo] = useState('');

    const [error, setError] = useState('');
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);


    const [note, setNote] = useState(active_tab === 'facility' ? 'Facility' : active_tab === 'optician' ? 'Optician' : active_tab === 'optometrist' ? 'Optometrist' : 'Facility');


    const handleError = () => {
        return MySwal.fire({
            title: 'Sorry!',
            text: ' Can not sign in please try again later!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })
    }

    const toggleKey = () => {
        if (open === false) {
            setKey('text');
            setOpen(true);
        } else {
            setKey('password');
            setOpen(false);

        }
    }

    const [cardHeaderTab, setcardHeaderTab] = useState(active_tab === 'facility' ? '1' : active_tab === 'optician' ? '2' : active_tab === 'optometrist' ? '3' : '1');
    const [text, setText] = useState(active_tab === 'optician' ? 'DOP' : active_tab === 'optometrist' ? 'ODORBN' : '');

    const cardHeaderToggle = (tab) => {
        if (cardHeaderTab !== tab) {
            setcardHeaderTab(tab);
            if (tab === '1') {
                setNote('Facility');
                setPassword('');
                setEmail('');
                setRegNo('');
                setError('');
            } else if (tab === '2') {
                setNote('Optician');
                setText('DOP/');
                setPassword('');
                setEmail('');
                setRegNo('');
                setError('');

            } else if (tab === '3') {
                setNote('Optometrist');
                setText('ODORBN/');
                setPassword('');
                setEmail('');
                setRegNo('');
                setError('');

            }
        }
    };


    const loginAdmin = async () => {
        let regCompileNo = text.toLocaleLowerCase() + regNo
        const data = { email, password, boardNumber: regCompileNo };
        if (note === 'Optician' || note === 'Optometrist') {
            if (regNo === null || regNo === '') {
                return setError('fill your details')
            }
        }
        else {
            if (email === null || email === '') {
                return setError('fill your details')
            }
        }
        if (password === null || password === '') {
            return setError('fill your details')
        }
        try {
            setLoading(true);
            const url = 'users/signin';
            const urlb = 'users/board/signin';

            if (regNo !== '') {
                const rs = await httpRequest(urlb, 'POST', data);
                const rsData = rs.data;
                setLoading(false);
                if (rs.success === true) {
                    if (cardHeaderTab !== '1' && rs.data.type === 'facility') {
                        return setError('Kindly login through the right page');
                    }
                    if (cardHeaderTab !== '2' && rs.data.type.toLowerCase() === 'optician') {
                        return setError('Kindly login through the right page');
                    }
                    if (cardHeaderTab !== '3' && rs.data.type === 'optometrist') {
                        return setError('Kindly login through the right page');
                    }
                    setError('successful');
                    if (rs.data.userType === 'admin') {
                        return setError('Kindly login through the right page');
                    }
                    if (rs.data.userType === 'user') {
                        storage.setItem(TOKEN_COOKIE, rs);
                        storage.setItem(USER_COOKIE, rsData);
                        setUser_type(rs.data.type);
                        return history.push(`/${rs.data.type}-dashboard`);
                    }

                }
                return
            } else {
                const rs = await httpRequest(url, 'POST', data);
                const rsData = rs.data;
                setLoading(false);
                if (rs.success === true) {
                    setError('successful');
                    setUser_type(rs.data.type);

                    if (rs.data.userType === 'admin') {
                        return setError('Kindly login through the right page');
                    }
                    if (rs.data.type === 'indexing' || rs.data.type === 'admin') {
                        return setError('Kindly login through the right page');
                    }
                    if (rs.data.userType === 'user') {
                        storage.setItem(TOKEN_COOKIE, rs);
                        storage.setItem(USER_COOKIE, rsData);
                        return history.push(`/${rs.data.type}-dashboard`);
                    }

                }
                return
            }

        } catch (err) {
            setLoading(false);
            console.log(err, 'err');
            if (err.message === 'Invalid credentials' || err.message === 'invalid credenials' || err.message === 'invalid credentials') {
                return setError('Invalid email or password!!')
            } else {
                handleError();
            }
        }
    }


    //handleGoogleLoginResponse
    const googleResponse = response => {
        loginAdmin(response, "google");
    };

    //handleTwitterLoginResponse
    // const twitterResponse = e => {}

    //handleFacebookLoginResponse
    const facebookResponse = response => {
        loginAdmin(response, "facebook");
    };
    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>

                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <MetaTags>
                        <title> SignIn | Odorbn</title>
                    </MetaTags>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden">
                                    <div className=" d-flex">
                                        <div className="bg-primary w-100">
                                        </div>
                                        <div className="flex-shrink-0 p-2 mx-3">

                                            <Nav pills className="card-header-pills">
                                                <NavItem>
                                                    <NavLink href={`${location.pathname}#facility`} style={{ cursor: "pointer" }} className={classnames({ active: cardHeaderTab === "1" })} onClick={() => { cardHeaderToggle("1"); }} >
                                                        Facility
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink href={`${location.pathname}#optician`} style={{ cursor: "pointer" }} className={classnames({ active: cardHeaderTab === "2" })} onClick={() => { cardHeaderToggle("2"); }} >
                                                        Dispensing Optician
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink href={`${location.pathname}#optometrist`} style={{ cursor: "pointer" }} className={classnames({ active: cardHeaderTab === "3" })} onClick={() => { cardHeaderToggle("3"); }} >
                                                        Optometrist
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>

                                        </div>
                                    </div>
                                    <Row className="g-0">
                                        <AuthSlider />
                                        <>{loading === true ? <LoaderGrow /> : ''}</>
                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4">
                                                <div>
                                                    <h5 className="text-primary">Welcome Back !</h5>
                                                    <p className="text-muted">Sign in to continue with {note}.</p>
                                                </div>

                                                <div className="mt-4">
                                                    <form action="/">

                                                        {cardHeaderTab !== '1' ? <div className="mb-3"  >
                                                            <label htmlFor="useremail" className="form-label">Board Number
                                                            </label>
                                                            <div className='d-flex'>
                                                                <button style={{ borderColor: '#d3dfec' }}>{text}</button>
                                                                <input type="number" className="form-control" value={regNo} onChange={(e) => setRegNo(e.target.value)} id="useremail" placeholder="Enter board number" required />
                                                            </div>
                                                        </div> : <div className="mb-3">
                                                            <label htmlFor="useremail" className="form-label">Email
                                                            </label>
                                                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="useremail" placeholder="Enter email address" required />
                                                            <div className="invalid-feedback">
                                                                Please enter email
                                                            </div>
                                                        </div>
                                                        }

                                                        <div className="mb-3">
                                                            <div className="float-end">
                                                                <Link to="/auth-pass-reset-cover" className="text-muted">Forgot password?</Link>
                                                            </div>
                                                            <Label className="form-label" htmlFor="password-input">Password</Label>
                                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                                <Input type={key} className="form-control pe-5" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" id="password-input" />
                                                                <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted" type="button" id="password-addon"><i onClick={() => toggleKey()} className="ri-eye-fill align-middle"></i></button>
                                                            </div>
                                                        </div>
                                                        <span className="text-danger" style={{ textAlign: 'left' }}>{error}</span>
                                                        <div className="form-check">
                                                            {/* <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" /> */}
                                                            {/* <Label className="form-check-label" htmlFor="auth-remember-check">Remember me</Label> */}
                                                        </div>

                                                        <div className="mt-4">
                                                            <div className="mt-4">
                                                                <button onClick={() => loginAdmin()} id='optometrist' className="btn btn-success w-100" type="button">Sign In for {note}</button>

                                                            </div>
                                                        </div>


                                                    </form>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">Don't have an account ? <Link to={`/signup#${note.toLocaleLowerCase()}`} className="fw-semibold text-primary text-decoration-underline"> Signup</Link> </p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div >

                <footer className="footer">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center">
                                    <p className="mb-0">&copy; {new Date().getFullYear()} Odorbn.
                                        {/* Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand */}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </footer>

            </div >
        </React.Fragment >
    );
};

export default CoverSignIn;