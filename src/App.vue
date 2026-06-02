<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import HeroBanner from '@/components/HeroBanner.vue'
import InfoCard from '@/components/InfoCard.vue'
import ContentSection from '@/components/ContentSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import TechSlider from '@/components/TechSlider.vue'
import aboutMeIcon from '@/assets/images/card/about-me-card.png'
import careerIcon from '@/assets/images/card/career-card.png'
import interestsIcon from '@/assets/images/card/interests-card.png'
const techStackModules = import.meta.glob<{ default: string }>(
  '@/assets/images/tech_stack/*.png',
  { eager: true },
)

const techStackOrder = [
  'java',
  'spring',
  'apache_camel',
  'python',
  'csharp',
  'dot_net',
  'rust',
  'go lang',
  'mysql',
  'mariadb',
  'redis',
  'mongo',
  'git',
  'linux',
  'powershell',
  'html',
  'css',
  'javascript',
  'vue',
]

const techStackImages = Object.entries(techStackModules)
  .map(([path, mod]) => {
    const filename = path.split('/').pop()!.replace('.png', '')
    const alt = filename
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
    return { src: mod.default, alt, filename }
  })
  .sort((a, b) => {
    const idxA = techStackOrder.indexOf(a.filename)
    const idxB = techStackOrder.indexOf(b.filename)
    const orderA = idxA === -1 ? techStackOrder.length : idxA
    const orderB = idxB === -1 ? techStackOrder.length : idxB
    return orderA - orderB
  })
</script>

<template>
  <SiteHeader />
  <HeroBanner />

  <div class="flex flex-wrap justify-center gap-20 px-8 pt-0 pb-12 -mt-10">
    <InfoCard
      :icon="aboutMeIcon"
      title="About me"
      text="My name is Thomas, I was born and raised in The Netherlands. I have always had an interest in sports, racing, gaming and thanks to my father I have always had an interest in IT."
      section-id="about-me"
    />

    <InfoCard
      :icon="interestsIcon"
      title="Interests"
      text="Outside of work, I'm always exploring new programming languages and emerging technologies. When I'm not behind a screen, you'll find me staying active through sports, or out on the road on my motorcycle. In my spare time I also like to play games. I believe that diverse interests outside of work keep me sharp and creative."
      section-id="interests"
    />

    <InfoCard
      :icon="careerIcon"
      title="Career"
      text="Backend software developer with a passion to design and build scalable and failure proof applications. While working as a data integration specialist I am continuously exploring and learning new technologies across the backend stack."
      section-id="career"
    />
  </div>

  <ContentSection title="About Me" :icon="aboutMeIcon" section-id="about-me">
    <div class="space-y-4 text-gray-600 leading-relaxed text-justify">
      <p>
        I'm Thomas. I'm born and raised in Purmerend, North Holland. Growing up, my father introduced me
        to the world of computers at an early age, and what started as curiosity quickly became a
        genuine passion for technology and how things work under the hood.
      </p>
      <p>
        After completing my MBO in Software Development, I stepped straight into a professional
        environment where I could put theory into practice. I'm currently deepening that foundation
        by pursuing an HBO degree in Software Architecture, a field that aligns closely with what
        drives me most: understanding, designing, and optimizing the systems and processes that keep
        applications running reliably at scale.
      </p>
      <p>
        I'd describe myself as naturally curious. I don't let a problem go until I understand it. 
        I care about the quality of what I build, pay close attention to detail, and prefer to
        think critically about trade-offs rather than defaulting to the easiest path.
      </p>
      <p>
        Outside of work, I enjoy spending my time with a mix of sports, motorcycle riding, gaming, and
        working on small side projects to stay sharp. These interests aren't separate from who I am as a
        developer, they're part of the same mindset: always moving, always learning.
      </p>
    </div>
  </ContentSection>

  <ContentSection title="Interests" :icon="interestsIcon" section-id="interests">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <h3 class="font-semibold text-gray-800 mb-2">Technology</h3>
        <p class="text-gray-600 leading-relaxed text-sm text-justify">
          I'm always looking for an excuse to pick up something new. My GitHub has projects in Rust
          and Go. Nothing fancy, just getting a feel for the languages and understanding what makes
          them tick. I also regularly work through LeetCode problems, partly because I enjoy the
          puzzle-solving aspect, and partly because I like experiencing the kind of challenges that
          come up in big tech interviews.
        </p>
        <p class="text-gray-600 leading-relaxed text-justify text-sm text-justify">
          Lately, AI engineering has caught my attention. With AI tools becoming a bigger part of
          development, I've been digging into topics like context management, prompt engineering, and
          the security considerations around AI systems. Beyond that, I still get a kick out of
          manually learning new programming languages and tools the old-fashioned way.
        </p>
      </div>
      <div class="space-y-4">
        <h3 class="font-semibold text-gray-800 mb-2">Sports &amp; Outdoors</h3>
        <p class="text-gray-600 leading-relaxed text-sm text-justify">
          I've been into sports since I was six, starting with track and field. As a kid I loved the
          all-round challenge of the decathlon, but as I got older I gravitated towards the 100m and
          200m sprint. These days I go to the gym because it fits my schedule better. I like the steady,
          visible progress you get from it.
        </p>
        <p class="text-gray-600 leading-relaxed text-sm text-justify">
          Outside of the gym, I ride a Honda CBR600RR. Supersports are my thing. There's nothing
          quite like heading out on a nice summer ride. It's honestly one of the first things I miss
          when winter rolls around.
        </p>
      </div>
      <div class="space-y-4">
        <h3 class="font-semibold text-gray-800 mb-2">Gaming</h3>
        <p class="text-gray-600 leading-relaxed text-sm text-justify">
          Gaming has been part of my life for as long as I can remember. I like variety. Sometimes
          I'm in the mood for something fast and competitive with friends, and other times I want to sink
          into a deep single-player story or lose a few hours to a strategy game.
        </p>
        <p class="text-gray-600 leading-relaxed text-justify text-sm text-justify">
          My all-time favourite is Cyberpunk 2077. The world it builds is stunning, and the story kept
          me hooked from start to finish. It's the kind of game that reminds you what the medium is
          capable of.
        </p>
      </div>
      <div class="space-y-4">
        <h3 class="font-semibold text-gray-800 mb-2">Racing</h3>
        <p class="text-gray-600 leading-relaxed text-sm text-justify">
          I've been a Formula 1 fan for as long as I can remember, but a few years ago endurance
          racing completely won me over. There's something special about races like the 24H of Le Mans
          and the 24H of Spa-Francorchamps, which I've been to both. The strategy, the unpredictability,
          and especially the multi-class format make it endlessly exciting to watch. Faster cars
          threading their way through slower classes adds a whole extra layer to every lap.
        </p>
        <p class="text-gray-600 leading-relaxed text-sm text-justify">
          Since getting into motorcycles, MotoGP has become a regular watch too, and I've made it to
          the TT of Assen more than once. I also used to do endurance sim racing with a team, swapping
          drivers through 3, 6, and 12-hour races. Life got busier, but I still have a soft spot for it.
        </p>
      </div>
    </div>
  </ContentSection>

  <ContentSection title="Career" :icon="careerIcon" section-id="career">
    <div class="space-y-6">
      <div class="space-y-4">
        <h3 class="font-semibold text-gray-800">Data Integration Specialist</h3>
        <p class="text-sm text-gray-500 mb-2"><i>Current Role</i></p>
        <p class="text-gray-600 leading-relaxed text-justify text-sm text-justify">
          I started as a Junior EDI Developer at a data integration company, developing and
          testing integrations that connect companies and their applications using a variaty of protocols like: REST, SOAP, (S)FTP, AS2 and more. 
          Development was done in Java 8 with MongoDB and MySQL as the primary databases. During this time I was also providing support on running applications.
        </p>
        <p class="text-gray-600 leading-relaxed text-justify text-sm text-justify">
          Over time, my responsibilities expanded to include preparing technical and functional
          designs and direct alignment with customers to determine the project scope. The
          development stack also evolved, moving to Java 11+ in combination with Spring Boot
          and Apache Camel. This experience also taught me how to migrate legacy codebases to modern tech stacks.
        </p>
        <p class="text-gray-600 leading-relaxed text-justify text-sm text-justify">
          Currently, I'm designing, building, testing, and deploying scalable and failure-proof data integration applications
          across sectors like logistics, e-commerce, and healthcare. The direct customer
          contact provides valuable insight into diverse industries and business processes,
          keeping the work varied and challenging.
        </p>
      </div>
      <hr class="border-gray-200" />
      <div class="space-y-2 pb-6">
        <h3 class="font-semibold text-gray-800">Robotic Process Automation Engineer</h3>
        <p class="text-sm text-gray-500 mb-2"><i>Prior Experience</i></p>
        <p class="text-gray-600 leading-relaxed text-justify text-sm text-justify">
          I worked as an RPA Developer alongside a product owner responsible for customer
          alignment and producing technical and functional designs, which served as the basis
          for my development work.
        </p>
        <p class="text-gray-600 leading-relaxed text-justify text-sm text-justify">
          This role allowed me built solutions using .NET C#, MySQL, Selenium, and UI-Automation. In addition to
          standalone RPA applications, I also contributed to a self-developed no-code platform built in Laravel, 
          which was a completely new experience for me as well.
        </p>
        <p class="text-gray-600 leading-relaxed text-justify text-sm text-justify">
          User acceptance tests, demos, and on-site installations at customer locations were a
          regular part of my workflow. I also wrote PowerShell installation scripts to automate
          platform deployment.
        </p>
      </div>
      <hr class="border-gray-200" />
      <div>
        <h3 class="pt-4 pb-6 text-xl font-semibold text-gray-800 mb-3 text-center">Experienced in many skills</h3>
        <TechSlider :images="techStackImages" />
      </div>
    </div>
  </ContentSection>

  <SiteFooter />
</template>
