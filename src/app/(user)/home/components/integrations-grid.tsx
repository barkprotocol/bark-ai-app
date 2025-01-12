import { INTEGRATIONS } from '../data/integrations';
import { IntegrationCard } from './integration-card';

export function IntegrationsGrid() {
  const handleIntegrationClick = (integrationLabel: string) => {
    // TODO: Implement integration click handler
    console.log(`Clicked on integration: ${integrationLabel}`);
    // Additional functionality can be added here, such as routing or triggering a modal.
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {INTEGRATIONS.map((item, index) => (
        <IntegrationCard
          key={item.label}
          item={item}
          onClick={() => handleIntegrationClick(item.label)}
          index={index}
        />
      ))}
    </div>
  );
}
