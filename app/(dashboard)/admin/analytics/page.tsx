'use client';

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Chart } from 'react-google-charts';

export default function AnalyticsPage() {
  const chartData = [
    ['Mois', 'Nombre de Tontines', 'Nombre de Prêts'],
    ['Janvier', 10, 5],
    ['Février', 15, 7],
    ['Mars', 12, 6],
    ['Avril', 18, 8],
    ['Mai', 20, 10],
    ['Juin', 25, 12],
    ['Juillet', 30, 15],
    ['Août', 28, 14],
    ['Septembre', 35, 18],
    ['Octobre', 40, 20],
    ['Novembre', 45, 22],
    ['Décembre', 50, 25]
  ];

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold">Analytiques</h1>
      <Card>
        <CardHeader>
          <CardTitle>Nombre de Tontines et Prêts par Mois</CardTitle>
        </CardHeader>
        <CardContent>
          <Chart
            chartType="AreaChart"
            width="100%"
            height="400px"
            data={chartData}
            options={{
              title: 'Nombre de Tontines et Prêts par Mois',
              hAxis: { title: 'Mois' },
              vAxis: { title: 'Nombre' },
              legend: { position: 'bottom' }
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
