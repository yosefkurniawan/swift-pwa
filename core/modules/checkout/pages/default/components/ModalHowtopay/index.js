import Button from '@common_button';
import Typography from '@common_typography';
import { useTranslation } from '@i18n';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import parse, { domToReact } from 'html-react-parser';
import gqlService from '../../../../services/graphql';
import useStyles from './style';

const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

const ModalHowtoPay = ({
    open,
    setOpen,
}) => {
    const { t } = useTranslation(['common', 'checkout', 'validate']);
    const styles = useStyles();
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const { data, error, loading: loadingTutor } = gqlService.getCmsPage({ identifier: 'how-to-pay' });

    React.useEffect(() => {
        setTimeout(() => {
            const coll = document.getElementsByClassName('collapsible');
            if (coll[0]) {
                coll[0].classList.toggle('active');
                const content = coll[0].nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = `${content.scrollHeight}px`;
                }
            }
        }, 1000);
    });

    const onCollapse = () => {
        const coll = document.getElementsByClassName('collapsible');
        let i;
        /* eslint-disable */
        for (i = 0; i < coll.length; i += 1) {
            coll[i].addEventListener("click", function () {
                this.classList.toggle("active");
                let content = this.nextElementSibling;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }
        /* eslint-enable */
    };

    const options = {
        replace: ({ attribs, children }) => {
            if (!attribs) {
                return null;
            }
            if (attribs.class === 'acctitle') {
                return <button type="button" onClick={() => onCollapse()} className="collapsible">{domToReact(children, options)}</button>;
            }

            if (attribs.class === 'acc_content clearfix') {
                return <div className="content-collapsible">{domToReact(children, options)}</div>;
            }
            return null;
        },
    };

    if (data && !error) {
        return (
            <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={setOpen}
                maxWidth="sm"
                fullWidth={!!isDesktop}
                fullScreen={!isDesktop}
            >
                <AppBar className={styles.appBar}>
                    <Typography
                        variant="label"
                        type="bold"
                        align="left"
                        letter="uppercase"
                        className={styles.title}
                    >
                        {data.cmsPage.title}
                    </Typography>
                    <IconButton
                        className={styles.btnClose}
                        edge="start"
                        onClick={setOpen}
                        aria-label="close"
                    >
                        <CloseIcon className={styles.iconClose} />
                    </IconButton>
                </AppBar>
                <div>
                    <DialogContent dividers>
                        <div className={styles.body}>
                            {parse(data.cmsPage.content, options)}
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <div className={styles.footer}>
                            <Button loading={loadingTutor} onClick={setOpen} className={styles.btnSave} type="submit">
                                {t('checkout:buttonOk')}
                            </Button>
                        </div>
                    </DialogActions>
                </div>
            </Dialog>
        );
    }
    return null;
};

export default ModalHowtoPay;
