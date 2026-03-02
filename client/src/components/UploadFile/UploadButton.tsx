import { useEffect, useState } from "react";
import { AgGridInventoryData, AgGridLabelData, DatabaseTypes } from "../InputFile";
import { Button } from "../ui/button";
import { ApiCalls, InventoryPostParams } from "@/api/api";

type UploadDataProps = {
    inputData: AgGridInventoryData[] | AgGridLabelData[];
    databaseType: DatabaseTypes | null;
};

export function UploadButton({ inputData, databaseType }: UploadDataProps) {
    const [uploadData, setUploadData] = useState<AgGridInventoryData[] | AgGridLabelData[]>(inputData);
    
    const inventoryUploadData: InventoryPostParams[] = inputData.map(data => {
        const inventoryData: AgGridInventoryData = data as AgGridInventoryData;

        return {
            freezerId: inventoryData.freezerId,
            categoryId: inventoryData.categoryId,
            itemId: inventoryData.itemId,
            unitId: inventoryData.unitId,
            locationId: inventoryData.locationId,
            entryDate: new Date(),
            expDate: inventoryData.expDate,
            quantity: inventoryData.quantity,
            description: inventoryData.description,
        };
    });
    
    const uploadToDatabase = () => {
        console.log("uploadData", uploadData);
        let isValidData = true;
        for(const data of uploadData) {
            console.log("data", data);
            if (data.status !== "New label" && data.status !== "Valid") {
                // return setGoodData(false);
                isValidData = false;
                break;
            }
        };

        if (isValidData) {
            if (databaseType == "Inventory") {

            } else if (databaseType == "Non-Inventory") {
                insertLabelsToDatabase();
            }
        } else {
            console.log(inventoryUploadData);
            console.log("Fix missing fields");
        }
    };

    const insertLabelsToDatabase = () => {
        (inputData as AgGridLabelData[]).forEach(async content => {
            console.log("running insertNamesToDatabase")
            const apiCalls = new ApiCalls(content.labelType);

            if (content.status === "New label") {
                return await apiCalls.postCall(content.labelName);
            }
        });
    };

    // const insertItemsToInventory = () => {
    //     const apiCalls = new ApiCalls("inventory");
    //     (inputData as AgGridInventoryData[]).forEach(async content => {
    //         try {
    //             const params: InventoryPostParams = {
    //                 ...content
    //             };
    //             console.log({params});
    //             await apiCalls.postInventoryCall(params);
    //         } catch (error) {
    //             const err = error as Error;
    //             console.error(`Error adding item: ${err.message}`);
    //         }
            
    //     });
    // };

    useEffect(() => {
        setUploadData(inputData);
        // checkDataStatus();
        console.log("inputData", inputData);
    }, [inputData]);

    return <Button variant="default" onClick={uploadToDatabase}>Upload Data</Button>;
}