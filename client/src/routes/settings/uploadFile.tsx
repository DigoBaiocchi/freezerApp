import { InputFile } from '@/components/InputFile'
import MainContainer from '@/components/MainContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/uploadFile')({
  component: () => {
    return (
      <MainContainer>
        <div className="flex flex-wrap justify-center m-2">
            <InputFile databaseType='Non-Inventory' />
            <InputFile databaseType='Inventory' />
        </div>
      </MainContainer>
    )
  }
})