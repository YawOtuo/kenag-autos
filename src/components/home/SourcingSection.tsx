import { RequestForm } from "./RequestForm";

export function SourcingSection() {
  return (
    <section
      id="sourcing"
      className="py-20 md:py-24 bg-white border-t border-[#eee]"
    >
      <div className="max-w-[1100px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="text-red text-sm font-semibold tracking-[0.1em] uppercase mb-3">
              Custom import
            </p>
            <h2 className="text-ink text-3xl md:text-4xl font-black leading-tight mb-6">
              Tell us what you want
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              If the vehicle is not in our local stock, we search trusted auction and dealer
              channels in the US, Europe, and Asia. We compare condition, mileage, auction photos,
              shipping timelines, and estimated landed cost before you commit.
            </p>
            <ul className="space-y-3">
              {[
                "Vehicle search and auction guidance",
                "Copart, IAAI, dealer, and international sourcing",
                "Shipping and clearing coordination to Ghana",
                "Local handover support from Kumasi",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink">
                  <span className="w-1.5 h-1.5 bg-red rounded-full mt-2 shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:pt-8">
            <RequestForm />
          </div>
        </div>
      </div>
    </section>
  );
}
