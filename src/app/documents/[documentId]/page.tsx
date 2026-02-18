import { Editor } from "./editor";
import { Toolbar } from "./toolbar";
interface documentIdPageProps {
  params: Promise<{ documentId: string }>
}

const DocumentIdPage = async ({ params }: documentIdPageProps) => {
  // const { documentId } = await params;
  // const documentId = awaitedParams.documentId;
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Toolbar />
      <Editor />
    </div>
  )
}

export default DocumentIdPage