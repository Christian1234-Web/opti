import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { TOKEN_COOKIE, USER_COOKIE } from '../../../../services/constants';
import SSRStorage from '../../../../services/storage';
import { Store } from '../../../../services/store';
//import images
import avatar1 from "../../../../assets/images/users/avatar-1.jpg";
import { request } from '../../../../services/utilities';
const storage = new SSRStorage();

const ProfileDropdown = () => {
    const store = useContext(Store);
    const [user_type, setUser_type] = store.user_type;
    const [adminType, setAdminType] = store.adminType;

    const [username, setUsername] = store.username;

    const history = useHistory();
    //Dropdown Toggle
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const toggleProfileDropdown = () => {
        setIsProfileDropdown(!isProfileDropdown);
    };
    const handleUserName = useCallback(async () => {
        const user = await (new SSRStorage()).getItem(USER_COOKIE);
        try {
            const url = `users/${user.id}`
            const rs = await request(url, 'GET', true);
            // console.log(rs);
            setUsername(rs.data.firstName);
            setUser_type(rs.data.type);
            setAdminType(rs.data.userType);
        }
        catch (err) {
            console.log(err)
        }
    }, [setUser_type, setUsername, setAdminType])
    const logOut = () => {
        storage.removeItem(USER_COOKIE);
        storage.removeItem(TOKEN_COOKIE);
        history.push(`/admin-login`);
    }
    // setTimeout(handleUserName, 5000);

    useEffect(() => {
        handleUserName();
    }, [handleUserName])

    return (
        <React.Fragment>
            <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
                <DropdownToggle tag="button" type="button" className="btn">
                    <span className="d-flex align-items-center">
                        <img className="rounded-circle header-profile-user" src={avatar1}
                            alt="Header Avatar" />
                        <span className="text-start ms-xl-2">
                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text text-capitalize">{username ? username : 'Logged User'}</span>
                            <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">Founder</span>
                        </span>
                    </span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">

                    <h6 className="dropdown-header">Welcome Anna!</h6>
                    <DropdownItem href="/pages-profile"><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                        <span className="align-middle">Profile</span></DropdownItem>
                    <DropdownItem href="/apps-chat"><i
                        className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle">Messages</span></DropdownItem>
                    <DropdownItem href="/apps-tasks-kanban"><i
                        className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle">Taskboard</span></DropdownItem>
                    <DropdownItem href="/pages-faqs"><i
                        className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle">Help</span></DropdownItem>
                    <div className="dropdown-divider"></div>
                    <DropdownItem href="/pages-profile"><i
                        className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle">Balance : <b>$5971.67</b></span></DropdownItem>
                    <DropdownItem href="/pages-profile-settings"><span
                        className="badge bg-soft-success text-success mt-1 float-end">New</span><i
                            className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span
                                className="align-middle">Settings</span></DropdownItem>
                    <DropdownItem href="/auth-lockscreen-basic"><i
                        className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Lock screen</span></DropdownItem>

                    <DropdownItem onClick={() => logOut()}><i
                        className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span
                            className="align-middle" data-key="t-logout" >Logout</span></DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </React.Fragment>
    );
};

export default ProfileDropdown;