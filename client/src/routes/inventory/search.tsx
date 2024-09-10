import { ItemSearch } from '@/components/InventoryTable/ItemSearch'
import MainContainer from '@/components/MainContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/inventory/search')({
  component: () => {
    return (
      <>
        <MainContainer>
          <ItemSearch />
        </MainContainer>
      </>
    )
  }
})