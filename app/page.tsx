import { ApiResponse } from "@/types";
import Carousel from "@/components/Carousel";

async function fetchContents() {
  try {
    const res = await fetch(
      "https://eu.acc01.titanos.tv/v1/genres/1/contents?market=es&device=tv&locale=es&page=1&per_page=50&type=movie",
      { cache: "no-store" }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    const data: ApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching contents:", error);
    return null;
  }
}

const Home = async () => {
  const payload = await fetchContents();
  const items = payload?.collection ?? [];

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="p-8">
        <h1 className="text-white text-3xl font-bold">TitanOS | Jose Antonio Nuevo</h1>
      </header>
      <main className="flex-1 flex items-center px-8">
        {items.length > 0 ? (
          <Carousel items={items} />
        ) : (
          <p className="text-red-500 text-xl">Failed to load data.</p>
        )}
      </main>
    </div>
  );
};

export default Home;
