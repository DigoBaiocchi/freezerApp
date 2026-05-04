import { Star } from "lucide-react";
import { Card } from "../ui/card";
import { useState } from "react";
// import EditMenu from "../InventoryTable/EditMenu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

type FavoriteItemData = {
    favorite: boolean;
    name: string;
    quantity: number;
}

export default function FavoriteItemsCard() {
    const whiteColor = "#ffffff";
    const favoriteColor = "#fef08a";
    const [data, setData] = useState<FavoriteItemData[]>([{favorite: false, name: "Sausage", quantity: 25}, {favorite: false, name: "Steak", quantity: 15}])

    const handleClick = (index: number) => {
        console.log(index);
        setData(prev => prev.map((row, i) => i === index ? { ...row, favorite: !row.favorite } : row))
    }

    return (
        <div className="grid justify-center">
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Favorite</TableHead>
                            <TableHead>Item</TableHead>
                            <TableHead>QTD</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader> 
                    <TableBody>
                        {
                            data.map((row, i) => (
                                <TableRow>
                                    <TableCell><Star onClick={() => handleClick(i)}  fill={row.favorite ? favoriteColor : whiteColor } name={row.name} /></TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>Edit</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>        
                            ))
                        }
                        {/* <TableRow>
                            <TableCell><Star onClick={handleClick}  fill={starFill} /></TableCell>
                            <TableCell>Sausage</TableCell>
                            <TableCell>25</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell><Star onClick={handleClick}  fill={starFill} /></TableCell>
                            <TableCell>Sausage</TableCell>
                            <TableCell>25</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow> */}
                    </TableBody>   
                </Table>
            </Card>
            {/* <Card className="grid grid-cols-6">
                <p className="col-span-1 p-2"></p>
                <p className="col-span-3 p-2">Item</p>
                <p className="grid justify-center col-span-1 p-2">QTD</p>
                <p className="col-span-1 p-2"></p>
                <div className="grid justify-center align-middle col-span-1 p-2">
                    <Star onClick={handleClick}  fill="#fef08a" />
                </div>
                <div className="col-span-3 p-2 ">
                    <p>Sausages Cedarvilla</p>
                </div>
                <div className="grid justify-center col-span-1 p-2">
                    <p className="grid">25</p>
                </div>
                <div className="grid justify-center col-span-1 p-2">
                    <p>Edit</p>
                </div>
                <div className="grid justify-center align-middle col-span-1 p-2">
                    <Star onClick={handleClick}  fill="#fef08a" />
                </div>
                <div className="flex flex-wrap col-span-3 p-2 w-20">
                    <p>Sausages Cedarvilla</p>
                </div>
                <div className="grid justify-center col-span-1 p-2">
                    <p className="grid">25</p>
                </div>
                <div className="grid justify-center col-span-1 p-2">
                    <p>Edit</p>
                </div>
            </Card> */}
        </div>
    );
}