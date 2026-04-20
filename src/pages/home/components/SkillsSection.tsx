import { useFadeIn } from '@/hooks/useFadeIn'

interface Skill {
  name: string
  description: string
}

interface SkillCategory {
  category: string
  icon: string
  skills: Skill[]
}

const SKILL_DATA: SkillCategory[] = [
  {
    category: 'Backend',
    icon: 'ri-server-line',
    skills: [
      {
        name: '[Language / Framework]',
        description: '[Enter a one-line description of how you use this skill]',
      },
      {
        name: '[Language / Framework]',
        description: '[Enter a one-line description of how you use this skill]',
      },
      {
        name: '[Language / Framework]',
        description: '[Enter a one-line description of how you use this skill]',
      },
      {
        name: '[Language / Framework]',
        description: '[Enter a one-line description of how you use this skill]',
      },
    ],
  },
  {
    category: 'Database',
    icon: 'ri-database-2-line',
    skills: [
      {
        name: '[Database]',
        description: '[Enter a one-line description of how you use this skill]',
      },
      {
        name: '[Database]',
        description: '[Enter a one-line description of how you use this skill]',
      },
      {
        name: '[Database]',
        description: '[Enter a one-line description of how you use this skill]',
      },
    ],
  },
  {
    category: 'DevOps / Tools',
    icon: 'ri-tools-line',
    skills: [
      {
        name: '[Tool / Platform]',
        description: '[Enter a one-line description of how you use this skill]',
      },
      {
        name: '[Tool / Platform]',
        description: '[Enter a one-line description of how you use this skill]',
      },
      {
        name: '[Tool / Platform]',
        description: '[Enter a one-line description of how you use this skill]',
      },
      {
        name: '[Tool / Platform]',
        description: '[Enter a one-line description of how you use this skill]',
      },
    ],
  },
]

export default function SkillsSection() {
  const { ref, visible } = useFadeIn()

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
      className="bg-white py-28"
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-14">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
            Skills
          </span>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">Technical Skills</h2>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {SKILL_DATA.map((cat) => (
            <div key={cat.category}>
              <div className="mb-5 flex items-center gap-2 border-b-2 border-[#1E3A5F] pb-3">
                <div className="flex h-6 w-6 items-center justify-center">
                  <i className={`${cat.icon} text-base text-[#1E3A5F]`} />
                </div>
                <h3 className="text-base font-bold text-[#1E3A5F]">{cat.category}</h3>
              </div>

              <div className="flex flex-col gap-1">
                {cat.skills.map((skill, idx) => (
                  <div
                    key={`${cat.category}-${idx}`}
                    className="skill-row flex items-start gap-3 px-3 py-3 transition-colors duration-200"
                  >
                    <span className="min-w-[110px] shrink-0 text-sm font-semibold leading-relaxed text-gray-800">
                      {skill.name}
                    </span>
                    <span className="mt-0.5 shrink-0 text-gray-300">—</span>
                    <span className="text-sm italic leading-relaxed text-gray-500">
                      {skill.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
