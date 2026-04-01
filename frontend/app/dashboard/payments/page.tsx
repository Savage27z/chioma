import { redirect } from 'next/navigation';

export default function DashboardPaymentsPage() {
  redirect('/tenant/payments');
}
