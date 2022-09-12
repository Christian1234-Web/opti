import React, { createContext, useState } from 'react';
export const Store = createContext();


const StoreContext = ({ children }) => {
    let [academic_formOptometrist, setAcademic_formOptometrist] = useState([]);
    let [post_graduateOptometrist, setPost_graduateOptometrist] = useState([]);
    let [referenceOptometrist, setReferenceOptometrist] = useState([]);

    const [academic_formOptician, setAcademic_formOptician] = useState([]);
    const [post_graduateOptician, setPost_graduateOptician] = useState([]);
    const [referenceOptician, setReferenceOptician] = useState([]);

    let [msg, setMsg] = useState('testing store');
    let [facility_approval, setFacility_approval] = useState(' ');
    let [indexing_approval, setIndexing_approval] = useState(' ');
    let [optician_approval, setOptician_approval] = useState(' ');
    let [optometrist_approval, setOptometrist_approval] = useState(' ');

    let [read_only, setRead_only] = useState(false);
    let [read_only_indexing, setRead_only_indexing] = useState(false);
    let [read_only_optician, setRead_only_optician] = useState(false);
    let [read_only_opticianIntern, setRead_only_opticianIntern] = useState(false);

    let [read_only_optometrist, setRead_only_optometrist] = useState(false);
    let [read_only_optometristIntern, setRead_only_optometristIntern] = useState(false);

    let [optician_btn_save, setOptician_btn_save] = useState(false);
    let [optician_btn_update, setOptician_btn_update] = useState(false);

    let [optometrist_btn_save, setOptometrist_btn_save] = useState(false);
    let [optometrist_btn_update, setOptometrist_btn_update] = useState(false);
    let [adminType, setAdminType] = useState(null);
    let [user_type, setUser_type] = useState(null);
    let [username, setUsername] = useState(null);
    let [optician_countdown, setOptician_countdown] = useState('');
    let [optometrist_countdown, setOptometrist_countdown] = useState('');




    let states = {
        msg: [msg, setMsg],
        optician_countdown: [optician_countdown, setOptician_countdown],
        optometrist_countdown: [optometrist_countdown, setOptometrist_countdown],
        facility_approval: [facility_approval, setFacility_approval],
        read_only: [read_only, setRead_only],
        read_only_optometrist: [read_only_optometrist, setRead_only_optometrist],
        read_only_optician: [read_only_optician, setRead_only_optician],
        optometrist_approval: [optometrist_approval, setOptometrist_approval],
        optician_approval: [optician_approval, setOptician_approval],
        optician_btn_update: [optician_btn_update, setOptician_btn_update],
        optician_btn_save: [optician_btn_save, setOptician_btn_save],
        academic_formOptician: [academic_formOptician, setAcademic_formOptician],
        referenceOptician: [referenceOptician, setReferenceOptician],
        post_graduateOptician: [post_graduateOptician, setPost_graduateOptician],
        optometrist_btn_update: [optometrist_btn_update, setOptometrist_btn_update],
        optometrist_btn_save: [optometrist_btn_save, setOptometrist_btn_save],
        academic_formOptometrist: [academic_formOptometrist, setAcademic_formOptometrist],
        post_graduateOptometrist: [post_graduateOptometrist, setPost_graduateOptometrist],
        referenceOptometrist: [referenceOptometrist, setReferenceOptometrist],
        read_only_opticianIntern: [read_only_opticianIntern, setRead_only_opticianIntern],
        read_only_optometristIntern: [read_only_optometristIntern, setRead_only_optometristIntern],
        adminType: [adminType, setAdminType],
        user_type: [user_type, setUser_type],
        username: [username, setUsername],
        indexing_approval: [indexing_approval, setIndexing_approval],
        read_only_indexing: [read_only_indexing, setRead_only_indexing]

    };
    return <Store.Provider value={states}>{children}</Store.Provider>
}
export default StoreContext;