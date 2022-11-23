/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import useStyles from '@core_modules/customer/plugins/ChatPlugin/components/style';
import React from 'react';

import MessageContainer from '@core_modules/customer/plugins/ChatPlugin/components/MessageContainer';
import UserContainer from '@core_modules/customer/plugins/ChatPlugin/components/UserContainer';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';

const ChatWrapper = (props) => {
    const {
        chat,
        // loading,
        loadingMessages,
        selectUserToChat,
        clearChat,
        listUsers,
        db,
        messages,
        formik,
        changeSerchUser,
        searchText,
        handleSeachUser,
        onFocusDeleteRead,
        toggleChat,
        handleDropFile,
        isAutoResponse,
        handleAutoTextSubmit,
        autoResponseContent,
    } = props;
    const styles = useStyles();

    const desktopView = (
        <>
            <div className={classNames(styles.userContainer, 'hidden-mobile')}>
                <UserContainer
                    chat={chat}
                    selectUserToChat={selectUserToChat}
                    listUsers={listUsers}
                    db={db}
                    changeSerchUser={changeSerchUser}
                    searchText={searchText}
                    handleSeachUser={handleSeachUser}
                />
            </div>
            <div className={classNames(styles.messageContainer, 'hidden-mobile')}>
                {chat ? (
                    <MessageContainer
                        chat={chat}
                        clearChat={clearChat}
                        messages={messages}
                        formik={formik}
                        onFocusDeleteRead={onFocusDeleteRead}
                        toggleChat={toggleChat}
                        handleDropFile={handleDropFile}
                        isAutoResponse={isAutoResponse}
                        handleAutoTextSubmit={handleAutoTextSubmit}
                        autoResponseContent={autoResponseContent}
                        loadingMessages={loadingMessages}
                    />
                ) : (
                    <>
                        <div className={styles.selectedUser}>
                            <div className={styles.userText} />
                            <div style={{ cursor: 'pointer' }} onClick={toggleChat}>
                                <CloseIcon />
                            </div>
                        </div>
                        <div className={styles.messageContent}>
                            <div style={{ textAlign: 'center' }}>
                                <img style={{ width: '125px' }} src="/assets/img/ghosts.png" alt="empty" />
                                <p className={styles.emptyText}>Select User to Chat</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );

    const mobileView = (
        <>
            {!chat ? (
                <div className={classNames(styles.userContainer, 'hidden-desktop')}>
                    <UserContainer
                        chat={chat}
                        toggleChat={toggleChat}
                        selectUserToChat={selectUserToChat}
                        listUsers={listUsers}
                        db={db}
                        changeSerchUser={changeSerchUser}
                        searchText={searchText}
                        handleSeachUser={handleSeachUser}
                    />
                </div>
            ) : (
                <div className={classNames(styles.messageContainer, 'hidden-desktop')}>
                    <MessageContainer
                        chat={chat}
                        clearChat={clearChat}
                        messages={messages}
                        formik={formik}
                        onFocusDeleteRead={onFocusDeleteRead}
                        toggleChat={toggleChat}
                        handleDropFile={handleDropFile}
                        isAutoResponse={isAutoResponse}
                        handleAutoTextSubmit={handleAutoTextSubmit}
                        autoResponseContent={autoResponseContent}
                        loadingMessages={loadingMessages}
                    />
                </div>
            )}
        </>
    );

    return (
        <div className={styles.container}>
            {desktopView}
            {mobileView}
        </div>
    );
};

export default ChatWrapper;
