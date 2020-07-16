import TextField from '@components/Forms/TextField';
import DropFile from '@components/DropFile';
import useStyles from './styles';

const FormComment = ({
    formData, setFormData, state, t, setState, handleGetBase64, fileAccept,
}) => {
    const styles = useStyles();
    return (
        <>
            <div className={styles.block}>
                <TextField
                    name="message"
                    onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                    value={formData.message}
                    placeholder={t('rma:form:placeholder:message')}
                    label={t('rma:form:label:message')}
                    multiline
                    rows={4}
                />
            </div>
            <div className={styles.block}>
                <DropFile
                    value={state.dropValue}
                    setValue={(dropValue) => setState({ ...state, dropValue })}
                    label={t('rma:form:placeholder:uploadFile')}
                    getBase64={handleGetBase64}
                    acceptedFile={fileAccept}
                />
            </div>
        </>
    );
};

export default FormComment;
