'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, DollarSign, Users, Bell } from 'lucide-react';

interface AdminStat {
  title: string;
  value: string;
  icon: React.FC<{ className?: string }>;
  color: string;
}

export default function AdminStats() {
  const stats: AdminStat[] = [
    {
      title: "Total des Prêts",
      value: "5,000,000 FCFA",
      icon: DollarSign,
      color: "text-blue-500"
    },
    {
      title: "Total Épargné",
      value: "3,000,000 FCFA",
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Nombre d'Utilisateurs",
      value: "1,200",
      icon: Users,
      color: "text-purple-500"
    },
    {
      title: "Notifications Non Lues",
      value: "10",
      icon: Bell,
      color: "text-orange-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`w-4 h-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
