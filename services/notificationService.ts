import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface NotificationData {
  id?: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  status: string;
  createdAt: Date;
}

export const createNotification = async (notificationData: NotificationData) => {
  try {
    const docRef = await addDoc(collection(db, 'notifications'), notificationData);
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la création de la notification:', error);
    throw error;
  }
};

export const getNotificationsByUserId = async (userId: string) => {
  try {
    const q = query(collection(db, 'notifications'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate()
    })) as NotificationData[];
  } catch (error) {
    console.error('Erreur lors du chargement des notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const notificationRef = doc(db, 'notifications', notificationId);
    await updateDoc(notificationRef, { status: 'read' });
  } catch (error) {
    console.error('Erreur lors du marquage de la notification:', error);
    throw error;
  }
};
