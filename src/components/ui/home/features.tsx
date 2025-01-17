"use client";

import {
  LightningBoltIcon,
  Link1Icon,
  MagicWandIcon,
  GitHubLogoIcon,
  ActivityLogIcon,
} from "@radix-ui/react-icons";
import BlurFade from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";
import { IntegrationsBackground } from "@/components/ui/integrations-background";

const features = [
  {
    Icon: MagicWandIcon,
    name: "Cutting-Edge AI Intelligence",
    description:
      "Harness the power of the world's most advanced AI models, including Claude 3.5-Sonnet and GPT-4o, to intelligently analyze your Solana transactions in real-time, providing data-driven insights and seamless automated actions.",
    className: "col-span-1 sm:col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="relative h-full w-full">
          <div className="absolute left-10 top-10 h-32 w-32 animate-blob rounded-full bg-primary/30 mix-blend-multiply blur-xl"></div>
          <div className="absolute right-10 top-10 h-32 w-32 animate-blob animation-delay-2000 rounded-full bg-secondary/30 mix-blend-multiply blur-xl"></div>
          <div className="absolute bottom-10 left-20 h-32 w-32 animate-blob animation-delay-4000 rounded-full bg-accent/30 mix-blend-multiply blur-xl"></div>
        </div>
      </div>
    ),
  },
  {
    Icon: LightningBoltIcon,
    name: "Seamless Execution",
    description:
      "Experience ultra-efficient, frictionless transactions powered by our deep Solana integration. Enjoy smooth, rapid execution without the need for compromise.",
    className: "col-span-1 sm:col-span-3 lg:col-span-1",
    background: null,
  },
  {
    Icon: Link1Icon,
    name: "Comprehensive Ecosystem Integration",
    description:
      "Effortlessly connect with the full spectrum of Solana's protocols and services. Our platform is designed for seamless AI-powered collaboration, ensuring full synergy with the ecosystem.",
    className: "col-span-1 sm:col-span-3 lg:col-span-3",
    background: <IntegrationsBackground />,
  },
  {
    Icon: GitHubLogoIcon,
    name: "Open Source & Community Driven",
    description:
      "Built with transparency and collaboration in mind. Our full-stack application is completely open source, community-driven, and welcomes contributions from developers worldwide to shape the future of Solana AI tools.",
    className: "col-span-1 sm:col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="h-32 w-32 animate-pulse rounded-full border-4 border-accent"></div>
      </div>
    ),
  },
  {
    Icon: ActivityLogIcon,
    name: "AI-Driven Automations & Agents",
    description:
      "Revolutionize your workflows with powerful AI agents and custom automations designed to handle complex tasks. *Coming soon* to streamline your operations even further.",
    className: "col-span-1 sm:col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="h-32 w-32 animate-pulse rounded-full border-4 border-accent"></div>
      </div>
    ),
  },
];

const Features = () => {
  return (
    <BlurFade delay={0.5} className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="mb-3 text-2xl font-bold tracking-tight sm:mb-4 sm:text-4xl">
            Tailored for Solana
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Seamless integration with the world&apos;s leading AI models
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={cn(
                "group relative overflow-hidden rounded-2xl border bg-card p-4 shadow-lg transition-all hover:shadow-xl sm:rounded-3xl sm:p-6",
                feature.className
              )}
            >
              <div className="relative h-32 w-32 mb-4">
                <feature.Icon
                  className="w-full h-full text-[#DBCFC7]"
                  aria-label={feature.name} // Added aria-label for better accessibility
                />
              </div>
              <h3 className="text-lg font-semibold">{feature.name}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                {feature.background}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BlurFade>
  );
};

export default Features;
