// Slides and speaker text for the "Factories" talk (November 11, 2026).
// Images live in /public/talks/factories/slide-NN.jpg.
// Inline markup in captions: *italic* and **bold**.

export interface TalkSlide {
  slide: number;
  text: string[];
}

export const factoriesTalk = {
  slug: "factories",
  title: "Factories",
  description:
    "What the first factories of the industrial revolution can teach us about building with AI today.",
  date: "November 11, 2026",
  isoDate: "2026-11-11",
  cover: "/talks/factories/slide-03.jpg",
};

export const factoriesSlides: TalkSlide[] = [
  {
    slide: 3,
    text: [
      "We’re here tonight to talk about factories.",
      "There’s a lot of hype, and a lot of confusion, but… I think we all sense there’s maybe something very important here, too.",
      "So the goal tonight is to understand what *are* factories, what’s real about them, and what’s something useful we can do today?",
    ],
  },
  {
    slide: 4,
    text: [
      "In order to do that, we’ll start by looking at the history of factories.",
      "As it turns out, the story of how factories emerged is surprisingly relevant for us today.",
    ],
  },
  {
    slide: 5,
    text: [
      "The year is 1733, and clothing is more expensive than you can imagine.",
      "Most workers earn one shilling a day, but even a basic coat cost 15-20 shillings.",
      "Most people own *very few* garments.",
    ],
  },
  {
    slide: 6,
    text: [
      "Why were clothes so expensive?",
      "Was there some sort of cartel getting in the way of competition?",
      "No, this was an incredibly decentralized and competitive market.",
    ],
  },
  {
    slide: 7,
    text: [
      "Textiles were expensive to buy for a very simple reason: they were expensive to make.",
      "Every step of the way was a slow, manual, error-prone process.",
      "You had to process raw wool or cotton, spin it into yarns, and weave yarns together to create fabrics.",
    ],
  },
  {
    slide: 8,
    text: [
      "Production was decentralized and happened in people’s homes.",
      "This is where we get the term “cottage industry” from.",
    ],
  },
  {
    slide: 9,
    text: [
      "But it wasn’t a small industry.",
      "Textile production was Britain’s *largest* industry and made up 2/3rds of exports.",
    ],
  },
  {
    slide: 10,
    text: [
      "At some level, we all know what happened next: machines were invented, factories were built, clothing became abundant, and the nature of work itself changed forever.",
      "But the *details* of how it happened are fascinating and poorly remembered.",
      "And they tell us something important about how AI factories may unfold in our own era.",
    ],
  },
  {
    slide: 11,
    text: [
      "Somebody didn’t just wake up one day with the vision to start a factory.",
      "There were incremental steps that felt every bit as revolutionary as coding agents feel today.",
    ],
  },
  {
    slide: 12,
    text: [
      "The first was a device called the flying shuttle, patented in 1733.",
      "You can think of it as like an eighteenth century Claude Code.",
      "It was an add-on you could install on the device you already had in your home, and doubled the productivity of an individual weaver.",
    ],
  },
  {
    slide: 13,
    text: [
      "But there was a problem: weaving wasn’t the bottleneck to textile production, spinning yarn was.",
      "So the flying shuttle didn’t make cloth cheaper, it just made the yarn shortage worse.",
    ],
  },
  {
    slide: 14,
    text: [
      "There are stories of weavers walking miles every morning from house to house just to collect enough yarn for the rest of the day.",
      "If they needed to expedite a piece, they would often bribe spinners with gifts.",
      "Might be familiar to anyone who has tried to get a Pull Request reviewed lately?",
    ],
  },
  {
    slide: 15,
    text: [
      "Things continued this way for decades, until 35 years later, when Richard Arkwright and John Kay built the first machine capable of spinning strong yarn: the water frame.",
      "The only problem was that it was too big and heavy to turn by hand.",
      "So they put it in a building next to a river, and hooked it up to a water-powered engine.",
    ],
  },
  {
    slide: 16,
    text: [
      "This was the world’s first recognizably modern factory.",
      "It quickly became a huge deal. Famous people visited and spoke of it with the same reverence that we speak of modern AI.",
      "It felt like an alien civilization had landed.",
    ],
  },
  {
    slide: 17,
    text: ["And, yes, there were even spies!"],
  },
  {
    slide: 18,
    text: [
      "The big downside is the factory was wildly expensive to set up: eighty thousand shillings, when the average worker earned one shilling per day.",
      "But it was a good investment because those huge fixed costs could be made up in scale.",
      "Which leads us to part 2…",
    ],
  },
  {
    slide: 19,
    text: ["The economic logic behind factories"],
  },
  {
    slide: 20,
    text: [
      "Automation and economies of scale was a big part of that efficiency, but it wasn't the whole story.",
      "Process specialization also was extremely important.",
    ],
  },
  {
    slide: 21,
    text: [
      "Arkwright optimized the whole sequence of steps that were previously distributed across households, and put it under one roof as a single flow.",
      "He patented the process in 1775.",
      "And, that very next year, a book came out which explained how important this was.",
    ],
  },
  {
    slide: 22,
    text: [
      "In 1776, Adam Smith published The Wealth of Nations.",
      "It opens with the famous “pin factory” case study that shows just how much process specialization can matter.",
    ],
  },
  {
    slide: 23,
    text: [
      "In the pin factory, one worker that made pins fully end-to-end could make at most 20 in a day.",
      "But when you split the job into specialized steps, workers could make nearly *5,000* pins per day.",
    ],
  },
  {
    slide: 24,
    text: [
      "That's a **240x increase in productivity**, literally just from dividing and coordinating the work.",
    ],
  },
  {
    slide: 25,
    text: [
      "Smith's point was that wealth doesn't come from working harder.",
      "It comes from specialization and trade: each person gets very good at one thing, and trades for everything else.",
    ],
  },
  {
    slide: 26,
    text: ["So, what can we learn from this?"],
  },
  {
    slide: 27,
    text: [
      "Well in many ways, we’re still in the “flying shuttle” era of AI.",
      "There’s a new power tool, we install it on our existing machines, and it makes us 2-3x more productive.",
    ],
  },
  {
    slide: 28,
    text: [
      "And yet… knowledge work is still a cottage industry.",
      "People go faster, but many bottlenecks haven’t moved.",
      "The system hasn’t been re-designed around the new paradigm.",
      "So progress feels limited, and in fact, some things feel worse.",
    ],
  },
  {
    slide: 29,
    text: [
      "As one CEO dramatically put it, “It feels like our organizations are being DDoSed from the inside.”",
    ],
  },
  {
    slide: 30,
    text: [
      "The root of the problem is that AI is only helpful to the extent it produces trustworthy work.",
      "Otherwise it just creates a slop pile for humans to review.",
      "Nobody wants that, so most people only use AI for small, easy, granular tasks.",
    ],
  },
  {
    slide: 31,
    text: [
      "It is possible to set up AI systems that are capable of dramatically more ambitious tasks and more trustworthy results, but it takes work.",
    ],
  },
  {
    slide: 32,
    text: [
      "What kind of work does it take? Mostly, these are all fixed costs.",
    ],
  },
  {
    slide: 33,
    text: [
      "Getting the context in. Templates, past examples, what “good” means on your team — most of it scattered across docs, Slack, and people's heads.",
    ],
  },
  {
    slide: 34,
    text: [
      "Connecting systems. CRM, codebase, data warehouse — every connection has to be set up and maintained.",
    ],
  },
  {
    slide: 35,
    text: [
      "Permissions. Can it read the finance data? Send an email? Merge code?",
      "Too strict and it's useless; too loose and obviously that’s a problem.",
    ],
  },
  {
    slide: 36,
    text: [
      "Writing the instructions. Break the work into stages, decide what each step does, and decide where a human needs to weigh in.",
    ],
  },
  {
    slide: 37,
    text: [
      "Run it, watch it fail in some new and creative way, fix it, run it again. And again.",
    ],
  },
  {
    slide: 38,
    text: [
      "And then finally, evals.",
      "You need test cases to know whether a change improved anything.",
      "You need a way to try new versions without breaking the current one, and you need someone to notice when things do break.",
    ],
  },
  {
    slide: 39,
    text: [
      "This is the AI version of building the mill: the river, the gears, the mechanics, the overlookers walking the floor fixing broken threads.",
      "It's almost all fixed costs.",
      "The upside is potentially very large, but most of us are not investing the modern equivalent of 80,000 shillings into creating them.",
    ],
  },
  {
    slide: 40,
    text: [
      "Instead, we’re investing maybe a tenth or hundredth of that effort into creating our own generalist mini-mills that we call “personal agents.”",
      "Or, more often, we’re not paying it at all, and settling for easy tasks.",
    ],
  },
  {
    slide: 41,
    text: [
      "Which brings us back to Adam Smith…",
      "If setting up AI for a task is a big fixed cost, the worst possible strategy is for everyone to pay it separately, for every task.",
      "We’re creating our 20 pins per day with our generalist personal agents.",
    ],
  },
  {
    slide: 42,
    text: [
      "Imagine two companies with the same people and the same hours of AI tinkering.",
      "At one, everyone spreads their time across every task they do.",
      "At the other, each person goes deep on just one or two specific things.",
    ],
  },
  {
    slide: 43,
    text: [
      "The data scientist builds the data factory.",
      "The designer makes the design factory.",
      "The model behavior engineer creates an evals factory.",
      "Now, when anyone needs a data analysis, design, or evals, they ask the factory owned by the experts.",
      "At Notion, we’re increasingly working this way.",
    ],
  },
  {
    slide: 44,
    text: [
      "So here's my definition: a factory is a shared AI system designed to handle a specific type of task.",
    ],
  },
  {
    slide: 45,
    text: [
      "This matters for the same reason software matters.",
      "Software is a way to get computers to do things. Software companies tend to grow quickly because they spend basically 100% of their time on work that compounds into a system.",
      "With AI generally and factories specifically, we move up one more layer. We spend our time building the machine that builds the machine.",
    ],
  },
  {
    slide: 46,
    text: [
      "But this doesn't mean personal agents go away.",
      "We’ll still use them, but they will route certain tasks to shared factories instead of handling them personally.",
    ],
  },
  {
    slide: 47,
    text: [
      "Also, not everything should be a factory.",
      "Only build a factory for work that's frequent, valuable, and complex enough to pay back the fixed cost.",
    ],
  },
  {
    slide: 48,
    text: [
      "But for the work that qualifies, factories are inevitable.",
      "I would guess right now maybe 10-20% of the world’s tokens are spent in factories and 80-90% in personal agents, but I think this will flip within a few years.",
    ],
  },
  {
    slide: 49,
    text: ["So how do you actually build one?"],
  },
  {
    slide: 50,
    text: [
      "The good news: the simplest factory takes about five minutes.",
      "It's literally just a to-do list with an agent hooked up to it.",
    ],
  },
  {
    slide: 51,
    text: [
      "The first step is to pick the task.",
      "Something recurring, where you can personally tell whether the output is good.",
      "Ideally the one where everyone on your team has their own half-working version.",
    ],
  },
  {
    slide: 52,
    text: [
      "Step 2: make the queue.",
      "Create a Notion database, say “Slide decks,” with a status column: todo, doing, done. This is the factory floor.",
      "Every request, every run, and every output lives in one place everyone can see. That's what makes it scrutinized.",
    ],
  },
  {
    slide: 53,
    text: [
      "Step 3: hook up an agent. Two easy options.",
      "Notion Custom Agents: built right in. Have it run whenever a new task is created, give it an instructions page, the connections it needs, and the right permissions. Nothing to host.",
      "Claude Managed Agents, or any agent you run yourself: Notion sends a webhook when a task comes in, the agent does the work, and writes the result back through the Notion MCP or API. Good when you need a specific model, custom tools, or a heavier-duty computer.",
    ],
  },
  {
    slide: 54,
    text: [
      "Step 4: write the instructions. Mark the task “doing,” do the work, attach the output, mark it “done.” Give it a template and a few good examples. Keep the instructions on a Notion page so the team can read them, comment, and see the history.",
    ],
  },
  {
    slide: 55,
    text: [
      "Step 5: share it. Give your team access, and add a line to your team's custom instructions so their personal agents send requests to the factory.",
      "The personal agent is the front door.",
    ],
  },
  {
    slide: 56,
    text: [
      "Step 6: watch it fail, then fix it.",
      "Start small: drafts instead of sends, a handful of tasks instead of all of them. Every failure becomes an instruction fix.",
      "When fixes start breaking other things, add a prompts database (testing, production, retired) and a short list of evals.",
    ],
  },
  {
    slide: 57,
    text: [
      "One warning: don't add complexity ahead of time. Nobody is good at predicting how a factory will fail. Start simple, and fix the failures you actually see.",
    ],
  },
  {
    slide: 58,
    text: [
      "So, what can you do tonight?",
      "Pick one task, build the simplest factory you can, and watch it run.",
    ],
  },
  {
    slide: 59,
    text: ["Thank you!"],
  },
];
