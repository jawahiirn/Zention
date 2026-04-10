export const ONBOARDING_STEPS = ['purpose', 'invite', 'space-name'] as const;

export const PURPOSE_OPTIONS = [
  { id: 'work', label: 'Work', description: 'For professional teams' },
  { id: 'school', label: 'School', description: 'For academic collaboration' },
  { id: 'personal', label: 'Personal', description: 'For your private projects' },
] as const;

export const ONBOARDING_METADATA = {
  purpose: { title: 'What will you use this Space for?', description: 'This helps us personalize your workspace.' },
  invite: { title: 'Invite people to your Space', description: 'Collaboration is better together.' },
  'space-name': { title: 'Name your Space', description: 'Pick something catchy and recognizable.' },
} as const;
