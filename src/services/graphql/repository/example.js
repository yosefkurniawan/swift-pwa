import { useQuery } from "@apollo/react-hooks";
import * as ExampleSchema from "../schema/example";

export const getCategories = () => {
    return useQuery(ExampleSchema.categories);
};
