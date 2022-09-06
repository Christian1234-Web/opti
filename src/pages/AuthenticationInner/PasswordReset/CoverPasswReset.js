import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Col, Container, Row } from 'reactstrap';
import MetaTags from 'react-meta-tags';

import AuthSlider from '../authCarousel';
import { httpRequest } from '../../../services/utilities';
import { LoaderGrow } from '../../AdvanceUi/Loader/loader';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
const MySwal = withReactContent(Swal);

const CoverPasswReset = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('Enter your email and instructions will be sent to you!');


    const handleSuccess = () => {
        return MySwal.fire({
            title: 'Successful!',
            text: 'Check your mail for instructions!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
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

    const resetPassword = async () => {
        if (email === ' ') {
            return setMsg('Please fill your email!');
        }
        const url = `users/password/reset?email=${email}`;
        try {
            setLoading(true);
            const rs = await httpRequest(url, 'GET');
            // console.log(rs);
            setLoading(false);
            handleSuccess();
            setMsg('Enter your email and instructions will be sent to you!');
        } catch (err) {
            setLoading(false);
            if (err.message === 'user not found') {
                setMsg('Email not found!');
            } else {
                handleError();
                setMsg('Enter your email and instructions will be sent to you!');

            }
            console.log(err);
        }
    }
    return (
        <React.Fragment>
            <MetaTags>
                <title>Reset Password | Odorbn</title>
            </MetaTags>
            <>{loading === true ? <LoaderGrow /> : ''}</>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden">
                                    <Row className="justify-content-center g-0">
                                        <AuthSlider />

                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4">
                                                <h5 className="text-primary">Forgot Password?</h5>
                                                <p className="text-muted">Reset password with Odorbn</p>

                                                <div className="mt-2 text-center">
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/rhvddzym.json"
                                                        trigger="loop"
                                                        colors="primary:#0ab39c"
                                                        className="avatar-xl"
                                                        style={{ width: "120px", height: "120px" }}>
                                                    </lord-icon>
                                                </div>

                                                <div className="alert alert-borderless alert-warning text-center mb-2 mx-2" role="alert">
                                                    {msg}
                                                </div>
                                                <div className="p-2">
                                                    <form>
                                                        <div className="mb-4">
                                                            <label className="form-label">Email</label>
                                                            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} id="email" placeholder="Enter email address" />
                                                        </div>

                                                        <div className="text-center mt-4">
                                                            <Button color="success" className="w-100" onClick={() => resetPassword()} type="button">Send Reset Link</Button>
                                                        </div>
                                                    </form>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="mb-0">Wait, I remember my password... <Link to="/auth-signin-cover" className="fw-semibold text-primary text-decoration-underline"> Click here </Link> </p>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <footer className="footer">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="text-center">
                                    <p className="mb-0">&copy; <script>document.write(new Date().getFullYear())</script> Odorbn.
                                        {/* Crafted with <i className="mdi mdi-heart text-danger"></i> by Odorbn */}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </div>
        </React.Fragment>
    );
};

export default CoverPasswReset;