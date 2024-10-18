import { ApiCalls } from '@/api/api';
import { FreezerCategoryCardSkeleton } from '@/components/InventoryTable/FreezerCategoryCardSkeleton';
import { ItemSearch } from '@/components/InventoryTable/ItemSearch'
import MainContainer from '@/components/MainContainer'
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

type Search = {
  freezerId: number | '';
  categoryId: number | '';
  itemName: String;
} | null;

export const Route = createFileRoute('/inventory/search')({

  validateSearch: (search: Record<string,unknown>): Search  => {
    if (!search.freezerId || !search.categoryId) {
      return null;
    }
    return {
      freezerId: (search.freezerId as number) || '',
      categoryId: (search.categoryId as number) || '',
      itemName: search.itemName as String,
    }
  },
  component: () => {
    const { freezerId, categoryId, itemName } = Route.useSearch() ?? {};
    
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
 
    if (freezerData.isPending || categoryData.isPending) {
      return (
        <>
          <MainContainer>
          <FreezerCategoryCardSkeleton />
          </MainContainer>
        </>
      )
  }

    return (
      <>
        <MainContainer>
          <ItemSearch 
            freezerId={freezerId as number} 
            categoryId={categoryId as number} 
            itemName={itemName as String} 
            freezerData={freezerData.data}
            categoryData={categoryData.data}
          />
        </MainContainer>
      </>
    )
  }
})