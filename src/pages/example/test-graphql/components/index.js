import { GraphExample } from "@services/graphql";

/* no need these two here if these are already implemented in _app.js */
// import { getDataFromTree } from "@apollo/react-ssr";
// import withApollo from "../../../../../services/graphql/api";

/* no need to define query from here. better put all queries in src/service/graphql */
// import { useQuery } from "@apollo/react-hooks";
// import gql from "graphql-tag";
// const QUERY = gql`
//     {
//         categoryList {
//             children_count
//             children {
//                 id
//                 level
//                 name
//                 path
//                 url_path
//                 url_key
//                 include_in_menu
//                 children {
//                     id
//                     level
//                     name
//                     path
//                     url_path
//                     url_key
//                     children {
//                         id
//                         level
//                         name
//                         path
//                         url_path
//                         url_key
//                     }
//                 }
//             }
//         }
//     }
// `;

const TestGraphql = props => {
    // const { loading, data } = useQuery(QUERY);
    const { loading, data, error } = GraphExample.getCategories();

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

export default TestGraphql;
// export default withApollo(TestGraphql, { getDataFromTree });
