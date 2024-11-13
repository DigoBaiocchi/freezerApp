import FavoriteItemsCard from '@/components/Dashboard/FavoriteItemsCard'
import { FreezerList } from '@/components/InventoryTable/FreezerList'
import MainContainer from '@/components/MainContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  component: () => {
    return (
      <MainContainer>
        <FavoriteItemsCard />
        <FreezerList />
      </MainContainer>
    )
  }
})