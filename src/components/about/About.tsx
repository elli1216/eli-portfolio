import React from 'react';
import { Section } from '@/components/layout/Section';
import { motion } from 'framer-motion';
import {
  Target,
  TrendingUp,
  Layers,
  GraduationCap,
  MapPin,
  Briefcase,
  Sparkles,
  ChessPawnIcon,
} from 'lucide-react';
import {
  EDUCATION,
  EXPERIENCE_DATA,
  EXPLORING,
  INTERESTS,
  PERSONAL_DATA,
} from '@/constants/constants';
import { GithubStatsWidget } from '@/components/shared/GithubStatsWidget';
import { TerminalSectionHeader, TerminalWindow } from '@/components/shared/terminal';

const VALUES = [
  {
    icon: Target,
    title: 'Challenge → Calm',
    description:
      'I take noisy, tangled problems and ship systems that feel effortless — turning chaos into something calm and dependable.',
  },
  {
    icon: TrendingUp,
    title: 'Feedback → Growth',
    description:
      "I'm highly coachable. Every code review and industry benchmark is a chance to level up, not a critique to defend.",
  },
  {
    icon: Layers,
    title: 'Complexity → Scalability',
    description:
      'I care about code that stays clean, type-safe, and maintainable long after launch — strict standards over quick shortcuts.',
  },
];

export const About: React.FC = () => {
  return (
    <Section id="about">
      {/* Section Header */}
      <TerminalSectionHeader
        command="curl -s https://api.elifloresca.dev/bio"
        title="About Me"
        description="A little bit about the engineer behind the console."
        executionTime="11ms"
      />

      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-stretch w-full min-w-0">
        {/* Left Column: Narrative Terminal Window */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-fit flex flex-col w-full min-w-0"
        >
          <TerminalWindow
            title="engineer-manifest.md"
            command="cat summary.txt"
            className="h-fit w-full min-w-0"
          >
            <div className="space-y-4 text-xs sm:text-sm font-mono text-muted-foreground leading-relaxed break-words">
              <p>
                <span className="text-primary font-bold"># 01. Background & Education</span>
                <br />I am a <span className="text-primary font-semibold">
                  BSIT graduate
                </span> of{' '}
                <span className="text-primary font-semibold">Bulacan State University</span> from{' '}
                <span className="text-foreground font-medium">Marilao, Bulacan</span>, currently
                working as a{' '}
                <span className="text-primary font-semibold">{EXPERIENCE_DATA[0].role}</span> at{' '}
                <span className="text-foreground font-medium underline decoration-primary/50 underline-offset-4">
                  {EXPERIENCE_DATA[0].company}
                </span>
                .
              </p>
              <p>
                <span className="text-primary font-bold"># 02. Philosophy & Growth</span>
                <br />
                As a <span className="text-primary font-semibold">highly coachable developer</span>,
                I thrive on constructive feedback and industry-best practices to continuously
                sharpen my architecture skills.
              </p>
              <p>
                <span className="text-primary font-bold"># 03. Engineering Standards</span>
                <br />I bring hands-on project experience with a strict commitment to maintaining
                high standards for{' '}
                <span className="text-primary font-semibold">
                  code scalability, type safety, and runtime performance
                </span>{' '}
                across both modern cloud stacks and legacy systems.
              </p>
            </div>
          </TerminalWindow>
        </motion.div>

        {/* Right Column: Structured Telemetry JSON / Specs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="h-fit flex flex-col w-full min-w-0"
        >
          <TerminalWindow
            title="telemetry-specs.json"
            command="jq '.profile' telemetry.json"
            className="h-fit w-full min-w-0"
          >
            <div className="space-y-2 font-mono w-full min-w-0">
              <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/40 min-w-0 w-full">
                <div className="size-8 sm:size-9 rounded-md flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                  <Briefcase size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground truncate">
                    CURRENT_ROLE
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-foreground wrap-break-word">
                    {EXPERIENCE_DATA[0].role} @ {EXPERIENCE_DATA[0].company}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/40 min-w-0 w-full">
                <div className="size-8 sm:size-9 rounded-md flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                  <GraduationCap size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground truncate">
                    EDUCATION_CREDENTIAL
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-foreground break-words">
                    BSIT @ {EDUCATION.university_attended}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/40 min-w-0 w-full">
                <div className="size-8 sm:size-9 rounded-md flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                  <MapPin size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground truncate">
                    PRIMARY_LOCATION
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-foreground wrap-break-word">
                    {PERSONAL_DATA.based_in}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/40 min-w-0 w-full">
                <div className="size-8 sm:size-9 rounded-md flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                  <Sparkles size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground truncate">
                    CURRENTLY_EXPLORING
                  </p>
                  <p className="text-xs font-medium text-foreground wrap-break-word">
                    {EXPLORING.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/40 min-w-0 w-full">
                <div className="size-8 sm:size-9 rounded-md flex items-center justify-center shrink-0 bg-primary/10 text-primary">
                  <ChessPawnIcon size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground truncate">
                    INTERESTS_AND_HOBBIES
                  </p>
                  <p className="text-xs font-medium text-foreground wrap-break-word">
                    {INTERESTS.join(' · ')}
                  </p>
                </div>
              </div>
            </div>
          </TerminalWindow>
        </motion.div>
      </div>

      {/* What Drives Me: Core Principles */}
      <motion.div
        className="mt-14 sm:mt-20 w-full min-w-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <TerminalSectionHeader
          command="cat /etc/core-principles.conf"
          title="What Drives Me"
          description="The engineering principles that keep me coding late into the night."
          executionTime="4ms"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 font-mono w-full min-w-0">
          {VALUES.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="h-fit flex flex-col w-full min-w-0"
              >
                <TerminalWindow
                  title={`rule-${index + 1}.md`}
                  command={`cat rule-${index + 1}.md`}
                  className="h-fit flex flex-col shadow-md w-full min-w-0"
                  bodyClassName="p-4 sm:p-5 flex flex-col flex-1 justify-between font-mono min-w-0"
                >
                  <div className="space-y-3 min-w-0">
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 sm:size-9 rounded-lg flex items-center justify-center border border-primary/20 shrink-0 bg-primary/10 text-primary">
                        <Icon size={17} />
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-foreground tracking-tight wrap-break-word">
                        {value.title}
                      </h4>
                    </div>

                    <div className="p-3 rounded-lg bg-muted/30 border border-border/40 text-xs text-muted-foreground leading-relaxed wrap-break-word">
                      <span className="text-primary font-bold mr-1.5">#</span>
                      {value.description}
                    </div>
                  </div>
                </TerminalWindow>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* My Workflow */}
      <motion.div
        className="mt-14 sm:mt-20 w-full min-w-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <TerminalSectionHeader
          command="cat workflow.conf"
          title="My Workflow"
          description="Agile iterative approach to building scalable systems."
          executionTime="8ms"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 font-mono w-full min-w-0">
          {[
            {
              step: '01',
              title: 'Requirements Gathering',
              description: 'Understand business needs, constraints, and user expectations through collaboration and documentation.',
            },
            {
              step: '02',
              title: 'Coding',
              description: 'Write clean, type-safe, and maintainable code following best practices and architectural patterns.',
            },
            {
              step: '03',
              title: 'Testing',
              description: 'Validate functionality through unit tests, integration tests, and manual QA to ensure reliability.',
            },
            {
              step: '04',
              title: 'Deployment',
              description: 'Release to production with confidence using CI/CD pipelines and monitoring for real-world performance.',
            },
          ].map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="h-fit flex flex-col w-full min-w-0"
            >
              <TerminalWindow
                title={`step-${step.step}.md`}
                command={`cat step-${step.step}.md`}
                className="h-fit flex flex-col shadow-md w-full min-w-0"
                bodyClassName="p-4 sm:p-5 flex flex-col flex-1 justify-between font-mono min-w-0"
              >
                <div className="space-y-3 min-w-0">
                  <div className="flex items-start gap-3">
                    <div className="size-8 sm:size-9 rounded-lg flex items-center justify-center border border-primary/20 shrink-0 bg-primary/10 text-primary font-bold text-sm">
                      {step.step}
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-foreground tracking-tight wrap-break-word pt-0.5">
                      {step.title}
                    </h4>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/30 border border-border/40 text-xs text-muted-foreground leading-relaxed wrap-break-word">
                    <span className="text-primary font-bold mr-1.5">#</span>
                    {step.description}
                  </div>
                </div>
              </TerminalWindow>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* GitHub Activity & Stats */}
      <motion.div
        className="mt-14 sm:mt-20 w-full min-w-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <TerminalSectionHeader
          command='git log --stat --author="elli1216"'
          title="GitHub Activity"
          description="Recent commit history and contribution stats."
          executionTime="14ms"
        />
        <GithubStatsWidget />
      </motion.div>
    </Section>
  );
};

export default About;
