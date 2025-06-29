// All typing paragraphs about India
const PARAGRAPHS = [
  // Short
  "India is the world’s largest democracy.",
  "The Taj Mahal is a symbol of love and beauty.",
  "Cricket is the most popular sport in India.",
  "India celebrates many colourful festivals each year.",
  "Hindi and English are widely spoken languages.",
  // Medium
  "India is a land of great diversity, with over a billion people, hundreds of languages, and a rich tapestry of cultures and traditions. From the snowy peaks of the Himalayas to the tropical beaches of Kerala, the country offers a wide range of landscapes and experiences.",
  "The Indian cuisine is famous for its spices and flavours. Dishes like biryani, dosa, butter chicken, and samosas are enjoyed not only in India but around the world. Each region has its own unique culinary traditions.",
  "Bollywood, the Hindi film industry based in Mumbai, produces more movies than any other country. Indian films are known for their vibrant music, dance, and dramatic storytelling.",
  "India’s history stretches back thousands of years, with ancient civilizations like the Indus Valley and great empires such as the Maurya and Mughal dynasties. The country gained independence from British rule in 1947.",
  "Yoga and meditation, which originated in India, are now practiced by millions of people globally for health and well-being.",
  "Indian festivals like Diwali, Holi, and Eid are celebrated with joy and enthusiasm, bringing families and communities together in vibrant displays of light, colour, and tradition."
];

export default function ParagraphsPage() {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 py-10 px-2 sm:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[color:var(--accent-color)]">All Typing Paragraphs</h1>
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        {PARAGRAPHS.map((p, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 shadow-sm text-base sm:text-lg font-mono">
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}
