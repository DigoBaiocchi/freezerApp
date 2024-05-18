import { createFileRoute } from '@tanstack/react-router'
import Form from '../components/Form'
import { ApiCalls } from '../api/api';

const apiCalls = new ApiCalls('unit');

export const Route = createFileRoute('/unit')({
    component: () => {
        return (
            <>
                <div>Hello units!</div>
                <Form name='unit' postFunction={name => apiCalls.postCall(name)}/>
            </>
        )
    }
})