'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

interface AdminTontine {
  id: string;
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

export default function AdminTontinesPage() {
  const [tontines, setTontines] = useState<AdminTontine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTontines();
  }, []);

  const loadTontines = async () => {
    try {
      const q = query(collection(db, 'tontines'));
      const querySnapshot = await getDocs(q);
      const tontineData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        start_date: doc.data().start_date.toDate(),
        end_date: doc.data().end_date.toDate()
      })) as AdminTontine[];

      setTontines(tontineData);
    } catch (error) {
      console.error('Erreur lors du chargement des tontines:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des Tontines</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tontines.map((tontine) => (
          <Card key={tontine.id}>
            <CardHeader>
              <CardTitle>{tontine.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="flex items-center">
                  <span className="font-medium">Type:</span>
                  <span className="ml-2">{tontine.type}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium">Contribution:</span>
                  <span className="ml-2">{tontine.contribution_amount} FCFA</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium">Fréquence:</span>
                  <span className="ml-2">{tontine.contribution_type}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium">Limite de membres:</span>
                  <span className="ml-2">{tontine.member_limit}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium">Méthode de paiement:</span>
                  <span className="ml-2">{tontine.payout_method}</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium">Dates:</span>
                  <span className="ml-2">
                    {tontine.start_date.toLocaleDateString()} - {tontine.end_date.toLocaleDateString()}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
