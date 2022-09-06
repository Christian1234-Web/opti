import React, { useState } from 'react';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
// import { useQuery } from "react-query";
// import { useLocation } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content'
import { Card, Col, Container, Row } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import { httpRequest } from '../../../services/utilities';
import AuthSlider from '../authCarousel';
import Swal from 'sweetalert2'
import { LoaderGrow } from '../../AdvanceUi/Loader/loader';
import { TOKEN_COOKIE, USER_COOKIE } from '../../../services/constants';
import SSRStorage from '../../../services/storage';
const storage = new SSRStorage();

// import {  CardTitle, CardText } from 'reactstrap'

const MySwal = withReactContent(Swal)

const NewPasswReset = () => {
    const [confirm_password, setConfirm_password] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSuccess = () => {
        return MySwal.fire({
            title: 'Password Update Successful!',
            text: 'password updated successfully!',
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

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const userKey = query.get('userKey');
    const id = query.get('id');

    const resetPassword = async () => {
        const data = { password, id: parseInt(id), userKey };
        // console.log(data);
        if (confirm_password === '' || password === '') {
            return setError('fill your details');
        }
        if (confirm_password !== password) {
            return setError('password does not match');
        }
        if (password.length < 8) {
            return setError('password too short');
        }
        try {
            setLoading(true)
            const url = 'users/password/new';
            const rs = await httpRequest(url, 'POST', data);
            setLoading(false);
            handleSuccess();
            history.push('/auth-signin-cover');

        } catch (err) {
            setLoading(false);
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
                                <Card className="overflow-hidden m-0">
                                    <Row className="justify-content-center g-0">
                                        <AuthSlider />
                                        <>{loading === true ? <LoaderGrow /> : ''}</>
                                        <div className="col-lg-6">
                                            <div className="p-lg-5 p-4">
                                                <div>
                                                    <h5 className="text-primary">Reset Account</h5>
                                                </div>

                                                <div className="mt-4">
                                                    <form className="needs-validation" noValidate action="index">
                                                        <span className="text-danger" style={{ textAlign: 'left' }}>{error}</span>


                                                        <div className="mb-2">
                                                            <label htmlFor="userpassword" className="form-label">New Password
                                                            </label>
                                                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="userpassword" placeholder="Enter password" required />
                                                            <div className="invalid-feedback">
                                                                Please enter  new password
                                                            </div>
                                                        </div>
                                                        <div className="mb-2">
                                                            <label htmlFor="userpassword" className="form-label">Confirm Password
                                                            </label>
                                                            <input type="password" className="form-control" value={confirm_password} onChange={(e) => setConfirm_password(e.target.value)} id="userpassword" placeholder="Enter password" required />
                                                            <div className="invalid-feedback">
                                                                Please confirm password
                                                            </div>
                                                        </div>

                                                        {/* <div className="mb-4">
                                                            <p className="mb-0 fs-12 text-muted fst-italic">By registering you agree to the Odorbn <Link to="#" className="text-primary text-decoration-underline fst-normal fw-medium">Terms of Use</Link></p>
                                                        </div> */}

                                                        <div className="mt-4">
                                                            <button onClick={() => resetPassword()} className="btn btn-success w-100" type="button">Reset Password</button>
                                                        </div>
                                                    </form>
                                                </div>

                                                {/* <div className="mt-5 text-center">
                                                    <p className="mb-0">Already have an account ? <Link to="/auth-signin-cover" className="fw-semibold text-primary text-decoration-underline"> Signin</Link> </p>
                                                </div> */}
                                            </div>
                                        </div>
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

export default NewPasswReset;