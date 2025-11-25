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
    freezerData: dropdrownData[];
    categoryData: dropdrownData[];

};

export function ItemSearch({ freezerId, categoryId, itemName, freezerData, categoryData }: ItemSearchProps) {
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

    
    const handleSelectFreezer = (data: dropdrownData| null) => {
            setSelectedFreezer(data);
        };
        
        const handleSelectCategory = (data: dropdrownData| null) => {
            setSelectedCategory(data);
    };
    
    const handleSearch = (searchTerm: string) => {
        setSearch(searchTerm.trim().toLowerCase());
    }

    const filteredData = () => {
        if (!data) return [];
        const effectiveFreezerId = selectedFreezer?.id ?? freezerId;
        const effectiveCategoryId = selectedCategory?.id ?? categoryId;
        const searchTerm = (search || "").toLowerCase();

        return data.filter((item: ItemSummaryData) => {
            const matchesFreezer = effectiveFreezerId
                ? item.freezerid === effectiveFreezerId
                : true;
            
            const matchesCategory = effectiveCategoryId
                ? item.categoryid === effectiveCategoryId
                : true;
            
            const matchesSearch = searchTerm
                ? item.itemname.toLowerCase().includes(searchTerm) : true;

            return matchesFreezer && matchesCategory && matchesSearch;
        });
    }
        
    const submitSearch = () => {
        console.log("search is", itemName)
        console.log(`Search is ${itemName} and filtered data`, filteredData());
        setSearchResult(filteredData());
    }
    
    const handleClearFilter = () => {
        setSelectedCategory(null);
        setSelectedFreezer(null);
        setSearch('');
        setSearchResult(data ?? []);
    }

    useEffect(() => {
        // if (freezerData && categoryData) {
            if (freezerId !== null) {
                const initialFreezer = freezerData?.find((freezer: dropdrownData) => {
                    if (freezer.id === freezerId) {
                        console.log("Found freezer:", freezer);
                        return freezer;
                    }
                });
                console.log("freezerData", freezerData)
                console.log("freezerId", freezerId)
                console.log("initialFreezer: ", initialFreezer)
                setSelectedFreezer(initialFreezer || null);
            }
            if (categoryId !== null) {
                const initialCategory = categoryData ? 
                categoryData?.find((category: dropdrownData) => category.id === categoryId) : 
                null;
                setSelectedCategory(initialCategory || null);
            }
            if (itemName !== null) {
                setSearch(itemName);
            }
            setSearchResult(filteredData());
        // }
    }, [freezerId, categoryId, itemName, freezerData, categoryData, data]);
    
    if (isPending) {
        return <FreezerCategoryCardSkeleton />;
    }
    
    if (error) {
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
                        <div className="flex justify-center">
                            <Input 
                                onChange={(e) => handleSearch(e.target.value)} 
                                placeholder="Search Item"
                                className="m-1 w-[270px]"
                                value={search as string}
                            />
                            <Link
                                to="/inventory/search"
                                search={{
                                    freezerId: selectedFreezer?.id as number, 
                                    categoryId: selectedCategory?.id as number,
                                    itemName: search
                                }}
                                className="p-1"
                            >
                                <Button onClick={submitSearch}><Search /></Button>                        
                            </Link>
                        </div>
                        <div>
                            <p className="m-2 italic">Select filter:</p>
                            <div>
                                <ComboboxSimple 
                                    data={freezerData} 
                                    setSelectedData={handleSelectFreezer} 
                                    selectedData={selectedFreezer}
                                    type="freezer"
                                />
                                <ComboboxSimple 
                                    data={categoryData} 
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
                                <Link to="/inventory/search" search={{freezerId: '', categoryId: '', itemName: ''}}>
                                    <Button className="m-1" onClick={handleClearFilter}>Clear Filter</Button>                                
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="flex w-[950px]">
                    {itemName ? <span className="flex flex-wrap pl-6 pr-6 font-bold">Results for: {itemName}</span> : ''}
                </div>
            </div>
            <div className="flex justify-center">
                <div className="flex flex-wrap pl-6 pr-6 max-w-[950px]">
                    {
                        searchResult.length > 0 ?
                        searchResult.map((itemData: ItemSummaryData, i: number) => (
                            <ItemCard 
                                key={i}
                                freezerId={itemData.freezerid}
                                categoryId={itemData.categoryid}
                                itemId={itemData.itemid}
                                itemName={itemData.itemname}
                                itemTotal={itemData.itemtotal}

                            />
                        )) :
                        <span className="m-5 font-bold">No results</span>
                    }   
                </div>
            </div>
        </>
    );
}