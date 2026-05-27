import { Modal } from "@/components/modal";

export default function LoreModal() {
  return (
    <Modal title="About">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6 leading-relaxed text-foreground">
          <p>
            Some career highlights: Back in 2013, I designed and built the first
            version of Product Hunt.{" "}
            <a
              href="https://medium.com/lets-make-things/the-origin-of-product-hunt-7acb09e2593a"
              className="underline decoration-1 underline-offset-2 hover:decoration-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Here's
            </a>{" "}
            the backstory. Around that time I built Scratchpad.io (RIP), a
            coding tool that Hacker News was{" "}
            <a
              href="https://news.ycombinator.com/item?id=4933608"
              className="underline decoration-1 underline-offset-2 hover:decoration-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              weirdly nice
            </a>{" "}
            about, and then got acquired by General Assembly, where we turned it
            into{" "}
            <a
              href="https://dash.generalassemb.ly/"
              className="underline decoration-1 underline-offset-2 hover:decoration-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dash
            </a>
            , and helped hundreds of thousands of people learn to code.
          </p>

          <p>
            After GA, I co-founded Hardbound (RIP), a visual storytelling app
            that TechCrunch wrote{" "}
            <a
              href="https://techcrunch.com/2016/11/30/hardbounds-app-uses-visual-stories-to-catch-you-up-on-the-days-news-and-more/"
              className="underline decoration-1 underline-offset-2 hover:decoration-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              a nice article
            </a>{" "}
            about. We were in TechStars Boulder and raised a pre-seed round.
          </p>

          <p>
            Then I joined Gimlet Media as Head of Product, helped build the
            product that won the first (and only?){" "}
            <a
              href="https://x.com/gimletcreative/status/1010188438723850240"
              className="underline decoration-1 underline-offset-2 hover:decoration-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cannes Lion
            </a>{" "}
            for an Alexa Skill. More importantly I was able to occasionally sit
            in the room next to genius editors, producers, and hosts as they
            created some of the best podcasts the world has ever heard.
          </p>

          <p>
            After that, I joined Substack as first employee as they were
            finishing YC. There I built some of the core features you know and
            love, like the little screen that asks for your email before you
            read an article. (Happy to do my part helping writers get paid! 😅)
            I also built a fun system to identify promising writers on Twitter,
            known lovingly as the{" "}
            <a
              href="https://www.cjr.org/special_report/substackerati.php#:~:text=Do%20we%20keep%20the%20Baschez%20score%20a%20secret%3F"
              className="underline decoration-1 underline-offset-2 hover:decoration-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Baschez Score
            </a>
            .
          </p>

          <p>
            After that, I co-founded{" "}
            <a
              href="https://every.to/"
              className="underline hover:decoration-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Every
            </a>
            , and wrote a weekly column called{" "}
            <a
              href="https://every.to/divinations"
              className="underline hover:decoration-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Divinations
            </a>{" "}
            focused on the intersection of technology and business strategy.
          </p>

          <p>
            While at Every, I started working on a writing tool called{" "}
            <a
              href="https://lex.page"
              className="underline hover:decoration-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lex
            </a>{" "}
            as a fun experiment on nights and weekends, and fell back in love
            with building software after a few years writing. We launched it and
            got 25k+ signups in the first day. It was unreal. After that, we
            spun it out into its own company that I have been leading since
            then. We raised a $2.8M seed round in Aug 2023 led by True Ventures,
            and over 300K writers have used our service.
          </p>

          <p>
            These days, I spend my time building and using AI agents, and trying
            to understand what the message of this new medium is. If you'd like
            to get or stay in touch the best place to do so is probably Twitter
            / X, I am{" "}
            <a
              href="https://x.com/nbaschez"
              className="underline hover:decoration-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              @nbaschez
            </a>
            .
          </p>
        </div>
      </div>
    </Modal>
  );
}
