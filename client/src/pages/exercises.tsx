import Layout from "@/components/layout";
import { ExercisesViewNew } from "@/components/exercises-new";

export default function ExercisesPage() {
  return (
    <Layout>
      <div className="h-[calc(100vh-64px)]">
        <ExercisesViewNew />
      </div>
    </Layout>
  );
}
