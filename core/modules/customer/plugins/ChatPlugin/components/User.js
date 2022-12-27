/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { initialName } from '@core_modules/customer/helpers/chatHelper';
import useStyles from '@core_modules/customer/plugins/ChatPlugin/components/style';
import Badge from '@material-ui/core/Badge';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

const User = (props) => {
    const {
        chat, selectUserToChat, user, db,
    } = props;
    const styles = useStyles();
    const [dataUnread, setDataUnread] = useState([]);
    const chatId = user && user.chatId;
    const activeChat = () => (chatId === chat.chatId ? 'active' : 'unactive');

    useEffect(() => {
        const refereceUserDb = db.collection('messages');
        const customerUnreadQuery = refereceUserDb.doc(chatId).collection('chat').where('is_customer_read', 'in', [0]);

        const unsub = customerUnreadQuery.onSnapshot((querySnapshot) => {
            const adminUnread = querySnapshot.docs.map((doc) => doc.data());
            setDataUnread(adminUnread);
        });

        return unsub;
    }, [chatId]);

    return (
        <div onClick={() => selectUserToChat(user)} className={styles.userWrapper}>
            <div className={classNames(styles.userContent, activeChat())}>
                <div className={styles.userImage}>
                    <span>{initialName(user.agent_name)}</span>
                </div>
                <div className={styles.userText}>
                    <div className={styles.userName}>{user.agent_name}</div>
                    <div className={styles.userBadge}>{user.agent_name}</div>
                </div>
                <div className={styles.userInfo}>
                    {/* <div className={styles.userDate}>
                        {formatDate(user.lastMessage.time, 'HH:mm')}
                    </div> */}
                    <Badge
                        badgeContent={dataUnread.length}
                        invisible={dataUnread && dataUnread.length === 0}
                        color="error"
                        className={styles.customBadge}
                    />
                </div>
            </div>
        </div>
    );
};

export default User;
