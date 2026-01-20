import { ApiCalls, IndividualTables, InventoryPostParams } from "@/api/api";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, useEffect, useState } from "react"
import { IndividualTableData, IndiviualTable } from "./IndividualTables/Table";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { individualTableNames } from "./InventoryTable/InventoryForm";

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
                // readInventoryFileContent(uploadedFile);
            }
        } else {
            alert('Please upload a valid CSV file.');
        }
    }

    const getLabelData = async (labelName: IndividualTables): Promise<IndividualTableData> => {
        try {
            const apiCalls = new ApiCalls(labelName);
            const databaseData = await apiCalls.getCall().then(res => res);

            return databaseData.data;
        } catch (e) {
            console.error("getLabelData failed for: " , labelName, e);
            return [];
        }
    }

    const freezerData = useQuery({
    queryKey: [`${individualTableNames.freezer}Data`],
        queryFn: () => {
            const apiCall = new ApiCalls(individualTableNames.freezer);

            return  apiCall.getCall().then(res => {
                console.log(res.data)
                return res.data;
            });
        }
    });

    const categoryData = useQuery({
        queryKey: [`${individualTableNames.category}Data`],
        queryFn: () => {
            const apiCall = new ApiCalls(individualTableNames.category);

            return  apiCall.getCall().then(res => res.data);
        }
    });

    const itemData = useQuery({
        queryKey: [`${individualTableNames.item}Data`],
        queryFn: () => {
            const apiCall = new ApiCalls(individualTableNames.item);

            return  apiCall.getCall().then(res => res.data);
        }
    });

    const unitData = useQuery({
        queryKey: [`${individualTableNames.unit}Data`],
        queryFn: () => {
            const apiCall = new ApiCalls(individualTableNames.unit);

            return  apiCall.getCall().then(res => res.data);
        }
    });

    const locationData = useQuery({
        queryKey: [`${individualTableNames.location}Data`],
        queryFn: () => {
            const apiCall = new ApiCalls(individualTableNames.location);

            return  apiCall.getCall().then(res => res.data);
        }
    });
    
    const inventoryData = useQuery({
            queryKey: [`inventoryRawData`],
            queryFn: () => {
                const apiCall = new ApiCalls("inventory");
    
                return apiCall.getInventoryRawData().then(res => {
                    return res.data;
                });
            }
        });

    const readFileContent = (file: File) => {

        const reader = new FileReader();
        reader.onload = async (e: ProgressEvent<FileReader>) => {
            const content = e.target?.result as string;
            const result = content.split(/\r?\n/).map((array) => {
                const arrayResult = array.split(',');
                const table = arrayResult[0] as IndividualTables;
                const name = arrayResult[1];
                const status = "Pending";
                return { table, name, status } as IndividualTablefile;
            });
            result.shift();
            console.log("result", result);
            let resultStatusUpdate = result.map((content: IndividualTablefile) => {
                // const databaseData = await getLabelData(content.table);
                // console.log("databaseData: ", databaseData);
                if (content.table.trim().toLocaleLowerCase() === 'freezer') {
                    const nameExists = freezerData.data.find((data: IndiviualTable) => {
                        return data.name.trim().toLowerCase() === content.name.trim().toLowerCase()
                    });
                    return { ...content, status: nameExists ? "Already exists" : "New"};
                }
                if (content.table.trim().toLocaleLowerCase() === 'category') {
                    const nameExists = categoryData.data.find((data: IndiviualTable) => {
                        return data.name.trim().toLowerCase() === content.name.trim().toLowerCase()
                    });
                    return { ...content, status: nameExists ? "Already exists" : "New"};
                }
                if (content.table.trim().toLocaleLowerCase() === 'item') {
                    const nameExists = itemData.data.find((data: IndiviualTable) => {
                        return data.name.trim().toLowerCase() === content.name.trim().toLowerCase()
                    });
                    return { ...content, status: nameExists ? "Already exists" : "New"};
                }
                if (content.table.trim().toLocaleLowerCase() === 'unit') {
                    const nameExists = unitData.data.find((data: IndiviualTable) => {
                        return data.name.trim().toLowerCase() === content.name.trim().toLowerCase()
                    });
                    return { ...content, status: nameExists ? "Already exists" : "New"};
                }
                if (content.table.trim().toLocaleLowerCase() === 'location') {
                    const nameExists = locationData.data.find((data: IndiviualTable) => {
                        return data.name.trim().toLowerCase() === content.name.trim().toLowerCase()
                    });
                    return { ...content, status: nameExists ? "Already exists" : "New"};
                }
                else {
                    return undefined;
                }
            }).filter((x): x is IndividualTablefile => x !== undefined);
            console.log('File content:', resultStatusUpdate);
            setFileContent(resultStatusUpdate as IndividualTablefile[]);
        };
        reader.readAsText(file);
    };

    const csvInventoryContent = "data:text/csv;charset=utf-8,freezerId, categoryId, itemId, unitId, locationId, entryDate, expDate, quantity, description";
    const inventoryEncodeUri = encodeURI(csvInventoryContent);
    const csvNonInventoryContent = "data:text/csv;charset=utf-8,Table,Name";
    const nonInventoryEncodeUri = encodeURI(csvNonInventoryContent);

    // const readInventoryFileContent = async (file: File) => {
    //     const reader = new FileReader();
    //     const freezerData = await getLabelData("freezer");
    //     const categoryData = await getLabelData("category");
    //     const itemData = await getLabelData("item");
    //     const unitData = await getLabelData("unit");
    //     const locationData = await getLabelData("location");
    //     reader.onload = async (e: ProgressEvent<FileReader>) => {
    //         const content = e.target?.result as string;
    //         const result = await Promise.all(
    //             content.split('\r\n').map(async (array) => {
    //                 const arrayResult = array.split(',');
    //                 console.log("arrayResult:", arrayResult)
    //                 let [freezerName, 
    //                     categoryName,
    //                     itemName,
    //                     unitName,
    //                     locationName,
    //                     _entryDate,
    //                     _expDate,
    //                     _quantity,
    //                     description] = arrayResult;
    //                 const freezerId = freezerData.find(data => data.name.toLowerCase() == freezerName.toLowerCase())?.id || 0;
    //                 console.log("FreezerId: ", freezerId, "Freezer Name: ", freezerName);
    //                 const categoryId = categoryData.find(data => data.name.toLowerCase() == categoryName.toLowerCase())?.id || 0;
    //                 console.log("categoryId: ", categoryId, "categoryName: ", categoryName);
    //                 const itemId = itemData.find(data => data.name.toLowerCase() == itemName.toLowerCase())?.id || 0;
    //                 console.log("itemId: ", itemId, "itemName: ", itemName);
    //                 const unitId = unitData.find(data => data.name.toLowerCase() == unitName.toLowerCase())?.id || 0;
    //                 console.log("unitId: ", unitId, "unitName: ", unitName);
    //                 const locationId = locationData.find(data => data.name.toLowerCase() == locationName.toLowerCase())?.id || 0;
    //                 console.log("locationId: ", locationId, "locationName: ", locationName);
    //                 const entryDate = new Date(arrayResult[5]);
    //                 const expDate = new Date(arrayResult[6]);
    //                 const quantity = +arrayResult[7];
    //                 return { freezerId, categoryId, itemId, unitId, locationId, entryDate, expDate, quantity, description };
    //             })
    //         );
    //         result.shift();
    //         console.log('File content:', result);
    //         setInventoryFileContent(result);
    //     };

    //     reader.readAsText(file);
    // };

    const insertNamesToDatabase = () => {
        fileContent.forEach(async content => {
            console.log("running insertNamesToDatabase")
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
    
    // useEffect(() => {
    //     insertNamesToDatabase();
    // }, [fileContent]);

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
                        <Button className="m-1" onClick={insertNamesToDatabase}>Upload</Button>
                        <div className="mt-1">
                            <hr></hr>
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
                                    <p>Size: {file.size}</p><br/>
                                    <h2>Results:</h2>
                                    {
                                        fileContent.map(fileData => (
                                            <p key={fileData.name}>
                                                {`Table: ${fileData.table} - Name: ${fileData.name} - Status: ${fileData.status}`}
                                            </p>
                                        ))
                                    }
                                </div>
                            )
                        }
            </span>
        </div>
    )   
}
