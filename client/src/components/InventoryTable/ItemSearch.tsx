import { useQuery } from "@tanstack/react-query";
import { ApiCalls } from "@/api/api";
import { FreezerCategoryCardSkeleton } from "./FreezerCategoryCardSkeleton";
import { ItemCard } from "./ItemCard";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { ComboboxSimple } from "../ComboboxSimple";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";

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

type ItemSearchProps = {
    freezerId: number | null;
    categoryId: number | null;
    itemName: String;
};

export function ItemSearch({ freezerId, categoryId, itemName }: ItemSearchProps) {
    const [search, setSearch] = useState(itemName);
    const [searchResult, setSearchResult] = useState<ItemSummaryData[]>([]);
    const [selectedFreezer, setSelectedFreezer] = useState<dropdrownData | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<dropdrownData | null>(null);
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
        // if (freezerId) {
        //     setSelectedFreezer(freezerData.data.filter((freezer: dropdrownData)  => freezer.id === freezerId))
        // }
        setSelectedFreezer(data);
    };

    const handleSelectCategory = (data: dropdrownData| null) => {
        // if (categoryId) {
        //     setSelectedFreezer(categoryData.data.filter((category: dropdrownData)  => category.id === categoryId))
        // }
        setSelectedCategory(data);
    };

    const handleSearch = (searchTerm: string) => {
        setSearch(searchTerm.trim().toLowerCase());
    }

    const filteredData = () => {
            return data ? data.filter((item:ItemSummaryData) => {
                if (selectedFreezer && selectedCategory) {
                    console.log("freezer and category are selected")
                    return item.itemname.toLowerCase().includes(search as string) &&
                        item.categoryid === selectedCategory?.id &&
                        item.freezerid === selectedFreezer?.id
                } else if (selectedFreezer) {
                    console.log("freezer is selected")
                    return item.itemname.toLowerCase().includes(search as string) &&
                        item.freezerid === selectedFreezer?.id
                } else if (selectedCategory) {
                    console.log("category is selected")
                    return item.itemname.toLowerCase().includes(search as string) &&
                        item.categoryid === selectedCategory?.id
                } else if (!search) {
                    return item;
                } else {
                    return item.itemname.toLowerCase().includes(search as string)
                }
            }) : [];
    }
    
    const submitSearch = () => {
        console.log("search is", search)
        console.log(`Search is ${search} and filtered data`, filteredData());
        setSearchResult(filteredData());
    }

    const handleClearFilter = () => {
        setSelectedCategory(null);
        setSelectedFreezer(null);
        setSearch('');
        setSearchResult(data);
    }
    
    useEffect(() => {
        submitSearch();
        console.log("search is", search)
        console.log(selectedFreezer)
        console.log(selectedCategory)
    }, [data, selectedFreezer, selectedCategory]);
    
    // useEffect(() => {
    //     console.log("FreezerId: " + freezerId)
    //     console.log("categoryId: " + categoryId)
    //     const filterResults = data 
    //                         ? data.filter((item:ItemSummaryData) => {
    //                             if ((selectedFreezer || freezerId) && (selectedCategory || categoryId)){
    //                                 return item.itemname.toLowerCase().includes(search) &&
    //                                 item.categoryid === categoryId &&
    //                                 item.freezerid === freezerId
    //                             } else if (selectedFreezer) {
    //                                 return item.itemname.toLowerCase().includes(search) &&
    //                                 item.freezerid === freezerId
    //                             } else if (selectedCategory){
    //                                 return item.itemname.toLowerCase().includes(search) &&
    //                                 item.categoryid === categoryId
    //                             } else {
    //                                 return item.itemname.toLowerCase().includes(search)
    //                             }
    //                         }
    //                         )
    //                         : [];
    //                         console.log(filterResults)
    //     setSearchResult(filterResults);
    // }, [search, selectedFreezer, selectedCategory, data, freezerId, categoryId]);
    
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
                        <Link
                            to="/inventory/search"
                            search={{
                                freezerId: selectedFreezer?.id as number, 
                                categoryId: selectedCategory?.id as number,
                                itemName: search
                            }}
                        >
                            <Button onClick={submitSearch}><Search /></Button>                        
                        </Link>
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
                                <Link 
                                    to="/inventory/search" 
                                    search={{ 
                                        freezerId: selectedFreezer?.id as number, 
                                        categoryId: selectedCategory?.id as number,
                                        itemName: search as String,
                                    }}
                                >
                                    <Button onClick={submitSearch} className="m-1">Apply Filter</Button>
                                </Link>
                                <Link to="/inventory/search">
                                    <Button className="m-1" onClick={handleClearFilter}>Clear Filter</Button>                                
                                </Link>
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