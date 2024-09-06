import { createFileRoute } from '@tanstack/react-router'
import { InventoryTable } from '../../components/InventoryTable/InventoryTable'
import MainContainer from '@/components/MainContainer'

export const Route = createFileRoute('/inventory/edit')({
  component: () => {
    return (
      <>
        <MainContainer>
          <InventoryTable />
        </MainContainer>
      </>
    )
  }
})