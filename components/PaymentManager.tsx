'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

export default function PaymentManager() {
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>('mobile_money');

  const handlePayment = () => {
    if (amount <= 0) {
      alert('Veuillez entrer un montant valide');
      return;
    }

    // Logique de paiement (ex: appel à une API de paiement)
    console.log(`Paiement de ${amount} FCFA effectué via ${paymentMethod}`);
    alert(`Paiement de ${amount} FCFA effectué via ${paymentMethod}`);
    setAmount(0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Paiements</CardTitle>
        <CardDescription>Faites vos paiements ici</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Montant (FCFA)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Entrez le montant"
            />
          </div>
          <div className="space-y-2">
            <Label>Méthode de paiement</Label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            >
              <option value="mobile_money">Mobile Money</option>
              <option value="bank_transfer">Transfert bancaire</option>
              <option value="qr_code">QR Code</option>
            </select>
          </div>
          <Button type="button" onClick={handlePayment} className="w-full">
            Effectuer le paiement
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
