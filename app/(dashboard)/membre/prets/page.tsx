import LoanRequest from '@/components/LoanRequest';
import ActiveLoans from '@/components/ActiveLoans';

export default function PretsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des prêts</h1>
      <LoanRequest />
      <ActiveLoans />
    </div>
  );
}
