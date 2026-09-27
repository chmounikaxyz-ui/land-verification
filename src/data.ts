import { VerificationResult } from './types';

export const INITIAL_REPORTS: VerificationResult[] = [
  {
    id: '#RPT-98042',
    plotDetails: {
      surveyNumber: '124/A',
      plotSize: 450,
      district: 'NTR',
      mandal: 'Vijayawada (Urban)',
      village: 'Devi Nagar',
      estimatedPrice: 5000000, // INR
      locationName: 'Devi Nagar, Vijayawada',
      latitude: 16.5334,
      longitude: 80.6451
    },
    safetyScore: 92,
    verdict: 'BUY',
    confidenceScore: 0.96,
    documentMatch: 'VERIFIED',
    mapVerification: 'VERIFIED',
    priceValuation: 'CAUTION',
    reportDate: 'Oct 24, 2025',
    stage: 4,
    detectedStructures: 12,
    roadAccess: true,
    historyAnalysis: 'The plot has remained geographically stable with minor surrounding development over the last 5 years, indicating a low risk of structural shifting.',
    logicBreakdown: 'The AI engine has successfully cross-verified the provided plot coordinates against national land registry databases and environmental hazard maps. The high safety score is primarily driven by the **100% document authenticity match** and clear title history. A marginal risk was detected in the price valuation, as current market trends indicate a 4.2% premium over local median averages. However, the projected infrastructure growth in this sector justifies the valuation.',
    soilType: 'Clay',
    floodRisk: 'LOW',
    proximityData: {
      school: 0.5,
      hospital: 1.2,
      railway: 2.0,
      park: true,
      shoppingCenter: true
    },
    soilDetails: {
      strength: "High Bearing Capacity",
      composition: "Clay Loam / Red Soil",
      suitableFor: ["Multi-story Residential", "Commercial Complexes"]
    },
    environmentalRisks: {
      floods: "LOW",
      heavyRains: "MEDIUM",
      overallDescription: "Elevated topography ensures rapid water drainage."
    },
    futureScope: {
      developmentIndex: 8.5,
      plannedProjects: ["Upcoming Metro Rail Extension (2km radius)", "Proposed IT Tech Park (10km radius)"],
      description: "High-growth transit-oriented development (TOD) zone with predicted strong appreciation."
    }
  },
  {
    id: '#RPT-98038',
    plotDetails: {
      surveyNumber: '58/C',
      plotSize: 320,
      district: 'Medchal',
      mandal: 'Quthbullapur',
      village: 'Highland Heights',
      estimatedPrice: 7500000,
      locationName: 'Highland Heights V-12',
      latitude: 17.512,
      longitude: 78.431
    },
    safetyScore: 42,
    verdict: 'CAUTION',
    confidenceScore: 0.42,
    documentMatch: 'CAUTION',
    mapVerification: 'CAUTION',
    priceValuation: 'FLAGGED',
    reportDate: 'Oct 22, 2025',
    stage: 4,
    detectedStructures: 4,
    roadAccess: false,
    historyAnalysis: 'Recent satellite updates show layout modifications. Time-series imagery reveals potential boundary encroachments starting in Q2 2024.',
    logicBreakdown: 'The verification chain flag is triggered due to a **discrepancy in the digital survey coordinates** compared with the physical fence lines. Additionally, historical deeds show an unresolved easement dispute from 2018. The current asking price is 35% higher than regional baseline values, representing an elevated pricing risk.',
    soilType: 'Sand composition',
    floodRisk: 'MEDIUM',
    proximityData: {
      school: 1.8,
      hospital: 3.5,
      railway: 4.2,
      park: false,
      shoppingCenter: true
    },

    soilDetails: {
      strength: "Medium Bearing Capacity",
      composition: "Sand composition",
      suitableFor: ["Light Residential", "Warehousing"]
    },
    environmentalRisks: {
      floods: "MEDIUM",
      heavyRains: "HIGH",
      overallDescription: "Lower elevation with poor drainage infrastructure increases waterlogging risk."
    },
    futureScope: {
      developmentIndex: 4.2,
      plannedProjects: ["Road Expansion (Pending Govt Approval)"],
      description: "Stagnant growth due to ongoing legal disputes and lack of infrastructure."
    }
  },
  {
    id: '#RPT-98035',
    plotDetails: {
      surveyNumber: '312/A-2',
      plotSize: 1200,
      district: 'Rangareddy',
      mandal: 'Balnagar',
      village: 'Industrial Zone',
      estimatedPrice: 18000000,
      locationName: 'Industrial Zone B-2',
      latitude: 17.481,
      longitude: 78.398
    },
    safetyScore: 78,
    verdict: 'BUY', // represented as Under Review/Buy with caveat
    confidenceScore: 0.78,
    documentMatch: 'VERIFIED',
    mapVerification: 'VERIFIED',
    priceValuation: 'VERIFIED',
    reportDate: 'Oct 21, 2025',
    stage: 4,
    detectedStructures: 22,
    roadAccess: true,
    historyAnalysis: 'High geographical stability with rapid industrial infrastructure additions. Setback constraints are respected.',
    logicBreakdown: 'Document authenticity is verified at 100% with clear historical title records. A slight delay is noted in the zoning classification clearance for commercial development, which remains pending review. Boundary matches show 99.2% alignment with official land charts.',
    soilType: 'Sand the top',
    floodRisk: 'LOW',
    proximityData: {
      school: 2.5,
      hospital: 0.8,
      railway: 1.1,
      park: true,
      shoppingCenter: false
    },
    soilDetails: {
      strength: "Excellent Bearing Capacity",
      composition: "Rocky / Hard Soil",
      suitableFor: ["Heavy Industrial", "Factories", "High-rise"]
    },
    environmentalRisks: {
      floods: "LOW",
      heavyRains: "LOW",
      overallDescription: "Geologically stable terrain with natural rocky slopes preventing accumulation."
    },
    futureScope: {
      developmentIndex: 9.1,
      plannedProjects: ["Special Economic Zone (SEZ) expansion", "New Cargo Railway Hub"],
      description: "Prime industrial corridor with exceptional long-term capital yield projections."
    }
  }
];

export const MAP_IMAGE_URLS = {
  satelliteHistory: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWGGmtROHWHTCPzH1xHsnsFoS_r5cNajXA5SSfC68Oc08m7J5ZvdkWobeWVyNncoByVzhTCwlKhgiegHQN75JYCoC-zTdTmGjHylViDNZydrbJBzo0R2ezEtEAM3hLrtpmATS_MagOxK4aiGaWqSU4SCeWJL0mZypwocbot7qGE_GVo7N38dn6QuxaxYLOuePPtS0J7uaex3EGMEF3yF_QMtwuAl2Df1aLs-cuXlOSsjcFgdAPsf_lLBMg70sHJnv7oy4AMjxiYa_N',
  valuationChart: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVWTdmlORBVocz252druoJRl8ONgWlAj1vo8gDxi27zhT9s_U5YnF4bhW71goJQZHyvuvkhPHxl6WB5ZAS8jxShK6WCGkI_5-T8LcTapQDpEWjui9B2PRoyPgMsdDHQff8_TQ23qJ_bi6lTy5kJN9GdjwRanP_Pe_49OoVnTVTUFi3pCeIeo9gb0-npL-MiHPKZ0P7-7NNZYAcwVvhuE9xp02HADYarHTyU7_ImNhGrZyaIU3KfF4i6HDsWpT-jnHQerjmvfMHwewM',
  environmentalSoil: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhvFy-55U3YzWvPhOS9ifLLNGH3362zQJwfWvyezsirTkSVk3l80I6H4EvqRYyPwNruXZkwxhvxEzIWqkye3t8F6uL0wt0dFDKnSXgCy8Siu-LsojYEq8L4Gp5sZ3z5HcfgS5pEkdt9c1g6pVdV1X0KBZF1aAnzSGcF7gq6ReytZD4DBGkwCyTbhjq1ZC--fo5tu-Iu7OQ_OYjvgBftMrEb4_DrxjB1LGoDdu69qdzHkQbywobhxFIzyUeiPdytJyELl3rfEuoTA2H',
  proximityMap: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYsI2NhQy8pLIHPuB3CWUDxrUmMO3Y1UeZoAheddY-G_iXaMGUJQtGEQeSz2tjqLNPh-wFFi6UYBL3tY894oBTr9R3WZSxyFl187oXhgP8QmfvpS5SovKdIuhdkMWu7KwwwW4EMDi6Kz4w2Quksa60gyKiYMvKIB99fOBKEKoz5yEfYtdMSXvMpcaezuNYTBa4oy0qycioEX7HO7EJf_YZPQLvP-m07KaWWDmXy89oIiVGnpfa7kXu6qm-8AJSbExNrrN5mVrKwm3Y',
  singaporeMap: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0cV8DEKkO-7_P_B_KBS_3rPtRblhhQWSkf_eHNT5JXI9a7cMGYaIqkHWutKrOnysBwS5jB2UTDwym-RI8e-KLFqMz6sFyCg0HRlg0lHEiLoJGwAeSENXBRDYl6L3dELwRDZngJ2yN0v0mwnVUmVztGgd5ESrzJzazTQwVS-c3GLbXr2WyjHXXPeFFW0ZcabsE5g6j9SavfmLXQFH6GsSjW3KoCfQC8exywAU7mCW_SQ3OcvpE6xhkTBxqQQo4-KxFOnYKGP4AFTbP',
  hyderabadMap: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhf7WgP61GA35BBGC9MBNCRXRoM9v_80OIeO3UYWRIM8R8LZPJz7PeJzU0fjn8kizA3UJgu9YinpobN6f6K1Af5qhiwS4jtcjgHFSlcvmhOwLltEoQAo1YaCzAXNkrISneuRO_rOnVQ7aV7f8LYqbua1YBR9ZrcLFpdtS-6sBpUJsueSwsdJtf5UvpeFXPQPOTuXH69IEIaX_JgeH_GoyODLSMOZUIYQ8xxHaIVniU_wnB13lwhz0rRfWrSaTRgrjZ34YzTwvPVEIL',
  satelliteLandscape: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ9UZV0zLIuBwmlSgM5UXkX3jHkZqiJYgl5nIVPGU2fSZjsGwbqPW8XTQlRis7NwvEasQU5eRck0CWec5ezbqmVRppuHZ4oCExQMe0r22UfofO9O6TZYvBQTaUs6kWQM-yezZnPhTSc_oxr3lUmceV_f-wt4iPqxjR7xurGSB9_EUtySZli-9p4pYBAohZoTN9qTsX1t97N-mkQtU6Nht9SyvWtYdnc3z3BRuUKf-2-F3C-Mj09EBpbZgXrMUOzvfJWU6tqBImFbZt',
  satelliteGreenPlot: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaxMeEEOZivIk04ZGoWTXhChzWe9CJfXfCjCRgQUMQ4E1DSIAU46X2aZwxh-U7UBuwn_QaV7jzLWgp64HDhbRq6_fz36SttHG8M4dMpSTUsOMeycURcVdUVO4vtRquNkAadebTNdYH_7rO-H1UK05QoXRhCkxNrkviy8q7wsGs-GfnERAdBSX7FXk0SGmqQOpNeTRI-tNcW7pkRoQZadpXtOFXsiVZDLq-_Yae4v7Y6HKQehWAS0ow-ilKJxFAUhSnK3kg3b5Nk9sq',
  topologicalEmerald: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD267l1VC9KphFw7g54p0OQcV_3DwTrFoflJ_GcqXbyh4rUMv_mJZBEkxotX_3NoPyqVhudUV7Uhh_1yZqJ20dJU-Ak0Nd-b-gdQleRgWDuuICjTQcR3BHHxEmxIqXqjAss0KeWMw7nPtWFt5IMD1xHwXf_uXN4Hu-jj2MXbVUGHc6V1o6vbkUEKvbIrPWe-FyCI_xD5eeDQrYYDroldXSNuIzp-HS4cDgCzhfQUkti36OD4fT79mpU2S-z91qqHoutnE5VKbvOCb8R',
  satelliteDynamicGIS: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAadyWW0CLtvmvu7zsIHCs6Il0uG4AZJ62_nZHYh6VDrxVeawvSsKLvTp6QQe8L0hRSQAgaOOi1IeiecCpG1tRWzfAqwiEwoUP0xsv5UuaIvuV7Jacv4GI4q8Oypf_hcdnlvSYOukTQKO_8MJmphtBfsAwgARF7sEZWl8kaa43f8ZfcjwLSrm5s92kjbWpORdOYm0DAKYok8otUxNJDn4aJxS0L3XHfANy3Z1qtz644xd_yW5Por8Ans_kiZ2AvTju_ftUXXw3AiXT3'
};
