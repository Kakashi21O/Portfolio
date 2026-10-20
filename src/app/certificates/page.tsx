import type { Metadata } from "next";
import { CertificatesView } from "@/components/certificates/CertificatesView";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "Certifications and completed training programs of Mantu Yadav — Python, DevOps, and Data Analysis.",
};

export default function CertificatesPage() {
  return <CertificatesView />;
}
