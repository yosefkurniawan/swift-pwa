import useStyles from './style'
import Typograpy from '../../Typography'
import classNames from 'classnames'


const Component = ({ active = false, label = "", value = "", onChange }) => {
    const styles = useStyles()
    const [checked, setChecked] = React.useState(active);
    const handleChange = () => {
      setChecked(!checked);
    };
    const containerStyle = checked ? classNames(styles.container, styles.active) : styles.container
    const labelStyle = checked ? classNames(styles.label, styles.labelActive) : styles.label
    return (
        <div className={containerStyle} onClick={handleChange}>
            <Typograpy className={labelStyle}>{label}</Typograpy>
        </div>
    )
}

export default Component