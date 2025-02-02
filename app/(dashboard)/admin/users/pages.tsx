'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  profession: string;
  createdAt: Date;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const q = collection(db, 'users');
      const querySnapshot = await getDocs(q);
      const userData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      })) as AdminUser[];

      setUsers(userData);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="flex items-center">
                  <span className="font-medium">Email:</span>
                  <span className="ml-2">{user.email}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium">Téléphone:</span>
                  <span className="ml-2">{user.phone}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium">Profession:</span>
                  <span className="ml-2">{user.profession}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium">Inscrit le:</span>
                  <span className="ml-2">{user.createdAt.toLocaleDateString()}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
