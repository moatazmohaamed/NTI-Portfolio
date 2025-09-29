export interface Statistic {
  id: number;
  value: string;
  label: string;
}

export interface CompanyValue {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Technology {
  id: number;
  name: string;
}

export interface Story {
  part1: string;
  part2: string;
  part3: string;
}

export interface CompanyInfo {
  foundedYear: string;
  mission: string;
  vision: string;
  story: Story;
}

export interface About {
  statistics: Statistic[];
  coreValues: CompanyValue[];
  technologies: Technology[];
  companyInfo: CompanyInfo;
}
