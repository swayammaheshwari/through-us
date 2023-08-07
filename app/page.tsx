import Navbar from "@/Components/Navbar";
import HomeTitle from "@/Components/Home/HomeTitle";
import FeaturePost from "@/Components/Home/FeaturePost";

export default function Home() {
  return (
    <>
      <main>
        <Navbar />
        <HomeTitle />
        <FeaturePost />
      </main>
    </>
  );
}
