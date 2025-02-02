import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface TontineData {
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

export const createTontine = async (tontineData: TontineData) => {
  try {
    const docRef = await addDoc(collection(db, 'tontines'), tontineData);
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création de la tontine:', error);
    throw error;
  }
};

export const getTontinesByUserId = async (userId: string) => {
  try {
    const q = query(collection(db, 'tontines'), where('members', 'array-contains', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      start_date: doc.data().start_date.toDate(),
      end_date: doc.data().end_date.toDate()
    })) as TontineData[];
  } catch (error) {
    console.error('Erreur lors du chargement des tontines:', error);
    throw error;
  }
};

export const addMemberToTontine = async (tontineId: string, memberId: string) => {
  try {
    const tontineRef = doc(db, 'tontines', tontineId);
    await updateDoc(tontineRef, {
      members: [{ id: memberId }]
    }, { merge: true });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du membre:', error);
    throw error;
  }
};
