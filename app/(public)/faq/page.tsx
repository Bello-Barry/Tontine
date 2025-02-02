import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export default function FaqPage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-3xl font-bold">FAQ</h1>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Comment créer une tontine ?</AccordionTrigger>
          <AccordionContent>
            Pour créer une tontine, rendez-vous dans le tableau de bord et sélectionnez "Gestion des tontines".
            Cliquez sur "Créer une nouvelle tontine" et suivez les instructions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Comment faire une demande de prêt ?</AccordionTrigger>
          <AccordionContent>
            Pour faire une demande de prêt, rendez-vous dans le tableau de bord et sélectionnez "Gestion des prêts".
            Cliquez sur "Nouvelle demande" et remplissez le formulaire.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Comment suivre mes épargnes ?</AccordionTrigger>
          <AccordionContent>
            Pour suivre vos épargnes, rendez-vous dans le tableau de bord et sélectionnez "Gestion de l'épargne".
            Vous verrez un tableau de bord détaillé de vos objectifs et contributions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Quels sont les modes de paiement acceptés ?</AccordionTrigger>
          <AccordionContent>
            Nous acceptons plusieurs modes de paiement, notamment Mobile Money (Orange, Airtel), transferts bancaires, et paiements en ligne.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
