import { KanbanBoard } from "./components/KanbanBoard";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-100 text-gray-900">

      {/* Header */}
      <header className="border-b sticky top-0 z-40 bg-white/80 backdrop-blur-md border-gray-200">
        
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Left */}
          <div className="flex items-center gap-3">
            
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br from-blue-500 to-purple-500">
              K
            </div>

            <div>
              <h1 className="text-lg font-semibold tracking-tight text-gray-900">
                KanbanFlow
              </h1>

              <p className="text-sm text-gray-500">
                Task management board
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="text-xs px-3 py-1 rounded-full border border-gray-200 font-mono text-gray-500 bg-gray-50">
            Next.js · App Router · TypeScript
          </div>

        </div>
      </header>

      {/* Board Section */}
      <div className="flex-1 max-w-screen-2xl mx-auto px-6 py-6">
        
        {/* Main Container */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
          <KanbanBoard />
        </div>

      </div>

    </main>
  );
}