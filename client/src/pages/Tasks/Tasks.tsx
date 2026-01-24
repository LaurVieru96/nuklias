export default function Tasks() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Tasks</h2>
          <p className="text-muted-foreground mt-1">
            Manage your team's tasks and track progress
          </p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          + New Task
        </button>
      </div>

      {/* Coming Soon */}
      <div className="bg-card border rounded-lg p-12 text-center">
        <h3 className="text-xl font-semibold mb-2">Task Management Coming Soon</h3>
        <p className="text-muted-foreground mb-6">
          Complete task management system with assignments, priorities, and due dates.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">✅ Status Tracking</h4>
            <p className="text-sm text-muted-foreground">Todo, In Progress, Done</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">⚡ Priority Levels</h4>
            <p className="text-sm text-muted-foreground">High, Medium, Low priorities</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">👥 Team Assignment</h4>
            <p className="text-sm text-muted-foreground">Assign tasks to team members</p>
          </div>
        </div>
      </div>
    </div>
  );
}
