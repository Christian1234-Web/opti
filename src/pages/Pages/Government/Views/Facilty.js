import { Link } from 'react-router-dom';


function Facilty({ practices, error, showEditFacility, idx }) {
    return (

        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Registered Facilities</h4>
                            <div className='text-danger'>{error}</div>
                            <div className="flex-shrink-0">
                                <div className="dropdown card-header-dropdown">
                                    <a className="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="text-muted fs-18"><i className="mdi mdi-dots-vertical"></i></span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end">
                                        <a className="dropdown-item" href="#">Edit</a>
                                        <a className="dropdown-item" href="#">Remove</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body pt-0">
                            {practices.map((e, i) => {
                                if (practices.length > 0) {
                                    return (
                                        <ul className="list-group list-group-flush border-dashed" key={i}>
                                            <li className="list-group-item ps-0">
                                                <div className="row align-items-center g-3">
                                                    <div className="col-auto">
                                                        <div className="avatar-sm p-1 py-2 h-auto bg-light rounded-3">
                                                            <div className="text-center">
                                                                <h5 className="mb-0">{new Date(e.updatedAt).toDateString().split(' ')[2]}</h5>
                                                                <div className="text-muted">{new Date(e.updatedAt).toDateString().split(' ')[0]}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <h5 className="text-muted mt-0 mb-1 fs-13">{new Date(e.updatedAt).toLocaleTimeString()}</h5>
                                                        <a href="#" className="text-reset fs-14 mb-0">{e.name}</a>
                                                    </div>
                                                    <div className="col-sm-auto">
                                                        <div className="hstack gap-3 flex-wrap">
                                                            {e.isApprovedByAdmin === true ? ' ' : <a href="#" className="link-success fs-15" ><i className="ri-edit-2-line" onClick={() => showEditFacility(i)}></i></a>
                                                            }
                                                            <Link to={`/facility-dashboard/facility/${e.id}`} href="#"><i className="ri-eye-2-line fs-17 lh-1 align-middle"></i></Link>
                                                            <i className="ri-checkbox-circle-line align-middle text-success"></i>{e.status}</div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    )
                                }
                                else {
                                    return (
                                        <div className="text-danger text-center"> No record </div>
                                    )
                                }
                            })}

                            <div className="align-items-center mt-2 row g-3 text-center text-sm-start">
                                <div className="col-sm">
                                    <div className="text-muted">Available Results <span className="fw-semibold">
                                        {practices.length}
                                    </span>
                                        {/* of <span className="fw-semibold">125</span> */}
                                        {/* Results */}
                                    </div>
                                </div>
                                <div className="col-sm-auto">
                                    <ul className="pagination pagination-separated pagination-sm justify-content-center justify-content-sm-start mb-0">
                                        <li className="page-item disabled">
                                            <a href="#" className="page-link">←</a>
                                        </li>
                                        <li className="page-item active">
                                            <a href="#" className="page-link">1</a>
                                        </li>
                                        <li className="page-item">
                                            <a href="#" className="page-link">2</a>
                                        </li>
                                        <li className="page-item">
                                            <a href="#" className="page-link">3</a>
                                        </li>
                                        <li className="page-item">
                                            <a href="#" className="page-link">→</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Facilty