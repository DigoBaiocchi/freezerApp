import InventoryForm from '@/components/InventoryTable/InventoryForm'
import MainContainer from '@/components/MainContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/addInventory')({
  component: () => {
    return (
      <>
        <MainContainer>
          <InventoryForm action='insert' inventoryId={0} freezer='' category='' item='' unit='' entryDate={new Date()} expDate={new Date()} quantity='0' description='' />
        </MainContainer>
      </>
    )
  }
})