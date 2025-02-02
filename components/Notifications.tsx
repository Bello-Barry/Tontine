import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle2, Clock } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'loan' | 'savings' | 'tontine' | 'system';
  status: 'unread' | 'read';
  createdAt: Date;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    if (!auth.currentUser) return;

    try {
      const q = query(
        collection(db, 'notifications'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const notificationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      })) as Notification[];

      setNotifications(notificationsData);
    } catch (error) {
      console.error('Erreur lors du chargement des notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      const notificationRef = doc(db, 'notifications', notificationId);
      await updateDoc(notificationRef, {
        status: 'read'
      });

      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId
            ? { ...notif, status: 'read' }
            : notif
        )
      );
    } catch (error) {
      console.error('Erreur lors du marquage de la notification:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notifications</h1>
        {notifications.some(n => n.status === 'unread') && (
          <Button
            variant="outline"
            onClick={async () => {
              const unreadNotifications = notifications.filter(n => n.status === 'unread');
              await Promise.all(
                unreadNotifications.map(n => markAsRead(n.id))
              );
              loadNotifications();
            }}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Tout marquer comme lu
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`transition-colors ${notification.status === 'unread' ? 'bg-gray-50' : ''}`}
          >
            <CardHeader className="flex flex-row items-start justify-between p-4">
              <div className="flex items-start space-x-4">
                <div>
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base mb-1">{notification.title}</CardTitle>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {notification.createdAt.toLocaleDateString()}
                    </span>
                    {notification.status === 'unread' && (
                      <Badge className="bg-blue-100 text-blue-800">
                        Nouveau
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              {notification.status === 'unread' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markAsRead(notification.id)}
                >
                  Marquer comme lu
                </Button>
              )}
            </CardHeader>
          </Card>
        ))}

        {notifications.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-64">
              <Bell className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">Aucune notification</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
