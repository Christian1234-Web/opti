// import should be made
// import SSRStorage from './storage';
import { API_URI, HTTP_URI } from './constants';
// import axios from 'axios';
import SSRStorage from './storage';
import { TOKEN_COOKIE } from './constants';
const parseJSON = response => response.json();
export const isUnset = o => typeof o === 'undefined' || o === null;
export function decodeValue(val) {
    if (typeof val === 'string') {
        try {
            return JSON.parse(val);
        } catch (_) { console.log(_) }
    }

    return val;
}
export function encodeValue(val) {
    if (typeof val === 'string') {
        return val;
    }

    return JSON.stringify(val);
}
export const staffname = user =>
    user ? `${user?.first_name} ${user?.last_name}` : '--';

const headers = user => {
    // console.log(user.accessToken)
    if (user) {
        const jwt = `Bearer ${user.accessToken}`;
        return { ...defaultHeaders, Authorization: jwt };
    } else {
        return defaultHeaders;
    }
};
export const defaultHeaders = {
    Accept: 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    'Content-Type': 'application/json'
};

const checkStatus = async response => {
    // console.log(response);
    if (!response.ok) {
        const message = await response.text();
        const err = JSON.parse(message);
        // console.log(err);
        // console.log(err, 'checkStatus');
        throw Object.freeze({ message: err.message || err.detail });
    }

    return response;
};

export const request = async (url, method, authed = false, data) => {
    // prettier-ignore
    const user = await (new SSRStorage()).getItem(TOKEN_COOKIE);
    const response = await fetch(`${API_URI}/${url}`, {
        method: method,
        headers: authed ? headers(user) : { ...defaultHeaders },
        body: JSON.stringify(data),
    });
    const result = await checkStatus(response);
    return parseJSON(result);
};   
export const httpRequest = async (url, method, data) => {

    const response = await fetch(`${HTTP_URI}/${url}`, {
        method: method,
        headers: { ...defaultHeaders },
        body: JSON.stringify(data),
    });
    const result = await checkStatus(response);
    return parseJSON(result);

};
export const formatPatientId = data => {
    let formattedId = String(data.id);
    let len = 7 - formattedId.length;
    while (len >= 0) {
        formattedId = '0' + formattedId;
        len--;
    }
    return formattedId;
};
export const patientname = (user, pid = false) =>
    user
        ? `${user.other_names} ${user.surname} ${pid
            ? `(${formatPatientId(user)} ${user.legacy_patient_id ? `[${user.legacy_patient_id}]` : ''
            })`
            : ''
        }`
        : '--';
