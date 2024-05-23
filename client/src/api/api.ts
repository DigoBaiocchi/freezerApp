import axios from "axios";

export type IndividualTables = "freezer" | "category" | "item" | 'unit';

export class ApiCalls {
    individualTable: IndividualTables;
    apiUrl: string;

    constructor(individualTable: IndividualTables) {
        this.individualTable = individualTable;
        this.apiUrl = `http://localhost:3000/${this.individualTable}`;
    }

    async postCall(name: string) {
        return axios.post(this.apiUrl, {
                name: name
              })
              .then(response => console.log(response))
              .catch(error => console.log(error))
    }

    async getCall() {
        return axios.get(this.apiUrl)
            .then(response => response.data)
            .catch(error => console.log(error))
    }

    async updateCall(id: string, name: string) {
        return axios.put(`${this.apiUrl}/${id}`, {
                name: name
            })
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    async deleteCall(id: string) {
        return axios.delete(`${this.apiUrl}/${id}`)
                .then(response => console.log(response))
                .catch(error => console.log(error))
    }
}