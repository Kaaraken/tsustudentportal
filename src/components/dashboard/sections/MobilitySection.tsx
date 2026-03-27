import { Globe, MapPin, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionWrapper from "../SectionWrapper";
import MobilityForm from "../forms/MobilityForm";

const fallbackPartners = [
  { name: "University of Amsterdam", country: "Netherlands", flag: "🇳🇱", spots: 5 },
  { name: "Technical University of Munich", country: "Germany", flag: "🇩🇪", spots: 3 },
  { name: "University of Tokyo", country: "Japan", flag: "🇯🇵", spots: 2 },
  { name: "University of Toronto", country: "Canada", flag: "🇨🇦", spots: 4 },
];

const steps = [
  { label: "Applied", done: true },
  { label: "Under Review", done: true },
  { label: "Approved", done: false },
];

const MobilityContent = () => (
  <>
    <h2 className="text-2xl font-bold text-foreground mb-1">Mobility & Exchange</h2>
    <p className="text-muted-foreground text-sm mb-6">Explore exchange opportunities with partner universities</p>

    <div className="glass-card rounded-xl p-6 mb-6">
      <h3 className="font-semibold text-foreground mb-4">Your Application Status</h3>
      <div className="flex items-center gap-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${step.done ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
              {step.done ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
              {step.label}
            </div>
            {i < steps.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />}
          </div>
        ))}
      </div>
    </div>

    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-foreground">Partner Universities</h3>
      <Button className="bg-accent text-accent-foreground hover:bg-gold-light">
        <Globe className="w-4 h-4 mr-2" /> Apply for Exchange
      </Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fallbackPartners.map((p) => (
        <div key={p.name} className="glass-card rounded-xl p-5 hover:shadow-md transition-shadow flex items-start gap-4">
          <span className="text-3xl">{p.flag}</span>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{p.name}</h4>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="w-3.5 h-3.5" /> {p.country}
            </div>
            <p className="text-xs text-accent font-medium mt-2">{p.spots} spots available</p>
          </div>
        </div>
      ))}
    </div>
  </>
);

const MobilitySection = () => (
  <SectionWrapper
    sectionKey="mobility"
    emptyForm={<MobilityForm />}
    fallbackContent={<MobilityContent />}
  >
    {() => <MobilityContent />}
  </SectionWrapper>
);

export default MobilitySection;
