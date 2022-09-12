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

const CoverSignUp = ({ location }) => {

    const hash = location.hash.split('#');
    const active_tab = hash[1];

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [regNo, setRegNo] = useState('');
    const [text, setText] = useState(active_tab === 'optician' ? 'DOP' : active_tab === 'optometrist' ? 'ODORBN' : '');
    const [loading, setLoading] = useState(false);
    const [activeArrowTab, setactiveArrowTab] = useState(4);
    const [passedarrowSteps, setPassedarrowSteps] = useState([1]);

    const [note, setNote] = useState(active_tab === 'facility' ? 'Facility' : active_tab === 'optician' ? 'Optician' : active_tab === 'optometrist' ? 'Optometrist' : 'Facility');

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
    const [cardHeaderTab, setcardHeaderTab] = useState(active_tab === 'facility' ? '1' : active_tab === 'optician' ? '2' : active_tab === 'optometrist' ? '3' : '1');

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

    const register = async (p) => {
        let regNoComple = text.toLocaleLowerCase() + regNo;

        const data = { email, password, boardNumber: regNoComple, type: note.trim().toLocaleLowerCase() }

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
        if (password === '') {
            return setError('fill your details')
        }
        if (password.length < 8) {
            return setError('password too short');
        }
        try {
            setLoading(true)
            const url = 'users/signup';
            const urlb = 'users/board/signup';
            if (regNo !== '') {
                const rs = await httpRequest(urlb, 'POST', data);
            } else {
                const rs = await httpRequest(url, 'POST', data);
            }
            setLoading(false);
            setError('kindly check your mail for verification');
            handleSuccess();
        } catch (err) {
            setLoading(false)
            if (err.message === 'Failed to fetch') {
                return handleError();
            }
            if (err.message) {
                return setError(err.message)
            }
            handleError();
            console.log(err, 'err');
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
                                    <div className=" d-flex">
                                        <div className="bg-primary w-100">

                                            {/* <p className="text-muted text-truncates mb-0">Use <code>card-header-tabs</code> class to create card header tabs.</p> */}
                                        </div>
                                        <div className="flex-shrink-0 p-2 mx-3">

                                            <Nav pills className="card-header-pills">
                                                <NavItem>
                                                    <NavLink href={`${location.pathname}#facility`} style={{ cursor: "pointer" }} className={classnames({ active: cardHeaderTab === "1", })} onClick={() => { cardHeaderToggle("1"); }} >
                                                        Facility
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink href={`${location.pathname}#optician`} style={{ cursor: "pointer" }} className={classnames({ active: cardHeaderTab === "2", })} onClick={() => { cardHeaderToggle("2"); }} >
                                                        Dispensing Optician
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink href={`${location.pathname}#optometrist`} style={{ cursor: "pointer" }} className={classnames({ active: cardHeaderTab === "3", })} onClick={() => { cardHeaderToggle("3"); }} >
                                                        Optometrist
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>

                                        </div>
                                    </div>

                                    <Row className="justify-content-center g-0">
                                        <>{loading === true ? <LoaderGrow /> : ''}</>
                                        {/* <CardBody className="form-steps"> */}
                                        <>

                                            <AuthSlider />

                                            <div className="col-lg-6">
                                                <div className="p-lg-5 p-4">
                                                    <div>
                                                        <h5 className="text-primary">Register Account for {note}</h5>
                                                    </div>

                                                    <div className="mt-4">
                                                        <form className="needs-validation" noValidate action="index">
                                                            <span className="text-danger" style={{ textAlign: 'left' }}>{error}</span>

                                                            {cardHeaderTab !== '1' ? <div className="mb-3"  >
                                                                <label htmlFor="useremail" className="form-label">Board Number
                                                                </label>
                                                                <div className='d-flex'>
                                                                    <button style={{ borderColor: '#d3dfec' }}>{text}</button>
                                                                    <input type="number" className="form-control" value={regNo} onChange={(e) => setRegNo(e.target.value)} id="useremail" placeholder="Enter board number" required />
                                                                </div>
                                                                <div className="invalid-feedback">
                                                                    Please enter board number
                                                                </div>
                                                                <div className='mt-3'>
                                                                    <label htmlFor="useremail" className="form-label">Email
                                                                    </label>
                                                                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="useremail" placeholder="Enter email address" required />
                                                                    <div className="invalid-feedback">
                                                                        Please enter email
                                                                    </div>
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

                                                                <button onClick={() => register()} id='optometrist' className="btn btn-success w-100" type="button">Sign Up for {note}</button>

                                                            </div>
                                                        </form>
                                                    </div>

                                                    <div className="mt-5 text-center">
                                                        <p className="mb-0">Already have an account ? <Link to={`/signin#${note.toLocaleLowerCase()}`} className="fw-semibold text-primary text-decoration-underline"> Signin</Link> </p>
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

export default CoverSignUp;