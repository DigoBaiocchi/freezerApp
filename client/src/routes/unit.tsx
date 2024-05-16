import { createFileRoute } from '@tanstack/react-router'
import Form from '../components/Form'

export const Route = createFileRoute('/unit')({
    component: () => {
        return (
            <>
                <div>Hello units!</div>
                <Form name='unit' />
            </>
        )
    }
})