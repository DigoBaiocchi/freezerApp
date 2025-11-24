import { config } from "../utils/config";
import axios from "axios";

export type IndividualTables = "freezer" | "category" | "item" | 'unit' | 'location';

export type InventoryTable = 'inventory';

export type DatabaseTables = IndividualTables | InventoryTable;

export type InventoryPostParams = {
    freezerId: number;
    categoryId: number;
    itemId: number;
    unitId: number;
    locationId: number;
    entryDate: Date;
    expDate: Date;
    quantity: number;
    description: string;
};

export class ApiCalls {
    protected databaseTable: DatabaseTables;
    protected apiUrl: string;

    constructor(databaseTable: DatabaseTables) {
        this.databaseTable = databaseTable;
        this.apiUrl = `${config.SERVER_URL}${this.databaseTable}`;
    }

    async postCall(name: string) {
        try {
            await axios.post(this.apiUrl, {
                name
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async postInventoryCall({ ...params }: InventoryPostParams) {
        try {
            await axios.post(this.apiUrl, {
                ...params
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getCall() {
        return axios.get(this.apiUrl)
            .then(response => response.data)
            .catch(error => console.log(error))
    }

    async getInventoryRawData() {
        return axios.get(`${this.apiUrl}/raw-data`)
        .then(response => response.data)
        .catch(error => console.log(error))
    }

    async getCategoriesList(freezerId: number) {
        if (this.databaseTable === "inventory") {
            return axios.get(`${this.apiUrl}/category-list/${freezerId}`)
                .then(response => response.data)
                .catch(error => console.log(error));
        } else {
            throw new Error("getCategoriesList is only available for inventory table");
        }
    }

    async getItemsList() {
        if (this.databaseTable === "inventory") {
            return axios.get(`${this.apiUrl}/item-list/`)
                .then(response => response.data)
                .catch(error => console.log(error));
        } else {
            throw new Error("getCategoriesList is only available for inventory table");
        }
    }

    async getItemList(freezerId: number, categoryId: number) {
        if (this.databaseTable === "inventory") {
            return axios.get(`${this.apiUrl}/item-list/${freezerId}/${categoryId}`)
                .then(response => response.data)
                .catch(error => console.log(error));
        } else {
            throw new Error("getCategoriesList is only available for inventory table");
        }
    }

    async getIventoryItemList(freezerId: number, categoryId: number, itemId: number) {
        if (this.databaseTable === "inventory") {
            return axios.get(`${this.apiUrl}/inventory-list/${freezerId}/${categoryId}/${itemId}`)
                .then(response => response.data)
                .catch(error => console.log(error));
        } else {
            throw new Error("getCategoriesList is only available for inventory table");
        }
    }

    async updateCall(id: number, name: string) {
        return axios.put(`${this.apiUrl}/${id}`, {
                name: name
            })
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    async updateInventoryCall({ id, ...params }: InventoryPostParams & { id: number }) {
        return axios.put(`${this.apiUrl}/${id}`, {
            ...params
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