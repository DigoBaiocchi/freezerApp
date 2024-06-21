import { createFileRoute } from '@tanstack/react-router'
import { IndividualTables } from '../api/api';
import MainBodyIndividualTable from '@/components/MainBodyIndividualTable';

const tableName: IndividualTables = 'unit';

export const Route = createFileRoute(`/${tableName}`)({
  component: () => {
    return <MainBodyIndividualTable tableName={tableName} />
  }
})