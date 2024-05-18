import { createFileRoute } from '@tanstack/react-router'
import Form from '../components/Form'
import { ApiCalls } from '../api/api'

const apiCalls = new ApiCalls('freezer');

export const Route = createFileRoute('/freezer')({
  component: () => {
    return (
      <>
        <div>Hello freezer!</div>
        <Form name='freezer' postFunction={(name) => apiCalls.postCall(name)} />
      </>
    )
  }
})