import { createFileRoute } from '@tanstack/react-router'
import Form from '../components/Form'
import { IndividualTables } from '../api/api'
import { IndividualTable } from '../components/IndividualTables/Table';
const tableName: IndividualTables = 'freezer';

export const Route = createFileRoute(`/${tableName}`)({
  component: () => {
    return (
      <>
        <div>Hello freezer!</div>
        <Form tableName={tableName} />
        <IndividualTable tableName={tableName} />
      </>
    )
  }
})