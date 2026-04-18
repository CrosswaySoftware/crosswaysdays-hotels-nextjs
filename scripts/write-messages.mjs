import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const amenitiesStandard = [
  "Wifi",
  "Breakfast",
  "Air Conditioning",
  "Telephones",
  "Mini Bar",
  "Tea and Coffee Maker",
  "Iron and Ironing Board",
  "Satellite Television",
  "Electronic Safe",
  "Hair-dryer",
  "Shaving Mirror",
  "Working Desk",
  "Fog Free Bathroom Mirror",
  "Full Length Mirror",
  "Luggage Rack",
  "Closet",
];

const amenitiesSuite = [
  ...amenitiesStandard.filter((a) => a !== "Satellite Television"),
  "Two Satellite Television",
  "Drawing Room",
  "Powder Room",
];

const amenitiesStandardAr = [
  "واي فاي",
  "إفطار",
  "تكييف",
  "هواتف",
  "ميني بار",
  "شاي وآلة قهوة",
  "مكواة وطاولة كيّ",
  "تلفزيون فضائي",
  "خزنة إلكترونية",
  "مجفف شعر",
  "مرآة حلاقة",
  "مكتب عمل",
  "مرآة حمام بدون بخار",
  "مرآة كاملة الطول",
  "حاملة أمتعة",
  "خزانة ملابس",
];

const amenitiesStandardFr = [
  "Wi‑Fi",
  "Petit-déjeuner",
  "Climatisation",
  "Téléphones",
  "Mini-bar",
  "Thé et cafetière",
  "Fer et planche à repasser",
  "Télévision satellite",
  "Coffre-fort électronique",
  "Sèche-cheveux",
  "Miroir de rasage",
  "Bureau",
  "Miroir de salle de bain anti-buée",
  "Miroir en pied",
  "Porte-bagages",
  "Placard",
];

const amenitiesSuiteAr = [
  ...amenitiesStandardAr.filter((a) => a !== "تلفزيون فضائي"),
  "تلفزيونان فضائيان",
  "صالة جلوس",
  "حمّام ضيوف",
];

const amenitiesSuiteFr = [
  ...amenitiesStandardFr.filter((a) => a !== "Télévision satellite"),
  "Deux télévisions satellite",
  "Salon",
  "Toilettes d’appoint",
];

const localeSwitcherByLocale = {
  en: { label: "Language", en: "English", ar: "العربية", fr: "Français" },
  ar: { label: "اللغة", en: "English", ar: "العربية", fr: "Français" },
  fr: { label: "Langue", en: "English", ar: "العربية", fr: "Français" },
};

const base = {
  DaysNav: {
    menuToggle: { en: "Menu", ar: "القائمة", fr: "Menu" },
    overview: { en: "Overview", ar: "نظرة عامة", fr: "Présentation" },
    accommodation: { en: "Accommodation", ar: "الإقامة", fr: "Hébergement" },
    restaurant: { en: "Restaurant", ar: "المطعم", fr: "Restauration" },
    gallery: { en: "Gallery", ar: "المعرض", fr: "Galerie" },
    contact: { en: "Write to Us", ar: "راسلنا", fr: "Nous écrire" },
    bookDirect: { en: "Book Direct", ar: "احجز مباشرة", fr: "Réserver en direct" },
  },
  DaysFooter: {
    address: {
      en: "245/1, Old Mahabalipuram Road, Padur, Chennai – 603103.",
      ar: "245/1، طريق مهاباليپورام القديم، بادور، تشيناي – 603103.",
      fr: "245/1, Old Mahabalipuram Road, Padur, Chennai – 603103.",
    },
    contactTitle: { en: "Contact", ar: "اتصل", fr: "Contact" },
    linksTitle: { en: "Useful links", ar: "روابط مفيدة", fr: "Liens utiles" },
    linkOverview: { en: "Overview", ar: "نظرة عامة", fr: "Présentation" },
    linkAccommodation: { en: "Accommodation", ar: "الإقامة", fr: "Hébergement" },
    linkRestaurant: { en: "Restaurant", ar: "المطعم", fr: "Restauration" },
    linkGallery: { en: "Gallery", ar: "المعرض", fr: "Galerie" },
    linkContact: { en: "Write to Us", ar: "راسلنا", fr: "Nous écrire" },
    socialTitle: { en: "Social", ar: "التواصل", fr: "Réseaux" },
    copyright: {
      en: "© {year} Crossway. All rights reserved.",
      ar: "© {year} كروسواي. جميع الحقوق محفوظة.",
      fr: "© {year} Crossway. Tous droits réservés.",
    },
  },
  DaysBooking: {
    title: { en: "Book your stay", ar: "احجز إقامتك", fr: "Réserver votre séjour" },
    checkIn: { en: "Check in", ar: "تاريخ الوصول", fr: "Arrivée" },
    checkOut: { en: "Check out", ar: "تاريخ المغادرة", fr: "Départ" },
    rooms: { en: "Rooms", ar: "الغرف", fr: "Chambres" },
    adults: { en: "Adults", ar: "بالغون", fr: "Adultes" },
    children: { en: "Children", ar: "أطفال", fr: "Enfants" },
    submit: { en: "Search", ar: "بحث", fr: "Rechercher" },
    placeholderDate: { en: "Select date", ar: "اختر التاريخ", fr: "Choisir une date" },
    childNone: { en: "—", ar: "—", fr: "—" },
  },
};

function pickLocale(obj, locale) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== "object") return obj;
  if (Array.isArray(obj)) return obj.map((x) => pickLocale(x, locale));
  if ("en" in obj) {
    return obj[locale] ?? obj.en;
  }
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = pickLocale(v, locale);
  }
  return out;
}

const DaysHome = {
  hero: {
    eyebrow: {
      en: "Crossway Days Hotel · OMR Chennai",
      ar: "فندق كروسواي دايز · أومر تشيناي",
      fr: "Crossway Days Hotel · OMR Chennai",
    },
    title: {
      en: "Facilities designed to live with joy",
      ar: "مرافق مصممة للعيش بفرح",
      fr: "Des équipements pensés pour vivre avec joie",
    },
    subtitle: {
      en: "We aim to redefine a new dimension of luxury and relaxation",
      ar: "نهدف إلى إعادة تعريف بُعد جديد من الفخامة والاسترخاء",
      fr: "Nous redéfinissons une nouvelle dimension de luxe et de détente",
    },
  },
  overview: {
    title: { en: "Crossway Days Hotel", ar: "فندق كروسواي دايز", fr: "Crossway Days Hotel" },
    p1: {
      en: "Crossway Days Hotel Chennai OMR combines superior hospitality with ultra-modern amenities to offer an experience of a lifetime. The hotel is located next to the Hindustan University, close to the Chettinad Hospital as well as the new business districts of Siruseri SIPCOT and a 30 minutes drive to the famous archaeological site Mahabalipuram.",
      ar: "يجمع فندق كروسواي دايز تشيناي أومر بين ضيافة رفيعة ومرافق حديثة لتجربة لا تُنسى. يقع الفندق بجوار جامعة هندوستان، وبالقرب من مستشفى شيتيناد وكذلك أحياء الأعمال الجديدة في سيروسيري سيبكوت، وعلى بعد 30 دقيقة بالسيارة من موقع ماهاباليبورام الأثري الشهير.",
      fr: "Le Crossway Days Hotel Chennai OMR allie hospitalité supérieure et équipements ultramodernes pour une expérience inoubliable. L’hôtel est situé près de l’université Hindustan, du Chettinad Hospital et des nouveaux quartiers d’affaires de Siruseri SIPCOT, à 30 minutes en voiture du site archéologique de Mahabalipuram.",
    },
    p2: {
      en: "Be it a business trip or a staycation this 57 room hotel offers vibrant and comfortable rooms with great services offered. Its in house restaurants and bar along with its Spa is a great place to stay, eat and rest.",
      ar: "سواء كانت رحلة عمل أو إجازة قصيرة، يوفّر هذا الفندق ذو الغرف الـ57 غرفًا مريحة وخدمات ممتازة. مطاعمه وباره الداخليان مع السبا مكان رائع للإقامة والطعام والراحة.",
      fr: "Pour un voyage d’affaires ou un séjour local, cet hôtel de 57 chambres propose des chambres confortables et un service attentionné. Ses restaurants, son bar et son spa en font un lieu idéal pour séjourner, se restaurer et se détendre.",
    },
  },
  rooms: {
    sectionTitle: { en: "Accommodation", ar: "الإقامة", fr: "Hébergement" },
    standard: {
      title: { en: "Standard Room", ar: "الغرفة القياسية", fr: "Chambre Standard" },
      description: {
        en: "These rooms cater to the convenience of business needs in a compact manner maximizing space with quality and comfort, ideal for individual travellers or couples. The view from these rooms is mesmerizing with the sight of extended green field, the sea horizon and beautiful sunrise.",
        ar: "تلبّي هذه الغرف احتياجات رجال الأعمال بشكل مدمج مع أقصى استفادة من المساحة والجودة والراحة، وهي مثالية للمسافرين الأفراد أو الأزواج. المنظر منها ساحر مع المساحات الخضراء وأفق البحر وشروق الشمس.",
        fr: "Ces chambres répondent aux besoins professionnels en optimisant l’espace, le confort et la qualité — idéales pour les voyageurs seuls ou les couples. La vue sur la verdure, l’horizon marin et le lever du soleil est saisissante.",
      },
      specs: {
        en: ["King or 1 Twin Bed", "250 ft²", "Free Wi‑Fi", "Smoking or Non-Smoking"],
        ar: ["سرير كينج أو توأم", "250 قدم²", "واي فاي مجاني", "مدخنين أو غير مدخنين"],
        fr: ["Lit king ou jumeaux", "250 pi²", "Wi‑Fi gratuit", "Fumeur ou non-fumeur"],
      },
      amenities: { en: amenitiesStandard, ar: amenitiesStandardAr, fr: amenitiesStandardFr },
      amenitiesHeading: { en: "Room amenities", ar: "مرافق الغرفة", fr: "Équipements" },
      detailsCta: { en: "Room photos and details", ar: "صور الغرفة والتفاصيل", fr: "Photos et détails" },
      bookNow: { en: "Book now", ar: "احجز الآن", fr: "Réserver" },
    },
    deluxe: {
      title: { en: "Deluxe Room", ar: "غرفة ديلوكس", fr: "Chambre Deluxe" },
      description: {
        en: "Equipped with all modern amenities the rooms are more spacious and ideal for a leisure as well as business travellers. The beauty of the developing countryside and a golden sunset can be the most pleasant sight not to be missed.",
        ar: "مجهزة بجميع وسائل الراحة الحديثة، الغرف أوسع ومثالية لرحلات الترفيه والأعمال. جمال الريف النامي وغروب الشمس الذهبي مشهد لا يُفوّت.",
        fr: "Toutes options modernes, ces chambres plus spacieuses conviennent aussi bien aux loisirs qu’aux affaires. La campagne environnante et le coucher de soleil doré sont à ne pas manquer.",
      },
      specs: {
        en: ["King or 1 Twin Bed", "410 ft²", "Bathtub or Shower", "Smoking or Non-Smoking"],
        ar: ["سرير كينج أو توأم", "410 قدم²", "حوض استحمام أو دش", "مدخنين أو غير مدخنين"],
        fr: ["Lit king ou jumeaux", "410 pi²", "Baignoire ou douche", "Fumeur ou non-fumeur"],
      },
      amenities: { en: amenitiesStandard, ar: amenitiesStandardAr, fr: amenitiesStandardFr },
      amenitiesHeading: { en: "Room amenities", ar: "مرافق الغرفة", fr: "Équipements" },
      detailsCta: { en: "Room photos and details", ar: "صور الغرفة والتفاصيل", fr: "Photos et détails" },
      bookNow: { en: "Book now", ar: "احجز الآن", fr: "Réserver" },
    },
    suite: {
      title: { en: "Suite Room", ar: "الجناح", fr: "Suite" },
      description: {
        en: "This type of room exemplifies lavish comfort similar to a private home. It comes with a master bedroom and attached bath, a living area with toilet ideal for a couple or a family of four or entertaining guests keeping the privacy of your bedroom. A stunning view of the sunset is something sure to be enjoyed from the cozy comfort of your room.",
        ar: "تجسّد هذه الغرفة راحة فاخرة تشبه المنزل الخاص: غرفة نوم رئيسية مع حمام، ومنطقة معيشة مع دورة مياه، مثالية لزوجين أو عائلة من أربعة أو لاستقبال الضيوف مع الحفاظ على خصوصية غرفة النوم. مشهد غروب الشمس رائع من راحة غرفتك.",
        fr: "Cette suite offre le confort d’une résidence privée : chambre principale avec salle de bains, salon avec toilettes — idéale pour un couple, une famille de quatre ou pour recevoir tout en préservant l’intimité de la chambre. Le coucher de soleil se savoure depuis votre cocon.",
      },
      specs: {
        en: ["King or 1 Twin Bed", "810 ft²", "Free Wi‑Fi", "Smoking or Non-Smoking"],
        ar: ["سرير كينج أو توأم", "810 قدم²", "واي فاي مجاني", "مدخنين أو غير مدخنين"],
        fr: ["Lit king ou jumeaux", "810 pi²", "Wi‑Fi gratuit", "Fumeur ou non-fumeur"],
      },
      amenities: { en: amenitiesSuite, ar: amenitiesSuiteAr, fr: amenitiesSuiteFr },
      amenitiesHeading: { en: "Room amenities", ar: "مرافق الغرفة", fr: "Équipements" },
      detailsCta: { en: "Room photos and details", ar: "صور الغرفة والتفاصيل", fr: "Photos et détails" },
      bookNow: { en: "Book now", ar: "احجز الآن", fr: "Réserver" },
    },
  },
  dining: {
    sectionTitle: {
      en: "Restaurant & experiences",
      ar: "المطاعم والتجارب",
      fr: "Restaurants et expériences",
    },
    nutcracker: {
      title: { en: "Nutcracker Multi-Cuisine Restaurant", ar: "مطعم نوتكراكر متعدد المطابخ", fr: "Restaurant multi-cuisine Nutcracker" },
      paragraphs: {
        en: [
          "Nutcracker is the place to experience speciality food served in chic ambiance inspired from world cuisines. Our skilled culinary team has experience serving a spectrum of cuisines from Indian to East Asian and Continental—all with a contemporary flair. Our elaborate buffets feature enticing live-cooking stations ranging from local delicacies to international gourmet delights are sure to treat your taste buds. This restaurant offers an exclusive Japanese menu for its guests.",
        ],
        ar: [
          "مطعم نوتكراكر هو المكان لتجربة أطباق مميزة في أجواء أنيقة مستوحاة من مطابخ العالم. يقدّم فريقنا الطهو طيفًا من المأكولات الهندية وآسيا الشرقية والقارية بأسلوب معاصر. تضم بوفيهاتنا المحطات الحية من الأطباق المحلية إلى الذواقة العالمية. كما يوفّر قائمة يابانية حصرية للضيوف.",
        ],
        fr: [
          "Nutcracker propose une cuisine d’exception dans une ambiance chic inspirée des grandes tables du monde. Notre brigade maîtrise un spectre allant de l’Inde à l’Asie de l’Est en passant par la cuisine continentale, toujours avec une touche contemporaine. Nos buffets mettent en scène des comptoirs live, des spécialités locales aux saveurs internationales. Un menu japonais exclusif est également proposé.",
        ],
      },
    },
    svanna: {
      title: { en: "Svanna — Rooftop Restaurant", ar: "سفانا — مطعم السطح", fr: "Svanna — restaurant sur le toit" },
      paragraphs: {
        en: [
          "Treat yourself to sumptuous grill at the Crossway Days Hotel Chennai OMR's popular rooftop restaurant. This plush & beautiful alfresco restaurant guarantees lip-smacking food, splendid views of Chennai’s Coastal line and a peaceful atmosphere for a romantic cocktail dinner. Experience live sporting actions with its giant outdoor LED wall for real life viewing.",
        ],
        ar: [
          "استمتع بالمشويات الفاخرة في مطعم السطح الشهير في فندق كروسواي دايز أومر تشيناي. يضمن هذا المطعم الجميل في الهواء الطلق طعامًا لذيذًا وإطلالات رائعة على الساحل وجوًا هادئًا لعشاء كوكتيل رومانسي. شاهد الرياضة على شاشة LED عملاقة في الهواء الطلق.",
        ],
        fr: [
          "Savourez des grillades généreuses dans le restaurant rooftop le plus prisé du Crossway Days Hotel Chennai OMR. Ce cadre extérieur élégant promet des saveurs irrésistibles, une vue magnifique sur le littoral de Chennai et une atmosphère paisible pour un dîner-cocktail romantique. Profitez des retransmissions sportives sur un immense mur LED extérieur.",
        ],
      },
    },
    rideBar: {
      title: { en: "Ride Bar", ar: "بار رايد", fr: "Ride Bar" },
      paragraphs: {
        en: [
          "With a contemporary aura and the finest selection of spirits, Ride Bar is the ideal place for you to head to. Experience it to believe it’s vibrant, sophisticated and full of life ambiance. Sit back and drink out while life takes you on a Ride. It is the place to unwind with the finest choice of spirits from around the world. Strike a business deal or just hang out with friends as our bartenders fulfill your every whim.",
        ],
        ar: [
          "بهالة معاصرة وأفضل أنواع المشروبات، بار رايد المكان المثالي. جرّبه لتصدق أجواءه النابضة والراقية. اجلس واستمتع بينما يأخذك الحياة في رحلة. مكان للاسترخاء مع اختيار فاخر من حول العالم، لصفقات العمل أو الأصدقاء—سيقوم السقاة بكل ما تتمناه.",
        ],
        fr: [
          "Ambiance contemporaine et carte de spiritueux soignée : Ride Bar est l’adresse idéale. Une atmosphère vibrante, sophistiquée et pleine de vie. Détendez-vous autour des meilleures références du monde — affaires entre pros ou soirée entre amis, nos barmen exaucent vos envies.",
        ],
      },
    },
    banquet: {
      title: { en: "Banquet", ar: "القاعات", fr: "Salles de réception" },
      paragraphs: {
        en: [
          "Sunrise 1 is specifically designed to accommodate an intimate gathering of friends and family. Around 850 sq. feet, this hall is perfect for birthdays, small parties and get-togethers.",
          "Sunrise 2 can host around hundred guests and is a great venue for engagements, birthdays, family functions and even corporate meeting and team discussions. Fully equipped with latest technology and modern amenities, Sunrise 2 also boasts of a pre-function area.",
        ],
        ar: [
          "صُممت قاعة صن رايز 1 لاستقبال تجمعات أسرية ودية. بحوالي 850 قدم²، مناسبة لأعياد الميلاد والحفلات الصغيرة واللقاءات.",
          "تستوعب صن رايز 2 حوالي مائة ضيف وهي مثالية لحفلات الخطوبة وأعياد الميلاد والمناسبات العائلية وحتى الاجتماعات والفرق. مجهزة بأحدث التقنيات ومنطقة ما قبل الفعاليات.",
        ],
        fr: [
          "Sunrise 1 accueille des réunions conviviales entre amis et famille. Environ 850 pi², elle convient aux anniversaires et petites fêtes.",
          "Sunrise 2 peut accueillir une centaine d’invités : fiançailles, anniversaires, événements familiaux ou réunions d’entreprise. Technologie à jour, équipements modernes et espace pré-réception.",
        ],
      },
    },
    spa: {
      title: { en: "Viviana SPA & Salon", ar: "فيفيانا سبا وصالون", fr: "Viviana SPA & Salon" },
      paragraphs: {
        en: [
          "Rejuvenate your body with enlivening massages and treatments from Viviana. Viviana is the place to be for stress-relieving massages, body scrubs and exotic facials.",
        ],
        ar: [
          "جدّد نشاطك بجلسات تدليل وعلاجات فيفيانا. المكان الأم لتدليك يخفف التوتر، ومقشرات الجسم، وعلاجات للوجه.",
        ],
        fr: [
          "Ressourcez-vous avec les massages et soins Viviana : massages anti-stress, gommages et soins du visage d’exception.",
        ],
      },
    },
    gym: {
      title: { en: "Fitness Center", ar: "مركز لياقة", fr: "Salle de fitness" },
      paragraphs: {
        en: [
          "The state of the art gymnasium at Crossway Days Hotel, OMR-Chennai is one of the best in the city offering a complete fitness experience.",
        ],
        ar: [
          "صالة الألعاب الرياضية الحديثة في فندق كروسواي دايز أومر تشيناي من الأفضل في المدينة وتقدم تجربة لياقة متكاملة.",
        ],
        fr: [
          "La salle de sport ultramoderne du Crossway Days Hotel OMR Chennai compte parmi les meilleures de la ville pour une expérience fitness complète.",
        ],
      },
    },
  },
  gallery: {
    title: { en: "Gallery", ar: "المعرض", fr: "Galerie" },
  },
  testimonials: {
    title: { en: "What our customers say", ar: "ماذا يقول ضيوفنا", fr: "Ce que disent nos clients" },
    items: {
      en: [
        {
          name: "Jayashree V",
          quote:
            "We loved and enjoyed our stay! Ambience, food, hospitality were excellent. Special thanks to Mr. Venkatesh and Mr. Ganesh who helped us to organize our event in a successful way.",
        },
        {
          name: "Kareena Bordoloi",
          quote:
            "It was nice to visit the hotel again for the 3rd time and it was very good to stay in the hotel. As I was not well I asked the guy on reception to get me some medicine in the night time and I thank Kunal for helping in late night to get the medicines arranged for me. Being a small hotel the service quality is on the peak. Great chefs as well in the hotel.",
        },
        {
          name: "Harish Balasubramaniam",
          quote:
            "Good for a couple night stay. Rooms were clean and fresh, very courteous and responsive staff. Would highly recommend anybody for a decent place in that area. VALUE FOR MONEY.",
        },
        {
          name: "Jeyakumar Doraisamy",
          quote:
            "We enjoyed much in Crossway Days Hotel OMR-Chennai. It is really comfortable and safe to any guest. And the customer service is so good. They take care like anything. It is really a super place to stay in DAYS HOTEL CHENNAI OMR. Thanks to all staff of Crossway Days Hotel.",
        },
        {
          name: "B.R. Karthik Subramaniam",
          quote:
            "We have been to the bar and the restaurant, the service and the food are excellent. More than that, the staff's hospitality is exceptional. We want to specifically mention Mr. Venkatesh and his team. We really appreciate your kind gesture and top of the class service. Once again thanks for making our day uniquely awesome.",
        },
        {
          name: "Satyajit Dilip",
          quote:
            "The staff were very courteous and friendly. We loved the way they treated us, everyone from the receptionist to the bellboy. Food is very good, wide variety. Highly recommend to stay at this hotel, though it's far from main Chennai.",
        },
      ],
      ar: [
        {
          name: "Jayashree V",
          quote:
            "أحببنا إقامتنا! الأجواء والطعام والضيافة ممتازة. شكر خاص للسيد فينكاتيش والسيد غانيش لمساعدتهما في نجاح فعاليتنا.",
        },
        {
          name: "Kareena Bordoloi",
          quote:
            "زرت الفندق للمرة الثالثة وكان إقامة رائعة. عندما مرضت طلبت من الاستقبال أدوية ليلاً وشكراً لكunal على الترتيب رغم الوقت المتأخر. جودة الخدمة ممتازة رغم حجم الفندق. طهاة رائعون.",
        },
        {
          name: "Harish Balasubramaniam",
          quote:
            "مناسب لإقامة ليلتين. الغرف نظيفة والطاقم متعاون. أنصح به بشدة في المنطقة. قيمة ممتازة مقابل السعر.",
        },
        {
          name: "Jeyakumar Doraisamy",
          quote:
            "استمتعنا بإقامتنا في كروسواي دايز أومر. مريح وآمن والخدمة ممتازة. شكراً لجميع الموظفين.",
        },
        {
          name: "B.R. Karthik Subramaniam",
          quote:
            "زُرنا البار والمطعم—الخدمة والطعام ممتازان والضيافة استثنائية. شكراً للسيد فينكاتيش وفريقه على الاهتمام الرفيع.",
        },
        {
          name: "Satyajit Dilip",
          quote:
            "الطاقم ودود ومهذب. الطعام جيد وتنوع واسع. أنصح بالإقامة رغم البعد عن وسط تشيناي.",
        },
      ],
      fr: [
        {
          name: "Jayashree V",
          quote:
            "Nous avons adoré notre séjour ! Ambiance, cuisine et accueil excellents. Merci à M. Venkatesh et M. Ganesh pour l’organisation de notre événement.",
        },
        {
          name: "Kareena Bordoloi",
          quote:
            "Troisième visite et toujours aussi satisfaisante. Un soir, malade, j’ai demandé des médicaments à la réception : merci à Kunal pour sa réactivité tard dans la nuit. Service au top pour un hôtel de cette taille. Excellents chefs.",
        },
        {
          name: "Harish Balasubramaniam",
          quote:
            "Parfait pour un court séjour. Chambres propres, équipe attentive. Je recommande vivement dans ce quartier. Excellent rapport qualité-prix.",
        },
        {
          name: "Jeyakumar Doraisamy",
          quote:
            "Séjour très agréable au Crossway Days OMR : confort, sécurité et service client remarquable. Merci à toute l’équipe.",
        },
        {
          name: "B.R. Karthik Subramaniam",
          quote:
            "Bar et restaurant au top, service et cuisine excellents. Hospitalité exceptionnelle — merci à M. Venkatesh et son équipe pour ce moment unique.",
        },
        {
          name: "Satyajit Dilip",
          quote:
            "Personnel courtois du réceptionniste au groom. Cuisine variée et savoureuse. Je recommande, même si l’hôtel est éloigné du centre de Chennai.",
        },
      ],
    },
  },
  nearby: {
    title: { en: "Nearby", ar: "بالقرب منك", fr: "À proximité" },
    subtitle: {
      en: "Approximate road distances — our front desk can suggest the best routes and timing.",
      ar: "مسافات تقريبية على الطريق — يمكن لموظفي الاستقبال اقتراح أفضل المسارات والتوقيت.",
      fr: "Distances routières indicatives — la réception peut vous conseiller itinéraires et horaires.",
    },
    landmarksHeading: {
      en: "Landmarks & distance",
      ar: "معالم ومسافة تقريبية",
      fr: "Sites et distances indicatives",
    },
    essentials: {
      en: [
        { label: "Airports", detail: "Nearest airport — Chennai", distance: "28 km" },
        { label: "Railway station", detail: "Nearest — Tambaram, Chennai", distance: "28 km" },
        { label: "Hospital or clinic", detail: "Nearest — Chettinad Health City", distance: "2 km" },
      ],
      ar: [
        { label: "المطارات", detail: "أقرب مطار — تشيناي", distance: "28 كم" },
        { label: "محطة القطار", detail: "أقرب — تامبارام، تشيناي", distance: "28 كم" },
        { label: "مستشفى أو عيادة", detail: "أقرب — شيتيناد هيلث سيتي", distance: "2 كم" },
      ],
      fr: [
        { label: "Aéroports", detail: "Aéroport le plus proche — Chennai", distance: "28 km" },
        { label: "Gare ferroviaire", detail: "La plus proche — Tambaram, Chennai", distance: "28 km" },
        { label: "Hôpital ou clinique", detail: "Le plus proche — Chettinad Health City", distance: "2 km" },
      ],
    },
    landmarks: {
      en: [
        { name: "DakshinaChitra Museum", distance: "15 km" },
        { name: "Kovalam Beach", distance: "06 km" },
        { name: "Mamallapuram", distance: "25 km" },
        { name: "VGP Snow Kingdom", distance: "23 km" },
        { name: "Phoenix Mall", distance: "27 km" },
      ],
      ar: [
        { name: "متحف داكشيناشيترا", distance: "15 كم" },
        { name: "شاطئ كوفالام", distance: "06 كم" },
        { name: "مامالابورام", distance: "25 كم" },
        { name: "في جي بي سنو كينغدوم", distance: "23 كم" },
        { name: "فينيكس مول", distance: "27 كم" },
      ],
      fr: [
        { name: "Musée DakshinaChitra", distance: "15 km" },
        { name: "Plage de Kovalam", distance: "06 km" },
        { name: "Mamallapuram", distance: "25 km" },
        { name: "VGP Snow Kingdom", distance: "23 km" },
        { name: "Phoenix Mall", distance: "27 km" },
      ],
    },
  },
  contact: {
    title: { en: "Write to Us", ar: "راسلنا", fr: "Écrivez-nous" },
    name: { en: "Name", ar: "الاسم", fr: "Nom" },
    email: { en: "Email", ar: "البريد", fr: "E-mail" },
    message: { en: "Message", ar: "الرسالة", fr: "Message" },
    submit: { en: "Send message", ar: "إرسال", fr: "Envoyer" },
    sending: { en: "Sending…", ar: "جارٍ الإرسال…", fr: "Envoi…" },
    success: {
      en: "Thank you — your message has been received.",
      ar: "شكراً — تم استلام رسالتك.",
      fr: "Merci — votre message a bien été reçu.",
    },
    error: {
      en: "Something went wrong. Please try again or email contact@crosswayhotels.com",
      ar: "حدث خطأ. حاول مرة أخرى أو راسل contact@crosswayhotels.com",
      fr: "Une erreur s’est produite. Réessayez ou écrivez à contact@crosswayhotels.com",
    },
    mapTitle: { en: "Maps & directions", ar: "الخريطة والاتجاهات", fr: "Plan et itinéraire" },
  },
};

const DaysExperienceMeta = {
  breadcrumbHome: { en: "Home", ar: "الرئيسية", fr: "Accueil" },
  breadcrumbExperiences: { en: "Experiences", ar: "التجارب", fr: "Expériences" },
  readMore: { en: "Explore full story", ar: "اكتشف القصة كاملة", fr: "Découvrir en détail" },
  back: { en: "Back to experiences", ar: "العودة للتجارب", fr: "Retour aux expériences" },
  heroEyebrow: { en: "Crossway Days Hotel · OMR Chennai", ar: "فندق كروسواي دايز · أومر تشيناي", fr: "Crossway Days Hotel · OMR Chennai" },
  galleryHeading: { en: "Gallery", ar: "معرض الصور", fr: "Galerie" },
};

for (const locale of ["en", "ar", "fr"]) {
  const messages = {
    LocaleSwitcher: localeSwitcherByLocale[locale],
    DaysNav: pickLocale(base.DaysNav, locale),
    DaysFooter: pickLocale(base.DaysFooter, locale),
    DaysBooking: pickLocale(base.DaysBooking, locale),
    DaysHome: pickLocale(DaysHome, locale),
    DaysExperience: pickLocale(DaysExperienceMeta, locale),
  };
  const p = path.join(root, "src", "messages", `${locale}.json`);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(messages, null, 2));
}

console.log("Wrote src/messages/en.json, ar.json, fr.json");
