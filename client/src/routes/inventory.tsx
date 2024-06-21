import { createFileRoute } from '@tanstack/react-router'
import InventoryForm from '../components/InventoryTable/InventoryForm'
import { InventoryTable } from '../components/InventoryTable/InventoryTable'

export const Route = createFileRoute('/inventory')({
  component: () => {
    return (
      <>
        <InventoryForm  />
        <InventoryTable />
      </>
    )
  }
})