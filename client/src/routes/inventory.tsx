import { createFileRoute } from '@tanstack/react-router'
import InventoryForm from '../components/InventoryTable/InventoryForm'
import { InventoryTable } from '../components/InventoryTable/InventoryTable'
import MainContainer from '@/components/MainContainer'

export const Route = createFileRoute('/inventory')({
  component: () => {
    return (
      <>
        <MainContainer>
          <InventoryForm  />
          <InventoryTable />
        </MainContainer>
      </>
    )
  }
})