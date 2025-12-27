interface University {
  name: string; // required
  shortName?: string; // optional
}

export const universitiesAndCollege: {
  [city: string]: University[];
}[] = [
  {
    Amman: [
      { name: "Al-Ahliyya Amman University" },
      { name: "Al-Isra University", shortName: "IU" },
      { name: "Al-Zaytoonah University of Jordan", shortName: "ZUJ" },
      { name: "Amman Arab University", shortName: "AAU" },
      { name: "Applied Science Private University", shortName: "ASPU" },
      { name: "Arab Academy for Banking and Financial Sciences" },
      { name: "Arab Open University" },
      { name: "German-Jordanian University", shortName: "GJU" },
      { name: "Al Hussein Technical University", shortName: "HTU" },
      { name: "Ibn Sina University for Medical Sciences: Amman - Al Qastal" },
      { name: "University of Jordan", shortName: "JU" },
      { name: "Princess Sumaya University for Technology", shortName: "PSUT" },
      { name: "Luminus Technical University College", shortName: "LTU" },
      { name: "Middle East University", shortName: "MEU" },
      { name: "Petra University", shortName: "PU" },
      { name: "Philadelphia University" },
      {
        name: "The World Islamic Science & Education University (W.I.S.E)",
        shortName: "WISE",
      },
    ],

    Ajloun: [
      { name: "Balqa Applied University - Ajloun College" },
      { name: "Ajloun National Private University" },
    ],

    Aqaba: [
      { name: "Aqaba University of Technology (2011)" },
      { name: "Institute of Banking Studies: Aqaba Branch" },
      { name: "Aqaba Campus of the University of Jordan" },
      { name: "Aqaba Medical Sciences University" },
    ],

    Balqa: [{ name: "Balqa Applied University (Salt)" }],

    Irbid: [
      { name: "Irbid National University" },
      {
        name: "Jordan University of Science and Technology",
        shortName: "JUST",
      },
      { name: "Yarmouk University", shortName: "YU" },
      { name: "Jedara University" },
    ],

    Jerash: [{ name: "Jerash Private University", shortName: "JP" }],

    Karak: [
      { name: "Mutah University (Mu'tah)", shortName: "MU" },
      { name: "Balqa Applied University (Karak)" },
    ],

    Madaba: [
      {
        name: "American University of Madaba (AUM) - Madaba Campus",
        shortName: "AUM",
      },
    ],

    Mafraq: [{ name: "Al al-Bayt University" }],

    Tafila: [{ name: "Tafila Technical University" }],

    Mean: [
      {
        name: "Al-Hussein Bin Talal University",
        shortName: "AHU",
      },
      {
        name: "Balqa Applied University - College of Agriculture",
        shortName: "BAU",
      },
    ],

    Zarqa: [
      { name: "Hashemite University", shortName: "HU" },
      { name: "Zarqa Private University", shortName: "ZPU" },
    ],
  },
];
