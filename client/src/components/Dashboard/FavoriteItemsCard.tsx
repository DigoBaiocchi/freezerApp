import { Star } from "lucide-react";
import { Card } from "../ui/card";
import { useState } from "react";

export default function FavoriteItemsCard() {
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(!clicked);
    }


    return (
        <div className="flex justify-center">
            <Card className="flex w-[250px]">
                <div className="flex p-2 w-[50px]">
                    <Star onClick={handleClick} fill={clicked ? "yellow" : "white"} />
                </div>
                <div className="flex justify-start p-2 w-[200px]">
                    <p>Sausage</p>
                </div>
                <div className="p-2 w-[50px]">
                    <p>25</p>
                </div>
            </Card>
        </div>
    );
}