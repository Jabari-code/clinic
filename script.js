const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const languageToggle = document.querySelector(".language-toggle");
const originalAriaLabels = new Map(
  [...document.querySelectorAll("[aria-label]")].map((element) => [element, element.getAttribute("aria-label")])
);
const originalImageAlts = new Map(
  [...document.querySelectorAll(".hero-photo img, .about-visual img")].map((image) => [image, image.alt])
);
const originalPlaceholders = new Map(
  [...document.querySelectorAll(".booking-form [placeholder]")].map((field) => [field, field.placeholder])
);
const originalTitles = new Map(
  [...document.querySelectorAll("[title]")].map((element) => [element, element.title])
);
const bookingForm = document.querySelector("#booking-form");
const bookingDate = bookingForm?.elements.namedItem("preferredDate");
const bookingStatus = document.querySelector("#booking-status");
const bookingMessageLinks = document.querySelector("#booking-message-links");
const telegramBookingLink = document.querySelector("#telegram-booking-link");
const whatsappBookingLink = document.querySelector("#whatsapp-booking-link");
let bookingLinksReady = false;

const amharicTranslations = {
  "Skip to content": "ወደ ዋናው ይዘት ይሂዱ",
  "KIDS CLINIC": "የህጻናት ክሊኒክ",
  "Photos by Pexels": "ፎቶዎች ከPexels",
  "Our care": "የእኛ እንክብካቤ",
  "Home": "መነሻ",
  "About us": "ስለ እኛ",
  "Kind words": "የቤተሰቦች አስተያየት",
  "Find us": "አድራሻችን",
  "Book a visit": "ቀጠሮ ይያዙ",
  "LITTLE CARE. BIG GROWTH.": "ትንሽ እንክብካቤ፣ ትልቅ እድገት።",
  "Big smiles start with": "ትልቅ ፈገግታ የሚጀምረው በ",
  "little care.": "ትንሽ እንክብካቤ ነው።",
  "A kinder kind of kids’ clinic. We make every visit feel a little less “doctor” and a lot more “you’ve got this.”": "ለልጆች የተለየ ደግ ክሊኒክ። እያንዳንዱ ጉብኝት ከሐኪም ቤት ይልቅ ልጆች የሚችሉትን የሚያምኑበት ቦታ እንዲሆን እናደርጋለን።",
  "Let’s meet": "እንተዋወቅ",
  "Explore our care": "እንክብካቤያችንን ይመልከቱ",
  "A favorite with families": "በቤተሰቦች የተወደደ",
  "4.9 from 280+ happy parents": "ከ280 በላይ ወላጆች 4.9 ደረጃ ሰጥተውታል",
  "Care that feels good": "ደስ የሚል እንክብካቤ",
  "For every little milestone": "ለእያንዳንዱ ትንሽ የእድገት ደረጃ",
  "Hi, friend!": "ሰላም፣ ጓደኛዬ!",
  "A happy young girl smiling outdoors": "ከቤት ውጭ ፈገግ የምትል ደስተኛ ልጅ",
  "A smiling child enjoying a colorful day outdoors": "በቀለማት የተሞላ ቀን ከቤት ውጭ እየተደሰተ ያለ ፈገግ የሚል ልጅ",
  "A young boy smiling in the sunshine": "በፀሐይ ብርሃን ፈገግ የሚል ወጣት ልጅ",
  "Smiling pediatric doctor in a clinic": "በክሊኒክ ውስጥ ፈገግ የሚል የህጻናት ሐኪም",
  "HERE FOR EVERY LITTLE THING": "ለእያንዳንዱ ትንሽ ነገር እዚህ ነን",
  "Scroll to explore": "ለማየት ወደ ታች ይሸብልሉ",
  "Gentle by nature": "በተፈጥሮው ረጋ ያለ",
  "Care that meets them where they are": "ልጆችን እንዳሉ የሚቀበል እንክብካቤ",
  "Little experts": "የልጆች ልዩ ባለሙያዎች",
  "Pediatric care, all under one roof": "ሁሉም የህጻናት እንክብካቤ በአንድ ቦታ",
  "Big on convenience": "ምቾትዎን እናስቀድማለን",
  "Easy visits that fit your busy day": "ከቀን መርሃ ግብርዎ ጋር የሚስማሙ ቀላል ቀጠሮዎች",
  "HOW WE HELP": "እንዴት እንደምንረዳ",
  "Growing up is a big job.": "ማደግ ትልቅ ጉዞ ነው።",
  "We’re here for it.": "እኛም ከጎንዎ ነን።",
  "From first checkups to big-kid questions, we make sure your child has the care and confidence to keep growing.": "ከመጀመሪያው ምርመራ እስከ ትልልቅ ልጆች ጥያቄዎች፣ ልጅዎ ማደጉን እንዲቀጥል እንክብካቤና መተማመን እንሰጣለን።",
  "Everyday wellness": "የዕለት ተዕለት ጤና",
  "Well visits, growth checks, and all the little questions in between.": "የጤና ምርመራ፣ የእድገት ክትትል እና በመካከላቸው ያሉ ሁሉም ትንንሽ ጥያቄዎች።",
  "Explore care": "እንክብካቤውን ይመልከቱ",
  "Growing & learning": "ማደግና መማር",
  "Developmental support that celebrates every kind of progress.": "እያንዳንዱን እድገት የሚያከብር የእድገት ድጋፍ።",
  "When they’re under the weather": "ልጅዎ ሲታመም",
  "Same-day sick visits with comfort and reassurance built in.": "በዚያው ቀን የሚደረግ ምርመራ፣ በምቾትና በማረጋጋት።",
  "Not sure what you need?": "ምን እንደሚያስፈልግዎ አላወቁም?",
  "We’ll help you figure it out.": "አብረን እንፈልገዋለን።",
  "NICE TO MEET YOU": "ስለተዋወቅን ደስ ብሎናል",
  "ABOUT LITTLE SPROUT": "ስለ LITTLE SPROUT",
  "A clinic for little people.": "ለትንንሽ ልጆች የተዘጋጀ ክሊኒክ።",
  "And the people who love them.": "እንዲሁም ለሚወዷቸው ሰዎች።",
  "Little Sprout is a neighborhood pediatric clinic built around a simple idea: children deserve care that feels safe, kind, and made for them. We take time to listen, explain each step in kid-friendly ways, and partner with parents so every family feels welcome and supported.": "Little Sprout በቀላል እሳቤ የተመሰረተ የአካባቢ የህጻናት ክሊኒክ ነው፦ ልጆች ደህንነት የሚሰማቸው፣ ደግና ለእነሱ የተዘጋጀ እንክብካቤ ይገባቸዋል። ለማዳመጥና እያንዳንዱን እርምጃ ለልጆች በሚመች መንገድ ለማብራራት ጊዜ እንወስዳለን፤ እያንዳንዱ ቤተሰብ እንደተቀበለና እንደተደገፈ እንዲሰማውም ከወላጆች ጋር አብረን እንሰራለን።",
  "We see the kid.": "ልጁን እናያለን።",
  "Not just the chart.": "የህክምና መዝገቡን ብቻ አይደለም።",
  "We started Little Sprout with one big belief: great care begins when kids feel safe enough to be themselves. So we listen first, explain everything, and leave plenty of room for questions (and the occasional silly joke).": "Little Sproutን የጀመርነው በአንድ ትልቅ እምነት ነው፦ ልጆች ራሳቸውን መሆን የሚችሉበት ደህንነት ሲሰማቸው ጥሩ እንክብካቤ ይጀምራል። ስለዚህ መጀመሪያ እናዳምጣለን፣ ሁሉንም እናብራራለን፣ ለጥያቄዎችም ብዙ ቦታ እንሰጣለን።",
  "On their team": "ከልጆች ጎን",
  "Little voices always get heard.": "የልጆች ድምጽ ሁልጊዜ ይሰማል።",
  "In your corner": "ከእርስዎ ጎን",
  "Parents are part of the care team.": "ወላጆችም የእንክብካቤ ቡድኑ አካል ናቸው።",
  "Meet your care team": "የእንክብካቤ ቡድንዎን ያግኙ",
  "YOUR FIRST VISIT": "የመጀመሪያ ጉብኝትዎ",
  "New places can feel big.": "አዲስ ቦታ ትልቅ ሊመስል ይችላል።",
  "We make ours feel small.": "የእኛን ግን ምቹ እናደርገዋለን።",
  "From the first hello to the high-five on your way out, we make every step simple, calm, and full of care.": "ከመጀመሪያው ሰላምታ እስከ ሲወጡ የሚደረገው የእጅ ምት፣ እያንዳንዱን እርምጃ ቀላል፣ ረጋ ያለና በእንክብካቤ የተሞላ እናደርገዋለን።",
  "Pick a time": "ሰዓት ይምረጡ",
  "Book online in just a few clicks.": "በጥቂት ጠቅታዎች በመስመር ላይ ቀጠሮ ይያዙ።",
  "Come as you are": "እንዳሉ ይምጡ",
  "We’ll take it from here, together.": "ከዚህ በኋላ አብረን እንቀጥላለን።",
  "Leave feeling good": "በደስታ ይመለሱ",
  "Clear answers and a happy high-five.": "ግልጽ መልሶችና ደስ የሚል የእጅ ምት።",
  "THE LITTLE SPROUT DIFFERENCE": "የLITTLE SPROUT ልዩነት",
  "Good care.": "ጥሩ እንክብካቤ።",
  "Good feels.": "ጥሩ ስሜት።",
  "Thoughtful, expert care in a space made for little people and the people who love them.": "ለልጆችና ለሚወዷቸው ሰዎች በተዘጋጀ ቦታ የታሰበና ባለሙያዊ እንክብካቤ።",
  "parent-rated care": "በወላጆች የተሰጠ ደረጃ",
  "average wait time": "አማካይ የመጠበቂያ ጊዜ",
  "min": "ደቂቃ",
  "Little visits. Lasting trust.": "አጭር ጉብኝት። ዘላቂ እምነት።",
  "WORDS FROM OUR FAMILIES": "ከቤተሰቦቻችን የተሰጡ አስተያየቶች",
  "Little visits.": "አጭር ጉብኝት።",
  "Big happy feels.": "ትልቅ ደስታ።",
  "“Our daughter used to be nervous about every appointment. Now she asks when she gets to see Dr. Maya again. That says it all.”": "“ልጃችን ቀጠሮ በሁሉም ጊዜ ትጨነቅ ነበር። አሁን ዶ/ር ማያን መቼ እንደምታይ ትጠይቃለች። ይህ ሁሉንም ይናገራል።”",
  "Parent of a very happy 5-year-old": "የደስተኛ የ5 ዓመት ልጅ ወላጅ",
  "“They made space for all of our questions and never made us feel rushed. It felt like having a friend who’s also an incredible doctor.”": "“ለጥያቄዎቻችን ጊዜ ሰጡን፣ እንድንቸኩልም አላደረጉንም። በጣም ጥሩ ሐኪም የሆነ ጓደኛ እንዳለን ተሰማን።”",
  "Parent of two little sprouts": "የሁለት ትንንሽ ልጆች ወላጅ",
  "“The whole team is just lovely. From the cheerful front desk to the gentle checkup, my son felt like the star of the show.”": "“ቡድኑ በሙሉ ድንቅ ነው። ከደስተኛው የመቀበያ ሰራተኛ እስከ ረጋ ያለው ምርመራ፣ ልጄ ልዩ እንደሆነ ተሰማው።”",
  "Parent of a growing 3-year-old": "የሚያድግ የ3 ዓመት ልጅ ወላጅ",
  "YOUR NEXT LITTLE STEP": "ቀጣዩ ትንሽ እርምጃዎ",
  "Let’s help them": "እንዲያድጉ እንርዳቸው",
  "grow happy.": "በደስታ።",
  "We can’t wait to meet your family. Your first visit is just a hello away.": "ቤተሰብዎን ለማግኘት ጓጉተናል። የመጀመሪያ ጉብኝትዎ አንድ ሰላምታ ብቻ ይርቃል።",
  "Tell us a little about the visit you need. Our team will follow up to find a time that works for your family.": "ስለሚፈልጉት ቀጠሮ ጥቂት ይንገሩን። ለቤተሰብዎ የሚስማማ ሰዓት ለማግኘት ቡድናችን ያነጋግርዎታል።",
  "A real person will get back to you.": "የቡድናችን አባል በቀጥታ ያነጋግርዎታል።",
  "Your request is not confirmed until our team contacts you.": "ቡድናችን እስኪያነጋግርዎት ድረስ ቀጠሮው አልተረጋገጠም።",
  "Prefer to talk?": "በስልክ ማውራት ይመርጣሉ?",
  "Request an appointment": "ቀጠሮ ይጠይቁ",
  "Share your preferred visit details below.": "የሚመርጡትን የቀጠሮ ዝርዝር ከታች ያስገቡ።",
  "Email address (optional)": "የኢሜይል አድራሻ (አማራጭ)",
  "Parent or guardian name": "የወላጅ ወይም የአሳዳጊ ስም",
  "Phone number": "ስልክ ቁጥር",
  "Type of visit": "የቀጠሮ አይነት",
  "Preferred date": "የሚመርጡት ቀን",
  "Preferred time": "የሚመርጡት ሰዓት",
  "Anything else we should know?": "ሌላ ማወቅ ያለብን ነገር አለ?",
  "Send appointment request": "የቀጠሮ ጥያቄ ይላኩ",
  "Telegram — send to @jabaone": "በTelegram ወደ @jabaone ይላኩ",
  "WhatsApp": "WhatsApp",
  "Your request is ready. Choose Telegram or WhatsApp to review and send it. Your appointment is not confirmed until our team contacts you.": "ጥያቄዎ ዝግጁ ነው። በTelegram ወይም WhatsApp ከፍተው ይመልከቱና ይላኩ። ቡድናችን እስኪያነጋግርዎት ድረስ ቀጠሮው አልተረጋገጠም።",
  "Follow us": "ይከተሉን",
  "Please don’t include sensitive medical information in this request.": "እባክዎ በዚህ ጥያቄ ውስጥ የግል የጤና መረጃ አያካትቱ።",
  "COME SAY HELLO": "ሰላም ለማለት ይምጡ",
  "Little Sprout Kids Clinic": "Little Sprout የህጻናት ክሊኒክ",
  "Brooklyn, New York": "ብሩክሊን፣ ኒው ዮርክ",
  "Little Sprout is": "Little Sprout ይገኛል",
  "right around the corner.": "በአቅራቢያዎ።",
  "Find our clinic in Brooklyn. We’re looking forward to welcoming your family.": "ክሊኒካችንን ብሩክሊን ውስጥ ያግኙ። ቤተሰብዎን ለመቀበል ጓጉተናል።",
  "123 Sunshine Street": "123 ሰንሻይን ጎዳና",
  "Brooklyn, NY 11201": "ብሩክሊን፣ NY 11201",
  "Get directions": "መንገዱን ይመልከቱ",
  "Clinic hours": "የክሊኒኩ የስራ ሰዓት",
  "Select a visit": "የቀጠሮ አይነት ይምረጡ",
  "Wellness checkup": "የጤና ምርመራ",
  "Sick visit": "የህመም ምርመራ",
  "Growth and development": "እድገትና ልማት",
  "Other / not sure": "ሌላ / እርግጠኛ አይደለሁም",
  "Any time": "ማንኛውም ሰዓት",
  "Morning": "ጠዋት",
  "Afternoon": "ከሰዓት በኋላ",
  "Your name": "ስምዎ",
  "Optional — please don't include private medical details.": "አማራጭ — እባክዎ የግል የጤና ዝርዝር አያካትቱ።",
  "Care that helps little people feel big.": "ትንንሽ ልጆች ትልቅ እንዲሰማቸው የሚረዳ እንክብካቤ።",
  "Come say hi": "ሰላም ለማለት ይምጡ",
  "Mon–Fri · 8am–6pm": "ሰኞ–ዓርብ · ከጠዋቱ 2–12",
  "Saturday · 9am–1pm": "ቅዳሜ · ከጠዋቱ 3–7",
  "Sunday · Taking a little rest": "እሁድ · የእረፍት ቀን",
  "Find your way": "ይዘው ይቀጥሉ",
  "Growing together.": "አብረን እያደግን።",
  "Made with": "በፍቅር የተሰራ",
  "for little people.": "ለትንንሽ ልጆች።",
  "A little": "ትንሽ",
  "more": "ተጨማሪ",
  "human": "ሰው",
  "© 2025 Little Sprout Kids Clinic. Growing together.": "© 2025 Little Sprout የህጻናት ክሊኒክ። አብረን እያደግን።"
};

const originalTextNodes = [];
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (textWalker.nextNode()) {
  const node = textWalker.currentNode;
  if (node.nodeValue.trim()) originalTextNodes.push({ node, value: node.nodeValue });
}

function menuLabel(isOpen, isAmharic) {
  if (isAmharic) return isOpen ? "ምናሌውን ይዝጉ" : "ምናሌውን ይክፈቱ";
  return isOpen ? "Close menu" : "Open menu";
}

function setLanguage(language) {
  const isAmharic = language === "am";
  originalTextNodes.forEach(({ node, value }) => {
    const content = value.trim();
    const translation = amharicTranslations[content];
    if (!translation) return;
    const leadingWhitespace = value.match(/^\s*/)[0];
    const trailingWhitespace = value.match(/\s*$/)[0];
    node.nodeValue = `${leadingWhitespace}${isAmharic ? translation : content}${trailingWhitespace}`;
  });
  originalImageAlts.forEach((value, image) => {
    image.alt = isAmharic ? amharicTranslations[value] : value;
  });
  const translatedPlaceholders = {
    "Your name": "ስምዎ",
    "you@example.com": "you@example.com",
    "(555) 123-4567": "(555) 123-4567",
    "Optional — please don't include private medical details.": "አማራጭ — እባክዎ የግል የጤና ዝርዝር አያካትቱ።"
  };
  originalPlaceholders.forEach((value, field) => {
    field.placeholder = isAmharic ? translatedPlaceholders[value] || value : value;
  });
  originalTitles.forEach((value, element) => {
    element.title = isAmharic && value === "Change language to Amharic"
      ? "ቋንቋውን ወደ እንግሊዝኛ ይቀይሩ"
      : value;
  });

  document.documentElement.lang = isAmharic ? "am" : "en";
  document.title = isAmharic
    ? "Little Sprout የህጻናት ክሊኒክ | በእንክብካቤ አብረን እናድግ"
    : "Little Sprout Kids Clinic | Care that helps them grow";
  document.querySelector('meta[name="description"]').content = isAmharic
    ? "ለእያንዳንዱ ትንሽ የእድገት ደረጃ ደግና ባለሙያዊ የህጻናት ህክምና። Little Sproutን ይተዋወቁ።"
    : "Bright, gentle pediatric care for every little milestone. Meet the friendly team at Little Sprout Kids Clinic.";
  languageToggle.textContent = isAmharic ? "EN" : "አማ";
  languageToggle.setAttribute("aria-label", isAmharic ? "Change language to English" : "Change language to Amharic");
  languageToggle.title = isAmharic ? "Change language to English" : "Change language to Amharic";
  if (bookingLinksReady) {
    bookingStatus.textContent = isAmharic
      ? amharicTranslations["Your request is ready. Choose Telegram or WhatsApp to review and send it. Your appointment is not confirmed until our team contacts you."]
      : "Your request is ready. Choose Telegram or WhatsApp to review and send it. Your appointment is not confirmed until our team contacts you.";
  }

  originalAriaLabels.forEach((label, element) => {
    const translatedLabels = {
      "Little Sprout Kids Clinic home": "የLittle Sprout የህጻናት ክሊኒክ መነሻ",
      "Open menu": menuLabel(false, true),
      "Close menu": menuLabel(true, true),
      "Photo of a smiling child outdoors": "ከቤት ውጭ ፈገግ የሚል ልጅ ፎቶ",
      "Map showing Little Sprout Kids Clinic in Brooklyn": "ብሩክሊን ውስጥ የሚገኘውን Little Sprout የህጻናት ክሊኒክ የሚያሳይ ካርታ",
      "Telegram @jabaone": "Telegram @jabaone",
      "TikTok @jab0110": "TikTok @jab0110",
      "Instagram @fuad": "Instagram @fuad",
      "WhatsApp +251 900 368 205": "WhatsApp +251 900 368 205",
      "Book everyday wellness care": "የዕለት ተዕለት የጤና እንክብካቤ ይያዙ",
      "Book developmental support": "የእድገት ድጋፍ ይያዙ",
      "Book a sick visit": "የህመም ምርመራ ይያዙ",
      "Previous review": "ያለፈው አስተያየት",
      "Next review": "ቀጣዩ አስተያየት",
      "Review pages": "የአስተያየት ገጾች",
      "Show review 1": "አስተያየት 1ን አሳይ",
      "Show review 2": "አስተያየት 2ን አሳይ",
      "Show review 3": "አስተያየት 3ን አሳይ"
    };
    if (translatedLabels[label]) element.setAttribute("aria-label", isAmharic ? translatedLabels[label] : label);
  });
}

const languagePreferenceKey = "little-sprout-language";
const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
const detectedLanguage = browserLanguages.some((language) => language.toLowerCase().startsWith("am")) ? "am" : "en";
const savedLanguage = localStorage.getItem(languagePreferenceKey);
setLanguage(savedLanguage === "am" || savedLanguage === "en" ? savedLanguage : detectedLanguage);

languageToggle?.addEventListener("click", () => {
  const language = document.documentElement.lang === "am" ? "en" : "am";
  localStorage.setItem(languagePreferenceKey, language);
  setLanguage(language);
  closeMenu();
});

if (bookingDate instanceof HTMLInputElement) {
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  bookingDate.min = localDate;
}

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;

  const fields = new FormData(bookingForm);
  const details = [
    ["Appointment request", "Little Sprout Kids Clinic"],
    ["Parent/guardian", fields.get("guardianName")],
    ["Email", fields.get("email")],
    ["Phone", fields.get("phone")],
    ["Visit type", fields.get("visitType")],
    ["Preferred date", fields.get("preferredDate")],
    ["Preferred time", fields.get("preferredTime")],
    ["Additional note", fields.get("message")]
  ].filter(([, value]) => String(value || "").trim());
  const body = details.map(([label, value]) => `${label}: ${String(value).trim()}`).join("\n");
  const telegramQuery = new URLSearchParams({ text: body });
  const whatsappQuery = new URLSearchParams({ text: body });

  telegramBookingLink.href = `https://t.me/jabarbari?${telegramQuery}`;
  whatsappBookingLink.href = `https://wa.me/251900368205?${whatsappQuery}`;
  bookingMessageLinks.hidden = false;
  bookingLinksReady = true;
  bookingStatus.textContent = document.documentElement.lang === "am"
    ? amharicTranslations["Your request is ready. Choose Telegram or WhatsApp to review and send it. Your appointment is not confirmed until our team contacts you."]
    : "Your request is ready. Choose Telegram or WhatsApp to review and send it. Your appointment is not confirmed until our team contacts you.";
  telegramBookingLink.focus();
});

bookingForm?.addEventListener("input", () => {
  if (!bookingLinksReady) return;
  bookingLinksReady = false;
  bookingMessageLinks.hidden = true;
  bookingStatus.textContent = "";
});

function closeMenu() {
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", menuLabel(false, document.documentElement.lang === "am"));
  siteNav?.classList.remove("is-open");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", menuLabel(!isOpen, document.documentElement.lang === "am"));
  siteNav?.classList.toggle("is-open", !isOpen);
});

siteNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const reviewTrack = document.querySelector(".review-track");
const reviewWindow = document.querySelector(".review-window");
const reviewCards = [...document.querySelectorAll(".review-card")];
const reviewDots = [...document.querySelectorAll(".review-dots button")];
const reviewArrows = document.querySelectorAll(".review-arrow");
let activeReview = 0;

function updateReviewDots() {
  reviewDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === activeReview);
    dot.setAttribute("aria-current", dotIndex === activeReview ? "true" : "false");
  });
}

function showReview(index) {
  activeReview = (index + reviewCards.length) % reviewCards.length;
  if (window.matchMedia("(max-width: 680px)").matches) {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    reviewWindow.scrollTo({ left: activeReview * reviewWindow.clientWidth, behavior });
  } else if (window.matchMedia("(max-width: 760px)").matches) {
    reviewTrack.style.transform = `translateX(-${activeReview * 100}%)`;
  } else {
    reviewTrack.style.transform = "";
  }
  updateReviewDots();
}

reviewWindow.addEventListener("scroll", () => {
  if (!window.matchMedia("(max-width: 680px)").matches) return;
  const nextReview = Math.round(reviewWindow.scrollLeft / reviewWindow.clientWidth);
  if (nextReview === activeReview) return;
  activeReview = nextReview;
  updateReviewDots();
}, { passive: true });

reviewArrows.forEach((arrow) => {
  arrow.addEventListener("click", () => {
    showReview(activeReview + Number(arrow.dataset.direction));
  });
});

reviewDots.forEach((dot, index) => {
  dot.addEventListener("click", () => showReview(index));
});

window.addEventListener("resize", () => showReview(activeReview));
showReview(0);