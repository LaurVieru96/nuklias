export default function Leads() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Leads</h2>
          <p className="text-muted-foreground mt-1">
            Manage your sales pipeline and customer relationships
          </p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          + New Lead
        </button>
      </div>

      {/* Coming Soon */}
      <div className="bg-card border rounded-lg p-12 text-center">
        <h3 className="text-xl font-semibold mb-2">Leads CRM Coming Soon</h3>
        <p className="text-muted-foreground mb-6">
          Full CRM functionality with filters, status tracking, and pipeline management will be added next.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">📊 Pipeline View</h4>
            <p className="text-sm text-muted-foreground">Track leads through your sales funnel</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">🎯 Status Management</h4>
            <p className="text-sm text-muted-foreground">New, Contacted, Qualified, Won, Lost</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">🔍 Advanced Filters</h4>
            <p className="text-sm text-muted-foreground">Filter by status, priority, date, and more</p>
          </div>
        </div>
      </div>
    </div>
  );
}
