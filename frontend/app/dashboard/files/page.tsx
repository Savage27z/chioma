import { redirect } from 'next/navigation';

export default function DashboardFilesPage() {
  redirect('/tenant/files');
}
