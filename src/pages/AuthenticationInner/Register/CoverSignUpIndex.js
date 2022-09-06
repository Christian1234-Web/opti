import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content'
import classnames from "classnames";
import { Card, Col, Container, Row, CardBody, CardHeader, Nav, NavItem, NavLink, Form } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import { httpRequest } from '../../../services/utilities';
import AuthSlider from '../authCarousel';
import Swal from 'sweetalert2'
import { LoaderGrow } from '../../AdvanceUi/Loader/loader';
import { TOKEN_COOKIE, USER_COOKIE } from '../../../services/constants';
import SSRStorage from '../../../services/storage';
const storage = new SSRStorage();


const MySwal = withReactContent(Swal)

const CoverSignUpIndex = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [regNo, setRegNo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeArrowTab, setactiveArrowTab] = useState(4);
    const [passedarrowSteps, setPassedarrowSteps] = useState([1]);

    // const [note, setNote] = useState('Indexing');
    const [type, setType] = useState('');
    // const [optometrist_type, setOptometrist_type] = useState('');

    const history = useHistory();
    const facility_ref = useRef();
    const optician_ref = useRef();
    const optometrist_ref = useRef();


    const handleSuccess = () => {
        return MySwal.fire({
            title: 'Registration Successful!',
            text: 'Check your mail for verification!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
        })
    }
    const handleError = () => {
        return MySwal.fire({
            title: 'Sorry!',
            text: ' Can not sign up please try again later!',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
        })
    }

    const register = async (p) => {
        const data = { email, password, type: 'indexing' }
        if (password === '') {
            return setError('fill your details')
        }
        if (password.length < 8) {
            return setError('password too short');
        }
        // console.log(data);
        try {
            setLoading(true)
            const url = 'users/signup';
            const rs = await httpRequest(url, 'POST', data);
            setLoading(false)
            setError('check your mail for verification')
            handleSuccess();
        } catch (err) {
            setLoading(false)
            if (err.message === 'email must be unique') {
                return setError('Email has been used')
            } if (err.message === 'this user already have an account') {
                return setError('This user already have an account')
            }
            handleError();
            console.log(err, 'err')
        }
    }

    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <MetaTags>
                        <title> SignUp | Odorbn</title>
                    </MetaTags>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card>

                                    <Row className="justify-content-center g-0">
                                        <>{loading === true ? <LoaderGrow /> : ''}</>
                                        <>
                                            <AuthSlider />
                                            <div className="col-lg-6">
                                                <div className="p-lg-5 p-4">
                                                    <div>
                                                        <h5 className="text-primary">Register Account for Indexing</h5>
                                                    </div>

                                                    <div className="mt-4">
                                                        <form className="needs-validation" noValidate action="index">
                                                            <span className="text-danger" style={{ textAlign: 'left' }}>{error}</span>

                                                            <div className="mb-3">
                                                                <label htmlFor="useremail" className="form-label">Email
                                                                </label>
                                                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="useremail" placeholder="Enter email address" required />
                                                                <div className="invalid-feedback">
                                                                    Please enter email
                                                                </div>
                                                            </div>

                                                            <div className="mb-2">
                                                                <label htmlFor="userpassword" className="form-label">Password
                                                                </label>
                                                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="userpassword" placeholder="Enter password" required />
                                                                <div className="invalid-feedback">
                                                                    Please enter password
                                                                </div>
                                                            </div>

                                                            <div className="mb-4">
                                                                <p className="mb-0 fs-12 text-muted fst-italic">By registering you agree to the Odorbn <Link to="#" className="text-primary text-decoration-underline fst-normal fw-medium">Terms of Use</Link></p>
                                                            </div>

                                                            <div className="mt-4">
                                                                <button onClick={() => register('1')} ref={facility_ref} style={{ display: '' }} id='facility' className="btn btn-success w-100" type="button">Sign Up for Indexing</button>
                                                            </div>
                                                        </form>
                                                    </div>

                                                    <div className="mt-5 text-center">
                                                        <p className="mb-0">Already have an account ? <Link to="/indexing-login" className="fw-semibold text-primary text-decoration-underline"> Signin</Link> </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>


                                        {/* </CardBody> */}
                                    </Row>
                                </Card>
                            </Col>

                        </Row>
                    </Container>
                </div>

                <footer className="footer">
                    <Container>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center">
                                    <p className="mb-0">&copy; <script>document.write(new Date().getFullYear())</script> Odorbn.
                                        {/* Crafted with <i className="mdi mdi-heart text-danger"></i> by Odorbn */}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Container>
                </footer>
            </div>
        </React.Fragment>
    );
};

export default CoverSignUpIndex;