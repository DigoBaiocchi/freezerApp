import { createFileRoute } from '@tanstack/react-router'
import Form from '../components/Form'
import { IndividualTable } from '../components/IndividualTables/Table';
import { IndividualTables } from '../api/api';

const tableName: IndividualTables = 'item';

export const Route = createFileRoute(`/${tableName}`)({
  component: () => {
    return (
      <>
        <div>Hello {tableName}!</div>
        <Form tableName={tableName} />
        <IndividualTable tableName={tableName} />
      </>
    )
  }
})