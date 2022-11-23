/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/img-redundant-alt */

import useStyles from '@core_modules/customer/plugins/ChatPlugin/components/style';
import User from '@core_modules/customer/plugins/ChatPlugin/components/User';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

const UserContainer = (props) => {
    const {
        chat, toggleChat, selectUserToChat, listUsers, db, changeSerchUser, searchText, handleSeachUser,
    } = props;
    const styles = useStyles();
    return (
        <>
            <div className={styles.userMainTitle}>
                <h3>Chat</h3>
                <div className="hidden-desktop" style={{ cursor: 'pointer' }} onClick={toggleChat}>
                    <CloseIcon />
                </div>
            </div>
            <form className={styles.formUserSearch} onSubmit={handleSeachUser}>
                <TextField name="search" placeholder="Search user ..." className={styles.searchInput} value={searchText} onChange={changeSerchUser} />
                <Button type="submit" className={styles.searchButton}>
                    <SearchIcon
                        fontSize="small"
                        style={{
                            color: 'white',
                        }}
                    />
                </Button>
            </form>
            <div className={styles.overflowUser}>
                {listUsers && listUsers.length > 0 ? (
                    listUsers.map((user, i) => <User key={i} chat={chat} user={user} db={db} selectUserToChat={selectUserToChat} />)
                ) : (
                    <p className={styles.emptyText}>No User Found</p>
                )}
            </div>
        </>
    );
};

export default UserContainer;
