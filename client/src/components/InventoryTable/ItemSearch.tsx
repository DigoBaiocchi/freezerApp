import { useQuery } from "@tanstack/react-query";
import { ApiCalls } from "@/api/api";
import { FreezerCategoryCardSkeleton } from "./FreezerCategoryCardSkeleton";
import { ItemCard } from "./ItemCard";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { ComboboxSimple } from "../ComboboxSimple";
import { Button } from "../ui/button";

type dropdrownData = {
    id: number
    name: string
}

type ItemSummaryData = {
    freezerid: number;
    categoryid: number;
    itemid: number;
    itemname: string;
    itemtotal: number;
};

export function ItemSearch() {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState<ItemSummaryData[]>([]);
    const [selectedFreezer, setSelectedFreezer] = useState<dropdrownData | null>();
    const [selectedCategory, setSelectedCategory] = useState<dropdrownData | null>();
    const inventory = "inventory";
    const items = "items";
    const inventoryCalls = new ApiCalls(inventory);
    
    const { isPending, error, data} = useQuery({
        queryKey: [inventory, items],
                queryFn: () => inventoryCalls.getItemsList().then((res) => {
                    console.log("getCall data is:", res.data)
                    return res.data;
                })
    });
    
    const freezerData = useQuery({
        queryKey: [`freezerData`],
        queryFn: () => {
            const apiCall = new ApiCalls("freezer");

            return  apiCall.getCall().then(res => res.data);
        }
    });

    const categoryData = useQuery({
        queryKey: [`categoryData`],
        queryFn: () => {
            const apiCall = new ApiCalls("category");

            return  apiCall.getCall().then(res => res.data);
        }
    });

    const handleSelectFreezer = (data: dropdrownData| null) => {
        setSelectedFreezer(data);
    };

    const handleSelectCategory = (data: dropdrownData| null) => {
        setSelectedCategory(data);
    };

    const handleSearch = (searchTerm: string) => {
        setSearch(searchTerm.toLowerCase());
    }

    const handleClearFilter = () => {
        setSelectedCategory(null);
        setSelectedFreezer(null);
    }
    
    useEffect(() => {
        
        const filterResults = data 
                            ? data.filter((item:ItemSummaryData) => {
                                if (selectedFreezer && selectedCategory){
                                    return item.itemname.toLowerCase().includes(search) &&
                                    item.categoryid === selectedCategory?.id &&
                                    item.freezerid === selectedFreezer?.id
                                } else if (selectedFreezer) {
                                    return item.itemname.toLowerCase().includes(search) &&
                                    item.freezerid === selectedFreezer?.id
                                } else if (selectedCategory){
                                    return item.itemname.toLowerCase().includes(search) &&
                                    item.categoryid === selectedCategory?.id
                                } else {
                                    return item.itemname.toLowerCase().includes(search)
                                }
                            }
                            )
                            : [];
        setSearchResult(filterResults);
    }, [search, selectedFreezer, selectedCategory, data]);
    
    if (isPending || categoryData.isPending) {
        return <FreezerCategoryCardSkeleton />;
    }
    
    if (error || categoryData.error) {
        return <div className="flex-col justify-center">
            <div className="flex justify-center m-2">
                <p className="p-1"><b>Unable to get data.</b></p>
            </div>
        </div>
    }
    
    return (
        <>
            <div className="flex justify-center">
                <div className="w-[750px]">
                    <div className="flex justify-center flex-wrap m-2">
                        <Input 
                            onChange={(e) => handleSearch(e.target.value)} 
                            placeholder="Search Item"
                            className="m-1"
                        />
                        <div>
                            <p className="m-2">Select filter:</p>
                            <div>
                                <ComboboxSimple 
                                    data={freezerData.data} 
                                    setSelectedData={handleSelectFreezer} 
                                    selectedData={selectedFreezer}
                                    type="freezer"
                                />
                                <ComboboxSimple 
                                    data={categoryData.data} 
                                    setSelectedData={handleSelectCategory} 
                                    selectedData={selectedCategory}
                                    type="category"
                                />
                                <Button className="m-1" onClick={handleClearFilter}>Clear Filter</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="flex flex-wrap pl-6 pr-6 max-w-[950px]">
                    {
                        searchResult.map((itemData: ItemSummaryData, i: number) => (
                            <ItemCard 
                                key={i}
                                freezerId={itemData.freezerid}
                                categoryId={itemData.categoryid}
                                itemId={itemData.itemid}
                                itemName={itemData.itemname}
                                itemTotal={itemData.itemtotal}

                            />
                        ))
                    }   
                </div>
            </div>
        </>
    );
}