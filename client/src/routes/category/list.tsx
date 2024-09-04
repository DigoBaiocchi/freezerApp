import { CategoryList } from '@/components/InventoryTable/CategoryList'
import MainContainer from '@/components/MainContainer'
import { createFileRoute } from '@tanstack/react-router'

type Search = {
  freezerId: number
}

export const Route = createFileRoute('/category/list')({
  validateSearch: (search: Record<string,unknown>): Search  => {
    return {
      freezerId: search.freezerId as number,
    }
  },
  component: () => {
    const { freezerId } = Route.useSearch();

    console.log({freezerId})

    return (
      <MainContainer>
        <CategoryList freezerId={freezerId} />
      </MainContainer>
    )
  }
})