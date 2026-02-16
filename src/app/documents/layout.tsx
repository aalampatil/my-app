interface DocumentsLayoutProps {
  children: React.ReactNode
}
const DocumentsLayout = ({ children }: DocumentsLayoutProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <nav>document navbar</nav>
      {children}
    </div>
  )
}

export default DocumentsLayout