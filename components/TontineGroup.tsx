'use client';

import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tontineSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'react-toastify';
import { Calendar } from 'lucide-react';

interface TontineData {
  id: string;
  groupName: string;
  contribution: number;
  frequency: string;
  members: string[];
  startDate: Date;
  endDate: Date;
  currentRotation: number;
  createdBy: string;
}

export default function TontineGroup() {
  const [tontines, setTontines] = useState<TontineData[]>([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(tontineSchema)
  });

  useEffect(() => {
    loadTontines();
  }, []);

  const loadTontines = async () => {
    if (!auth.currentUser) return;

    try {
      const q = query(
        collection(db, 'tontines'),
        where('members', 'array-contains', auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const tontineData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as TontineData[];

      setTontines(tontineData);
    } catch (error) {
      toast.error('Erreur lors du chargement des tontines');
    }
  };

  const createTontine = async (data: any) => {
    if (!auth.currentUser) return;

    try {
      setLoading(true);

      const tontineData = {
        ...data,
        createdBy: auth.currentUser.uid,
        currentRotation: 0,
        members: [auth.currentUser.uid], // Le créateur est le premier membre
        createdAt: new Date()
      };

      await addDoc(collection(db, 'tontines'), tontineData);
      toast.success('Tontine créée avec succès');
      reset();
      loadTontines();
    } catch (error) {
      toast.error('Erreur lors de la création de la tontine');
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (tontineId: string, memberEmail: string) => {
    try {
      const userQuery = query(
        collection(db, 'users'),
        where('email', '==', memberEmail)
      );
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        toast.error('Utilisateur non trouvé');
        return;
      }

      const userId = userSnapshot.docs[0].id;
      const tontineRef = doc(db, 'tontines', tontineId);

      await updateDoc(tontineRef, {
        members: [...tontines.find(t => t.id === tontineId)?.members || [], userId]
      });

      toast.success('Membre ajouté avec succès');
      loadTontines();
    } catch (error) {
      toast.error('Erreur lors de l\'ajout du membre');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Créer une nouvelle tontine</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(createTontine)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="groupName">Nom du groupe</Label>
              <Input id="groupName" {...register('groupName')} placeholder="Ex: Tontine Familiale" />
              {errors.groupName && <p className="text-sm text-red-500">{errors.groupName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contribution">Montant de la contribution</Label>
              <Input id="contribution" type="number" {...register('contribution', { valueAsNumber: true })} placeholder="5000" />
              {errors.contribution && <p className="text-sm text-red-500">{errors.contribution.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Fréquence</Label>
              <Select onValueChange={(value) => register('frequency').onChange({ target: { value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir la fréquence" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="daily">Quotidienne</SelectItem>
                  <SelectItem value="weekly">Hebdomadaire</SelectItem>
                  <SelectItem value="monthly">Mensuelle</SelectItem>
                </SelectContent>
              </Select>
              {errors.frequency && <p className="text-sm text-red-500">{errors.frequency.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Date de début</Label>
                <Input id="startDate" type="date" {...register('startDate')} />
                {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">Date de fin</Label>
                <Input id="endDate" type="date" {...register('endDate')} />
                {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Création...' : 'Créer la tontine'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tontines.map((tontine) => (
          <Card key={tontine.id}>
            <CardHeader>
              <CardTitle>{tontine.groupName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="flex items-center">
                  <span className="font-medium">Contribution:</span>
                  <span className="ml-2">{tontine.contribution} FCFA</span>
                </p>
                <p className="flex items-center">
                  <span className="font-medium">Fréquence:</span>
                  <span className="ml-2">{tontine.frequency}</span>
                </p>
                <p className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>
                    {new Date(tontine.startDate).toLocaleDateString()} - {new Date(tontine.endDate).toLocaleDateString()}
                  </span>
                </p>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Membres ({tontine.members.length})</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const email = prompt('Email du nouveau membre:');
                      if (email) addMember(tontine.id, email);
                    }}
                  >
                    Ajouter un membre
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
