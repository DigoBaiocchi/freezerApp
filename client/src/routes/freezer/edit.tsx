import { createFileRoute } from '@tanstack/react-router'
import { IndividualTables } from '../../api/api'
import MainBodyIndividualTable from '@/components/MainBodyIndividualTable';
const tableName: IndividualTables = 'freezer';

export const Route = createFileRoute(`/${tableName}/edit`)({
  component: () => {
    return <MainBodyIndividualTable tableName={tableName} />
  }
})