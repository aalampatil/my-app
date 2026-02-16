interface documentIdPageProps {
  params: Promise<{ documentId: string }>
}

const DocumentIdPage = async ({ params }: documentIdPageProps) => {
  const { documentId } = await params;
  // const documentId = awaitedParams.documentId;
  return (
    <div>DocumentIdPage : {documentId}</div>
  )
}

export default DocumentIdPage