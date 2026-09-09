export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  startDate: string; // "April 2026"
  endDate: string;   // "Present" or "April 2026"
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Blockchain Developer',
    company: 'JadeQuest Consulting Pvt Ltd',
    location: 'Ahmedabad, India',
    startDate: 'April 2026',
    endDate: 'Present',
    bullets: [
      'Wrote presale/token-sale smart contracts (Solidity/EVM) with whitelist, cap, and distribution logic, and Rust-based contracts for SVM, for a client token launch.',
      'Led end-to-end development of a Transfer of Development Rights (TDR) digitization platform on Hyperledger Fabric, including public blockchain bridging via Ethereum for cross-chain verification and OCR-based certificate generation.',
      'Contributed to Loan Process and Hawker Portal modules on Hyperledger Fabric, and an HRMS module with automated payroll, attendance/leave management, and OCR-based onboarding verification.',
    ],
  },
  {
    role: 'Blockchain Developer',
    company: 'Freelance',
    location: 'Remote',
    startDate: 'April 2025',
    endDate: 'April 2026',
    bullets: [
      'Audited, debugged, and enhanced Solidity smart contracts, improving reliability and security across multiple client projects.',
      'Contributed to NFT and DeFi initiatives, writing and refining smart contract logic to project-specific requirements.',
    ],
  },
  {
    role: 'Business Development Executive Intern',
    company: '5irechain',
    location: 'Remote',
    startDate: 'December 2024',
    endDate: 'March 2025',
    bullets: [
      'Analysed and identified potential partnerships, securing new collaborations for the 5irechain ecosystem.',
    ],
  },
  {
    role: 'Blockchain Developer Intern',
    company: 'Solulab',
    location: 'Remote',
    startDate: 'July 2024',
    endDate: 'November 2024',
    bullets: [
      'Developed and optimised 10+ Solidity smart contracts, improving execution efficiency and reducing gas costs by up to 15%.',
    ],
  },
];
