import { createFileRoute } from '@tanstack/react-router'
import Form from '../components/Form'
import { ApiCalls } from '../api/api';

const apiCalls = new ApiCalls('category');

export const Route = createFileRoute('/category')({
    component: () => {
        return (
            <>
                <div>Hello category!</div>
                <Form name='category' postFunction={name => apiCalls.postCall(name)}/>
            </>
        )
    }
})