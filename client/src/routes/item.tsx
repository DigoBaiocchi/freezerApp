import { createFileRoute } from '@tanstack/react-router'
import Form from '../components/Form'

export const Route = createFileRoute('/item')({
    component: () => {  
        return (
            <>
                <div>Hello items!</div>
                <Form name='item' />
            </>
        )
    }
})