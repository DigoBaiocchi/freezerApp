import axios from "axios";

export type IndividualTables = "freezer" | "category" | "item" | 'unit';

export type InventoryTable = 'inventory';

export type DatabaseTables = IndividualTables | InventoryTable;

type InventoryPostParams = {
    freezerId: string;
    categoryId: string;
    itemId: string;
    unitId: string;
    entryDate: Date;
    expDate: Date;
    quantity: number;
    description: string;
};

export class ApiCalls {
    databaseTable: DatabaseTables;
    apiUrl: string;

    constructor(databaseTable: DatabaseTables) {
        this.databaseTable = databaseTable;
        this.apiUrl = `http://localhost:3000/${this.databaseTable}`;
    }

    async postCall(name: string) {
        return axios.post(this.apiUrl, {
                name
              })
              .then(response => console.log(response))
              .catch(error => console.log(error))
    }

    async postInventoryCall({ ...params }: InventoryPostParams) {
        const { 
            freezerId,
            categoryId,
            itemId,
            unitId,
            entryDate,
            expDate,
            quantity,
            description,
        } = params;

        return axios.post(this.apiUrl, {
            freezerId,
            categoryId,
            itemId,
            unitId,
            entryDate,
            expDate,
            quantity,
            description,
        })
        .then(response => console.log(response))
        .catch(error => {
            throw new Error(error)
        })
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