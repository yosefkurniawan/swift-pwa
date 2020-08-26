/* eslint-disable no-unused-vars */
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
    },
    sortTitle: {
        marginTop: '16px',
        fontWeight: 'bold',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const SortDesktop = (props) => {
    const {
        isSearch, defaultSort, filterValue, setFiltervalue,
    } = props;
    let sortByData;

    if (isSearch) {
        sortByData = [
            { value: JSON.stringify({ key: 'relevance', value: 'DESC' }), label: 'Relevance' },
            { value: JSON.stringify({ key: 'name', value: 'ASC' }), label: 'Alphabetically (A to Z)' },
            { value: JSON.stringify({ key: 'name', value: 'DESC' }), label: 'Alphabetically (Z to A)' },
            { value: JSON.stringify({ key: 'price', value: 'DESC' }), label: 'Price (Low to High)' },
            { value: JSON.stringify({ key: 'price', value: 'ASC' }), label: 'Price (High to Low)' },
        ];
    } else {
        sortByData = [
            { value: JSON.stringify({ key: 'position', value: 'ASC' }), label: 'Most Relevance' },
            { value: JSON.stringify({ key: 'name', value: 'ASC' }), label: 'Alphabetically (A to Z)' },
            { value: JSON.stringify({ key: 'name', value: 'DESC' }), label: 'Alphabetically (Z to A)' },
            { value: JSON.stringify({ key: 'price', value: 'DESC' }), label: 'Price (Low to High)' },
            { value: JSON.stringify({ key: 'price', value: 'ASC' }), label: 'Price (High to Low)' },
        ];
    }
    const classes = useStyles();
    const [value, setValue] = React.useState(defaultSort);
    const [selectedFilter, setFilter] = React.useState(filterValue);

    const handleChange = (event) => {
        setValue(event.target.value);
        const savedData = {
            selectedFilter,
        };
        if (value !== '') {
            savedData.sort = value;
        }

        setFiltervalue(savedData);
    };
    return (
        <div className={classes.container}>
            <span className={classes.sortTitle}>
                Sort By
            </span>
            <FormControl className={classes.formControl}>
                <NativeSelect
                    value={value}
                    onChange={handleChange}
                    name="sort"
                    className={classes.selectEmpty}
                >
                    {sortByData.map((val, idx) => <option key={idx} value={val.value}>{val.label}</option>)}
                </NativeSelect>
            </FormControl>
        </div>
    );
};

export default SortDesktop;
