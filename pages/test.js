// import { getDataFromTree } from "@apollo/react-ssr";
// import withApollo from "../src/services/graphql/api";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
// import { GraphCategory } from "../src/services/graphql";
// import { getCategories } from "../src/services/graphql/repository/category";

const QUERY = gql`
    {
        categoryList {
            children_count
            children {
                id
                level
                name
                path
                url_path
                url_key
                include_in_menu
                children {
                    id
                    level
                    name
                    path
                    url_path
                    url_key
                    children {
                        id
                        level
                        name
                        path
                        url_path
                        url_key
                    }
                }
            }
        }
    }
`;

const Test = props => {
    const { loading, data } = useQuery(QUERY);
    // const { loading, data, error } = GraphCategory.getCategories();
    // const { loading, data } = getCategories();

    if (loading || !data) {
        return <h1>loading...</h1>;
    }

    return (
        <>
            <h1>{props.pageConfig.title}</h1>
            total categories: {data.categoryList[0].children_count}
            {data.categoryList[0].children.map((cat, idx) => {
                return (
                    <div key={idx}>
                        <div>{cat.name}</div>
                        {cat.children.length
                            ? cat.children.map((subcat, idx) => {
                                  return <div key={idx}>--{subcat.name}</div>;
                              })
                            : null}
                    </div>
                );
            })}
        </>
    );
};

Test.getInitialProps = async ctx => {
    const pageConfig = {
        title: "Sample Page",
        className: "test"
    };

    // By returning { props: pageConfig }, the Page component
    // will receive `pageConfig` as a prop at build time
    return {
        pageConfig
    };
};


export default Test;
// export default withApollo(Test, { getDataFromTree });