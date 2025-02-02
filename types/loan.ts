export interface LoanData {
  id?: string;
  user_id: string;
  amount: number;
  interest_rate: number;
  status: string;
  application_date: Date;
  repayment_method: string;
  total_to_repay: number;
  remaining_balance: number;
}
