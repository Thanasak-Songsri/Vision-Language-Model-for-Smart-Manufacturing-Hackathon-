// import { StatCard } from "@/components/StatCard";
// import { EmissionChart } from "@/components/EmissionChart";
// import { CategoryBreakdown } from "@/components/CategoryBreakdown";
// import { Leaf, TrendingDown, Target, Trees } from "lucide-react";

// const App = () => {
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-primary rounded-lg">
//               <Leaf className="w-6 h-6 text-primary-foreground" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-foreground">Carbon Dashboard</h1>
//               <p className="text-sm text-muted-foreground">Track and reduce your environmental impact</p>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-4 py-8">
//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard
//             title="Total Emissions"
//             value="310 kg"
//             change={-15}
//             icon={Leaf}
//             trend="down"
//             variant="success"
//           />
//           <StatCard
//             title="Monthly Reduction"
//             value="45 kg"
//             change={-8}
//             icon={TrendingDown}
//             trend="down"
//             variant="success"
//           />
//           <StatCard
//             title="Target Progress"
//             value="78%"
//             change={12}
//             icon={Target}
//             trend="up"
//             variant="default"
//           />
//           <StatCard
//             title="Trees Equivalent"
//             value="16"
//             change={-15}
//             icon={Trees}
//             trend="down"
//             variant="success"
//           />
//         </div>

//         {/* Charts Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="lg:col-span-2">
//             <EmissionChart />
//           </div>
//           <div className="lg:col-span-1">
//             <CategoryBreakdown />
//           </div>
//         </div>

//         {/* Additional Info */}
//         <div className="mt-8 p-6 rounded-xl bg-gradient-primary text-primary-foreground">
//           <div className="flex items-start gap-4">
//             <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
//               <Leaf className="w-6 h-6" />
//             </div>
//             <div>
//               <h3 className="text-lg font-semibold mb-2">Great Progress!</h3>
//               <p className="text-primary-foreground/90">
//                 You've reduced your carbon footprint by 15% this month. Keep up the excellent work! 
//                 Small changes in daily habits can make a significant impact on our environment.
//               </p>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ;
