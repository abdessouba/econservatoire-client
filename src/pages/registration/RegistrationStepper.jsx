import MaterialIcon from '../../components/ui/MaterialIcon';

const STEPS = [
  { id: 1, icon: 'person', label: 'Infos Personnelles' },
  { id: 2, icon: 'contact_mail', label: 'Contact & Documents' },
  { id: 3, icon: 'family_restroom', label: 'Parent / Tuteur' },
  { id: 4, icon: 'admin_panel_settings', label: 'Administration' },
];

export default function RegistrationStepper({ currentStep, onStepClick, hasStepError }) {
  return (
    <nav className="space-y-xs">
      {STEPS.map((step) => {
        const isActive = currentStep === step.id;
        const isInvalid = hasStepError?.(step.id);
        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onStepClick(step.id)}
            className={`w-full text-left p-sm rounded-lg flex items-center gap-sm transition-all ${
              isActive
                ? 'bg-secondary-container text-on-secondary-container font-bold'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <MaterialIcon name={step.icon} />
            <span className="font-label-md text-label-md flex-grow">{step.label}</span>
            {isInvalid && <MaterialIcon name="error" className="text-error text-lg" />}
          </button>
        );
      })}
    </nav>
  );
}
