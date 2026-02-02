import { ApiCalls, IndividualTables, /*InventoryPostParams*/ } from "@/api/api";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, useState } from "react"
import { IndiviualTable } from "./IndividualTables/Table";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { individualTableNames } from "./InventoryTable/InventoryForm";
import { FileDataDialog } from "./FileDataDialog";


export type DatabaseTypes = "Non-Inventory" | "Inventory";

type InputFileProps = {
    databaseType: DatabaseTypes;
}

export type AgGridLabelData = {
    table: IndividualTables;
    labelName: string;
    status: "Already exists" | "New" | "Pending";
}

export type AgGridInventoryData = {
  freezer: string;
  category: string;
  item: string;
  unit: string;
  location: string;
  expDate: Date;
  quantity: Number;
  description: string;
};

export function InputFile({ databaseType }: InputFileProps) {
    const [file, setFile] = useState<File | null>(null);
    const [fileContent, setFileContent] = useState<AgGridLabelData[]>([]);
    const [inventoryFileContent, setInventoryFileContent] = useState<AgGridInventoryData[]>([]);

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

    const freezerData = useQuery({
    queryKey: [`${individualTableNames.freezer}`],
        queryFn: () => {
            const apiCall = new ApiCalls(individualTableNames.freezer);

            return  apiCall.getCall().then(res => res.data);
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
    
    // const inventoryData = useQuery({
    //     queryKey: [`inventoryRawData`],
    //     queryFn: () => {
    //         const apiCall = new ApiCalls("inventory");

    //         return apiCall.getInventoryRawData().then(res => {
    //             return res.data;
    //         });
    //     }
    // });    

    const readFileContent = (file: File) => {

        const reader = new FileReader();
        reader.onload = async (e: ProgressEvent<FileReader>) => {
            const content = e.target?.result as string;
            const lines = content.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
            const header = lines.shift();
            const result = lines.map((array) => {
                const arrayResult = array.split(',');
                const table = arrayResult[0] as IndividualTables;
                const labelName = arrayResult[1];
                const status = "Pending";
                return { table, labelName, status } as AgGridLabelData;
            });
            console.log("result", result);
            console.log("header", header?.split(','));
            let resultStatusUpdate = result.map((content: AgGridLabelData) => {
                if (content.table.trim().toLocaleLowerCase() === 'freezer') {
                    const nameExists = freezerData.data.find((data: IndiviualTable) => {
                        return data.name.trim().toLowerCase() === content.labelName.trim().toLowerCase()
                    });
                    return { ...content, status: nameExists ? "Already exists" : "New"};
                }
                if (content.table.trim().toLocaleLowerCase() === 'category') {
                    const nameExists = categoryData.data.find((data: IndiviualTable) => {
                        return data.name.trim().toLowerCase() === content.labelName.trim().toLowerCase()
                    });
                    return { ...content, status: nameExists ? "Already exists" : "New"};
                }
                if (content.table.trim().toLocaleLowerCase() === 'item') {
                    const nameExists = itemData.data.find((data: IndiviualTable) => {
                        return data.name.trim().toLowerCase() === content.labelName.trim().toLowerCase()
                    });
                    return { ...content, status: nameExists ? "Already exists" : "New"};
                }
                if (content.table.trim().toLocaleLowerCase() === 'unit') {
                    const nameExists = unitData.data.find((data: IndiviualTable) => {
                        return data.name.trim().toLowerCase() === content.labelName.trim().toLowerCase()
                    });
                    return { ...content, status: nameExists ? "Already exists" : "New"};
                }
                if (content.table.trim().toLocaleLowerCase() === 'location') {
                    const nameExists = locationData.data.find((data: IndiviualTable) => {
                        return data.name.trim().toLowerCase() === content.labelName.trim().toLowerCase()
                    });
                    return { ...content, status: nameExists ? "Already exists" : "New"};
                }
                else {
                    return undefined;
                }
            }).filter((x): x is AgGridLabelData => x !== undefined);
            console.log('File content:', resultStatusUpdate);
            setFileContent(resultStatusUpdate as AgGridLabelData[]);
        };
        reader.readAsText(file);
    };

    const csvInventoryContent = "data:text/csv;charset=utf-8,freezer_name, category_name, item_name, unit_name, location_name, entry_date, exp_date, quantity, description";
    const inventoryEncodeUri = encodeURI(csvInventoryContent);
    const csvNonInventoryContent = "data:text/csv;charset=utf-8,Table,Name";
    const nonInventoryEncodeUri = encodeURI(csvNonInventoryContent);    

    const readInventoryFileContent = async (file: File) => {
        const reader = new FileReader();
        reader.onload = async (e: ProgressEvent<FileReader>) => {
            const content = e.target?.result as string;
            const lines = content.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
            const result = lines.map((array): AgGridInventoryData => {
                const arrayResult = array.split(',');
                console.log("arrayResult:", arrayResult)
                let [freezer, 
                    category,
                    item,
                    unit,
                    location,
                    _expDate,
                    _quantity,
                    description] = arrayResult;
                
                freezer = freezerData.data.find((data: IndiviualTable) => data.name.trim().toLowerCase() == freezer.trim().toLowerCase())?.name ?? "";
                category = categoryData.data.find((data: IndiviualTable) => data.name.trim().toLowerCase() == category.trim().toLowerCase())?.name ?? "";
                item = itemData.data.find((data: IndiviualTable) => data.name.trim().toLowerCase() == item.trim().toLowerCase())?.name ?? "";
                unit = unitData.data.find((data: IndiviualTable) => data.name.trim().toLowerCase() == unit.trim().toLowerCase())?.name ?? "";
                location = locationData.data.find((data: IndiviualTable) => data.name.trim().toLowerCase() == location.trim().toLowerCase())?.name ?? "";
                
                const expDate = new Date(arrayResult[5] + "T00:00:00");
                console.log("expDate", expDate);
                const quantity = +arrayResult[6];
                return { freezer, category, item, unit, location, expDate, quantity, description };
            });
            result.shift();
            console.log('File content:', result);
            setInventoryFileContent(result as AgGridInventoryData[]);
        };

        reader.readAsText(file);
    }

    // const _readInventoryFileContent = async (file: File) => {
    //     const reader = new FileReader();
    //     reader.onload = async (e: ProgressEvent<FileReader>) => {
    //         const content = e.target?.result as string;
    //         const lines = content.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    //         const result = lines.map((array): InventoryPostParams => {
    //             const arrayResult = array.split(',');
    //             console.log("arrayResult:", arrayResult)
    //             let [freezerName, 
    //                 categoryName,
    //                 itemName,
    //                 unitName,
    //                 locationName,
    //                 _entryDate,
    //                 _expDate,
    //                 _quantity,
    //                 description] = arrayResult;
    //             console.log({ freezerName, arrayResult });
    //             const freezerId = freezerData.data.find((data: IndiviualTable) => data.name.trim().toLowerCase() == freezerName.trim().toLowerCase())?.id ?? 0;
    //             console.log("FreezerId: ", freezerId, "Freezer Name: ", freezerName);
    //             console.log({ categoryName, arrayResult });
    //             const categoryId = categoryData.data.find((data: IndiviualTable) => data.name.trim().toLowerCase() == categoryName.trim().toLowerCase())?.id ?? 0;
    //             console.log("categoryId: ", categoryId, "categoryName: ", categoryName);
    //             const itemId = itemData.data.find((data: IndiviualTable) => data.name.trim().toLowerCase() == itemName.trim().toLowerCase())?.id ?? 0;
    //             console.log("itemId: ", itemId, "itemName: ", itemName);
    //             const unitId = unitData.data.find((data: IndiviualTable) => data.name.trim().toLowerCase() == unitName.trim().toLowerCase())?.id ?? 0;
    //             console.log("unitId: ", unitId, "unitName: ", unitName);
    //             const locationId = locationData.data.find((data: IndiviualTable) => data.name.trim().toLowerCase() == locationName.trim().toLowerCase())?.id ?? 0;
    //             console.log("locationId: ", locationId, "locationName: ", locationName);
    //             const entryDate = new Date(arrayResult[5]);
    //             const expDate = new Date(arrayResult[6]);
    //             const quantity = +arrayResult[7];
    //             return { freezerId, categoryId, itemId, unitId, locationId, entryDate, expDate, quantity, description };
    //         });
    //         result.shift();
    //         console.log('File content:', result);
    //         setInventoryFileContent(result as InventoryPostParams[]);
    //     };

    //     reader.readAsText(file);
    // };

    // const insertNamesToDatabase = () => {
    //     fileContent.forEach(async content => {
    //         console.log("running insertNamesToDatabase")
    //         const apiCalls = new ApiCalls(content.table);

    //         if (content.status === "New") {
    //             return await apiCalls.postCall(content.labelName);
    //         }
    //     });
    // };

    // const insertItemsToInventory = () => {
    //     const apiCalls = new ApiCalls("inventory");
    //     inventoryFileContent.forEach(async content => {
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
                        {/* {
                            databaseType === "Inventory" 
                                ? <Button className="m-1" onClick={insertItemsToInventory}>Upload Items</Button>
                                : <Button className="m-1" onClick={insertNamesToDatabase}>Upload Labels</Button>
                        } */}
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
                            file && 
                                databaseType !== "Inventory" 
                                ? (
                                    <div>
                                        <h3>Uploaded File:</h3>
                                        <p>Name: {file.name}</p>
                                        <p>Type: {file.type}</p>
                                        <p>Size: {file.size}</p><br/>
                                        <h2>Results:</h2>
                                        {
                                            fileContent.map(fileData => (
                                                <p key={fileData.labelName}>
                                                    {`Table: ${fileData.table} - Name: ${fileData.labelName} - Status: ${fileData.status}`}
                                                </p>
                                            ))
                                        }
                                        <div>
                                            <FileDataDialog data={fileContent} databaseType={databaseType} />
                                        </div>
                                    </div>
                                    
                                )
                                : file && (
                                    <div>
                                        <h3>Uploaded File:</h3>
                                        <p>Name: {file.name}</p>
                                        <p>Type: {file.type}</p>
                                        <p>Size: {file.size}</p><br/>
                                        <h2>Results:</h2>
                                        {
                                            inventoryFileContent.map((fileData, i) => (
                                                <p key={i}>
                                                    {`FreezerId: ${fileData.freezer} - CategoryId: ${fileData.category} - Status: ${"fileData.status"}`}
                                                </p>
                                            ))
                                        }
                                        <div>
                                            <FileDataDialog data={inventoryFileContent} databaseType={databaseType} />
                                        </div>
                                    </div>
                                )
                        }
            </span>
        </div>
    )   
}
