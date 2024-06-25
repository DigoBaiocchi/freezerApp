import InventoryForm from '@/components/InventoryTable/InventoryForm'
import MainContainer from '@/components/MainContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/addInventory')({
  component: () => {
    return (
      <>
        <MainContainer>
          <InventoryForm  />
        </MainContainer>
      </>
    )
  }
})