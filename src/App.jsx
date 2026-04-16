import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// ── Supabase client ──────────────────────────────────────────
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const FREE_LIMIT = 3; // free uses per month

// ── Translations (7 languages) ───────────────────────────────
const T = {
  en: {
    dir:"ltr",flag:"🇬🇧",name:"English",
    nav_home:"Home",nav_vp:"ValueProof",nav_bg:"BoundaryGuard",
    sign_in:"Sign In",sign_up:"Sign Up",sign_out:"Sign Out",
    email:"Email",password:"Password",
    have_account:"Already have an account?",no_account:"Don't have an account?",
    login_title:"Welcome Back",signup_title:"Create Account",
    login_sub:"Sign in to use FreelanceShield",signup_sub:"Join thousands of protected freelancers",
    upgrade:"Upgrade to Pro",pro_badge:"PRO",free_badge:"FREE",
    upgrade_title:"Free Limit Reached",
    upgrade_desc:"You've used your 3 free credits this month. Upgrade to Pro for unlimited access.",
    upgrade_feature1:"Unlimited ValueProof generations",
    upgrade_feature2:"Unlimited BoundaryGuard checks",
    upgrade_feature3:"All 7 languages supported",
    upgrade_feature4:"Priority support",
    pro_price:"$7 / month",pro_cta:"Get Pro Now",cancel_anytime:"Cancel anytime · No contracts",
    free_left:"free uses left",
    hero_tag:"The Freelancer's Shield",
    hero_h1a:"Protect Your Work.",hero_h1b:"Prove Your Worth.",
    hero_p:"Two AI tools built for freelancers — stop scope creep before it costs you, and show clients your real value with confidence.",
    hero_cta1:"Try ValueProof",hero_cta2:"Try BoundaryGuard",
    s1n:"73%",s1l:"of freelancers face scope creep every project",
    s2n:"$12K",s2l:"lost per freelancer annually to unpaid extra work",
    s3n:"68%",s3l:"of clients underpay because they don't see full value",
    fvt:"ValueProof",fvi:"💎",
    fvd:"Turn your completed work into a compelling value story. Show clients the exact ROI you created — in numbers, in their language.",
    fvb:"Open ValueProof →",
    fbt:"BoundaryGuard",fbi:"🛡️",
    fbd:"Paste your contract and client's new request. Get an instant scope creep verdict plus a professional reply ready to send.",
    fbb:"Open BoundaryGuard →",
    hiw:"Built for Real Freelancer Problems",
    h1t:"Scope Creep Kills Profits",h1b:"Every freelancer knows it: the client keeps adding 'small' requests after the project starts. BoundaryGuard detects this instantly.",
    h2t:"Your Value Gets Underestimated",h2b:"Clients see hours, not outcomes. ValueProof flips this — it converts your work into business results clients actually care about.",
    h3t:"One Platform, Total Protection",h3b:"Use both tools together: guard your time with BoundaryGuard, then justify your rate with ValueProof.",
    vp_title:"ValueProof",vp_sub:"Turn your work into a client value story that justifies any rate.",
    vp_ht:"How to Use ValueProof",
    vs1t:"Describe Your Work",vs1b:"What did you build or deliver? Be specific — features, quality, effort. More detail = stronger output.",
    vs2t:"List Key Features",vs2b:"Loading speed, design quality, integrations, mobile responsiveness, automations — what makes your work excellent.",
    vs3t:"State the Business Impact",vs3b:"Think like your client: more sales, saved time, reduced costs, better brand, stronger customer experience.",
    vb_t:"Why ValueProof Works For You",
    vb1t:"Justify Higher Rates",vb1b:"When clients see real business impact, hourly rates become irrelevant. Shift from 'how long?' to 'what value?'",
    vb2t:"Win More Clients",vb2b:"Use value statements in proposals and portfolios to convert more leads by speaking business language.",
    vb3t:"Handle Price Objections",vb3b:"When a client says 'you're too expensive', share your ValueProof. The conversation shifts from cost to ROI.",
    vb4t:"Build Lasting Credibility",vb4b:"A professional value statement shows you think like a business partner, not just a vendor.",
    vl1:"What work did you complete?",vp1:"e.g. Built a complete e-commerce website with payment gateway, order tracking, and mobile-responsive layout for a clothing brand...",
    vl2:"Key features & quality highlights?",vp2:"e.g. Sub-2-second loading, SEO-optimized structure, WhatsApp integration, admin dashboard with analytics...",
    vl3:"Expected impact on client's business?",vp3:"e.g. 24/7 online sales, expected 30-40% order increase, 50% fewer support calls, professional brand image...",
    vbtn:"Generate Value Statement",vload:"Crafting your value statement...",
    vrt:"Your Value Statement",vcopy:"Copy Statement",
    bg_title:"BoundaryGuard",bg_sub:"Never do unpaid work again. Know your limits the moment they're crossed.",
    bg_ht:"How to Use BoundaryGuard",
    bs1t:"Paste Your Contract Scope",bs1b:"Copy the agreed scope from your proposal or initial project message. Even bullet points or a WhatsApp text works.",
    bs2t:"Add the Client's New Request",bs2b:"Paste exactly what the client just asked. Don't rephrase it — the tool needs original wording for accurate analysis.",
    bs3t:"Get Your Instant Verdict",bs3b:"See if it's in scope, out of scope, or borderline — with a polished client reply ready to copy and send.",
    bb_t:"Why BoundaryGuard Changes Everything",
    bb1t:"Stop Losing Money",bb1b:"The average freelancer loses $12K/year to scope creep. BoundaryGuard catches every overreach before you commit.",
    bb2t:"Professional Replies Every Time",bb2b:"No more awkward conversations. Get a polished, client-friendly message instantly.",
    bb3t:"Protect Client Relationships",bb3b:"Replies are always respectful and warm. Protect your time without damaging the relationship.",
    bb4t:"Build an Evidence Record",bb4b:"Screenshot each verdict. If a client disputes the scope later, you have AI-analyzed evidence.",
    bl1:"Original Contract / Scope of Work",bp1:"Paste your agreed project scope. Example:\n• Design a 5-page website (Home, About, Services, Portfolio, Contact)\n• 2 revision rounds included\n• Delivery in 14 working days\n• Mobile-responsive\n• No e-commerce or booking features",
    bl2:"Client's New Request or Message",bp2:"Paste exactly what the client just sent. Example:\n'Hey, can you also add a blog section, an appointment booking system, translate the site to Arabic, and redesign the logo too? It won't take much time I'm sure!'",
    bbtn:"Check Scope Now",bload:"Analyzing contract & request...",
    brt:"Scope Analysis",bvl:"Verdict",bal:"Analysis",brl:"Suggested Client Reply",bac:"Your Next Step",
    ins:"IN SCOPE",outs:"OUT OF SCOPE",bord:"BORDERLINE",
    copy_t:"Copy",copied_t:"Copied!",err_t:"Something went wrong. Please try again.",
    req_t:"Please fill in all fields first.",
    th_l:"Theme",la_l:"Language",
    footer:"FreelanceShield — Built for Freelancers Who Value Their Work",
    auth_err:"Incorrect email or password.",
    signup_err:"This email may already be in use.",
    or:"or",
  },
  ur: {
    dir:"rtl",flag:"🇵🇰",name:"اردو",
    nav_home:"ہوم",nav_vp:"ویلیو پروف",nav_bg:"باؤنڈری گارڈ",
    sign_in:"سائن ان",sign_up:"سائن اپ",sign_out:"سائن آؤٹ",
    email:"ای میل",password:"پاس ورڈ",
    have_account:"پہلے سے اکاؤنٹ ہے؟",no_account:"اکاؤنٹ نہیں ہے؟",
    login_title:"خوش آمدید",signup_title:"اکاؤنٹ بنائیں",
    login_sub:"فری لانس شیلڈ استعمال کرنے کے لیے سائن ان کریں",signup_sub:"ہزاروں محفوظ فری لانسرز کے ساتھ شامل ہوں",
    upgrade:"پرو میں اپ گریڈ کریں",pro_badge:"پرو",free_badge:"مفت",
    upgrade_title:"مفت حد ختم",
    upgrade_desc:"آپ نے اس مہینے کے 3 مفت کریڈٹ استعمال کر لیے۔ لامحدود رسائی کے لیے پرو میں اپ گریڈ کریں۔",
    upgrade_feature1:"لامحدود ویلیو پروف",upgrade_feature2:"لامحدود باؤنڈری گارڈ",
    upgrade_feature3:"تمام 7 زبانیں",upgrade_feature4:"ترجیحی سپورٹ",
    pro_price:"$7 / ماہ",pro_cta:"ابھی پرو لیں",cancel_anytime:"کبھی بھی منسوخ کریں",
    free_left:"مفت استعمال باقی",
    hero_tag:"فری لانسر کا محافظ",hero_h1a:"اپنا کام بچائیں۔",hero_h1b:"اپنی قدر ثابت کریں۔",
    hero_p:"فری لانسرز کے لیے دو AI ٹولز — اضافی کام سے پہلے روکیں، اور کلائنٹس کو اپنی اصل قدر اعتماد سے بتائیں۔",
    hero_cta1:"ویلیو پروف آزمائیں",hero_cta2:"باؤنڈری گارڈ آزمائیں",
    s1n:"73%",s1l:"فری لانسرز ہر پروجیکٹ میں اسکوپ کریپ کا سامنا کرتے ہیں",
    s2n:"$12K",s2l:"سالانہ نقصان فی فری لانسر بلا معاوضہ کام سے",
    s3n:"68%",s3l:"کلائنٹس کم قیمت دیتے ہیں کیونکہ وہ پوری قدر نہیں دیکھتے",
    fvt:"ویلیو پروف",fvi:"💎",fvd:"اپنے مکمل کام کو ایک مؤثر ویلیو کہانی میں بدلیں۔ کلائنٹس کو اعداد میں دکھائیں کہ آپ نے کتنا فرق ڈالا۔",fvb:"ویلیو پروف کھولیں →",
    fbt:"باؤنڈری گارڈ",fbi:"🛡️",fbd:"اپنا معاہدہ اور کلائنٹ کی نئی درخواست پیسٹ کریں۔ فوری فیصلہ اور تیار جواب پائیں۔",fbb:"باؤنڈری گارڈ کھولیں →",
    hiw:"اصل فری لانسر مسائل کے لیے بنایا گیا",
    h1t:"اسکوپ کریپ منافع کو ختم کرتا ہے",h1b:"کلائنٹ پروجیکٹ شروع ہونے کے بعد چھوٹی چھوٹی فرمائشیں بڑھاتا رہتا ہے۔ باؤنڈری گارڈ یہ فوراً پکڑتا ہے۔",
    h2t:"آپ کی قدر کو کم آنکا جاتا ہے",h2b:"کلائنٹ گھنٹے دیکھتے ہیں، نتائج نہیں۔ ویلیو پروف یہ بدل دیتا ہے۔",
    h3t:"ایک پلیٹ فارم، مکمل تحفظ",h3b:"دونوں ٹولز ایک ساتھ: باؤنڈری گارڈ سے وقت بچائیں، ویلیو پروف سے قدر ثابت کریں۔",
    vp_title:"ویلیو پروف",vp_sub:"اپنے کام کو کلائنٹ کی ایسی قدر میں بدلیں جسے وہ نظرانداز نہ کر سکے۔",
    vp_ht:"ویلیو پروف کیسے استعمال کریں",
    vs1t:"اپنا کام بیان کریں",vs1b:"آپ نے کیا بنایا؟ خصوصیات، معیار اور محنت کی تفصیل دیں۔",
    vs2t:"اہم خصوصیات",vs2b:"لوڈنگ رفتار، ڈیزائن معیار، انٹیگریشنز، موبائل ریسپانسیو وغیرہ۔",
    vs3t:"کاروباری اثر",vs3b:"زیادہ فروخت، بچا وقت، کم اخراجات، بہتر کسٹمر تجربہ۔",
    vb_t:"ویلیو پروف کیوں کام کرتا ہے",
    vb1t:"زیادہ ریٹ کا جواز",vb1b:"جب کلائنٹ اصل نتائج دیکھیں تو فی گھنٹہ ریٹ غیر اہم ہو جاتا ہے۔",
    vb2t:"زیادہ کلائنٹ",vb2b:"تجاویز میں ویلیو اسٹیٹمنٹ استعمال کریں اور زیادہ لیڈز کنورٹ کریں۔",
    vb3t:"قیمت کے اعتراض",vb3b:"'بہت مہنگے ہو' سنیں تو ویلیو پروف شیئر کریں — گفتگو ROI پر آ جاتی ہے۔",
    vb4t:"دیرپا اعتبار",vb4b:"پیشہ ورانہ ویلیو اسٹیٹمنٹ آپ کو بزنس پارٹنر بناتی ہے۔",
    vl1:"کون سا کام مکمل کیا؟",vp1:"مثلاً: لاہور کے کپڑوں کے برانڈ کے لیے پیمنٹ گیٹ وے کے ساتھ مکمل ای کامرس ویب سائٹ...",
    vl2:"اہم خصوصیات؟",vp2:"مثلاً: 2 سیکنڈ لوڈنگ، SEO آپٹمائزڈ، واٹس ایپ انٹیگریشن، ایڈمن ڈیش بورڈ...",
    vl3:"کلائنٹ کے کاروبار پر متوقع اثر؟",vp3:"مثلاً: 24/7 آن لائن فروخت، 30-40% زیادہ آرڈرز، 50% کم سپورٹ کالز...",
    vbtn:"ویلیو اسٹیٹمنٹ بنائیں",vload:"ویلیو اسٹیٹمنٹ تیار ہو رہی ہے...",
    vrt:"آپ کی ویلیو اسٹیٹمنٹ",vcopy:"کاپی کریں",
    bg_title:"باؤنڈری گارڈ",bg_sub:"کبھی بلا معاوضہ کام نہ کریں۔ حدود پار ہوتے ہی فوری جانیں۔",
    bg_ht:"باؤنڈری گارڈ کیسے استعمال کریں",
    bs1t:"اپنا معاہدہ پیسٹ کریں",bs1b:"تجویز یا معاہدے سے متفقہ دائرہ کار کاپی کریں۔",
    bs2t:"نئی درخواست",bs2b:"کلائنٹ نے ابھی جو مانگا بالکل ویسے پیسٹ کریں۔",
    bs3t:"فوری فیصلہ",bs3b:"دائرے میں یا باہر — تیار جواب کے ساتھ۔",
    bb_t:"باؤنڈری گارڈ کیوں سب کچھ بدل دیتا ہے",
    bb1t:"پیسے ضائع ہونا روکیں",bb1b:"اوسط فری لانسر سالانہ $12K اسکوپ کریپ سے کھو دیتا ہے۔",
    bb2t:"پیشہ ورانہ جواب",bb2b:"عجیب گفتگو نہیں — شائستہ، تیار جواب فوری۔",
    bb3t:"کلائنٹ تعلق",bb3b:"ہمیشہ احترام آمیز جواب — وقت بچائیں بغیر نقصان پہنچائے۔",
    bb4t:"ثبوت کا ریکارڈ",bb4b:"ہر فیصلے کا اسکرین شاٹ بطور دستاویز رکھیں۔",
    bl1:"اصل معاہدہ / کام کا دائرہ",bp1:"متفقہ دائرہ یہاں پیسٹ کریں...",
    bl2:"کلائنٹ کی نئی درخواست",bp2:"کلائنٹ نے جو کہا بالکل ویسے پیسٹ کریں...",
    bbtn:"ابھی چیک کریں",bload:"تجزیہ جاری ہے...",
    brt:"دائرہ کار کا تجزیہ",bvl:"فیصلہ",bal:"تجزیہ",brl:"مجوزہ جواب",bac:"اگلا قدم",
    ins:"دائرہ کار میں",outs:"دائرہ کار سے باہر",bord:"سرحدی",
    copy_t:"کاپی",copied_t:"کاپی ہوگئی!",err_t:"کچھ غلط ہو گیا۔ دوبارہ کوشش کریں۔",
    req_t:"جنریٹ سے پہلے تمام فیلڈز بھریں۔",
    th_l:"تھیم",la_l:"زبان",
    footer:"فری لانس شیلڈ — اپنے کام کی قدر جاننے والے فری لانسرز کے لیے",
    auth_err:"ای میل یا پاس ورڈ غلط ہے۔",signup_err:"یہ ای میل پہلے سے استعمال میں ہے۔",or:"یا",
  },
  ar: {
    dir:"rtl",flag:"🇸🇦",name:"العربية",
    nav_home:"الرئيسية",nav_vp:"إثبات القيمة",nav_bg:"حارس الحدود",
    sign_in:"تسجيل الدخول",sign_up:"إنشاء حساب",sign_out:"تسجيل الخروج",
    email:"البريد الإلكتروني",password:"كلمة المرور",
    have_account:"لديك حساب بالفعل؟",no_account:"ليس لديك حساب؟",
    login_title:"مرحباً بعودتك",signup_title:"إنشاء حساب",
    login_sub:"سجّل دخولك لاستخدام فريلانس شيلد",signup_sub:"انضم لآلاف المستقلين المحميين",
    upgrade:"الترقية للاحترافي",pro_badge:"احترافي",free_badge:"مجاني",
    upgrade_title:"انتهى الحد المجاني",
    upgrade_desc:"استخدمت 3 استخدامات مجانية هذا الشهر. قم بالترقية للوصول غير المحدود.",
    upgrade_feature1:"إثبات قيمة غير محدود",upgrade_feature2:"حارس حدود غير محدود",
    upgrade_feature3:"جميع اللغات السبع",upgrade_feature4:"دعم أولوية",
    pro_price:"7$ / شهر",pro_cta:"احصل على الاحترافي",cancel_anytime:"إلغاء في أي وقت",
    free_left:"استخدامات مجانية متبقية",
    hero_tag:"درع المستقل",hero_h1a:"احمِ عملك.",hero_h1b:"أثبت قيمتك.",
    hero_p:"أداتان ذكيتان للمستقلين — أوقف توسع النطاق قبل أن يكلفك، وأظهر قيمتك الحقيقية بثقة.",
    hero_cta1:"جرّب إثبات القيمة",hero_cta2:"جرّب حارس الحدود",
    s1n:"73%",s1l:"من المستقلين يواجهون توسع النطاق في كل مشروع",
    s2n:"12K$",s2l:"خسارة سنوية لكل مستقل بسبب العمل غير المدفوع",
    s3n:"68%",s3l:"من العملاء يدفعون أقل لأنهم لا يرون القيمة كاملة",
    fvt:"إثبات القيمة",fvi:"💎",fvd:"حوّل عملك المنجز إلى قصة قيمة مقنعة.",fvb:"فتح إثبات القيمة →",
    fbt:"حارس الحدود",fbi:"🛡️",fbd:"الصق عقدك وطلب العميل الجديد للحصول على حكم فوري.",fbb:"فتح حارس الحدود →",
    hiw:"مبني لمشاكل المستقلين الحقيقية",
    h1t:"توسع النطاق يقتل الأرباح",h1b:"العميل يضيف طلبات صغيرة باستمرار. حارس الحدود يكتشف هذا فوراً.",
    h2t:"قيمتك تُقلَّل",h2b:"العملاء يرون الساعات لا النتائج. إثبات القيمة يحول عملك إلى نتائج.",
    h3t:"منصة واحدة، حماية كاملة",h3b:"استخدم الأداتين معاً للحماية الكاملة.",
    vp_title:"إثبات القيمة",vp_sub:"حوّل عملك إلى قصة قيمة لا يستطيع العميل تجاهلها.",
    vp_ht:"كيفية الاستخدام",vs1t:"صف عملك",vs1b:"ما بنيته أو سلّمته — كن محدداً.",vs2t:"الميزات الرئيسية",vs2b:"السرعة، الجودة، التكاملات.",vs3t:"التأثير التجاري",vs3b:"مزيد من المبيعات، وقت موفر، تكاليف أقل.",
    vb_t:"لماذا يعمل إثبات القيمة",vb1t:"أسعار أعلى",vb1b:"العملاء يرون التأثير في أرقام حقيقية.",vb2t:"المزيد من العملاء",vb2b:"استخدم في عروضك وحوافظ الأعمال.",vb3t:"اعتراضات السعر",vb3b:"شارك بيانك عندما يقولون 'أنت غالٍ'.",vb4t:"مصداقية راسخة",vb4b:"تفكير كشريك أعمال لا مجرد مورد.",
    vl1:"ما العمل الذي أتممته؟",vp1:"مثال: موقع تجارة إلكترونية متكامل...",vl2:"الميزات الرئيسية؟",vp2:"مثال: تحميل سريع، SEO، واتساب...",vl3:"التأثير المتوقع؟",vp3:"مثال: مبيعات 24/7، زيادة 30-40%...",
    vbtn:"إنشاء بيان القيمة",vload:"جارٍ الإنشاء...",vrt:"بيان قيمتك",vcopy:"نسخ",
    bg_title:"حارس الحدود",bg_sub:"لا تعمل بدون مقابل أبداً.",
    bg_ht:"كيفية الاستخدام",bs1t:"الصق عقدك",bs1b:"انسخ النطاق المتفق عليه.",bs2t:"الطلب الجديد",bs2b:"الصق ما طلبه العميل بالضبط.",bs3t:"الحكم الفوري",bs3b:"ضمن النطاق أم خارجه — مع رد جاهز.",
    bb_t:"لماذا يغير حارس الحدود كل شيء",bb1t:"أوقف خسارة المال",bb1b:"$12K خسارة سنوية في المتوسط.",bb2t:"ردود احترافية",bb2b:"رد جاهز ومؤدب فوراً.",bb3t:"احمِ العلاقة",bb3b:"دائماً محترم ومهني.",bb4t:"سجّل الأدلة",bb4b:"اعتمد على التوثيق.",
    bl1:"العقد الأصلي / نطاق العمل",bp1:"الصق النطاق المتفق عليه...",bl2:"الطلب الجديد",bp2:"الصق ما طلبه العميل...",
    bbtn:"تحقق الآن",bload:"جارٍ التحليل...",brt:"تحليل النطاق",bvl:"الحكم",bal:"التحليل",brl:"الرد المقترح",bac:"خطوتك التالية",
    ins:"ضمن النطاق",outs:"خارج النطاق",bord:"على الحدود",
    copy_t:"نسخ",copied_t:"تم النسخ!",err_t:"حدث خطأ. حاول مرة أخرى.",req_t:"يرجى ملء جميع الحقول.",
    th_l:"المظهر",la_l:"اللغة",footer:"فريلانس شيلد — للمستقلين الذين يقدّرون عملهم",
    auth_err:"البريد أو كلمة المرور غير صحيحة.",signup_err:"قد يكون هذا البريد مستخدماً.",or:"أو",
  },
  es: {
    dir:"ltr",flag:"🇪🇸",name:"Español",
    nav_home:"Inicio",nav_vp:"ValueProof",nav_bg:"BoundaryGuard",
    sign_in:"Iniciar Sesión",sign_up:"Registrarse",sign_out:"Cerrar Sesión",
    email:"Email",password:"Contraseña",
    have_account:"¿Ya tienes cuenta?",no_account:"¿No tienes cuenta?",
    login_title:"Bienvenido de vuelta",signup_title:"Crear Cuenta",
    login_sub:"Inicia sesión para usar FreelanceShield",signup_sub:"Únete a miles de freelancers protegidos",
    upgrade:"Actualizar a Pro",pro_badge:"PRO",free_badge:"GRATIS",
    upgrade_title:"Límite gratuito alcanzado",
    upgrade_desc:"Usaste tus 3 créditos gratuitos este mes. Actualiza a Pro para acceso ilimitado.",
    upgrade_feature1:"ValueProof ilimitado",upgrade_feature2:"BoundaryGuard ilimitado",
    upgrade_feature3:"Todos los 7 idiomas",upgrade_feature4:"Soporte prioritario",
    pro_price:"$7 / mes",pro_cta:"Obtener Pro Ahora",cancel_anytime:"Cancela cuando quieras",
    free_left:"usos gratis restantes",
    hero_tag:"El Escudo del Freelancer",hero_h1a:"Protege Tu Trabajo.",hero_h1b:"Demuestra Tu Valor.",
    hero_p:"Dos herramientas IA para freelancers — detén el scope creep y comunica tu valor real con confianza.",
    hero_cta1:"Probar ValueProof",hero_cta2:"Probar BoundaryGuard",
    s1n:"73%",s1l:"de freelancers enfrentan scope creep en cada proyecto",s2n:"$12K",s2l:"perdidos por año por trabajo extra no pagado",s3n:"68%",s3l:"de clientes pagan menos por no ver el valor completo",
    fvt:"ValueProof",fvi:"💎",fvd:"Convierte tu trabajo en una historia de valor convincente.",fvb:"Abrir ValueProof →",
    fbt:"BoundaryGuard",fbi:"🛡️",fbd:"Pega tu contrato y la nueva solicitud para un veredicto instantáneo.",fbb:"Abrir BoundaryGuard →",
    hiw:"Construido para Problemas Reales",h1t:"El Scope Creep Destruye Ganancias",h1b:"El cliente sigue añadiendo solicitudes. BoundaryGuard lo detecta al instante.",h2t:"Tu Valor Es Subestimado",h2b:"Los clientes ven horas, no resultados. ValueProof lo cambia.",h3t:"Una Plataforma, Protección Total",h3b:"Usa ambas herramientas juntas para protección completa.",
    vp_title:"ValueProof",vp_sub:"Convierte tu trabajo en valor que los clientes no pueden ignorar.",
    vp_ht:"Cómo Usar ValueProof",vs1t:"Describe Tu Trabajo",vs1b:"Qué construiste — sé específico sobre características y calidad.",vs2t:"Características Clave",vs2b:"Velocidad, diseño, integraciones, responsividad.",vs3t:"Impacto de Negocio",vs3b:"Más ventas, tiempo ahorrado, costos reducidos.",
    vb_t:"Por Qué ValueProof Funciona",vb1t:"Justifica Más Tarifas",vb1b:"El impacto en números hace irrelevantes las tarifas por hora.",vb2t:"Más Clientes",vb2b:"Úsalo en propuestas y portfolio.",vb3t:"Objecciones de Precio",vb3b:"Comparte ValueProof cuando digan 'eres caro'.",vb4t:"Credibilidad",vb4b:"Te posiciona como socio de negocio.",
    vl1:"¿Qué trabajo completaste?",vp1:"Ej: Sitio e-commerce completo con pasarela de pago...",vl2:"¿Características clave?",vp2:"Ej: Carga rápida, SEO, WhatsApp...",vl3:"¿Impacto esperado?",vp3:"Ej: Ventas 24/7, +30-40% pedidos...",
    vbtn:"Generar Declaración",vload:"Creando tu declaración...",vrt:"Tu Declaración de Valor",vcopy:"Copiar",
    bg_title:"BoundaryGuard",bg_sub:"Nunca hagas trabajo no pagado de nuevo.",
    bg_ht:"Cómo Usar BoundaryGuard",bs1t:"Pega Tu Contrato",bs1b:"El alcance acordado de tu propuesta.",bs2t:"Nueva Solicitud",bs2b:"Lo que el cliente acaba de pedir, sin editarlo.",bs3t:"Tu Veredicto",bs3b:"Dentro/fuera/borderline — con respuesta lista.",
    bb_t:"Por Qué Cambia Todo",bb1t:"Para la Pérdida de Dinero",bb1b:"$12K perdidos/año por scope creep.",bb2t:"Respuestas Profesionales",bb2b:"Respuesta lista e instantánea.",bb3t:"Protege la Relación",bb3b:"Siempre respetuoso y profesional.",bb4t:"Registro de Evidencia",bb4b:"Capturas como documentación.",
    bl1:"Contrato Original / Alcance",bp1:"Pega el alcance acordado...",bl2:"Nueva Solicitud del Cliente",bp2:"Pega exactamente lo que pidió...",
    bbtn:"Verificar Ahora",bload:"Analizando...",brt:"Análisis de Alcance",bvl:"Veredicto",bal:"Análisis",brl:"Respuesta Sugerida",bac:"Tu Próximo Paso",
    ins:"DENTRO DEL ALCANCE",outs:"FUERA DEL ALCANCE",bord:"BORDERLINE",
    copy_t:"Copiar",copied_t:"¡Copiado!",err_t:"Error. Por favor intenta de nuevo.",req_t:"Completa todos los campos.",
    th_l:"Tema",la_l:"Idioma",footer:"FreelanceShield — Para Freelancers que Valoran su Trabajo",
    auth_err:"Email o contraseña incorrectos.",signup_err:"Este email puede estar en uso.",or:"o",
  },
  fr: {
    dir:"ltr",flag:"🇫🇷",name:"Français",
    nav_home:"Accueil",nav_vp:"ValueProof",nav_bg:"BoundaryGuard",
    sign_in:"Se Connecter",sign_up:"S'inscrire",sign_out:"Se Déconnecter",
    email:"Email",password:"Mot de passe",
    have_account:"Déjà un compte?",no_account:"Pas encore de compte?",
    login_title:"Bon retour",signup_title:"Créer un compte",
    login_sub:"Connectez-vous pour utiliser FreelanceShield",signup_sub:"Rejoignez des milliers de freelances protégés",
    upgrade:"Passer à Pro",pro_badge:"PRO",free_badge:"GRATUIT",
    upgrade_title:"Limite gratuite atteinte",
    upgrade_desc:"Vous avez utilisé vos 3 crédits gratuits ce mois. Passez à Pro pour un accès illimité.",
    upgrade_feature1:"ValueProof illimité",upgrade_feature2:"BoundaryGuard illimité",
    upgrade_feature3:"Les 7 langues",upgrade_feature4:"Support prioritaire",
    pro_price:"7€ / mois",pro_cta:"Obtenir Pro",cancel_anytime:"Annulation possible à tout moment",
    free_left:"utilisations gratuites restantes",
    hero_tag:"Le Bouclier du Freelance",hero_h1a:"Protégez Votre Travail.",hero_h1b:"Prouvez Votre Valeur.",
    hero_p:"Deux outils IA pour freelances — stoppez le scope creep et communiquez votre vraie valeur avec confiance.",
    hero_cta1:"Essayer ValueProof",hero_cta2:"Essayer BoundaryGuard",
    s1n:"73%",s1l:"des freelances font face au scope creep sur chaque projet",s2n:"12K€",s2l:"perdus par an par freelance",s3n:"68%",s3l:"des clients paient moins",
    fvt:"ValueProof",fvi:"💎",fvd:"Transformez votre travail en histoire de valeur convaincante.",fvb:"Ouvrir ValueProof →",
    fbt:"BoundaryGuard",fbi:"🛡️",fbd:"Collez votre contrat et la demande pour un verdict instantané.",fbb:"Ouvrir BoundaryGuard →",
    hiw:"Conçu pour les Vrais Problèmes",h1t:"Le Scope Creep Tue les Profits",h1b:"Le client ajoute des demandes. BoundaryGuard le détecte.",h2t:"Votre Valeur Est Sous-estimée",h2b:"Les clients voient des heures, pas des résultats.",h3t:"Une Plateforme, Protection Totale",h3b:"Utilisez les deux outils pour une protection complète.",
    vp_title:"ValueProof",vp_sub:"Transformez votre travail en valeur que les clients ne peuvent ignorer.",
    vp_ht:"Comment Utiliser",vs1t:"Décrivez votre travail",vs1b:"Soyez précis sur les fonctionnalités et la qualité.",vs2t:"Fonctionnalités clés",vs2b:"Vitesse, design, intégrations.",vs3t:"Impact commercial",vs3b:"Plus de ventes, temps économisé, coûts réduits.",
    vb_t:"Pourquoi Ça Fonctionne",vb1t:"Tarifs Plus Élevés",vb1b:"L'impact en chiffres rend les taux horaires non pertinents.",vb2t:"Plus de Clients",vb2b:"Utilisez dans vos propositions.",vb3t:"Objections de Prix",vb3b:"Partagez quand on dit 'vous êtes cher'.",vb4t:"Crédibilité",vb4b:"Vous positionnez comme partenaire d'affaires.",
    vl1:"Quel travail avez-vous terminé?",vp1:"Ex: Site e-commerce complet...",vl2:"Fonctionnalités clés?",vp2:"Ex: Chargement rapide, SEO, WhatsApp...",vl3:"Impact attendu?",vp3:"Ex: Ventes 24/7, +30-40% commandes...",
    vbtn:"Générer la Déclaration",vload:"Création en cours...",vrt:"Votre Déclaration",vcopy:"Copier",
    bg_title:"BoundaryGuard",bg_sub:"Ne faites plus jamais de travail non payé.",
    bg_ht:"Comment Utiliser",bs1t:"Collez votre contrat",bs1b:"Le périmètre convenu.",bs2t:"Nouvelle demande",bs2b:"Ce que le client vient de demander.",bs3t:"Votre verdict",bs3b:"Dans le périmètre ou non — avec réponse prête.",
    bb_t:"Pourquoi Ça Change Tout",bb1t:"Arrêtez la Perte d'Argent",bb1b:"12K€ perdus/an en moyenne.",bb2t:"Réponses Professionnelles",bb2b:"Réponse prête instantanément.",bb3t:"Protégez la Relation",bb3b:"Toujours respectueux.",bb4t:"Dossier de Preuves",bb4b:"Captures comme documentation.",
    bl1:"Contrat Original / Périmètre",bp1:"Collez le périmètre convenu...",bl2:"Nouvelle Demande du Client",bp2:"Collez exactement ce que le client a demandé...",
    bbtn:"Vérifier Maintenant",bload:"Analyse en cours...",brt:"Analyse du Périmètre",bvl:"Verdict",bal:"Analyse",brl:"Réponse Suggérée",bac:"Prochaine Étape",
    ins:"DANS LE PÉRIMÈTRE",outs:"HORS PÉRIMÈTRE",bord:"BORDERLINE",
    copy_t:"Copier",copied_t:"Copié!",err_t:"Erreur. Réessayez.",req_t:"Remplissez tous les champs.",
    th_l:"Thème",la_l:"Langue",footer:"FreelanceShield — Pour les Freelances qui Valorisent leur Travail",
    auth_err:"Email ou mot de passe incorrect.",signup_err:"Cet email est peut-être déjà utilisé.",or:"ou",
  },
  tr: {
    dir:"ltr",flag:"🇹🇷",name:"Türkçe",
    nav_home:"Ana Sayfa",nav_vp:"ValueProof",nav_bg:"BoundaryGuard",
    sign_in:"Giriş Yap",sign_up:"Kayıt Ol",sign_out:"Çıkış Yap",
    email:"E-posta",password:"Şifre",
    have_account:"Zaten hesabın var mı?",no_account:"Hesabın yok mu?",
    login_title:"Tekrar Hoş Geldin",signup_title:"Hesap Oluştur",
    login_sub:"FreelanceShield kullanmak için giriş yap",signup_sub:"Binlerce korunan freelancer'a katıl",
    upgrade:"Pro'ya Yükselt",pro_badge:"PRO",free_badge:"ÜCRETSİZ",
    upgrade_title:"Ücretsiz Limit Doldu",
    upgrade_desc:"Bu ay 3 ücretsiz kredinizi kullandınız. Sınırsız erişim için Pro'ya yükseltin.",
    upgrade_feature1:"Sınırsız ValueProof",upgrade_feature2:"Sınırsız BoundaryGuard",
    upgrade_feature3:"Tüm 7 dil",upgrade_feature4:"Öncelikli destek",
    pro_price:"$7 / ay",pro_cta:"Pro'ya Geç",cancel_anytime:"İstediğiniz zaman iptal edin",
    free_left:"ücretsiz kullanım kaldı",
    hero_tag:"Freelancer'ın Kalkanı",hero_h1a:"Çalışmanı Koru.",hero_h1b:"Değerini Kanıtla.",
    hero_p:"Freelancer'lar için iki AI aracı — kapsam genişlemesini durdurun ve gerçek değerinizi güvenle iletin.",
    hero_cta1:"ValueProof'u Dene",hero_cta2:"BoundaryGuard'ı Dene",
    s1n:"73%",s1l:"freelancer her projede kapsam genişlemesiyle karşılaşıyor",s2n:"$12K",s2l:"yıllık ortalama kayıp",s3n:"68%",s3l:"müşteri tam değeri görmediği için daha az ödüyor",
    fvt:"ValueProof",fvi:"💎",fvd:"Tamamladığın işi etkileyici bir değer hikayesine dönüştür.",fvb:"ValueProof'u Aç →",
    fbt:"BoundaryGuard",fbi:"🛡️",fbd:"Sözleşmeni ve yeni talebi yapıştır, anında karar al.",fbb:"BoundaryGuard'ı Aç →",
    hiw:"Gerçek Freelancer Sorunları İçin",h1t:"Kapsam Genişlemesi Kârları Öldürür",h1b:"Müşteri küçük istekler ekler. BoundaryGuard anında yakalar.",h2t:"Değerin Küçümseniyor",h2b:"Müşteriler saatleri görür, sonuçları değil.",h3t:"Tek Platform, Tam Koruma",h3b:"İki aracı birlikte kullan.",
    vp_title:"ValueProof",vp_sub:"Çalışmanı müşterilerin görmezden gelemeyeceği değere dönüştür.",
    vp_ht:"ValueProof Nasıl Kullanılır",vs1t:"Çalışmanı Tanımla",vs1b:"Ne inşa ettiğini — özellikler ve kalite hakkında spesifik ol.",vs2t:"Temel Özellikler",vs2b:"Hız, tasarım, entegrasyonlar.",vs3t:"İş Etkisi",vs3b:"Daha fazla satış, tasarruf, azalan maliyet.",
    vb_t:"Neden İşe Yarar",vb1t:"Daha Yüksek Ücretler",vb1b:"Gerçek sayılar saatlik ücretleri önemsizleştirir.",vb2t:"Daha Fazla Müşteri",vb2b:"Tekliflerde ve portföyde kullan.",vb3t:"Fiyat İtirazları",vb3b:"'Çok pahalısın' dendiğinde paylaş.",vb4t:"Güvenilirlik",vb4b:"İş ortağı gibi düşünüyorsun demek.",
    vl1:"Hangi işi tamamladın?",vp1:"Ör: Ödeme entegrasyonlu e-ticaret sitesi...",vl2:"Temel özellikler?",vp2:"Ör: Hızlı yükleme, SEO, WhatsApp...",vl3:"Beklenen etki?",vp3:"Ör: 7/24 satış, %30-40 artış...",
    vbtn:"Değer Beyanı Oluştur",vload:"Oluşturuluyor...",vrt:"Değer Beyanın",vcopy:"Kopyala",
    bg_title:"BoundaryGuard",bg_sub:"Asla ödenmemiş iş yapma.",
    bg_ht:"BoundaryGuard Nasıl Kullanılır",bs1t:"Sözleşmeni Yapıştır",bs1b:"Kararlaştırılan kapsamı yapıştır.",bs2t:"Yeni Talep",bs2b:"Müşterinin istediğini olduğu gibi yapıştır.",bs3t:"Anında Karar",bs3b:"Kapsamda mı değil mi — yanıt hazır.",
    bb_t:"Neden Her Şeyi Değiştirir",bb1t:"Para Kaybını Durdur",bb1b:"$12K/yıl ortalama kayıp.",bb2t:"Profesyonel Yanıtlar",bb2b:"Anında hazır yanıt.",bb3t:"İlişkiyi Koru",bb3b:"Her zaman saygılı.",bb4t:"Kayıt Oluştur",bb4b:"Ekran görüntüleri delil olarak.",
    bl1:"Orijinal Sözleşme / Kapsam",bp1:"Kararlaştırılan kapsamı yapıştır...",bl2:"Müşterinin Yeni Talebi",bp2:"Müşterinin dediğini olduğu gibi yapıştır...",
    bbtn:"Şimdi Kontrol Et",bload:"Analiz ediliyor...",brt:"Kapsam Analizi",bvl:"Karar",bal:"Analiz",brl:"Önerilen Yanıt",bac:"Sonraki Adım",
    ins:"KAPSAM DAHİLİNDE",outs:"KAPSAM DIŞINDA",bord:"SINIRDA",
    copy_t:"Kopyala",copied_t:"Kopyalandı!",err_t:"Hata. Tekrar dene.",req_t:"Tüm alanları doldur.",
    th_l:"Tema",la_l:"Dil",footer:"FreelanceShield — İşinin Değerini Bilen Freelancer'lar İçin",
    auth_err:"E-posta veya şifre yanlış.",signup_err:"Bu e-posta kullanımda olabilir.",or:"veya",
  },
  hi: {
    dir:"ltr",flag:"🇮🇳",name:"हिन्दी",
    nav_home:"होम",nav_vp:"ValueProof",nav_bg:"BoundaryGuard",
    sign_in:"साइन इन",sign_up:"साइन अप",sign_out:"साइन आउट",
    email:"ईमेल",password:"पासवर्ड",
    have_account:"पहले से अकाउंट है?",no_account:"अकाउंट नहीं है?",
    login_title:"वापस स्वागत है",signup_title:"अकाउंट बनाएं",
    login_sub:"FreelanceShield उपयोग करने के लिए साइन इन करें",signup_sub:"हजारों सुरक्षित फ्रीलांसरों से जुड़ें",
    upgrade:"Pro में अपग्रेड करें",pro_badge:"PRO",free_badge:"निशुल्क",
    upgrade_title:"मुफ्त सीमा समाप्त",
    upgrade_desc:"आपने इस महीने 3 मुफ्त क्रेडिट उपयोग कर लिए। असीमित एक्सेस के लिए Pro में अपग्रेड करें।",
    upgrade_feature1:"असीमित ValueProof",upgrade_feature2:"असीमित BoundaryGuard",
    upgrade_feature3:"सभी 7 भाषाएं",upgrade_feature4:"प्राथमिकता सहायता",
    pro_price:"$7 / माह",pro_cta:"Pro लें",cancel_anytime:"कभी भी रद्द करें",
    free_left:"मुफ्त उपयोग शेष",
    hero_tag:"Freelancer की ढाल",hero_h1a:"अपना काम बचाएं।",hero_h1b:"अपना मूल्य साबित करें।",
    hero_p:"फ्रीलांसरों के लिए दो AI टूल — स्कोप क्रीप रोकें और क्लाइंट को अपना असली मूल्य दिखाएं।",
    hero_cta1:"ValueProof आज़माएं",hero_cta2:"BoundaryGuard आज़माएं",
    s1n:"73%",s1l:"फ्रीलांसर हर प्रोजेक्ट में स्कोप क्रीप का सामना करते हैं",s2n:"$12K",s2l:"सालाना नुकसान प्रति फ्रीलांसर",s3n:"68%",s3l:"क्लाइंट कम भुगतान करते हैं",
    fvt:"ValueProof",fvi:"💎",fvd:"अपने काम को एक compelling value story में बदलें।",fvb:"ValueProof खोलें →",
    fbt:"BoundaryGuard",fbi:"🛡️",fbd:"अपना contract और नई request पेस्ट करें, तुरंत verdict पाएं।",fbb:"BoundaryGuard खोलें →",
    hiw:"असली समस्याओं के लिए बनाया गया",h1t:"Scope Creep मुनाफा नष्ट करता है",h1b:"क्लाइंट छोटे-छोटे काम जोड़ता रहता है। BoundaryGuard तुरंत पकड़ता है।",h2t:"आपका मूल्य कम आंका जाता है",h2b:"क्लाइंट घंटे देखते हैं, परिणाम नहीं। ValueProof यह बदलता है।",h3t:"एक Platform, पूरी सुरक्षा",h3b:"दोनों टूल साथ उपयोग करें।",
    vp_title:"ValueProof",vp_sub:"अपने काम को उस value में बदलें जिसे client नजरअंदाज न कर सके।",
    vp_ht:"ValueProof कैसे उपयोग करें",vs1t:"अपना काम बताएं",vs1b:"क्या बनाया — features, quality, effort के बारे में specific रहें।",vs2t:"मुख्य features",vs2b:"Speed, design, integrations, mobile responsiveness।",vs3t:"Business impact",vs3b:"ज्यादा sales, बचाया time, कम costs।",
    vb_t:"ValueProof क्यों काम करता है",vb1t:"ज्यादा rates justify करें",vb1b:"Real impact numbers hourly rates को irrelevant बना देते हैं।",vb2t:"ज्यादा clients",vb2b:"Proposals में use करें।",vb3t:"Price objections",vb3b:"'बहुत expensive हो' सुनें तो share करें।",vb4t:"Credibility",vb4b:"Business partner की तरह सोचते हैं।",
    vl1:"कौन सा काम पूरा किया?",vp1:"जैसे: Payment gateway के साथ e-commerce website...",vl2:"मुख्य features?",vp2:"जैसे: Fast loading, SEO, WhatsApp integration...",vl3:"Client के business पर expected impact?",vp3:"जैसे: 24/7 sales, 30-40% ज्यादा orders...",
    vbtn:"Value Statement बनाएं",vload:"तैयार हो रहा है...",vrt:"आपका Value Statement",vcopy:"Copy करें",
    bg_title:"BoundaryGuard",bg_sub:"कभी बिना भुगतान काम न करें।",
    bg_ht:"BoundaryGuard कैसे उपयोग करें",bs1t:"Contract पेस्ट करें",bs1b:"Agreed scope copy करें।",bs2t:"नई request",bs2b:"Client ने जो माँगा exactly वैसे paste करें।",bs3t:"तुरंत verdict",bs3b:"Scope में है या नहीं — reply तैयार।",
    bb_t:"क्यों सब कुछ बदल देता है",bb1t:"पैसे बर्बाद होना रोकें",bb1b:"$12K/साल average नुकसान।",bb2t:"Professional replies",bb2b:"तुरंत ready polite reply।",bb3t:"Relationship बचाएं",bb3b:"हमेशा respectful और professional।",bb4t:"Evidence Record",bb4b:"Screenshots documentation के रूप में।",
    bl1:"Original Contract / Scope",bp1:"Agreed scope यहाँ paste करें...",bl2:"Client की नई request",bp2:"Client ने जो कहा exactly वैसे paste करें...",
    bbtn:"अभी Check करें",bload:"Analysis हो रही है...",brt:"Scope Analysis",bvl:"Verdict",bal:"Analysis",brl:"Suggested Client Reply",bac:"अगला कदम",
    ins:"SCOPE में",outs:"SCOPE से बाहर",bord:"BORDERLINE",
    copy_t:"Copy",copied_t:"Copy हो गया!",err_t:"कुछ गलत हुआ। फिर try करें।",req_t:"Generate से पहले सभी fields भरें।",
    th_l:"Theme",la_l:"Language",footer:"FreelanceShield — अपने काम की कद्र जानने वाले Freelancers के लिए",
    auth_err:"Email या password गलत है।",signup_err:"यह email पहले से use में हो सकता है।",or:"या",
  },
};

// ── Themes (5) ────────────────────────────────────────────────
const THEMES = {
  white: {
    n:"Pure White",e:"☀️",
    bg:"#F4F6FB",pageGrad:"linear-gradient(150deg,#F4F6FB 0%,#EAF0FF 100%)",
    card:"#FFFFFF",cardBorder:"rgba(0,0,0,0.07)",cardShadow:"0 1px 16px rgba(0,0,0,0.07)",
    text:"#0F1629",textSec:"#5A6481",accent:"#2563EB",accentHover:"#1D4ED8",
    accentGlow:"rgba(37,99,235,0.14)",accentLight:"rgba(37,99,235,0.07)",
    badge_in:{bg:"#DCFCE7",c:"#15803D",b:"#86EFAC"},
    badge_out:{bg:"#FEE2E2",c:"#B91C1C",b:"#FCA5A5"},
    badge_bord:{bg:"#FEF9C3",c:"#92400E",b:"#FDE047"},
    headerBg:"rgba(244,246,251,0.92)",headerBorder:"rgba(0,0,0,0.07)",
    inputBg:"#F8FAFC",inputBorder:"#DDE3EF",inputFocus:"#2563EB",
    btn:"linear-gradient(135deg,#2563EB,#6366F1)",btnText:"#FFFFFF",
    stepIcon:"#EFF6FF",stepIconText:"#2563EB",
    statBg:"#FFFFFF",statBorder:"rgba(37,99,235,0.12)",
    orb1:"rgba(37,99,235,0.1)",orb2:"rgba(99,102,241,0.08)",orb3:"rgba(139,92,246,0.07)",
    resultBg:"#EFF6FF",resultBorder:"rgba(37,99,235,0.2)",
    modalBg:"rgba(15,22,41,0.5)",isDark:false,
  },
  black: {
    n:"Obsidian",e:"🌑",
    bg:"#060608",pageGrad:"linear-gradient(150deg,#060608 0%,#0D0D16 100%)",
    card:"#0F0F18",cardBorder:"rgba(0,245,255,0.07)",cardShadow:"0 2px 20px rgba(0,0,0,0.5)",
    text:"#E4E4FF",textSec:"#7070A0",accent:"#00F5FF",accentHover:"#00D4DD",
    accentGlow:"rgba(0,245,255,0.18)",accentLight:"rgba(0,245,255,0.06)",
    badge_in:{bg:"rgba(0,255,128,0.1)",c:"#00FF80",b:"rgba(0,255,128,0.25)"},
    badge_out:{bg:"rgba(255,70,70,0.1)",c:"#FF4646",b:"rgba(255,70,70,0.25)"},
    badge_bord:{bg:"rgba(255,210,0,0.08)",c:"#FFD200",b:"rgba(255,210,0,0.2)"},
    headerBg:"rgba(6,6,8,0.92)",headerBorder:"rgba(0,245,255,0.06)",
    inputBg:"#090912",inputBorder:"#1A1A2E",inputFocus:"#00F5FF",
    btn:"linear-gradient(135deg,#00F5FF,#7B2FBE)",btnText:"#060608",
    stepIcon:"rgba(0,245,255,0.08)",stepIconText:"#00F5FF",
    statBg:"#0F0F18",statBorder:"rgba(0,245,255,0.1)",
    orb1:"rgba(0,245,255,0.07)",orb2:"rgba(123,47,190,0.1)",orb3:"rgba(0,120,255,0.06)",
    resultBg:"rgba(0,245,255,0.04)",resultBorder:"rgba(0,245,255,0.15)",
    modalBg:"rgba(0,0,0,0.7)",isDark:true,
  },
  crimson: {
    n:"Royal Crimson",e:"🍷",
    bg:"#140810",pageGrad:"linear-gradient(150deg,#140810 0%,#1C0B16 100%)",
    card:"#1E0E18",cardBorder:"rgba(255,107,157,0.1)",cardShadow:"0 2px 20px rgba(0,0,0,0.5)",
    text:"#FFE4EE",textSec:"#C07090",accent:"#FF6B9D",accentHover:"#FF4D8A",
    accentGlow:"rgba(255,107,157,0.2)",accentLight:"rgba(255,107,157,0.07)",
    badge_in:{bg:"rgba(0,230,150,0.1)",c:"#00E696",b:"rgba(0,230,150,0.25)"},
    badge_out:{bg:"rgba(255,60,60,0.1)",c:"#FF3C3C",b:"rgba(255,60,60,0.25)"},
    badge_bord:{bg:"rgba(255,180,0,0.1)",c:"#FFB400",b:"rgba(255,180,0,0.25)"},
    headerBg:"rgba(20,8,16,0.92)",headerBorder:"rgba(255,107,157,0.08)",
    inputBg:"#100610",inputBorder:"#2E0E20",inputFocus:"#FF6B9D",
    btn:"linear-gradient(135deg,#FF6B9D,#C026D3)",btnText:"#FFFFFF",
    stepIcon:"rgba(255,107,157,0.1)",stepIconText:"#FF6B9D",
    statBg:"#1E0E18",statBorder:"rgba(255,107,157,0.12)",
    orb1:"rgba(255,107,157,0.09)",orb2:"rgba(192,38,211,0.09)",orb3:"rgba(139,0,60,0.1)",
    resultBg:"rgba(255,107,157,0.05)",resultBorder:"rgba(255,107,157,0.18)",
    modalBg:"rgba(0,0,0,0.7)",isDark:true,
  },
  forest: {
    n:"Deep Forest",e:"🌿",
    bg:"#061510",pageGrad:"linear-gradient(150deg,#061510 0%,#091D14 100%)",
    card:"#0C2018",cardBorder:"rgba(255,184,0,0.09)",cardShadow:"0 2px 20px rgba(0,0,0,0.5)",
    text:"#D0FFE8",textSec:"#6BA880",accent:"#FFAB40",accentHover:"#FF9A00",
    accentGlow:"rgba(255,171,64,0.2)",accentLight:"rgba(255,171,64,0.07)",
    badge_in:{bg:"rgba(0,200,110,0.12)",c:"#00C86E",b:"rgba(0,200,110,0.25)"},
    badge_out:{bg:"rgba(255,80,80,0.1)",c:"#FF5050",b:"rgba(255,80,80,0.25)"},
    badge_bord:{bg:"rgba(255,171,64,0.12)",c:"#FFAB40",b:"rgba(255,171,64,0.25)"},
    headerBg:"rgba(6,21,16,0.92)",headerBorder:"rgba(255,171,64,0.07)",
    inputBg:"#050E0A",inputBorder:"#163320",inputFocus:"#FFAB40",
    btn:"linear-gradient(135deg,#FFAB40,#00C896)",btnText:"#061510",
    stepIcon:"rgba(255,171,64,0.1)",stepIconText:"#FFAB40",
    statBg:"#0C2018",statBorder:"rgba(255,171,64,0.1)",
    orb1:"rgba(255,171,64,0.07)",orb2:"rgba(0,200,110,0.09)",orb3:"rgba(0,100,60,0.1)",
    resultBg:"rgba(255,171,64,0.04)",resultBorder:"rgba(255,171,64,0.16)",
    modalBg:"rgba(0,0,0,0.7)",isDark:true,
  },
  sapphire: {
    n:"Electric Sapphire",e:"⚡",
    bg:"#040E28",pageGrad:"linear-gradient(150deg,#040E28 0%,#050F32 100%)",
    card:"#071435",cardBorder:"rgba(122,255,110,0.08)",cardShadow:"0 2px 20px rgba(0,0,0,0.5)",
    text:"#D8E8FF",textSec:"#6080B0",accent:"#7AFF6E",accentHover:"#5DEE50",
    accentGlow:"rgba(122,255,110,0.18)",accentLight:"rgba(122,255,110,0.06)",
    badge_in:{bg:"rgba(122,255,110,0.1)",c:"#7AFF6E",b:"rgba(122,255,110,0.25)"},
    badge_out:{bg:"rgba(255,90,90,0.1)",c:"#FF5A5A",b:"rgba(255,90,90,0.25)"},
    badge_bord:{bg:"rgba(255,210,0,0.08)",c:"#FFD200",b:"rgba(255,210,0,0.2)"},
    headerBg:"rgba(4,14,40,0.92)",headerBorder:"rgba(122,255,110,0.07)",
    inputBg:"#030B20",inputBorder:"#0D2050",inputFocus:"#7AFF6E",
    btn:"linear-gradient(135deg,#7AFF6E,#00C3FF)",btnText:"#040E28",
    stepIcon:"rgba(122,255,110,0.08)",stepIconText:"#7AFF6E",
    statBg:"#071435",statBorder:"rgba(122,255,110,0.1)",
    orb1:"rgba(122,255,110,0.06)",orb2:"rgba(0,195,255,0.08)",orb3:"rgba(37,99,235,0.09)",
    resultBg:"rgba(122,255,110,0.04)",resultBorder:"rgba(122,255,110,0.15)",
    modalBg:"rgba(0,0,0,0.75)",isDark:true,
  },
};

// ── Helper ────────────────────────────────────────────────────
function useCopy() {
  const [k, setK] = useState("");
  const copy = useCallback((txt, key) => {
    navigator.clipboard.writeText(txt).catch(() => {});
    setK(key);
    setTimeout(() => setK(""), 2000);
  }, []);
  return [k, copy];
}

function monthKey() {
  const d = new Date();
  return `fs_${d.getFullYear()}_${d.getMonth()}`;
}

// ── Animated Background ───────────────────────────────────────
function AnimBg({ th }) {
  return (
    <div style={{position:"fixed",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
      {[{s:600,x:"8%",y:"5%",d:"0s",dur:"22s"},{s:500,x:"68%",y:"55%",d:"-9s",dur:"26s"},{s:420,x:"38%",y:"30%",d:"-16s",dur:"19s"}].map((o,i)=>(
        <div key={i} style={{position:"absolute",borderRadius:"50%",width:o.s,height:o.s,left:o.x,top:o.y,background:i===0?th.orb1:i===1?th.orb2:th.orb3,filter:"blur(80px)",animation:`orbF ${o.dur} ${o.d} infinite ease-in-out alternate`}}/>
      ))}
    </div>
  );
}

// ── Auth Modal ────────────────────────────────────────────────
function AuthModal({ th, t, onClose, onSuccess }) {
  const [mode, setMode] = useState("signin"); // signin | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!email || !password) { setError(t.req_t); return; }
    setLoading(true); setError("");
    if (mode === "signin") {
      const { error: e } = await supabase.auth.signInWithPassword({ email, password });
      if (e) { setError(t.auth_err); setLoading(false); return; }
    } else {
      const { error: e } = await supabase.auth.signUp({ email, password });
      if (e) { setError(t.signup_err); setLoading(false); return; }
    }
    setLoading(false);
    onSuccess();
    onClose();
  };

  const inp = { width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:10,padding:"12px 16px",color:th.text,fontSize:14,fontFamily:"inherit",outline:"none" };
  const isRTL = t.dir === "rtl";

  return (
    <div style={{position:"fixed",inset:0,background:th.modalBg,zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div style={{background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:20,padding:32,width:"100%",maxWidth:400,boxShadow:`0 20px 60px rgba(0,0,0,0.3)`}} onClick={e=>e.stopPropagation()} dir={t.dir}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:36,marginBottom:8}}>🛡️</div>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:900,color:th.text,marginBottom:6}}>{mode==="signin"?t.login_title:t.signup_title}</h2>
          <p style={{color:th.textSec,fontSize:13}}>{mode==="signin"?t.login_sub:t.signup_sub}</p>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div>
            <label style={{display:"block",fontSize:12,fontWeight:700,color:th.textSec,marginBottom:6,letterSpacing:"0.05em",textTransform:"uppercase"}}>{t.email}</label>
            <input type="email" style={inp} value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" />
          </div>
          <div>
            <label style={{display:"block",fontSize:12,fontWeight:700,color:th.textSec,marginBottom:6,letterSpacing:"0.05em",textTransform:"uppercase"}}>{t.password}</label>
            <input type="password" style={inp} value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          {error && <p style={{color:"#EF4444",fontSize:13,margin:0}}>{error}</p>}
          <button onClick={submit} disabled={loading} style={{background:th.btn,color:th.btnText,border:"none",borderRadius:10,padding:"13px",fontSize:15,fontWeight:700,cursor:loading?"not-allowed":"pointer",fontFamily:"inherit",boxShadow:`0 4px 16px ${th.accentGlow}`}}>
            {loading?"⏳ ...":(mode==="signin"?t.sign_in:t.sign_up)}
          </button>
          <p style={{textAlign:"center",color:th.textSec,fontSize:13,margin:0}}>
            {mode==="signin"?t.no_account:t.have_account}{" "}
            <button onClick={()=>{setMode(mode==="signin"?"signup":"signin");setError("");}} style={{background:"none",border:"none",color:th.accent,fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:13}}>
              {mode==="signin"?t.sign_up:t.sign_in}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Upgrade Modal ─────────────────────────────────────────────
function UpgradeModal({ th, t, onClose, freeUsed, onUpgrade, upgrading }) {
  return (
    <div style={{position:"fixed",inset:0,background:th.modalBg,zIndex:900,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div style={{background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:20,padding:32,width:"100%",maxWidth:420,boxShadow:`0 20px 60px rgba(0,0,0,0.3)`}} onClick={e=>e.stopPropagation()} dir={t.dir}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:40,marginBottom:8}}>✨</div>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:900,color:th.text,marginBottom:8}}>{t.upgrade_title}</h2>
          <p style={{color:th.textSec,fontSize:14,lineHeight:1.6}}>{t.upgrade_desc}</p>
        </div>
        <div style={{background:th.accentLight,border:`1px solid ${th.accentGlow}`,borderRadius:14,padding:16,marginBottom:20}}>
          {[t.upgrade_feature1,t.upgrade_feature2,t.upgrade_feature3,t.upgrade_feature4].map((f,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",color:th.text,fontSize:13}}>
              <span style={{color:th.accent,fontSize:16}}>✓</span>{f}
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",marginBottom:16}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:900,color:th.accent}}>{t.pro_price}</div>
          <div style={{color:th.textSec,fontSize:12,marginTop:2}}>{t.cancel_anytime}</div>
        </div>
        <button onClick={onUpgrade} disabled={upgrading} style={{width:"100%",background:th.btn,color:th.btnText,border:"none",borderRadius:10,padding:"14px",fontSize:15,fontWeight:700,cursor:upgrading?"not-allowed":"pointer",fontFamily:"inherit",boxShadow:`0 4px 16px ${th.accentGlow}`}}>
          {upgrading?"⏳ Redirecting...":t.pro_cta}
        </button>
      </div>
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────
function Header({ page, setPage, lang, setLang, theme, setTheme, t, th, user, isPro, freeCount, onAuth, onLogout, onUpgrade }) {
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const isRTL = t.dir === "rtl";
  const remaining = Math.max(0, FREE_LIMIT - freeCount);

  return (
    <header style={{position:"sticky",top:0,zIndex:200,background:th.headerBg,borderBottom:`1px solid ${th.headerBorder}`,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)"}}>
      <div style={{maxWidth:960,margin:"0 auto",padding:"11px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,flexWrap:"wrap"}}>
        {/* Logo */}
        <div onClick={()=>setPage("home")} style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer"}}>
          <div style={{width:34,height:34,borderRadius:9,background:th.btn,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,boxShadow:`0 2px 10px ${th.accentGlow}`}}>🛡️</div>
          <span style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18,color:th.text,letterSpacing:"-0.02em"}}>FreelanceShield</span>
        </div>
        {/* Nav */}
        <nav style={{display:"flex",gap:3,alignItems:"center"}}>
          {[["home","🏠",t.nav_home],["valueproof","💎",t.nav_vp],["boundaryguard","🛡️",t.nav_bg]].map(([k,icon,label])=>(
            <button key={k} onClick={()=>setPage(k)} style={{background:page===k?th.accentLight:"transparent",border:page===k?`1px solid ${th.accentGlow}`:"1px solid transparent",borderRadius:9,padding:"6px 12px",color:page===k?th.accent:th.textSec,cursor:"pointer",fontSize:12.5,fontWeight:page===k?700:500,fontFamily:"inherit",transition:"all 0.2s",whiteSpace:"nowrap"}}>
              <span style={{marginRight:4,fontSize:11}}>{icon}</span>{label}
            </button>
          ))}
        </nav>
        {/* Right controls */}
        <div style={{display:"flex",gap:7,alignItems:"center"}}>
          {/* Theme */}
          <div style={{position:"relative"}}>
            <button onClick={()=>{setThemeOpen(!themeOpen);setLangOpen(false);setUserOpen(false);}} style={{background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:9,padding:"6px 10px",cursor:"pointer",color:th.text,fontSize:15,fontFamily:"inherit",display:"flex",alignItems:"center",gap:3}}>
              {THEMES[theme].e}<span style={{fontSize:10,color:th.textSec}}>▾</span>
            </button>
            {themeOpen&&(
              <div style={{position:"absolute",top:"calc(100% + 6px)",[isRTL?"left":"right"]:0,background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:12,padding:5,minWidth:160,boxShadow:`0 8px 30px rgba(0,0,0,0.2)`,zIndex:300}}>
                {Object.entries(THEMES).map(([k,v])=>(
                  <button key={k} onClick={()=>{setTheme(k);setThemeOpen(false);}} style={{display:"block",width:"100%",padding:"7px 11px",background:theme===k?th.accentLight:"transparent",border:"none",borderRadius:8,color:theme===k?th.accent:th.text,fontSize:13,fontWeight:theme===k?700:400,textAlign:isRTL?"right":"left",cursor:"pointer",fontFamily:"inherit"}}>
                    {v.e} {v.n}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Lang */}
          <div style={{position:"relative"}}>
            <button onClick={()=>{setLangOpen(!langOpen);setThemeOpen(false);setUserOpen(false);}} style={{background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:9,padding:"6px 10px",cursor:"pointer",color:th.text,fontSize:12.5,fontWeight:600,fontFamily:"inherit",display:"flex",alignItems:"center",gap:3}}>
              {T[lang].flag} <span style={{fontSize:10,color:th.textSec}}>▾</span>
            </button>
            {langOpen&&(
              <div style={{position:"absolute",top:"calc(100% + 6px)",[isRTL?"left":"right"]:0,background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:12,padding:5,minWidth:145,boxShadow:`0 8px 30px rgba(0,0,0,0.2)`,zIndex:300}}>
                {Object.keys(T).map(code=>(
                  <button key={code} onClick={()=>{setLang(code);setLangOpen(false);}} style={{display:"block",width:"100%",padding:"7px 11px",background:lang===code?th.accentLight:"transparent",border:"none",borderRadius:8,color:lang===code?th.accent:th.text,fontSize:13,fontWeight:lang===code?700:400,textAlign:isRTL?"right":"left",cursor:"pointer",fontFamily:"inherit"}}>
                    {T[code].flag} {T[code].name}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* User */}
          {user ? (
            <div style={{position:"relative"}}>
              <button onClick={()=>{setUserOpen(!userOpen);setLangOpen(false);setThemeOpen(false);}} style={{display:"flex",alignItems:"center",gap:7,background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:9,padding:"6px 10px",cursor:"pointer",fontFamily:"inherit"}}>
                <div style={{width:24,height:24,borderRadius:"50%",background:th.btn,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:th.btnText}}>{user.email[0].toUpperCase()}</div>
                {isPro?(<span style={{background:th.accentLight,color:th.accent,fontSize:10,fontWeight:800,padding:"2px 6px",borderRadius:5}}>{t.pro_badge}</span>):(<span style={{color:th.textSec,fontSize:11}}>{remaining} {t.free_left}</span>)}
              </button>
              {userOpen&&(
                <div style={{position:"absolute",top:"calc(100% + 6px)",[isRTL?"left":"right"]:0,background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:12,padding:8,minWidth:200,boxShadow:`0 8px 30px rgba(0,0,0,0.2)`,zIndex:300}}>
                  <div style={{padding:"6px 10px 10px",borderBottom:`1px solid ${th.cardBorder}`,marginBottom:6}}>
                    <div style={{fontSize:12,color:th.textSec,marginBottom:2}}>{t.email}</div>
                    <div style={{fontSize:13,color:th.text,fontWeight:600,wordBreak:"break-all"}}>{user.email}</div>
                  </div>
                  {!isPro&&(
                    <button onClick={()=>{setUserOpen(false);onUpgrade();}} style={{display:"block",width:"100%",padding:"8px 10px",background:th.accentLight,border:`1px solid ${th.accentGlow}`,borderRadius:8,color:th.accent,fontSize:13,fontWeight:700,textAlign:"left",cursor:"pointer",fontFamily:"inherit",marginBottom:4}}>
                      ✨ {t.upgrade}
                    </button>
                  )}
                  <button onClick={()=>{setUserOpen(false);onLogout();}} style={{display:"block",width:"100%",padding:"8px 10px",background:"transparent",border:"none",borderRadius:8,color:th.textSec,fontSize:13,fontWeight:500,textAlign:isRTL?"right":"left",cursor:"pointer",fontFamily:"inherit"}}>
                    🚪 {t.sign_out}
                  </button>
                </div>
              )}
            </div>
          ):(
            <button onClick={onAuth} style={{background:th.btn,color:th.btnText,border:"none",borderRadius:9,padding:"7px 14px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:`0 2px 10px ${th.accentGlow}`}}>
              {t.sign_in}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

// ── Tool Card ─────────────────────────────────────────────────
function Card({ th, children, mb=20 }) {
  return <div style={{background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:18,padding:26,boxShadow:th.cardShadow,marginBottom:mb}}>{children}</div>;
}

// ── Home Page ─────────────────────────────────────────────────
function HomePage({ setPage, t, th, onAuth }) {
  const [vis, setVis] = useState(false);
  useEffect(()=>{const id=setTimeout(()=>setVis(true),80);return()=>clearTimeout(id);},[]);
  const fade=(d)=>({opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(26px)",transition:`opacity 0.6s ${d}s, transform 0.6s ${d}s`});

  return (
    <div style={{maxWidth:940,margin:"0 auto",padding:"0 20px 80px"}}>
      {/* Hero */}
      <div style={{textAlign:"center",padding:"64px 0 44px",...fade(0)}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:7,background:th.accentLight,border:`1px solid ${th.accentGlow}`,borderRadius:40,padding:"5px 14px",marginBottom:20}}>
          <span style={{fontSize:12}}>🛡️</span>
          <span style={{fontSize:11,fontWeight:800,color:th.accent,letterSpacing:"0.07em",textTransform:"uppercase"}}>{t.hero_tag}</span>
        </div>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:"clamp(34px,6vw,60px)",lineHeight:1.1,color:th.text,marginBottom:6}}>{t.hero_h1a}</h1>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:900,fontSize:"clamp(34px,6vw,60px)",lineHeight:1.15,color:th.accent,marginBottom:18}}>{t.hero_h1b}</h1>
        <p style={{color:th.textSec,fontSize:16,maxWidth:520,margin:"0 auto 32px",lineHeight:1.7}}>{t.hero_p}</p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={()=>setPage("valueproof")} style={{background:th.btn,color:th.btnText,border:"none",borderRadius:12,padding:"13px 26px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:`0 4px 18px ${th.accentGlow}`}}>💎 {t.hero_cta1}</button>
          <button onClick={()=>setPage("boundaryguard")} style={{background:"transparent",color:th.accent,border:`1.5px solid ${th.accent}`,borderRadius:12,padding:"13px 26px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>🛡️ {t.hero_cta2}</button>
        </div>
      </div>
      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14,marginBottom:50,...fade(0.14)}}>
        {[[t.s1n,t.s1l],[t.s2n,t.s2l],[t.s3n,t.s3l]].map(([n,l],i)=>(
          <div key={i} style={{background:th.statBg,border:`1px solid ${th.statBorder}`,borderRadius:14,padding:"20px 16px",textAlign:"center",boxShadow:th.cardShadow}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:32,fontWeight:900,color:th.accent,lineHeight:1}}>{n}</div>
            <div style={{fontSize:12.5,color:th.textSec,marginTop:7,lineHeight:1.5}}>{l}</div>
          </div>
        ))}
      </div>
      {/* Features */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:18,marginBottom:50,...fade(0.28)}}>
        {[[t.fvi,t.fvt,t.fvd,t.fvb,"valueproof"],[t.fbi,t.fbt,t.fbd,t.fbb,"boundaryguard"]].map(([icon,title,desc,btn,pg],i)=>(
          <div key={i} style={{background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:18,padding:28,boxShadow:th.cardShadow,display:"flex",flexDirection:"column",gap:14,transition:"transform 0.2s,box-shadow 0.2s",cursor:"pointer"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow=`0 10px 36px ${th.accentGlow}`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow=th.cardShadow;}}>
            <div style={{width:52,height:52,borderRadius:14,background:th.accentLight,border:`1px solid ${th.accentGlow}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{icon}</div>
            <div>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:th.text,marginBottom:7}}>{title}</h3>
              <p style={{color:th.textSec,fontSize:13.5,lineHeight:1.7}}>{desc}</p>
            </div>
            <button onClick={()=>setPage(pg)} style={{background:th.btn,color:th.btnText,border:"none",borderRadius:9,padding:"10px 18px",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit",alignSelf:"flex-start",boxShadow:`0 2px 10px ${th.accentGlow}`}}>{btn}</button>
          </div>
        ))}
      </div>
      {/* How it works */}
      <div style={{...fade(0.42)}}>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,color:th.text,textAlign:"center",marginBottom:28}}>{t.hiw}</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:14}}>
          {[[t.h1t,t.h1b,"🔍"],[t.h2t,t.h2b,"📊"],[t.h3t,t.h3b,"⚡"]].map(([title,body,icon],i)=>(
            <div key={i} style={{background:th.card,border:`1px solid ${th.cardBorder}`,borderRadius:14,padding:22,boxShadow:th.cardShadow}}>
              <div style={{width:42,height:42,borderRadius:11,background:th.stepIcon,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,marginBottom:12}}>{icon}</div>
              <h4 style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:800,color:th.text,marginBottom:7}}>{title}</h4>
              <p style={{color:th.textSec,fontSize:13,lineHeight:1.65}}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ValueProof Page ───────────────────────────────────────────
function ValueProofPage({ t, th, lang, canUse, onUsed }) {
  const [work, setWork] = useState(""); const [features, setFeatures] = useState(""); const [impact, setImpact] = useState("");
  const [result, setResult] = useState(""); const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  const [vis, setVis] = useState(false);
  const [copied, copy] = useCopy();
  useEffect(()=>{const id=setTimeout(()=>setVis(true),60);return()=>clearTimeout(id);},[]);
  const fade=(d)=>({opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(18px)",transition:`opacity 0.5s ${d}s, transform 0.5s ${d}s`});
  const LNAMES={en:"English",ur:"Urdu",ar:"Arabic",es:"Spanish",hi:"Hindi",fr:"French",tr:"Turkish"};

  const generate = async () => {
    if (!work.trim()||!features.trim()||!impact.trim()){setError(t.req_t);return;}
    if (!canUse()) return;
    setError(""); setLoading(true); setResult("");
    try {
      const res = await fetch("/api/ai", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ max_tokens:1000, messages:[{role:"user",content:`You are a world-class marketing consultant for freelancers.\n\nWork Done: ${work}\nKey Features: ${features}\nExpected Impact: ${impact}\n\nGenerate a compelling Value Statement in ${LNAMES[lang]}:\n\n**VALUE SUMMARY**\n[2-3 powerful sentences on business ROI and outcomes]\n\n**VALUE SNIPPETS**\n[3 punchy lines under 130 chars each, starting with relevant emoji]\n\n**CLIENT MESSAGE TEMPLATE**\n[3-4 sentence ready-to-send professional message in first person]\n\nRespond entirely in ${LNAMES[lang]}.`}]})
      });
      const data = await res.json();
      const text = (data.content||[]).map(b=>b.text||"").join("");
      setResult(text);
      onUsed();
    } catch { setResult(t.err_t); }
    setLoading(false);
  };

  const inp={width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:11,padding:"12px 15px",color:th.text,fontSize:13.5,lineHeight:1.7,fontFamily:"inherit",transition:"border-color 0.2s",resize:"vertical"};
  const lbl={display:"block",fontSize:11,fontWeight:700,color:th.textSec,marginBottom:6,letterSpacing:"0.06em",textTransform:"uppercase"};

  return (
    <div style={{maxWidth:840,margin:"0 auto",padding:"0 20px 80px"}}>
      <div style={{textAlign:"center",padding:"44px 0 28px",...fade(0)}}>
        <div style={{width:60,height:60,borderRadius:16,background:th.accentLight,border:`1px solid ${th.accentGlow}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 14px"}}>💎</div>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,5vw,38px)",fontWeight:900,color:th.accent,marginBottom:8}}>{t.vp_title}</h1>
        <p style={{color:th.textSec,fontSize:15,maxWidth:480,margin:"0 auto"}}>{t.vp_sub}</p>
      </div>
      {/* How-to */}
      <Card th={th} mb={18}>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,color:th.text,marginBottom:18}}>📋 {t.vp_ht}</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14}}>
          {[[1,t.vs1t,t.vs1b],[2,t.vs2t,t.vs2b],[3,t.vs3t,t.vs3b]].map(([n,title,body])=>(
            <div key={n} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
              <div style={{width:34,height:34,borderRadius:9,flexShrink:0,background:th.stepIcon,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:900,color:th.stepIconText}}>{n}</div>
              <div><div style={{fontWeight:700,color:th.text,fontSize:13,marginBottom:4}}>{title}</div><div style={{color:th.textSec,fontSize:12.5,lineHeight:1.6}}>{body}</div></div>
            </div>
          ))}
        </div>
      </Card>
      {/* Benefits */}
      <Card th={th} mb={18}>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,color:th.text,marginBottom:16}}>🌟 {t.vb_t}</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12}}>
          {[[t.vb1t,t.vb1b,"💰"],[t.vb2t,t.vb2b,"🚀"],[t.vb3t,t.vb3b,"💬"],[t.vb4t,t.vb4b,"🏆"]].map(([title,body,icon],i)=>(
            <div key={i} style={{background:th.accentLight,borderRadius:12,padding:14,border:`1px solid ${th.accentGlow}`}}>
              <div style={{fontSize:20,marginBottom:6}}>{icon}</div>
              <div style={{fontWeight:700,color:th.text,fontSize:13,marginBottom:5}}>{title}</div>
              <div style={{color:th.textSec,fontSize:12.5,lineHeight:1.6}}>{body}</div>
            </div>
          ))}
        </div>
      </Card>
      {/* Form */}
      <div style={{...fade(0.2)}}>
        <Card th={th} mb={18}>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,color:th.text,marginBottom:20}}>✨ Generate</h2>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div><label style={lbl}>{t.vl1}</label><textarea style={{...inp,minHeight:90}} placeholder={t.vp1} value={work} onChange={e=>setWork(e.target.value)}/></div>
            <div><label style={lbl}>{t.vl2}</label><textarea style={{...inp,minHeight:72}} placeholder={t.vp2} value={features} onChange={e=>setFeatures(e.target.value)}/></div>
            <div><label style={lbl}>{t.vl3}</label><textarea style={{...inp,minHeight:72}} placeholder={t.vp3} value={impact} onChange={e=>setImpact(e.target.value)}/></div>
            {error&&<p style={{color:"#EF4444",fontSize:13,margin:0}}>{error}</p>}
            <button onClick={generate} disabled={loading} style={{background:loading?th.accentLight:th.btn,color:loading?th.accent:th.btnText,border:`1px solid ${th.accentGlow}`,borderRadius:11,padding:"14px",fontSize:14,fontWeight:700,cursor:loading?"not-allowed":"pointer",fontFamily:"inherit",boxShadow:`0 4px 18px ${th.accentGlow}`}}>
              {loading?`⏳ ${t.vload}`:`✨ ${t.vbtn}`}
            </button>
          </div>
        </Card>
        {loading&&<Card th={th} mb={18}>{[80,100,60,90,70,55].map((w,i)=><div key={i} style={{height:13,width:`${w}%`,borderRadius:7,marginBottom:10,background:`linear-gradient(90deg,${th.card} 25%,${th.accentGlow} 50%,${th.card} 75%)`,backgroundSize:"200% 100%",animation:"shimFx 1.5s infinite"}}/>)}</Card>}
        {result&&!loading&&(
          <Card th={th} mb={0}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:8}}>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,color:th.accent,margin:0}}>✅ {t.vrt}</h3>
              <button onClick={()=>copy(result,"vp")} style={{background:th.accentLight,border:`1px solid ${th.accentGlow}`,borderRadius:7,padding:"6px 12px",cursor:"pointer",color:th.accent,fontSize:11,fontWeight:700,fontFamily:"inherit"}}>
                {copied==="vp"?`✓ ${t.copied_t}`:`📋 ${t.vcopy}`}
              </button>
            </div>
            <div style={{background:th.resultBg,border:`1px solid ${th.resultBorder}`,borderRadius:12,padding:18}}>
              <pre style={{whiteSpace:"pre-wrap",wordBreak:"break-word",color:th.text,fontSize:13.5,lineHeight:1.85,fontFamily:"inherit",margin:0}}>{result}</pre>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

// ── BoundaryGuard Page ────────────────────────────────────────
function BoundaryGuardPage({ t, th, lang, canUse, onUsed }) {
  const [contract, setContract] = useState(""); const [request, setRequest] = useState("");
  const [result, setResult] = useState(null); const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  const [vis, setVis] = useState(false);
  const [copied, copy] = useCopy();
  useEffect(()=>{const id=setTimeout(()=>setVis(true),60);return()=>clearTimeout(id);},[]);
  const fade=(d)=>({opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(18px)",transition:`opacity 0.5s ${d}s, transform 0.5s ${d}s`});
  const LNAMES={en:"English",ur:"Urdu",ar:"Arabic",es:"Spanish",hi:"Hindi",fr:"French",tr:"Turkish"};

  const check = async () => {
    if (!contract.trim()||!request.trim()){setError(t.req_t);return;}
    if (!canUse()) return;
    setError(""); setLoading(true); setResult(null);
    try {
      const res = await fetch("/api/ai", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ max_tokens:900, messages:[{role:"user",content:`You are BoundaryGuard AI, expert in freelance contract scope analysis.\n\nOriginal Contract/Scope:\n${contract}\n\nClient's New Request:\n${request}\n\nRespond ONLY with valid JSON (no markdown, no backticks):\n{\n  "verdict": "IN_SCOPE" or "OUT_OF_SCOPE" or "BORDERLINE",\n  "explanation": "2-3 sentences in ${LNAMES[lang]} explaining the verdict with reference to specific scope details",\n  "suggested_response": "Complete ready-to-send message in ${LNAMES[lang]} for the freelancer. Professional, warm, specific. No placeholders.",\n  "action": "Concrete next step for the freelancer in ${LNAMES[lang]}"\n}`}]})
      });
      const data = await res.json();
      const txt = (data.content||[]).map(b=>b.text||"").join("").replace(/```json|```/g,"").trim();
      setResult(JSON.parse(txt));
      onUsed();
    } catch { setResult({verdict:"ERROR",explanation:t.err_t,suggested_response:"",action:""}); }
    setLoading(false);
  };

  const getBadge=(v)=>{
    if(v==="IN_SCOPE") return {label:t.ins,...th.badge_in,icon:"✅"};
    if(v==="OUT_OF_SCOPE") return {label:t.outs,...th.badge_out,icon:"❌"};
    if(v==="BORDERLINE") return {label:t.bord,...th.badge_bord,icon:"⚠️"};
    return {label:v,...th.badge_bord,icon:"ℹ️"};
  };

  const inp={width:"100%",background:th.inputBg,border:`1.5px solid ${th.inputBorder}`,borderRadius:11,padding:"12px 15px",color:th.text,fontSize:13.5,lineHeight:1.7,fontFamily:"inherit",transition:"border-color 0.2s",resize:"vertical"};
  const lbl={display:"block",fontSize:11,fontWeight:700,color:th.textSec,marginBottom:6,letterSpacing:"0.06em",textTransform:"uppercase"};

  return (
    <div style={{maxWidth:840,margin:"0 auto",padding:"0 20px 80px"}}>
      <div style={{textAlign:"center",padding:"44px 0 24px",...fade(0)}}>
        <div style={{width:60,height:60,borderRadius:16,background:th.accentLight,border:`1px solid ${th.accentGlow}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 14px"}}>🛡️</div>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(26px,5vw,38px)",fontWeight:900,color:th.accent,marginBottom:8}}>{t.bg_title}</h1>
        <p style={{color:th.textSec,fontSize:15,maxWidth:480,margin:"0 auto"}}>{t.bg_sub}</p>
      </div>
      {/* Verdict Legend */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:18}}>
        {[[t.ins,"✅",th.badge_in],[t.bord,"⚠️",th.badge_bord],[t.outs,"❌",th.badge_out]].map(([label,icon,s],i)=>(
          <div key={i} style={{background:s.bg,border:`1px solid ${s.b}`,borderRadius:11,padding:"12px 8px",textAlign:"center"}}>
            <div style={{fontSize:20,marginBottom:4}}>{icon}</div>
            <div style={{fontSize:10.5,fontWeight:800,color:s.c,letterSpacing:"0.04em"}}>{label}</div>
          </div>
        ))}
      </div>
      {/* How-to */}
      <Card th={th} mb={18}>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,color:th.text,marginBottom:18}}>📋 {t.bg_ht}</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14}}>
          {[[1,t.bs1t,t.bs1b],[2,t.bs2t,t.bs2b],[3,t.bs3t,t.bs3b]].map(([n,title,body])=>(
            <div key={n} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
              <div style={{width:34,height:34,borderRadius:9,flexShrink:0,background:th.stepIcon,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:900,color:th.stepIconText}}>{n}</div>
              <div><div style={{fontWeight:700,color:th.text,fontSize:13,marginBottom:4}}>{title}</div><div style={{color:th.textSec,fontSize:12.5,lineHeight:1.6}}>{body}</div></div>
            </div>
          ))}
        </div>
      </Card>
      {/* Benefits */}
      <Card th={th} mb={18}>
        <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,color:th.text,marginBottom:16}}>🔒 {t.bb_t}</h2>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12}}>
          {[[t.bb1t,t.bb1b,"💸"],[t.bb2t,t.bb2b,"💬"],[t.bb3t,t.bb3b,"🤝"],[t.bb4t,t.bb4b,"📂"]].map(([title,body,icon],i)=>(
            <div key={i} style={{background:th.accentLight,borderRadius:12,padding:14,border:`1px solid ${th.accentGlow}`}}>
              <div style={{fontSize:20,marginBottom:6}}>{icon}</div>
              <div style={{fontWeight:700,color:th.text,fontSize:13,marginBottom:5}}>{title}</div>
              <div style={{color:th.textSec,fontSize:12.5,lineHeight:1.6}}>{body}</div>
            </div>
          ))}
        </div>
      </Card>
      {/* Form */}
      <div style={{...fade(0.2)}}>
        <Card th={th} mb={18}>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,color:th.text,marginBottom:20}}>🔍 Analyze Scope</h2>
          <div style={{display:"flex",flexDirection:"column",gap:16}}>
            <div><label style={lbl}>{t.bl1}</label><textarea style={{...inp,minHeight:130}} placeholder={t.bp1} value={contract} onChange={e=>setContract(e.target.value)}/></div>
            <div><label style={lbl}>{t.bl2}</label><textarea style={{...inp,minHeight:100}} placeholder={t.bp2} value={request} onChange={e=>setRequest(e.target.value)}/></div>
            {error&&<p style={{color:"#EF4444",fontSize:13,margin:0}}>{error}</p>}
            <button onClick={check} disabled={loading} style={{background:loading?th.accentLight:th.btn,color:loading?th.accent:th.btnText,border:`1px solid ${th.accentGlow}`,borderRadius:11,padding:"14px",fontSize:14,fontWeight:700,cursor:loading?"not-allowed":"pointer",fontFamily:"inherit",boxShadow:`0 4px 18px ${th.accentGlow}`}}>
              {loading?`⏳ ${t.bload}`:`🔍 ${t.bbtn}`}
            </button>
          </div>
        </Card>
        {loading&&<Card th={th} mb={18}>{[50,80,65,90,55].map((w,i)=><div key={i} style={{height:13,width:`${w}%`,borderRadius:7,marginBottom:10,background:`linear-gradient(90deg,${th.card} 25%,${th.accentGlow} 50%,${th.card} 75%)`,backgroundSize:"200% 100%",animation:"shimFx 1.5s infinite"}}/>)}</Card>}
        {result&&!loading&&(
          <Card th={th} mb={0}>
            <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,color:th.text,marginBottom:16}}>🔎 {t.brt}</h3>
            {result.verdict&&result.verdict!=="ERROR"&&(()=>{const b=getBadge(result.verdict);return(<div style={{display:"inline-flex",alignItems:"center",gap:7,background:b.bg,border:`1.5px solid ${b.b}`,borderRadius:40,padding:"8px 16px",marginBottom:16,fontSize:13,fontWeight:800,color:b.c}}>{b.icon} {b.label}</div>);})()}
            {result.explanation&&(<div style={{marginBottom:14}}>
              <div style={{fontSize:10,fontWeight:800,color:th.accent,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>{t.bal}</div>
              <div style={{background:th.resultBg,border:`1px solid ${th.resultBorder}`,borderRadius:10,padding:14}}><p style={{color:th.text,fontSize:13.5,lineHeight:1.8,margin:0}}>{result.explanation}</p></div>
            </div>)}
            {result.suggested_response&&(<div style={{marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6,flexWrap:"wrap",gap:7}}>
                <div style={{fontSize:10,fontWeight:800,color:th.accent,letterSpacing:"0.08em",textTransform:"uppercase"}}>{t.brl}</div>
                <button onClick={()=>copy(result.suggested_response,"reply")} style={{background:th.accentLight,border:`1px solid ${th.accentGlow}`,borderRadius:7,padding:"5px 11px",cursor:"pointer",color:th.accent,fontSize:11,fontWeight:700,fontFamily:"inherit"}}>{copied==="reply"?`✓ ${t.copied_t}`:`📋 ${t.copy_t}`}</button>
              </div>
              <div style={{background:th.resultBg,border:`1px solid ${th.resultBorder}`,borderLeft:`3px solid ${th.accent}`,borderRadius:10,padding:14}}><p style={{color:th.text,fontSize:13.5,lineHeight:1.85,margin:0,fontStyle:"italic"}}>"{result.suggested_response}"</p></div>
            </div>)}
            {result.action&&(<div>
              <div style={{fontSize:10,fontWeight:800,color:th.accent,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>{t.bac}</div>
              <div style={{display:"flex",gap:10,alignItems:"flex-start",background:th.accentLight,borderRadius:10,padding:14,border:`1px solid ${th.accentGlow}`}}>
                <span style={{fontSize:18}}>💡</span><p style={{color:th.text,fontSize:13.5,lineHeight:1.7,margin:0}}>{result.action}</p>
              </div>
            </div>)}
          </Card>
        )}
      </div>
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState("white");
  const [user, setUser] = useState(null);
  const [isPro, setIsPro] = useState(false);
  const [freeCount, setFreeCount] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgrading, setUpgrading] = useState(false);

  const t = T[lang]; const th = THEMES[theme];
  const isRTL = t.dir === "rtl";

  useEffect(() => {
    // Check auth
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user ?? null;
      setUser(u);
      if (u) checkPro(u.id);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) checkPro(u.id);
    });
    // Load free usage
    setFreeCount(parseInt(localStorage.getItem(monthKey()) || "0"));
    // Check success redirect from Stripe
    const params = new URLSearchParams(window.location.search);
    if (params.get("pro") === "success") {
      setIsPro(true);
      window.history.replaceState({}, "", window.location.pathname);
    }
    return () => subscription.unsubscribe();
  }, []);

  const checkPro = async (uid) => {
    const { data } = await supabase.from("profiles").select("is_pro").eq("id", uid).single();
    setIsPro(data?.is_pro ?? false);
  };

  const canUse = () => {
    if (!user) { setShowAuth(true); return false; }
    if (isPro) return true;
    if (freeCount >= FREE_LIMIT) { setShowUpgrade(true); return false; }
    return true;
  };

  const onUsed = () => {
    if (isPro) return;
    const n = freeCount + 1;
    setFreeCount(n);
    localStorage.setItem(monthKey(), n.toString());
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); setIsPro(false);
  };

  const handleUpgrade = async () => {
    if (!user) { setShowAuth(true); return; }
    setUpgrading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST", headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ userId: user.id, email: user.email }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch { alert("Error creating checkout. Please try again."); }
    setUpgrading(false);
  };

  return (
    <div dir={t.dir} style={{minHeight:"100vh",background:th.pageGrad,color:th.text,fontFamily:isRTL?"'Noto Naskh Arabic',serif":"'Plus Jakarta Sans','DM Sans',sans-serif",transition:"background 0.4s, color 0.3s",position:"relative"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        textarea:focus,input:focus{border-color:${th.inputFocus}!important;outline:none!important;box-shadow:0 0 0 3px ${th.accentGlow}!important;}
        ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-track{background:transparent;} ::-webkit-scrollbar-thumb{background:${th.cardBorder};border-radius:4px;}
        @keyframes orbF{0%{transform:translate(0,0) scale(1);}50%{transform:translate(30px,-25px) scale(1.04);}100%{transform:translate(-15px,30px) scale(0.96);}}
        @keyframes shimFx{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
      `}</style>
      <AnimBg th={th}/>
      <div style={{position:"relative",zIndex:10}}>
        <Header page={page} setPage={setPage} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} t={t} th={th} user={user} isPro={isPro} freeCount={freeCount} onAuth={()=>setShowAuth(true)} onLogout={handleLogout} onUpgrade={()=>setShowUpgrade(true)}/>
        <main>
          {page==="home"&&<HomePage setPage={setPage} t={t} th={th} onAuth={()=>setShowAuth(true)}/>}
          {page==="valueproof"&&<ValueProofPage t={t} th={th} lang={lang} key={`vp-${lang}`} canUse={canUse} onUsed={onUsed}/>}
          {page==="boundaryguard"&&<BoundaryGuardPage t={t} th={th} lang={lang} key={`bg-${lang}`} canUse={canUse} onUsed={onUsed}/>}
        </main>
        <footer style={{textAlign:"center",padding:"24px 20px",borderTop:`1px solid ${th.cardBorder}`,color:th.textSec,fontSize:12}}>
          {t.footer}
        </footer>
      </div>
      {showAuth&&<AuthModal th={th} t={t} onClose={()=>setShowAuth(false)} onSuccess={()=>{}}/>}
      {showUpgrade&&<UpgradeModal th={th} t={t} onClose={()=>setShowUpgrade(false)} freeUsed={freeCount} onUpgrade={handleUpgrade} upgrading={upgrading}/>}
    </div>
  );
}
