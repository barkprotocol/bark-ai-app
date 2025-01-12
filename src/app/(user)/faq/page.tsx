import { EAPTransactionChecker } from '@/components/eap-transaction-checker';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FaqItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

const faqItems: FaqItem[] = [
  {
    id: 'item-1',
    question: 'I paid for Early Access Program, but still not showing up?',
    answer: (
      <div className="space-y-4">
        <span>
          It usually takes 5~30 seconds for the EAP to be granted to your
          account.
          <br />
          If the EAP is not granted, please paste your transaction hash into the
          transaction checker below.
        </span>
        <EAPTransactionChecker />
      </div>
    ),
  },
  {
    id: 'item-2',
    question: 'Can I export my embedded wallet?',
    answer: (
      <div className="space-y-4">
        <span>
          Unfortunately, to ensure a maximum level of security, we currently do
          not support exporting your embedded wallet.
          <br />
          We will be integrating with famous Embedded Wallet providers soon so
          you can have absolute control over your wallet.
        </span>
      </div>
    ),
  },
];

export default function FaqPage() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex flex-1 flex-col py-8">
        <div className="w-full px-8 mb-6">
          <h1 className="text-2xl font-medium text-primary">FAQ</h1>
        </div>
      </div>

      <Accordion type="single" collapsible className="mx-8">
        {faqItems.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="py-4 px-6 bg-background hover:bg-accent rounded-md transition-colors">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="py-4 px-6 bg-background/60 text-secondary">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
