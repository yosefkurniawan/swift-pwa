import { useSelector } from 'react-redux';
import gqlService from '../services/graphql';

const TestApolloRedux = () => {
    // get categories from graphql
    const { loading, data, error } = gqlService.getSampleCategories();

    if (loading || !data) {
        return <h1>loading...</h1>;
    }

    if (error) {
        return <h1>Error!</h1>;
    }

    // data from graphql
    const dataGql = data;
    // console.log(dataGql);;

    // data from redux
    const dataRedux = useSelector(
        (state) => ({
            test: state.exampleReducer.test,
        }),
    );

    return (
        <>
            <h2>Data category from graphql</h2>
            total categories:
            {' '}
            {dataGql.categoryList[0].children_count}
            {dataGql.categoryList[0].children.map((cat, idx) => (
                <div key={idx}>
                    <div>{cat.name}</div>
                    {cat.children.length
                        ? cat.children.map((subcat, indx) => (
                            <div key={indx}>
                                --
                                {subcat.name}
                            </div>
                        ))
                        : null}
                </div>
            ))}
            <br />
            <h2>Data from redux</h2>
            <div>{dataRedux.test}</div>
        </>
    );
};


export default TestApolloRedux;
