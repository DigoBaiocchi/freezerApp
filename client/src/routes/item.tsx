import { createFileRoute } from '@tanstack/react-router'
import Form from '../components/Form'
import { Table } from '../components/Table';
import { IndividualTables } from '../api/api';

const tableName: IndividualTables = 'item';

export const Route = createFileRoute(`/${tableName}`)({
  component: () => {
    return (
      <>
        <div>Hello {tableName}!</div>
        <Form tableName={tableName} />
        <Table tableName={tableName} />
      </>
    )
  }
})