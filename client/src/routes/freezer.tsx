import { createFileRoute } from '@tanstack/react-router'
import Form from '../components/Form'

export const Route = createFileRoute('/freezer')({
  component: () => {
    return (
      <>
        <div>Hello freezer!</div>
        <Form name='freezer' />
      </>
    )
  }
})