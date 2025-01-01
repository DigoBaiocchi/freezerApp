import { EditInventory } from '@/components/editButton/EditInventory'
import MainContainer from '@/components/MainContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/inventory/edit-item')({
  validateSearch: (search: Record<string,unknown>): { inventoryId: number }  => {
    return {
      inventoryId: search.inventoryId as number,
    }
  },
  component: () => {
      return (
        <>
          <MainContainer>
            <EditInventory />
          </MainContainer>
        </>
      )
    }
})