import Layout from "@/components/layout";
import { ExercisesViewNew } from "@/components/exercises-new";
import { AdUnit, AD_SLOTS } from "@/components/ad-unit";

export default function ExercisesPage() {
  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        {/* Top banner ad for mobile */}
        <div className="lg:hidden p-4 border-b border-white/5">
          <AdUnit slot={AD_SLOTS.EXERCISE_FEED} format="responsive" />
        </div>
        <div className="flex-1 h-[calc(100vh-64px)]">
          <ExercisesViewNew />
        </div>
      </div>
    </Layout>
  );
}
