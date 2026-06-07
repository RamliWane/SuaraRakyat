import { fetchAdminStats } from '../../../lib/api/admin';
import DashboardAdmin from '../../components/admin/DashboardAdmin';

export default async function DashboardAdminPage() {
  let initialData = null;

  try {
    initialData = await fetchAdminStats();
  } catch {
    initialData = null;
  }

  return <DashboardAdmin initialData={initialData} />;
}