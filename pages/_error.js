// function Error({ statusCode }) {
//     return (
//         <p>
//             ekekekek
//             {statusCode
//                 ? `An error ${statusCode} occurred on server`
//                 : "An error occurred on client"}
//         </p>
//     );
// }

// Error.getInitialProps = ({ res, err }) => {
//     const namespacesRequired = ["common"];
//     const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
//     return { statusCode, namespacesRequired };
// };

// export default Error;


import Page from "@pages/error";


// const Page = ({ t, statusCode }) => {
//     return (
//         <p>
//             {statusCode
//                 ? `An error ${statusCode} occurred on server`
//                 : "An error occurred on client"}
//         </p>
//     );
// };

Page.getInitialProps = ({ res, err }) => {
    const namespacesRequired = ["error"];
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode, namespacesRequired };
};

export default Page;