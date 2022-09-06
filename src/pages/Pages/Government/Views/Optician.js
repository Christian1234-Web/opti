import { useState } from "react";
import { Link } from "react-router-dom";
import { request } from '../../../../services/utilities';
import { LoaderGrow } from '../../../AdvanceUi/Loader/loader';

function Optician({ opticians, showEditOptician, idx, user, setOpticians, optometrists, color_one_optician, setColor_one_optician, color_two_optician, setColor_two_optician }) {

    // const [color_one_optician, setColor_one_optician] = useState('text-success');
    // const [color_two, setColor_two] = useState(' ');
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const internTrain = user.type === ''
    const fetchOptician = async () => {
        setColor_one_optician('text-success');
        setColor_two_optician('');
        try {
            setLoading(true);
            const url = `users/${user.id}`;
            const rs = await request(url, 'GET', true);
            setOpticians(rs.data.optician);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            alert('Poor internet connection');
            // setError('Poor Internet Connection');
            // handleError();
            console.log(err);
        }
    }
    const fetchTrainingOptometrist = async () => {
        setColor_one_optician('');
        setColor_two_optician('text-success');
        try {
            setLoading(true);
            const url = `users/${user.id}`;
            const rs = await request(url, 'GET', true);
            setOpticians(rs.data.training);
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
                            <h4 className="card-title mb-0 flex-grow-1">Registered Opticians</h4>
                            <div className='text-danger'>{error}</div>
                            <div className="flex-shrink-0">
                                <div className="dropdown card-header-dropdown">
                                    <a className={`${color_two_optician} mx-2`} style={{ cursor: 'pointer' }} onClick={() => fetchTrainingOptometrist()}>
                                        Internship registration
                                    </a>
                                    <a className={`${color_one_optician}`} style={{ cursor: 'pointer' }} onClick={() => fetchOptician()}>
                                        Full registration
                                    </a>
                                </div>
                            </div>
                        </div>
                        <>{loading === true ? <LoaderGrow /> : ' '}</>
                        <div className="card-body pt-0">

                            {opticians !== null ? <ul className="list-group list-group-flush border-dashed">
                                <li className="list-group-item ps-0">
                                    <div className="row align-items-center g-3">
                                        <div className="col-auto">
                                            <div className="avatar-sm p-1 py-2 h-auto bg-light rounded-3">
                                                <div className="text-center">
                                                    <h5 className="mb-0">{new Date(opticians.updatedAt).toDateString().split(' ')[2]}</h5>
                                                    <div className="text-muted">{new Date(opticians.updatedAt).toDateString().split(' ')[0]}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <h5 className="text-muted mt-0 mb-1 fs-5">{new Date(opticians.updatedAt).toLocaleTimeString()}</h5>
                                            <a href="#" className="text-reset fs-5 mb-0">{user.firstName} {user.surname} <br /> {user.email}</a>
                                        </div>
                                        <div className="col-sm-auto">

                                            <div className="hstack gap-3 flex-wrap">
                                                {opticians.isApproved === true ? ' ' :
                                                    <a href="#" className="link-success fs-15" ><i className="ri-edit-2-line" onClick={() => showEditOptician()}></i></a>
                                                }
                                                {color_two_optician ? <Link to={`/optician-dashboard/${user.type === 'optician' ? `training` : 'internship'}/${opticians.id}`}><i className="ri-eye-2-line fs-17 lh-1 align-middle"></i></Link>
                                                    : <Link to={`/optician-dashboard/oo/${user.type === 'optometrist' ? `optometrist` : 'optician'}/${opticians.id}`}><i className="ri-eye-2-line fs-17 lh-1 align-middle"></i></Link>}
                                              
                                                <i className="ri-checkbox-circle-line align-middle text-success"></i>{opticians.status}</div>
                                        </div>
                                    </div>
                                </li>
                            </ul> : <div className="text-danger text-center"> No record </div>

                            }

                            <div className="align-items-center mt-2 row g-3 text-center text-sm-start">
                                <div className="col-sm">
                                    <div className="text-muted">Available Results <span className="fw-semibold">
                                        {opticians !== null ? '1' : '0'}
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

export default Optician