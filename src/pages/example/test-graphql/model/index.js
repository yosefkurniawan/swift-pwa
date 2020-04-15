import { useQuery } from "@apollo/react-hooks";
import * as ExampleSchema from "./schema";

export const getSampleCategories = () => {
    return useQuery(ExampleSchema.sampleCategories);
};

export default { getSampleCategories };