import { IndividualTables } from "@/api/api";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, useState } from "react"

type file = {
    table: IndividualTables;
    name: string;
}

export function InputFile() {
    const [file, setFile] = useState<File | null>(null);
    const [fileContent, setFileContent] = useState<Array<file>>([]);

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
    }
    
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
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
    )   
}
