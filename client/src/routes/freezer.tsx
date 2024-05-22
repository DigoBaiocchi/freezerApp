import { createFileRoute } from '@tanstack/react-router'
import Form from '../components/Form'
import { IndividualTables } from '../api/api'
import { Table } from '../components/Table';

const tableName: IndividualTables = 'freezer';

export const Route = createFileRoute(`/${tableName}`)({
  component: () => {
    return (
      <>
        <div>Hello freezer!</div>
        <Form tableName={tableName} />
        <Table tableName={tableName} />
      </>
    )
  }
})