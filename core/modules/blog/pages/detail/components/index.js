import Body from '@core_modules/blog/components/Details';
import Category from '@core_modules/blog/components/Category';

const DefaultContent = (props) => (
    <div className="row">
        <div className="col-xs-12 col-sm-2 hidden-mobile">
            <Category {...props} />
        </div>
        <div className="col-xs-12 col-sm-10">
            <Body {...props} />
        </div>
    </div>
);

export default DefaultContent;
