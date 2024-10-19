import { ApiCalls, IndividualTables } from "@/api/api";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, useEffect, useState } from "react"
import { IndividualTableData } from "./IndividualTables/Table";
import { Card } from "./ui/card";

type IndividualTablefile = {
    table: IndividualTables;
    name: string;
}

type InventoryFile = {
    freezerId: number;
    categoryId: number;
    itemId: number;
    unitId: number;
    entryDate: string;
    expDate: string;
    quantity: number;
    description: string;
}

export function InputFile() {
    const [file, setFile] = useState<File | null>(null);
    const [fileContent, setFileContent] = useState<Array<IndividualTablefile>>([]);
    const [inventoryFileContent, setInventoryFileContent] = useState<Array<InventoryFile>>([]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const content = e.target?.result as string;
            const result = content.split('\r\n').map((array) => {
                const arrayResult = array.split(',');
                const table = arrayResult[0] as IndividualTables;
                const name = arrayResult[1];
                return { table, name };
            });
            result.shift();
            console.log('File content:', result);
            setFileContent(result);
        };

        reader.readAsText(file);
    };

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
                const entryDate = arrayResult[4];
                const expDate = arrayResult[5];
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

    const insertInventoryToDatabase = () => {
        inventoryFileContent.forEach(async content => {
            const apiCalls = new ApiCalls("inventory");
            const databaseData: Promise<IndividualTableData> = await apiCalls.getCall().then(res => res.data);
            // const checkifNameExists = (await databaseData).find(data => data.name.trim().toLowerCase() === content.name.trim().toLowerCase());
            
            // if (checkifNameExists) {
            //     console.log(`Name ${content.name} already exists`);
            //     throw new Error(`Name ${content.name} already exists`);
            // }

            const {freezerId, categoryId, itemId, unitId, quantity, description} = content;
            const entryDate: Date = new Date(content.entryDate);
            const expDate: Date = new Date(content.expDate);
    
            return await apiCalls.postInventoryCall({freezerId, categoryId, itemId, unitId, entryDate, expDate, quantity, description});
        });
    };
    
    useEffect(() => {
        insertNamesToDatabase();
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
                                            {`Table: ${fileData.table} - Name: ${fileData.name}`}
                                        </pre>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </Card>
        
    )   
}
