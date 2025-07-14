export const demoUsers = [
  {
    id: "demo-1",
    email: "ahmet.yilmaz@demo.com",
    fullName: "Ahmet Yılmaz",
    password: "123456",
    role: "Deneyimli Yatırımcı",
    isDemo: true,
    isLoggedIn: false,
    onboardingCompleted: true,
    onboardingStep: "completed",
    personalInformation: {
      legalName: "Ahmet Yılmaz",
      birthday: "1985-03-15",
      country: "Türkiye",
      city: "İstanbul",
      district: "Beşiktaş",
      address: "Barbaros Bulvarı No: 123",
      postalCode: "34353",
      taxId: "12345678901",
    },
    phoneVerification: {
      phoneNumber: "+90 532 123 45 67",
      isVerified: true,
      verificationCode: "123456",
    },
    annualIncome: {
      range: "500000-1000000",
      currency: "TRY",
      source: "business",
    },
    investmentExperience: {
      level: "experienced",
      previousInvestments: true,
      riskTolerance: "high",
      investmentGoals: ["growth", "diversification"],
    },
    profileSetup: {
      bio: "15 yıllık deneyime sahip teknoloji yatırımcısı. Özellikle erken aşama startuplara odaklanıyorum.",
      linkedinUrl: "https://linkedin.com/in/ahmetyilmaz",
      websiteUrl: "https://ahmetyilmaz.com",
      profileImageUrl: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "demo-2",
    email: "zeynep.kaya@demo.com",
    fullName: "Zeynep Kaya",
    password: "123456",
    role: "Yeni Yatırımcı",
    isDemo: true,
    isLoggedIn: false,
    onboardingCompleted: true,
    onboardingStep: "completed",
    personalInformation: {
      legalName: "Zeynep Kaya",
      birthday: "1992-07-22",
      country: "Türkiye",
      city: "Ankara",
      district: "Çankaya",
      address: "Tunalı Hilmi Caddesi No: 45",
      postalCode: "06680",
      taxId: "98765432109",
    },
    phoneVerification: {
      phoneNumber: "+90 533 987 65 43",
      isVerified: true,
      verificationCode: "654321",
    },
    annualIncome: {
      range: "100000-250000",
      currency: "TRY",
      source: "salary",
    },
    investmentExperience: {
      level: "beginner",
      previousInvestments: false,
      riskTolerance: "medium",
      investmentGoals: ["learning", "growth"],
    },
    profileSetup: {
      bio: "Yatırım dünyasına yeni adım atan bir mühendis. Teknoloji startuplarına ilgi duyuyorum.",
      linkedinUrl: "https://linkedin.com/in/zeynepkaya",
      websiteUrl: "",
      profileImageUrl: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    id: "demo-3",
    email: "mehmet.ozkan@demo.com",
    fullName: "Mehmet Özkan",
    password: "123456",
    role: "Uzman Yatırımcı",
    isDemo: true,
    isLoggedIn: false,
    onboardingCompleted: true,
    onboardingStep: "completed",
    personalInformation: {
      legalName: "Mehmet Özkan",
      birthday: "1978-11-08",
      country: "Türkiye",
      city: "İzmir",
      district: "Konak",
      address: "Alsancak Mahallesi No: 67",
      postalCode: "35220",
      taxId: "11223344556",
    },
    phoneVerification: {
      phoneNumber: "+90 534 111 22 33",
      isVerified: true,
      verificationCode: "111222",
    },
    annualIncome: {
      range: "1000000+",
      currency: "TRY",
      source: "business",
    },
    investmentExperience: {
      level: "expert",
      previousInvestments: true,
      riskTolerance: "high",
      investmentGoals: ["growth", "diversification", "impact"],
    },
    profileSetup: {
      bio: "20+ yıllık iş deneyimi olan seri girişimci ve melek yatırımcı. Özellikle B2B SaaS şirketlerine yatırım yapıyorum.",
      linkedinUrl: "https://linkedin.com/in/mehmetozkan",
      websiteUrl: "https://mehmetozkan.co",
      profileImageUrl: "/placeholder.svg?height=100&width=100",
    },
  },
]

export const isDemoUser = (email: string): boolean => {
  return demoUsers.some((user) => user.email === email)
}

export const getDemoUser = (email: string) => {
  return demoUsers.find((user) => user.email === email)
}

export const getAllDemoUsers = () => {
  return demoUsers
}
