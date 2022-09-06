import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import MetaTags from 'react-meta-tags';
import EmailSidebar from './EmailSidebar';
import EmailToolbar from './EmailToolbar';
import { request } from '../../../../../services/utilities';
import { USER_COOKIE } from '../../../../../services/constants';
import SSRStorage from '../../../../../services/storage';
const storage = new SSRStorage();


const MailInbox = () => {
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('');
    const fetchTickets = useCallback(async () => {
        const user = await storage.getItem(USER_COOKIE);
        setUser(user);
        try {
            const url = `tickets/?id=&ticketId=&userId=&status`;
            const rs = await request(url, 'GET', true);
            setMessages(rs.data);
        } catch (err) {
            console.log(err)
        }
    }, []);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);
    return (
        <React.Fragment>
            <div className="pt-4">
                <Container fluid>
                    {/* <MetaTags>
                        <title>Mailbox | Velzon - React Admin & Dashboard </title>
                    </MetaTags> */}
                    <div className="email-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
                        <EmailSidebar messages={messages} userId={user?.id} fetchTickets={fetchTickets} />
                        <EmailToolbar messages={messages} userId={user?.id} />
                    </div>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default MailInbox;