import { ApiCalls, IndividualTables, InventoryPostParams } from "@/api/api";
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

type InputFileProps = {
    databaseType: "Non-Inventory" | "Inventory";
}

export function InputFile({ databaseType }: InputFileProps) {
    const [file, setFile] = useState<File | null>(null);
    const [fileContent, setFileContent] = useState<IndividualTablefile[]>([]);
    const [inventoryFileContent, setInventoryFileContent] = useState<InventoryPostParams[]>([]);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0] || null;
        if (uploadedFile && uploadedFile.type === 'text/csv') {
            setFile(uploadedFile);
            if (databaseType == "Non-Inventory") {
                readFileContent(uploadedFile);
            } else {
                readInventoryFileContent(uploadedFile);
            }
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

    const csvInventoryContent = "data:text/csv;charset=utf-8,freezerId, categoryId, itemId, unitId, entryDate, expDate, quantity, description";
    const inventoryEncodeUri = encodeURI(csvInventoryContent);
    const csvNonInventoryContent = "data:text/csv;charset=utf-8,Table,Name";
    const nonInventoryEncodeUri = encodeURI(csvNonInventoryContent);

    const readInventoryFileContent = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const content = e.target?.result as string;
            const result = content.split('\r\n').map((array) => {
                const arrayResult = array.split(',');
                const freezerId = +arrayResult[0];
                const categoryId = +arrayResult[1];
                const itemId = +arrayResult[2];
                const unitId = +arrayResult[3];
                const entryDate = new Date(arrayResult[4]);
                const expDate = new Date(arrayResult[5]);
                const quantity = +arrayResult[6];
                const description = arrayResult[7];
                return { freezerId, categoryId, itemId, unitId, entryDate, expDate, quantity, description };
            });
            result.shift();
            console.log('File content:', result);
            setInventoryFileContent(result);
        };

        reader.readAsText(file);
    };

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

    const insertItemsToInventory = () => {
        const apiCalls = new ApiCalls("inventory");
        inventoryFileContent.forEach(async content => {
            try {
                const params: InventoryPostParams = {
                    ...content
                };
                console.log({params});
                await apiCalls.postInventoryCall(params);
            } catch (error) {
                const err = error as Error;
                console.error(`Error adding item: ${err.message}`);
            }
            
        });
    };
    
    useEffect(() => {
        insertNamesToDatabase();
    }, [fileContent]);

    useEffect(() => {
        insertItemsToInventory();
    }, [inventoryFileContent]);
    
    return (
        <div className="flex-col">
            <Card className="flex w-[300px] m-2">
                <div className="flex p-2">
                    <div className="flex-row justify-center w-full max-w-sm items-center gap-1.5">
                        <div className="flex justify-center">
                            <h2 className="font-bold">{databaseType}</h2>
                        </div>
                        <Label className="p-2" htmlFor="picture">Select File:</Label>
                        <Input id="picture" type="file" accept=".csv" onChange={handleFileChange} />
                        <div>
                            <p className="font-semibold p-2">Templates:</p>
                            <div>
                                <div className="flex">
                                    <p className="w-[200px] p-1">{databaseType}</p>
                                    <a href={databaseType === "Inventory" ? inventoryEncodeUri : nonInventoryEncodeUri} className="p-1" download="inventory_template.csv"><Button size={"sm"}><Download /></Button></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>        
            <span>
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
            </span>
        </div>
    )   
}
