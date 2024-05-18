import { createFileRoute } from '@tanstack/react-router'
import Form from '../components/Form'
import { ApiCalls } from '../api/api';

const apiCalls = new ApiCalls('item');

export const Route = createFileRoute('/item')({
    component: () => {  
        return (
            <>
                <div>Hello items!</div>
                <Form name='item' postFunction={name => apiCalls.postCall(name)}/>
            </>
        )
    }
})