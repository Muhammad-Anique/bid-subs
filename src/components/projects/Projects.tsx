import React, { useState } from "react";
import { 
  Building2, 
  Plus,
  Search,
  Sun,
  Moon
} from "lucide-react";
import { useProject } from "@/hooks/useProject";
import { useSession } from "@/sessionManager/SessionContext";
import NewProjectWizard from "./NewProjectWizard";


const Projects: React.FC = () => {
  const { projects, selectProject } = useProject();
  const { theme, toggleTheme } = useSession();
  console.log(projects);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Use projects from session context instead of local data
  const allProjects = projects;

  const filteredProjects = allProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleProjectClick = (projectId: string) => {
    selectProject(projectId);
  };

  return (
    <div className="flex-1 overflow-auto p-6 bg-white dark:bg-dark rounded-3xl">
      {/* Header */}
      <div className="mb-6  flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
            Projects
          </h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            Manage and track all your construction projects
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-secondary-600 dark:text-secondary-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setIsWizardOpen(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-600 transition-colors shadow-sm"
          >
            <Plus size={20} />
            New Project
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 dark:text-secondary-500" size={20} />
          <input
            type="text"
            placeholder="Search projects, clients, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
            className="bg-gradient-to-b from-neutral-200 to-neutral-100 dark:from-gray-800 dark:to-gray-800 rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
          >
            {/* Top Image Part */}
            <div className="h-36 w-full relative">
                <img src="/bidsub-bg.jpg" alt={project.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-200 to-neutral-100 dark:from-gray-800 dark:to-transparent"></div>
                <div className="absolute top-4 right-4 text-xs text-white bg-black/30 backdrop-blur-sm px-2.5 py-1.5 rounded-lg">
                    {project.client}
                </div>
            </div>

            {/* Content Part */}
            <div className="relative p-5">
                {/* Tab */}
                <div 
                    className="absolute left-0 -top-20 w-[75%]"
                >
                    <div 
                        className="  p-4"
                      
                    >
                        <h3 className="font-bold text-zinc-700 dark:text-white text-2xl truncate">{project.name}</h3>
                        <p className="text-sm text-zinc-600 dark:text-gray-300 truncate">{project.location}</p>
                    </div>
                </div>

                {/* Bottom Info */}
                <div className="pt-8 flex justify-between items-end">
                    <div className="flex items-baseline">
                        <span className="text-4xl font-bold text-zinc-700 dark:text-white">{project.trades.length.toString().padStart(2, '0')}</span>
                        <span className="dark:text-gray-400 text-zinc-600 ml-2">Trades</span>
                    </div>
                    <div className="text-right">
                        <span className="font-semibold text-zinc-700 dark:text-white">{project.totalBids}</span>
                        <span className="dark:text-gray-400 text-zinc-600 ml-1.5">Bids</span>
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Building2 size={48} className="mx-auto text-secondary-400 dark:text-secondary-500 mb-4" />
          <h3 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
            No projects found
          </h3>
          <p className="text-secondary-500 dark:text-secondary-400">
            {searchTerm || statusFilter !== "all" 
              ? "Try adjusting your search or filter criteria"
              : "Get started by creating your first project"
            }
          </p>
        </div>
      )}

      {isWizardOpen && <NewProjectWizard onClose={() => setIsWizardOpen(false)} />}
    </div>
  );
};

export default Projects; 