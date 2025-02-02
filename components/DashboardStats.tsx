'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, PiggyBank, Bell } from 'lucide-react';

interface Stat {
  title: string;
  value: string;
  icon: React.FC<{ className?: string }>;
  trend: string;
  color: string;
}

export default function DashboardStats() {
  const stats: Stat[] = [
    {
      title: "Prêts actifs",
      value: "2",
      icon: TrendingUp,
      trend: "+10%",
      color: "text-blue-500"
    },
    {
      title: "Total épargné",
      value: "1,250,000 FCFA",
      icon: PiggyBank,
      trend: "+25%",
      color: "text-green-500"
    },
    {
      title: "Tontines actives",
      value: "3",
      icon: Users,
      trend: "Stable",
      color: "text-purple-500"
    },
    {
      title: "Notifications",
      value: "5",
      icon: Bell,
      trend: "Nouvelles",
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
            <p className="text-xs text-muted-foreground">
              {stat.trend}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
