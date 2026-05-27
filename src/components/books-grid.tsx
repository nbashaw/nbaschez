import Image from "next/image";

interface BooksGridProps {
  columns?: 2 | 3;
}

export function BooksGrid({ columns = 2 }: BooksGridProps) {
  const books = [
    {
      id: 1,
      title: "The Sovereign Individual",
      author: "James Dale Davidson & Lord William Rees-Mogg",
      cover: "https://covers.openlibrary.org/b/isbn/9780684832722-L.jpg",
      commentary:
        "One of the most important books for understanding how technology changes power structures and incentives over long periods of time. It completely shifted how I think about the future.",
    },
    {
      id: 2,
      title: "Zero to One",
      author: "Peter Thiel",
      cover: "https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg",
      commentary:
        "Still the best single book on how to think about building something new and valuable. The chapter on definite optimism alone is worth the price of admission.",
    },
    {
      id: 3,
      title: "The Beginning of Infinity",
      author: "David Deutsch",
      cover: "https://covers.openlibrary.org/b/isbn/9780143121350-L.jpg",
      commentary:
        "A deep and optimistic view of knowledge, progress, and why explanations matter. It gave me a much richer understanding of what it actually means to make progress.",
    },
    {
      id: 4,
      title: "High Output Management",
      author: "Andy Grove",
      cover: "https://covers.openlibrary.org/b/isbn/9780679762881-L.jpg",
      commentary:
        "The best book I’ve read on how to actually run a high-performing organization. Still incredibly practical decades later.",
    },
    {
      id: 5,
      title: "The Almanack of Naval Ravikant",
      author: "Eric Jorgenson",
      cover: "https://covers.openlibrary.org/b/isbn/9781544514215-L.jpg",
      commentary:
        "A modern distillation of timeless wisdom on wealth, happiness, and leverage. I come back to it every year or two.",
    },
  ];

  const gridClass =
    columns === 3
      ? "grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10"
      : "grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10";

  const imageSizes =
    columns === 3
      ? "(max-width: 768px) 100vw, 220px"
      : "(max-width: 768px) 100vw, 320px";

  return (
    <div className={gridClass}>
      {books.map((book) => (
        <div key={book.id} className="flex flex-col">
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[3px] bg-muted mb-4">
            <Image
              src={book.cover}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover"
              sizes={imageSizes}
            />
          </div>

          <div>
            <h3 className="font-semibold text-lg leading-tight">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 mb-3">
              by {book.author}
            </p>
            <p className="text-[15px] leading-relaxed text-foreground">
              {book.commentary}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
