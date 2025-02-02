import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold">À Propos</h1>
      <Card>
        <CardHeader>
          <CardTitle>Présentation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Bienvenue sur notre application de gestion des tontines et microfinance.
            Notre mission est de simplifier et de rendre accessible les services financiers
            pour tous, en particulier dans les zones où les solutions traditionnelles sont limitées.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notre Équipe</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Nous sommes une équipe passionnée de développeurs et de spécialistes financiers
            déterminés à apporter des solutions innovantes pour la microfinance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
