import ItemFeatured from './Item';

const Grid = (props) => {
    const { data = [], title } = props;
    return (
        <div className="row">
            <h4 className="col-md-12 center">{title}</h4>
            {
                data.map((val, idx) => (
                    <div className="col-md-3 center" key={idx}>
                        <ItemFeatured {...val} />
                    </div>
                ))
            }
        </div>
    );
};

export default Grid;
