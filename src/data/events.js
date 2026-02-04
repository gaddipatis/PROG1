const events = [
  {
    id: 1,
    title: "Midnight Echo — World Tour",
    category: "Concert",
    date: "2026-03-15T20:00:00",
    venue: "Madison Square Garden",
    city: "New York, NY",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop",
    description:
      "Experience the electrifying energy of Midnight Echo as they bring their chart-topping hits to the legendary Madison Square Garden. This world tour stop promises an unforgettable night of music, lights, and pure adrenaline.",
    tickets: [
      { tier: "General Admission", price: 75, available: 500 },
      { tier: "VIP", price: 195, available: 120 },
      { tier: "Front Row", price: 350, available: 30 },
    ],
  },
  {
    id: 2,
    title: "Lakers vs. Celtics",
    category: "Sports",
    date: "2026-04-02T19:30:00",
    venue: "Crypto.com Arena",
    city: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1504450758481-7338bbe75c8e?w=600&h=400&fit=crop",
    description:
      "The ultimate NBA rivalry returns. Watch the Los Angeles Lakers take on the Boston Celtics in a regular-season showdown that never disappoints. Grab your seats for one of basketball's greatest matchups.",
    tickets: [
      { tier: "Upper Deck", price: 90, available: 800 },
      { tier: "Lower Bowl", price: 250, available: 300 },
      { tier: "Courtside", price: 1200, available: 20 },
    ],
  },
  {
    id: 3,
    title: "Hamilton",
    category: "Theater",
    date: "2026-05-10T14:00:00",
    venue: "Richard Rodgers Theatre",
    city: "New York, NY",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=400&fit=crop",
    description:
      "The Pulitzer Prize-winning musical that changed Broadway forever. Lin-Manuel Miranda's hip-hop masterpiece tells the story of America's founding father Alexander Hamilton in a way you've never seen before.",
    tickets: [
      { tier: "Balcony", price: 120, available: 200 },
      { tier: "Mezzanine", price: 225, available: 150 },
      { tier: "Orchestra", price: 399, available: 80 },
    ],
  },
  {
    id: 4,
    title: "Electric Daisy Carnival",
    category: "Festival",
    date: "2026-06-20T16:00:00",
    venue: "Las Vegas Motor Speedway",
    city: "Las Vegas, NV",
    image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=600&h=400&fit=crop",
    description:
      "Three days of non-stop electronic music under the desert sky. Featuring over 200 artists across 8 stages, EDC Las Vegas is the world's largest dance music festival. Art installations, carnival rides, and fireworks included.",
    tickets: [
      { tier: "General Admission (3-Day)", price: 350, available: 2000 },
      { tier: "VIP (3-Day)", price: 750, available: 500 },
      { tier: "Platinum (3-Day)", price: 1500, available: 100 },
    ],
  },
  {
    id: 5,
    title: "Dave Chappelle — Live",
    category: "Comedy",
    date: "2026-04-18T21:00:00",
    venue: "The Chicago Theatre",
    city: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600&h=400&fit=crop",
    description:
      "Comedy legend Dave Chappelle brings his sharp wit and unfiltered commentary to The Chicago Theatre for an intimate evening of stand-up. Known for his boundary-pushing humor, this is a show you won't want to miss.",
    tickets: [
      { tier: "General Admission", price: 85, available: 400 },
      { tier: "Premium", price: 175, available: 150 },
      { tier: "VIP Meet & Greet", price: 500, available: 25 },
    ],
  },
  {
    id: 6,
    title: "Cirque du Soleil — Amaluna",
    category: "Show",
    date: "2026-07-05T19:00:00",
    venue: "Grand Chapiteau at AT&T Center",
    city: "San Antonio, TX",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
    description:
      "Inspired by Shakespeare's The Tempest, Amaluna takes you to a mysterious island ruled by goddesses and guided by the cycles of the moon. Jaw-dropping acrobatics, mesmerizing visuals, and a powerful all-female band.",
    tickets: [
      { tier: "Category C", price: 65, available: 600 },
      { tier: "Category B", price: 115, available: 400 },
      { tier: "Category A", price: 185, available: 200 },
    ],
  },
];

export default events;
