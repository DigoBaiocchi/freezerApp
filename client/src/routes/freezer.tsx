import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/freezer')({
  component: () => <div>Hello freezer!</div>
})