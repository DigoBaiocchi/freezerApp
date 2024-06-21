import MainContainer from "./MainContainer";
import { IndividualTable } from "./IndividualTables/Table";
import { IndividualTables } from "@/api/api";
import Form from "./Form";

type MainProps = {
    tableName: IndividualTables;
};

export default function MainBodyIndividualTable({ tableName}: MainProps) {
    return (
        <MainContainer >
          <Form tableName={tableName} />
          <IndividualTable tableName={tableName} />
        </MainContainer>
    );
}