import { ApiCalls } from '@/api/api'
import InventoryForm from '@/components/InventoryTable/InventoryForm'
import MainContainer from '@/components/MainContainer'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

type InventoryUpdateParams = {
  id: string;
  freezer_id: string;
  category_id: string;
  item_id: string;
  unit_id: string;
  entry_date: string;
  exp_date: string;
  quantity: string;
  description: string;
};

export const Route = createFileRoute('/inventory/edit-item')({
  validateSearch: (search: Record<string,unknown>): { inventoryId: number }  => {
    return {
      inventoryId: search.inventoryId as number,
    }
  },
  component: () => {
    const { inventoryId } = Route.useSearch() as { inventoryId: number };
    const [itemData, setItemData] = useState<InventoryUpdateParams | null>(null);

    const { data } = useQuery({
        queryKey: [`inventoryRawData`],
        queryFn: async (): Promise<Array<InventoryUpdateParams>> => {
            const apiCall = new ApiCalls("inventory");

            return await apiCall.getInventoryRawData().then(res => {
                console.log(res.data)
                return res.data;
            });
        }
    });

    useEffect(() => {
      if (data) {
        const findData = data.find((inventory) => +inventory.id === inventoryId);
        console.log('findData', findData);
        console.log('inventoryId', inventoryId);
        setItemData(findData as InventoryUpdateParams);
      }
    }, [data, inventoryId]);

    useEffect(() => {
      // Logs itemData after it has been updated
      if (itemData) {
        console.log('itemData', itemData);
      }
    }, [itemData]);

    return (
      <>
        <MainContainer>
          {itemData && inventoryId ? (
            <InventoryForm 
              action='update' 
              inventoryId={inventoryId}
              freezer={itemData.freezer_id}
              category={itemData.category_id}
              item={itemData.item_id}
              unit={itemData.unit_id}
              entryDate={new Date(itemData.entry_date)}
              expDate={new Date(itemData.exp_date)}
              quantity={itemData.quantity}
              description={itemData.description} />
            ) 
            :
            (
              <p>Loading...</p>
            )}
            </MainContainer>
      </>
    )
  }
})