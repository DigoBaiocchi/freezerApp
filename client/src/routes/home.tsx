// import { InventoryCard } from '@/components/InventoryTable/InventoryCard'
import { InputFile } from '@/components/InputFile'
import MainContainer from '@/components/MainContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  component: () => {
    return (
      <MainContainer>
        <InputFile />
      </MainContainer>
    )
  }
})