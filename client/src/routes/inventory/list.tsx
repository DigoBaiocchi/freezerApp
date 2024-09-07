import { InventoryList } from '@/components/InventoryTable/InventoryList';
import MainContainer from '@/components/MainContainer';
import { createFileRoute } from '@tanstack/react-router'

type Search = {
  freezerId: number;
  categoryId: number;
  itemId: number;
}

export const Route = createFileRoute('/inventory/list')({
  validateSearch: (search: Record<string,unknown>): Search  => {
    return {
      freezerId: search.freezerId as number,
      categoryId: search.categoryId as number,
      itemId: search.itemId as number
    }
  },
  component: () => {
    const { freezerId, categoryId, itemId } = Route.useSearch();

    return (
      <MainContainer>
        <InventoryList key={freezerId} freezerId={freezerId} categoryId={categoryId} itemId={itemId} />
      </MainContainer>
    )
  }
})