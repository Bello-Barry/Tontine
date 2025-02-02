'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loanSchema } from '@/lib/validators';
import { auth, db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'react-toastify';
import { Upload, Calculator } from 'lucide-react';

interface LoanRequestProps {
  onCalculatorOpen: () => void;
}

export default function LoanRequest({ onCalculatorOpen }: LoanRequestProps) {
  const [loading, setLoading] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loanSchema)
  });

  const handleDocUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileNames = Array.from(files).map(file => file.name);

      setUploadedDocs(prev => [...prev, ...fileNames]);
    }
  };

  const onSubmit = async (data: any) => {
    if (!auth.currentUser) {
      toast.error('Vous devez être connecté pour faire une demande de prêt');
      return;
    }

    try {
      setLoading(true);

      const loanRequest = {
        ...data,
        userId: auth.currentUser.uid,
        status: 'pending',
        documents: uploadedDocs,
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'loans'), loanRequest);
      toast.success('Demande de prêt soumise avec succès');
      reset();
      setUploadedDocs([]);
    } catch (error) {
      toast.error('Erreur lors de la soumission de la demande');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demande de prêt</CardTitle>
        <CardDescription>
          Remplissez le formulaire ci-dessous pour soumettre votre demande de prêt
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onCalculatorOpen}
              className="flex items-center"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Simuler le prêt
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Montant demandé (FCFA)</Label>
            <Input id="amount" type="number" {...register('amount', { valueAsNumber: true })} />
            {errors.amount && <p className="text-sm text-red-500">{errors.amount.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Durée (en mois)</Label>
            <Input id="duration" type="number" {...register('duration', { valueAsNumber: true })} />
            {errors.duration && <p className="text-sm text-red-500">{errors.duration.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Objet du prêt</Label>
            <Textarea id="purpose" {...register('purpose')} placeholder="Décrivez l'utilisation prévue du prêt..." />
            {errors.purpose && <p className="text-sm text-red-500">{errors.purpose.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Documents justificatifs</Label>
            <div className="grid gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                className="flex items-center"
              >
                <Upload className="w-4 h-4 mr-2" />
                Télécharger les documents
              </Button>
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={handleDocUpload}
              />
              {uploadedDocs.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Documents téléchargés :</p>
                  <ul className="text-sm space-y-1">
                    {uploadedDocs.map((doc, index) => (
                      <li key={index}>{doc}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Soumission en cours...' : 'Soumettre la demande'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
