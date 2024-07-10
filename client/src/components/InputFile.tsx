import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, useState } from "react"

export function InputFile() {
    const [file, setFile] = useState<File | null>(null);
    const [fileContent, setFileContent] = useState('');

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
            setFileContent(content);
            console.log('File content:', content);
        };

        reader.readAsText(file);
    }
    
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" accept=".csv" onChange={handleFileChange} />
            {
                file && (
                    <div>
                        <h3>Uploaded File:</h3>
                        <p>Name: {file.name}</p>
                        <p>Type: {file.type}</p>
                        <p>Size: {file.size}</p>
                        <pre>{fileContent}</pre>
                    </div>
                )
            }
        </div>
    )   
}
