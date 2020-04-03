import Page from "@pages/category";

Page.getInitialProps = async () => ({
    namespacesRequired: ["common", "category"]
});

// export async function getServerSideProps() {
    
    // @TODO: get category data by id then provide the data into props

    // return {
    //     props: {
    //         // ...
    //     }
    // };
// }

export default Page;