import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface LoanData {
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

export const createLoan = async (loanData: LoanData) => {
  try {
    const docRef = await addDoc(collection(db, 'loans'), loanData);
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création du prêt:', error);
    throw error;
  }
};

export const getLoansByUserId = async (userId: string) => {
  try {
    const q = query(collection(db, 'loans'), where('user_id', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      application_date: doc.data().application_date.toDate()
    })) as LoanData[];
  } catch (error) {
    console.error('Erreur lors du chargement des prêts:', error);
    throw error;
  }
};

export const updateLoanStatus = async (loanId: string, status: string) => {
  try {
    const loanRef = doc(db, 'loans', loanId);
    await updateDoc(loanRef, { status });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du prêt:', error);
    throw error;
  }
};
