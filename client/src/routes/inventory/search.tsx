import { ItemSearch } from '@/components/InventoryTable/ItemSearch'
import MainContainer from '@/components/MainContainer'
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
    return (
      <>
        <MainContainer>
          <ItemSearch 
            freezerId={freezerId as number} 
            categoryId={categoryId as number} 
            itemName={itemName as String} 
          />
        </MainContainer>
      </>
    )
  }
})