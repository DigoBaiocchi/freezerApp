import { ApiCalls, IndividualTables } from "@/api/api";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, useEffect, useState } from "react"
import { IndividualTableData } from "./IndividualTables/Table";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

type IndividualTablefile = {
    table: IndividualTables;
    name: string;
    status: "Already exists" | "New" | "Pending";
}

// type InventoryFile = {
//     freezerId: number;
//     categoryId: number;
//     itemId: number;
//     unitId: number;
//     entryDate: string;
//     expDate: string;
//     quantity: number;
//     description: string;
// }

export function InputFile() {
    const [file, setFile] = useState<File | null>(null);
    const [fileContent, setFileContent] = useState<IndividualTablefile[]>([]);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0] || null;
        if (uploadedFile && uploadedFile.type === 'text/csv') {
            setFile(uploadedFile);
            readFileContent(uploadedFile);
        } else {
            alert('Please upload a valid CSV file.');
        }
    }

    const readFileContent = (file: File) => {
        const reader = new FileReader();
        reader.onload = async (e: ProgressEvent<FileReader>) => {
            const content = e.target?.result as string;
            const result = content.split('\r\n').map((array) => {
                const arrayResult = array.split(',');
                const table = arrayResult[0] as IndividualTables;
                const name = arrayResult[1];
                const status = "Pending";
                return { table, name, status } as IndividualTablefile;
            });
            result.shift();
            const resultStatusUpdate = await Promise.all(
                result.map(async (content: IndividualTablefile) => {
                    const apiCalls = new ApiCalls(content.table);
                    const databaseData: Promise<IndividualTableData> = await apiCalls.getCall().then(res => res.data);
                    const checkifNameExists = (await databaseData).find(data => data.name.trim().toLowerCase() === content.name.trim().toLowerCase());
                    console.log(content)
                    console.log(checkifNameExists)
                    if (checkifNameExists) {
                        return { ...content, status: "Already exists"};
                    } else {
                        return { ...content, status: "New"};
                    }
                })
            ) 
            console.log('File content:', resultStatusUpdate);
            setFileContent(resultStatusUpdate as IndividualTablefile[]);
        };

        reader.readAsText(file);
    };

    const csvInventoryContent = "data:text/csv;charset=utf-8,Name,Quantity";
    const inventoryEncodeUri = encodeURI(csvInventoryContent);
    const csvNonInventoryContent = "data:text/csv;charset=utf-8,Table,Name";
    const nonInventoryEncodeUri = encodeURI(csvNonInventoryContent);

    // const readInventoryFileContent = (file: File) => {
    //     const reader = new FileReader();
    //     reader.onload = (e: ProgressEvent<FileReader>) => {
    //         const content = e.target?.result as string;
    //         const result = content.split('\r\n').map((array) => {
    //             const arrayResult = array.split(',');
    //             const freezerId = +arrayResult[0];
    //             const categoryId = +arrayResult[1];
    //             const itemId = +arrayResult[2];
    //             const unitId = +arrayResult[3];
    //             const entryDate = arrayResult[4];
    //             const expDate = arrayResult[5];
    //             const quantity = +arrayResult[6];
    //             const description = arrayResult[7];
    //             return { freezerId, categoryId, itemId, unitId, entryDate, expDate, quantity, description };
    //         });
    //         result.shift();
    //         console.log('File content:', result);
    //         setInventoryFileContent(result);
    //     };

    //     reader.readAsText(file);
    // };

    // const updateNameStatus = async () => {
    //     const result = await Promise.all(
    //         fileContent.map(async (data: IndividualTablefile) => {
    //             const apiCalls = new ApiCalls(data.table);
    //             const databaseData: Promise<IndividualTableData> = await apiCalls.getCall().then(res => res.data);
    //             const checkifNameExists = (await databaseData).find(data => data.name.trim().toLowerCase() === data.name.trim().toLowerCase());
    //             if (checkifNameExists) {
    //                 return { ...data, status: "Already exists"};
    //             } else {
    //                 return { ...data, status: "New"};
    //             }
    //         })
    //     ) 
        
    //     setFileContent(result as IndividualTablefile[]);
    // };

    const insertNamesToDatabase = () => {
        fileContent.forEach(async content => {
            const apiCalls = new ApiCalls(content.table);
            const databaseData: Promise<IndividualTableData> = await apiCalls.getCall().then(res => res.data);
            const checkifNameExists = (await databaseData).find(data => data.name.trim().toLowerCase() === content.name.trim().toLowerCase());
            
            if (checkifNameExists) {
                console.log(`Name ${content.name} already exists`);
                throw new Error(`Name ${content.name} already exists`);
            }
    
            return await apiCalls.postCall(content.name);
        });
    };

    // const insertInventoryToDatabase = () => {
    //     inventoryFileContent.forEach(async content => {
    //         const apiCalls = new ApiCalls("inventory");
    //         const databaseData: Promise<IndividualTableData> = await apiCalls.getCall().then(res => res.data);
    //         // const checkifNameExists = (await databaseData).find(data => data.name.trim().toLowerCase() === content.name.trim().toLowerCase());
            
    //         // if (checkifNameExists) {
    //         //     console.log(`Name ${content.name} already exists`);
    //         //     throw new Error(`Name ${content.name} already exists`);
    //         // }

    //         const {freezerId, categoryId, itemId, unitId, quantity, description} = content;
    //         const entryDate: Date = new Date(content.entryDate);
    //         const expDate: Date = new Date(content.expDate);
    
    //         return await apiCalls.postInventoryCall({freezerId, categoryId, itemId, unitId, entryDate, expDate, quantity, description});
    //     });
    // };

    // useEffect(() => {
    //     updateNameStatus();
    // }, [statusUpdate]);
    
    useEffect(() => {
        insertNamesToDatabase();
        // setStatusUpdate(false);
    }, [fileContent]);
    
    return (
        <Card className="flex w-[300px] m-2">
            <div className="flex justify-center p-2">
                <div className="flex-row align-middle w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Select File:</Label>
                    <Input id="picture" type="file" accept=".csv" onChange={handleFileChange} />
                    {
                        file && (
                            <div>
                                <h3>Uploaded File:</h3>
                                <p>Name: {file.name}</p>
                                <p>Type: {file.type}</p>
                                <p>Size: {file.size}</p>
                                {
                                    fileContent.map(fileData => (
                                        <pre key={fileData.name}>
                                            {`Table: ${fileData.table} - Name: ${fileData.name} - Status: ${fileData.status}`}
                                        </pre>
                                    ))
                                }
                            </div>
                        )
                    }
                    <div>
                        <p>Templates:</p>
                        <div>
                            <div className="flex">
                                <p className="w-[200px]">Inventory</p>
                                <a href={inventoryEncodeUri} download="inventory_template.csv"><Button><Download /></Button></a>
                            </div>
                            <div className="flex">
                                <p className="w-[200px]"
                                >Non-Inventory</p>
                                <a href={nonInventoryEncodeUri} download="non_inventory_template.csv"><Button><Download /></Button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>        
    )   
}
