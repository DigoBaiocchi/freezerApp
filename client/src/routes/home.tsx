import { InputFile } from '@/components/InputFile'
import { FreezerList } from '@/components/InventoryTable/FreezerList'
import MainContainer from '@/components/MainContainer'
import { Card } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  component: () => {
    return (
      <MainContainer>
        <div className="flex justify-center">
          <Card className="flex justify-center min-w-[950px]">
            <InputFile />
          </Card>
        </div>
        <FreezerList />
      </MainContainer>
    )
  }
})