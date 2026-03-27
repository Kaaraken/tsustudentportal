import { FileText, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionWrapper from "../SectionWrapper";
import DocumentsForm from "../forms/DocumentsForm";

const fallbackDocuments = [
  { name: "Official Transcript", date: "Mar 15, 2026", type: "PDF" },
  { name: "Enrollment Certificate", date: "Feb 1, 2026", type: "PDF" },
  { name: "Student ID Card", date: "Sep 1, 2024", type: "PDF" },
  { name: "Grade Report – Fall 2025", date: "Jan 10, 2026", type: "PDF" },
  { name: "Grade Report – Spring 2025", date: "Jul 5, 2025", type: "PDF" },
];

const DocumentsContent = ({ documents }: { documents: typeof fallbackDocuments }) => (
  <>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Documents</h2>
        <p className="text-muted-foreground text-sm">Download or request academic documents</p>
      </div>
      <Button className="bg-accent text-accent-foreground hover:bg-gold-light">
        <Plus className="w-4 h-4 mr-2" /> Request New Document
      </Button>
    </div>
    <div className="space-y-3">
      {documents.map((doc) => (
        <div key={doc.name} className="glass-card rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground truncate">{doc.name}</h4>
            <p className="text-xs text-muted-foreground">Issued: {doc.date} · {doc.type || "PDF"}</p>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1.5" /> Download
          </Button>
        </div>
      ))}
    </div>
  </>
);

const DocumentsSection = () => (
  <SectionWrapper
    sectionKey="documents"
    emptyForm={<DocumentsForm />}
    fallbackContent={<DocumentsContent documents={fallbackDocuments} />}
  >
    {(data) => <DocumentsContent documents={Array.isArray(data) ? data : fallbackDocuments} />}
  </SectionWrapper>
);

export default DocumentsSection;
