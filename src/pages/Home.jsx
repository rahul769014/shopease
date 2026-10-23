import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Heart,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Beauty",
    slug: "beauty",
    description: "Little rituals, lovely essentials",
    number: "01",
    Icon: Sparkles,
    color: "bg-[#e9ded3]",
  },
  {
    name: "Fragrances",
    slug: "fragrances",
    description: "A scent that feels like you",
    number: "02",
    Icon: Heart,
    color: "bg-[#e1e5d9]",
  },
  {
    name: "Furniture",
    slug: "furniture",
    description: "Make yourself at home",
    number: "03",
    Icon: ShoppingBag,
    color: "bg-[#e9e2d6]",
  },
  {
    name: "Groceries",
    slug: "groceries",
    description: "Good things for the pantry",
    number: "04",
    Icon: BadgeCheck,
    color: "bg-[#dfe7dc]",
  },
];

const benefits = [
  {
    title: "Easy, breezy delivery",
    description: "Your finds, on their way without the fuss.",
    Icon: Truck,
  },
  {
    title: "Only the good stuff",
    description: "Browse a considered mix for everyday life.",
    Icon: BadgeCheck,
  },
  {
    title: "A little joy, always",
    description: "Find something useful, lovely, or both.",
    Icon: Heart,
  },
];

function Home() {
  const featuredProduct = useSelector((state) =>
    state.shop.allProducts.find((product) => product.category === "beauty"),
  );
  const featuredImage = featuredProduct?.thumbnail || featuredProduct?.images?.[0];

  return (
    <main className="bg-[#f8f6f0] text-[#263c32]">
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 sm:px-8 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-14 md:pb-24 md:pt-16">
        <div className="max-w-2xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#a65f46]">
            <span className="h-px w-8 bg-[#a65f46]" />
            A happier kind of shopping
          </p>
          <h1 className="font-serif text-5xl font-medium leading-[1.05] tracking-tight text-[#263c32] sm:text-6xl lg:text-7xl">
            Find the good in your{" "}
            <span className="italic text-[#a65f46]">everyday.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#66746b] sm:text-lg">
            Thoughtful finds for your home, your routine, and all the little
            moments in between.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/new-arrivals"
              className="inline-flex items-center gap-3 rounded-full bg-[#263c32] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#385646]"
            >
              Explore the collection
              <ArrowRight size={17} />
            </Link>
            <Link
              to="/deals"
              className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-[#526257] transition hover:text-[#a65f46]"
            >
              See what’s on offer
              <ArrowDown size={16} />
            </Link>
          </div>
          <div className="mt-12 flex items-center gap-3 border-t border-[#deded3] pt-5 text-sm text-[#66746b]">
            <span className="flex -space-x-2" aria-hidden="true">
              <span className="h-7 w-7 rounded-full border-2 border-[#f8f6f0] bg-[#d7a88d]" />
              <span className="h-7 w-7 rounded-full border-2 border-[#f8f6f0] bg-[#9eae91]" />
              <span className="h-7 w-7 rounded-full border-2 border-[#f8f6f0] bg-[#e5c98e]" />
            </span>
            A fresh edit of everyday favorites
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-[#e6c79a] sm:-right-5 sm:-top-5 sm:h-32 sm:w-32" />
          <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-[#d4dfd0] sm:-bottom-6 sm:-left-6 sm:h-36 sm:w-36" />
          <div className="relative overflow-hidden rounded-[2rem] bg-[#e4e8dd] p-5 sm:rounded-[2.5rem] sm:p-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#66746b]">
                The little details
              </span>
              <span className="text-sm text-[#a65f46]">No. 01</span>
            </div>
            <div className="my-5 flex h-64 items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#d8dfd2] sm:h-80 sm:rounded-[2rem]">
              {featuredImage ? (
                <img
                  src={featuredImage}
                  alt={featuredProduct.title}
                  className="h-full w-full object-contain mix-blend-multiply"
                />
              ) : (
                <ShoppingBag
                  aria-hidden="true"
                  className="h-24 w-24 text-[#82907e]"
                  strokeWidth={1}
                />
              )}
            </div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a65f46]">
                  A good place to start
                </p>
                <h2 className="mt-1 font-serif text-2xl text-[#263c32]">
                  {featuredProduct?.title || "Something lovely awaits"}
                </h2>
              </div>
              <Link
                to="/category/beauty"
                aria-label="Browse beauty products"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#263c32] text-white transition hover:bg-[#385646]"
              >
                <ArrowRight size={19} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e3e1d8] bg-[#f1efe7]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a65f46]">
                Take a look around
              </p>
              <h2 className="mt-2 font-serif text-3xl text-[#263c32] sm:text-4xl">
                A shelf for every side of you.
              </h2>
            </div>
            <span className="hidden text-sm text-[#7a8379] sm:block">
              Four good places to begin
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map(({ name, slug, description, number, Icon, color }) => (
              <Link
                key={slug}
                to={`/category/${slug}`}
                className={`group flex min-h-48 flex-col justify-between rounded-2xl ${color} p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#263c32]/10`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs font-medium tracking-widest text-[#788176]">
                    {number}
                  </span>
                  <Icon
                    aria-hidden="true"
                    className="text-[#607164] transition group-hover:text-[#a65f46]"
                    size={21}
                    strokeWidth={1.6}
                  />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-[#263c32]">{name}</h3>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <p className="text-sm text-[#66746b]">{description}</p>
                    <ArrowRight
                      aria-hidden="true"
                      className="shrink-0 text-[#a65f46] transition group-hover:translate-x-1"
                      size={17}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-16 md:py-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a65f46]">
            The ShopEase feeling
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-[#263c32] sm:text-5xl">
            Less scrolling.
            <br />
            More “that’s just right.”
          </h2>
          <p className="mt-5 max-w-md leading-7 text-[#66746b]">
            We make it easy to discover useful, feel-good finds without making
            shopping feel like a chore. Come in for one thing; leave inspired.
          </p>
          <Link
            to="/new-arrivals"
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#a65f46] transition hover:gap-3"
          >
            Find your next favorite <ArrowRight size={17} />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {benefits.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="rounded-2xl border border-[#e3e1d8] bg-white/60 p-5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6ebe2] text-[#526b56]">
                <Icon aria-hidden="true" size={19} strokeWidth={1.7} />
              </span>
              <h3 className="mt-5 font-serif text-xl text-[#263c32]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#748076]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#263c32] px-5 py-14 text-center text-white sm:px-8 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d6ad83]">
          Your next favorite is out there
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl font-serif text-3xl sm:text-4xl">
          Make a little room for something good.
        </h2>
        <Link
          to="/new-arrivals"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f8f6f0] px-6 py-3 text-sm font-semibold text-[#263c32] transition hover:bg-[#e7e1d3]"
        >
          Start exploring <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  );
}

export default Home;
