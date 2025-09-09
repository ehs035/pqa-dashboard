export interface MissedMember {
  fullName: string;
  email: string;
  memberId: string;
  dob: string;
}

export interface MissedOpportunity {
  program: string;
  missedPatients: number;
  potentialEarnings: number;
  reason: string;
  members: MissedMember[];
}

export const missedOpportunities: MissedOpportunity[] = [
  {
    program: "Mammography Screening",
    missedPatients: 45,
    potentialEarnings: 6750,
    reason: "Patient no-shows",
    members: [
      {
        fullName: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        memberId: "M001234",
        dob: "1985-03-15",
      },
      {
        fullName: "Maria Rodriguez",
        email: "maria.rodriguez@email.com",
        memberId: "M001235",
        dob: "1978-07-22",
      },
      {
        fullName: "Jennifer Smith",
        email: "jennifer.smith@email.com",
        memberId: "M001236",
        dob: "1990-11-08",
      },
      {
        fullName: "Lisa Chen",
        email: "lisa.chen@email.com",
        memberId: "M001237",
        dob: "1982-05-30",
      },
      {
        fullName: "Amanda Wilson",
        email: "amanda.wilson@email.com",
        memberId: "M001238",
        dob: "1975-12-14",
      },
    ],
  },
  {
    program: "Flu Vaccination",
    missedPatients: 89,
    potentialEarnings: 4450,
    reason: "Scheduling conflicts",
    members: [
      {
        fullName: "Robert Brown",
        email: "robert.brown@email.com",
        memberId: "M001239",
        dob: "1965-09-12",
      },
      {
        fullName: "David Lee",
        email: "david.lee@email.com",
        memberId: "M001240",
        dob: "1972-01-25",
      },
      {
        fullName: "Michael Davis",
        email: "michael.davis@email.com",
        memberId: "M001241",
        dob: "1988-04-18",
      },
      {
        fullName: "James Miller",
        email: "james.miller@email.com",
        memberId: "M001242",
        dob: "1960-08-03",
      },
      {
        fullName: "William Garcia",
        email: "william.garcia@email.com",
        memberId: "M001243",
        dob: "1977-06-27",
      },
    ],
  },
  {
    program: "Wellness Checks",
    missedPatients: 67,
    potentialEarnings: 8040,
    reason: "Patient rescheduling",
    members: [
      {
        fullName: "Patricia Anderson",
        email: "patricia.anderson@email.com",
        memberId: "M001244",
        dob: "1983-02-09",
      },
      {
        fullName: "Linda Taylor",
        email: "linda.taylor@email.com",
        memberId: "M001245",
        dob: "1970-10-16",
      },
      {
        fullName: "Barbara White",
        email: "barbara.white@email.com",
        memberId: "M001246",
        dob: "1968-12-03",
      },
      {
        fullName: "Elizabeth Harris",
        email: "elizabeth.harris@email.com",
        memberId: "M001247",
        dob: "1981-08-21",
      },
      {
        fullName: "Jennifer Martin",
        email: "jennifer.martin@email.com",
        memberId: "M001248",
        dob: "1976-04-12",
      },
    ],
  },
];
