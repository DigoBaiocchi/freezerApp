// import { InventoryCard } from '@/components/InventoryTable/InventoryCard'
import MainContainer from '@/components/MainContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  component: () => {
    return (
      <MainContainer>
        {/* <InventoryCard /> */}
      </MainContainer>
    )
  }
})