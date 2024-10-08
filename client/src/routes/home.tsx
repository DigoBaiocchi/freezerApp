import FavoriteItemsCard from '@/components/Dashboard/FavoriteItemsCard'
import { InputFile } from '@/components/InputFile'
import { FreezerList } from '@/components/InventoryTable/FreezerList'
import MainContainer from '@/components/MainContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  component: () => {
    return (
      <MainContainer>
        <div className="flex justify-center m-2">
            <InputFile />
        </div>
        <FavoriteItemsCard />
        <FreezerList />
      </MainContainer>
    )
  }
})