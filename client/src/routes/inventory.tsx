import { createFileRoute } from '@tanstack/react-router'
import InventoryForm from '../components/InventoryForm'

export const Route = createFileRoute('/inventory')({
  component: () => {
    return (
      <>
        <div>Hello Inventory!</div>
        <InventoryForm  />
      </>
    )
  }
})