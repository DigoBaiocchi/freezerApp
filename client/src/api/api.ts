import axios from "axios";

export type IndividualTables = "freezer" | "category" | "item" | 'unit';

export type InventoryTable = 'inventory';

export type DatabaseTables = IndividualTables | InventoryTable;

export type InventoryPostParams = {
    freezerId: number;
    categoryId: number;
    itemId: number;
    unitId: number;
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

    async updateCall(id: number, name: string) {
        return axios.put(`${this.apiUrl}/${id}`, {
                name: name
            })
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    async updateQuantityCall(id: number, quantity: number) {
        return axios.patch(`${this.apiUrl}/update-quantity/${id}`, {
            quantity
        })
        .then(response => console.log(response))
        .catch(error => { throw new Error(error) })
    }

    async deleteCall(id: number) {
        return axios.delete(`${this.apiUrl}/${id}`)
                .then(response => console.log(response))
                .catch(error => console.log(error))
    }
}