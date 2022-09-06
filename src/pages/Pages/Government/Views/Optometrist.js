import { useState } from "react";
import { request } from '../../../../services/utilities';
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';
import { Link } from 'react-router-dom';


function Optometrist({ optometrists, optometristTraining, showEditOptometrist, idx, user, setOptometrists, color_one_optometrist, setColor_one_optometrist,
    color_two_optometrist, setColor_two_optometrist
}) {


    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchOptometrist = async () => {
        setColor_one_optometrist('');
        setColor_two_optometrist('text-success');
        try {
            setLoading(true);
            const url = `users/${user.id}`;
            const rs = await request(url, 'GET', true);
            setOptometrists(rs.data.optometrist);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            alert('Poor internet connection');
            // setError('Poor Internet Connection');
            // handleError();
            console.log(err);
        }
    }
    const fetchInternshipOptometrist = async () => {
        setColor_one_optometrist('text-success');
        setColor_two_optometrist(' ');
        try {
            setLoading(true);
            const url = `users/${user.id}`;
            const rs = await request(url, 'GET', true);
            // const x = new Array(rs.data.internship);
            setOptometrists(rs.data.internship);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            alert('Poor internet connection');
            // setError('Poor Internet Connection');
            console.log(err);
        }
    }
    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <>{loading === true ? <LoaderGrow /> : ''}</>
                            <h4 className="card-title mb-0 flex-grow-1">Registered Optometrists</h4>
                            <div className='text-danger'>{error}</div>
                            <div className="flex-shrink-0">
                                <div className="dropdown card-header-dropdown">
                                    <a className={`${color_one_optometrist}`} style={{ cursor: 'pointer' }} onClick={() => fetchInternshipOptometrist()}>
                                        Internship registration
                                    </a>
                                    <a className={`${color_two_optometrist} mx-2`} style={{ cursor: 'pointer' }} onClick={() => fetchOptometrist()}>
                                        Full registration
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body pt-0">
                            {optometrists !== null ? <ul className="list-group list-group-flush border-dashed" >
                                <li className="list-group-item ps-0">
                                    <div className="row align-items-center g-3">
                                        <div className="col-auto">
                                            <div className="avatar-sm p-1 py-2 h-auto bg-light rounded-3">
                                                <div className="text-center">
                                                    <h5 className="mb-0">{new Date(optometrists.updatedAt).toDateString().split(' ')[2]}</h5>
                                                    <div className="text-muted">{new Date(optometrists.updatedAt).toDateString().split(' ')[0]}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <h5 className="text-muted mt-0 mb-1 fs-5">{new Date(optometrists.updatedAt).toLocaleTimeString()}</h5>
                                            <a href="#" className="text-reset fs-5 mb-0">{user.firstName} {user.surname} <br /> {user.email}</a>
                                        </div>
                                        <div className="col-sm-auto">

                                            <div className="hstack gap-3 flex-wrap">
                                                {optometrists.isApproved === true ? ' ' : <a href="#" className="link-success fs-15" ><i className="ri-edit-2-line" onClick={() => showEditOptometrist()}></i></a>
                                                }
                                                {color_one_optometrist ? <Link to={`/optometrist-dashboard/${user.type === 'optician' ? `training` : 'internship'}/${optometrists.id}`}><i className="ri-eye-2-line fs-17 lh-1 align-middle"></i></Link>
                                                    : <Link to={`/optometrist-dashboard/oo/${user.type === 'optometrist' ? `optometrist` : 'optician'}/${optometrists.id}`}><i className="ri-eye-2-line fs-17 lh-1 align-middle"></i></Link>}
                                                <i className="ri-checkbox-circle-line align-middle text-success"></i>{optometrists.status}</div>

                                        </div>
                                    </div>
                                </li>
                            </ul> : <div className="text-danger text-center"> No record </div>}
                            <div className="align-items-center mt-2 row g-3 text-center text-sm-start">
                                <div className="col-sm">
                                    <div className="text-muted">Available Results <span className="fw-semibold">
                                        {optometrists !== null ? '1' : '0'}
                                    </span>
                                        {/* of <span className="fw-semibold">125</span> */}
                                        {/* Results */}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Optometrist