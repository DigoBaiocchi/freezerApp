import axios from "axios";

type IndividualTables = "freezer" | "category" | "item" | 'unit';

export class ApiCalls {
    individualTable: IndividualTables;
    constructor(individualTable: IndividualTables) {
        this.individualTable = individualTable;
    }

    postCall(name: string) {
        axios.post(`http://localhost:3000/${this.individualTable}`, {
                name: name
              })
              .then(response => console.log(response))
              .catch(error => console.log(error))
    }
}