export interface TontineData {
  id?: string;
  name: string;
  admin_id: string;
  type: string;
  contribution_type: string;
  contribution_amount: number;
  member_limit: number;
  payout_method: string;
  start_date: Date;
  end_date: Date;
}
