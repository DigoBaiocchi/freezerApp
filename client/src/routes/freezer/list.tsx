import { FreezerList } from '@/components/InventoryTable/FreezerList'
import MainContainer from '@/components/MainContainer'
import { createFileRoute } from '@tanstack/react-router'

type Search = {
  categoryId: number
}

export const Route = createFileRoute('/freezer/list')({
  validateSearch: (search: Record<string,unknown>): Search  => {
    return {
      categoryId: search.categoryId as number,
    }
  },
  component: () => {
    const { categoryId } = Route.useSearch();

    console.log({categoryId})

    return (
      <MainContainer>
        <FreezerList />
      </MainContainer>
    )
  }
})