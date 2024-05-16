import { createFileRoute } from '@tanstack/react-router'
import Form from '../components/Form'

export const Route = createFileRoute('/category')({
    component: () => {
        return (
            <>
                <div>Hello category!</div>
                <Form name='category' />
            </>
        )
    }
})