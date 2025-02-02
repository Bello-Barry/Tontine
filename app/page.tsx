import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold">
        Bienvenue sur notre application de Tontines et Microfinance
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Présentation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Bienvenue sur notre application de gestion des tontines et
            microfinance. Notre mission est de simplifier et de rendre
            accessible les services financiers pour tous, en particulier dans
            les zones où les solutions traditionnelles sont limitées.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Commencez dès maintenant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Link href="/login" className="text-blue-500 underline">
              Se connecter
            </Link>
            <Link href="/register" className="text-blue-500 underline">
              S'inscrire
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
