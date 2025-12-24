import React from "react";
import SettingsPanel from "../panels/SettingsPanel";
import LeasePanel from "../panels/LeasePanel";
import RequestsPanel from "../panels/RequestsPanel";
import PaymentsPanel from "../panels/PaymentsPanel";


type Props = {
  activeFeature: string;
};

export default function FeaturePanel({ activeFeature }: Props) {
  switch (activeFeature) {
    case "settings":
      return <SettingsPanel/>;
    case "leases":
      return <LeasePanel />;
    case "requests":
      return <RequestsPanel />;
    case "payments":
      return <PaymentsPanel />;
    default:
      return null;
  }
}
