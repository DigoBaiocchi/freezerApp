import { FreezerList } from '@/components/InventoryTable/FreezerList'
import MainContainer from '@/components/MainContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/freezer/list')({
  component: () => {
    return (
      <MainContainer>
        <FreezerList />
      </MainContainer>
    )
  }
})