import { ItemList } from '@/components/InventoryTable/ItemList';
import MainContainer from '@/components/MainContainer';
import { createFileRoute } from '@tanstack/react-router'

type Search = {
  freezerId: number;
  categoryId: number;
}

export const Route = createFileRoute('/item/list')({
  validateSearch: (search: Record<string,unknown>): Search  => {
    return {
      freezerId: search.freezerId as number,
      categoryId: search.categoryId as number
    }
  },
  component: () => {
    const { freezerId, categoryId } = Route.useSearch();

    return (
      <MainContainer>
        <ItemList key={freezerId} freezerId={freezerId} categoryId={categoryId} />
      </MainContainer>
    )
  }
})