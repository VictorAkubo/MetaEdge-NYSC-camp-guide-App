import React, { useState, useEffect, useRef } from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  StyleSheet,
  Dimensions,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from '@expo/vector-icons';
import statesAndLGA from './statesandlga.json';
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Navigation,
  ChevronRight,
  FileText,
  Shield,
  Flag,
  Globe,
  BookOpen,
  Scroll,
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const MetaEdgeNYSCGuide = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [fadeAnim] = useState(new Animated.Value(1));
  const [statesData, setStatesData] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedLGA, setSelectedLGA] = useState(null);
  const [showStateModal, setShowStateModal] = useState(false);
  const [showLGAModal, setShowLGAModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [timetable, setTimetable] = useState([]);

  const [selectedMeal, setSelectedMeal] = useState({});
  const [visible, setVisible] = useState(false);
  const [updatedDay, setUpdatedDay] = useState('');
  const [updatedMealName, setUpdatedMealName] = useState('');
  const [isRewardedAdLoaded, setIsRewardedAdLoaded] = useState(false);
  const [isInterstitialLoaded, setIsInterstitialLoaded] = useState(false);

  useEffect(() => {
    setStatesData(statesAndLGA);
  }, []);

  // Data Arrays
  const menuItems = [
    {
      title: 'Camp Guide',
      subtitle: 'Essential camp information',
      icon: 'book',
      color: '#059669',
      page: 'guide',
    },
    {
      title: 'Food Timetable',
      subtitle: 'Daily meal schedules',
      icon: 'restaurant',
      color: '#EA580C',
      page: 'food',
    },
    {
      title: 'Orientation',
      subtitle: 'Weekly activities program',
      icon: 'calendar',
      color: '#7C3AED',
      page: 'orientation',
    },
    {
      title: 'Rules & Regulations',
      subtitle: "Camp dos and don'ts",
      icon: 'shield-checkmark',
      color: '#DC2626',
      page: 'rules',
    },
    {
      title: 'Camp Checklist',
      subtitle: 'What to bring to camp',
      icon: 'document-text',
      color: '#2563EB',
      page: 'checklist',
    },
    {
      title: 'Emergency Info',
      subtitle: 'Important contacts',
      icon: 'alert-circle',
      color: '#B91C1C',
      page: 'emergency',
    },
    {
      title: 'Check your states Lga',
      subtitle: "View your deployement state LGA's",
      icon: 'map-outline',
      color: '#007AFF',
      page: 'statesandlga',
    },
    {
      title: 'Official Documents',
      subtitle: 'Essential Documents information',
      icon: 'book',
      color: '#059669',
      page: 'officialdoc',
    },
  ];

  const documents = [
    {
      id: 'nysc_anthem',
      title: 'NYSC Anthem',
      icon: <BookOpen size={24} color="#4F46E5" />,
      description: 'The official anthem of the National Youth Service Corps',
      category: 'NYSC',
      content: `NYSC ANTHEM

Youths obey the clarion call
Let us lift our nation high
Under the sun or in the rain
With dedication and selflessness
Nigeria is ours, Nigeria we serve.

Members, take the great salute
Put the Nation first in all
With service and humility
NYSC for the noble youths
Make Nigeria a great nation.

Far and near we come to serve
And to build our fatherland
With oneness and loyalty
NYSC for unity
Hail Nigeria, our great nation`,
    },
    {
      id: 'nysc_pledge',
      title: 'NYSC Pledge',
      icon: <Shield size={24} color="#4F46E5" />,
      description: 'The pledge taken by all NYSC members',
      category: 'NYSC',
      content: `I pledge to Nigeria, my Country,
To be faithful, loyal and honest,
To serve Nigeria with all my strength,
To defend her unity and
Uphold her honour and glory
So, help me God.`,
    },
    {
      id: 'nysc_bye_laws',
      title: 'NYSC Bye-Laws',
      icon: <FileText size={24} color="#4F46E5" />,
      description: 'Official bye-laws governing NYSC operations',
      category: 'NYSC',
      content: `Key provisions from NYSC Bye-Laws:

1. MOTTO: The motto of the National Youth Service Corps shall be 'Service and Humility'

2. PLEDGE: Every member of the Service Corps shall as soon as possible after registration, subscribe to and sign a copy of the Pledge

3. OBJECTIVES: The primary objectives include:
   - Developing common ties among Nigerian youths
   - Removing prejudices and promoting national unity
   - Developing attitudes of mind for national reconstruction
   - Promoting rural development

4. DURATION: The period of service shall be one year

5. DISCIPLINE: All corps members shall conduct themselves in a manner that upholds the dignity of the Corps and the nation

6. POSTING: Corps members shall serve in states other than their states of origin

7. UNIFORM: All corps members shall wear prescribed uniforms during official duties`,
    },
    {
      id: 'nigeria_anthem',
      title: 'Nigeria National Anthem',
      icon: <Flag size={24} color="#008751" />,
      description:
        'The official national anthem of Nigeria (reverted to original in May 2024)',
      category: 'Nigeria',
      content: `Nigeria, We Hail Thee

Verse 1:
Nigeria, we hail thee
Our own dear native land
Though tribes and tongues may differ
In brotherhood we stand
Nigerians all, are proud to serve
Our sovereign Motherland

Verse 2:
Our flag shall be a symbol
That truth and justice reign
In peace or battle honour'd
And this we count as gain
To hand on to our children
A banner without stain

Verse 3:
O God of all creation
Grant this our one request
Help us to build a nation
Where no man is oppressed
And so with peace and plenty
Nigeria may be blessed`,
    },
    {
      id: 'nigeria_pledge',
      title: 'Nigeria National Pledge',
      icon: <Shield size={24} color="#008751" />,
      description: 'The pledge of allegiance to Nigeria',
      category: 'Nigeria',
      content: `I pledge to Nigeria my Country,
To be faithful, loyal and honest,
To serve Nigeria with all my strength,
To defend her unity and
Uphold her honour and glory
So, help me God.`,
    },
    {
      id: 'armorial_bearings',
      title: 'Armorial Bearings',
      icon: <Shield size={24} color="#008751" />,
      description: "Details about Nigeria's Coat of Arms and National Flag",
      category: 'Nigeria',
      content: `ARMORIAL BEARINGS

A BRIEF NOTE ON THE COAT OF ARM
In Nigeria's coat of arms, there is an eagle mounted on a black shield which is trisected by two silver wavy bands. Two white charges support the shield and at its base is a wreath of cactus spectabilis flower cast in the national colours of white and green. The black shield represents the fertile soil; the silver bands denote the Niger and Benue Rivers which form the main inland waterways in the country. The cactus spectabilis is a wild colourful flower which grows widely in Nigeria. The eagle stands for strength, and the charges symbolise dignity. The Nation's motto is Unity and Faith, Peace and Progress.

A BRIEF NOTE ON THE NIGERIA NATIONAL FLAG
The flag is divided vertically into three equal parts. The central part is white and the two outer parts are green. The green of the flag represents agriculture and the white is for unity and peace. Mr. Taiwo Akinkunmi, at the time a 25-year-old Nigerian engineering student at the Norwood Technical College, London was the designer of the National flag. At the open competition held by order of the Council of Ministers, a total of 2,870 designers were received in the National Flag Competition. Mr. Akinkunmi's won.`,
    },
    {
      id: 'sdg_anthem',
      title: 'SDG Anthem',
      icon: <Globe size={24} color="#FF6B35" />,
      description: 'NYSC Sustainable Development Goals anthem',
      category: 'SDG',
      content: `NYSC SDGs
A happy family of development
We shall live it & preach it
Till we all see a new Nigeria
Team we shall be
Mark and factor
Together each achieve more (2x)
Oh the challenge of development
Oh Oh Oh
Oh the joy of development
Oh Oh Oh
Oh the joy of development

SDGs!
…transforming our world`,
    },
    {
      id: 'nysc_act',
      title: 'NYSC Act Excerpts',
      icon: <Scroll size={24} color="#4F46E5" />,
      description: 'Key excerpts from the NYSC Act',
      category: 'NYSC',
      content: `National Youth Service Corps Act - Key Excerpts:

SECTION 1 - ESTABLISHMENT:
There is hereby established a scheme to be known as the National Youth Service Corps (in this Act referred to as 'the Corps')

SECTION 2 - OBJECTIVES:
The objects of the service established by this Act are:
(a) the proper encouragement and development of common ties among the youths of Nigeria and the promotion of national unity;
(b) the development of common ties among the youths of Nigeria and the breakdown of religious, ethnic and cultural barriers;
(c) the promotion of the spirit of selfless service to the community;
(d) the acceleration of the economic development of every part of Nigeria through improved higher level manpower;
(e) the development of attitudes of mind acquired through shared experience and suitable training.

SECTION 3 - PARTICIPATION:
It shall be the duty of every Nigerian citizen to participate in the service for a continuous period of one year at any time after graduation from a university or comparable institution.

SECTION 4 - EXEMPTIONS:
The following persons shall not be required to participate in the service:
(a) members of the Armed Forces of Nigeria;
(b) members of the Nigeria Police Force;
(c) persons who graduated at the age of thirty years or above;
(d) persons who have served in the Armed Forces or Police for a period of more than nine months.

SECTION 12 - OFFENSES:
Any person who:
(a) fails to report for service;
(b) refuses to undertake any duty assigned to him;
(c) is absent from duty without lawful excuse;
shall be guilty of an offence and liable to prosecution.`,
    },
    {
      id: 'nysc_background',
      title: 'NYSC Background and Objectives',
      icon: <BookOpen size={24} color="#4F46E5" />,
      description:
        'Complete background to the National Youth Service Corps Scheme',
      category: 'NYSC',
      content: `BACKGROUND TO THE NATIONAL YOUTH SERVICE CORPS SCHEME

A. Nigeria is a country whose colonial history and experience in the immediate post-independence era were characterised by ethnic loyalties, mutual group suspicion and distrust, that culminated in the traumatic events of a bloody civil war.

B. As a developing country, Nigeria is further plagued by the problems attendant upon a condition of under development, namely; poverty, mass illiteracy, acute shortage of high-skilled manpower (coupled with most uneven distribution of the skilled people that are available), woefully inadequate socio-economic infrastructural facilities, i.e. housing, water and sewage facilities, road, health-care services, and effective communication system.

C. Faced with these almost intractable problems, which were further compounded by the burden of reconstruction after the civil war, the government and people of Nigeria set for the country, fresh goals, and objectives aimed at establishing Nigeria as:
(a) a united, strong and self-reliant nation:
(b) a great and dynamic economy;
(c) a land of bright and full opportunities for all citizens; and
(d) a free and democratic society.

D. The government and people of Nigeria are not aware that sound and patriotic leadership is a pre-condition for the rapid social and economic development of the country. As a nation, Nigeria has been less fortunate in the kind of leadership that emerge to govern the affairs of the country in the period immediately after independence, a leadership whose achievements notwithstanding was none the less ill-prepared, and generally not properly motivated to tackle the problems of socio-economic under development in the interest of the country as a whole.

E. There is no gain saying the fact that the future of any country depends on the youths. The youths of Nigeria acknowledge this fact, and have consistently laid claim to the nation's leadership.

F. While one may give credence to the saying that leaders are born, not made, one must also concede to the fact that leadership in a modern society requires a certain degree of preparation and orientation before the assumption of that role.

G. The universities and other institutions of higher learning are normally expected to be training ground for future leaders, except that, as we are all aware, these institutions are first and foremost committed to the advancement of learning and knowledge, training of people for good citizenship. Little wonder that the products of these institutions have been accused of being too elitist in their outlook, of not identifying with the plight of common man and of inability to appreciate predicament of the vast majority of our people who live in the rural areas.

H. It was the need to look beyond the immediate present and to think of the future leadership of the country that necessitated the mobilisation of certain categories of our youths through the National Youth Service Corps Scheme. This was done with a view to giving them the proper guidance and orientation relevant to the needs of the country. The National Youth Service Corps Decree No. 24 which has now been repealed and replaced by Decree 51 of 16th June 1993, was then, formally promulgated.

1. The purpose of the scheme is primarily to inculcate in Nigerian Youth the spirit of selfless service to the community, and to emphasize the spirit of oneness and brotherhood of all Nigerians, irrespective of cultural or social background. The history of our country since independence has clearly indicated the need for unity amongst all our people, and demonstrated the fact that no cultural or geographical entity can exist in isolation.

2. OBJECTIVES OF THE SCHEME
(i) The objectives of the National Youth Service Corps Scheme are clearly spelt out in Decree No, 51 of 16th June 1993 as follows:
(a) to inculcate discipline in Nigerian youths by instilling in them a tradition of industry at work, and of patriotic and loyal service to Nigeria in any situation they may find themselves;
(b) to raise the moral tone of the Nigerian youths by giving them the opportunity to learn about higher ideals of national achievement, social and cultural improvement;
(c) to develop in the Nigerian youths the attitudes of mind, acquired through shared experience and suitable training, which will make them more amenable to mobilisation in the national interest;
(d) to enable Nigerian youths acquire the spirit of self reliance by encouraging them to develop skills for self employment;
(e) to contribute to the accelerated growth of the national economy;
(f) to develop common ties among the Nigerian youths and promote national unity and integration;
(g) to remove prejudices, eliminate ignorance and confirm at firm hand the many similarities among Nigerians of all ethnic groups; and
(h) to develop a sense of corporate existence and common destiny of the people of Nigeria.

(ii) In order to achieve the objectives in subsection (3) of this section, the service corps shall ensure:-
(a) the equitable distribution of members of the service corps and the effective utilisation of their skills in area of national needs;
(b) that as far as possible, youths are assigned to jobs in states other than their state of origin;

3. OPERATION OF THE SCHEME
(a) The Decree set up a National Directorate comprising a Chairman, the Director-General, Representatives of Committees of Vice Chancellors, Rectors, the Armed Forces, Police, the Nigerian Employers Consultative Association, and three special Members.
(b) The Directorate is the governing and policy making body of the National Youth Service Corps. The Director General is the Chief Executive of the Scheme while the Co-ordinator is in charge of the State Secretariat.
(c) The Decree also provides for the establishment of a Governing Board in each state of the federation. The State Governing Board has a statutory responsibility to assist the Directorate in the smooth operation of the scheme in the state.
(d) The Decree also established local governing committees and State Zonal Officers to assist in the operation of the scheme at the grassroots level.

ELIGIBILITY FOR NATIONAL SCHEME
(a) Participation in the National Youth Service Corps is compulsory for the following categories of Nigeria graduates:
(i) If, at the end of the academic year 1972-73 or, as the case may be, at the end of any subsequent academic year, he shall have graduated at any University in Nigeria; or
(ii) If, at the end of the academic year 1974-76 or, as the case may be, at the end of any subsequent year, he shall have graduated at any University outside Nigeria; or
(iii) If, at the end of the academic year 1975-76 or, as the case may be, at the end of any subsequent year, he shall have obtained the Higher National Diploma, or such other professional qualification as may be prescribed; or
(iv) If, at the end of the academic year 1975-76 or, as the case may be, at the end of any subsequent year up to the end of the 1983-84 academic year, he shall have obtained the National Certificate of Education, be under an obligation, unless exempted under subsection (2) of this section or section 17 of this Decree, to make himself available for service for a continuous period of one year from the date specified in the call-up instrument served upon him.

(b) Notwithstanding the provisions of sub-section (1) of this section, with effect from 1st August, 1985, a person shall not be called up to serve in the service corps if, at the date of his graduation or obtaining his diploma or other professional qualification:
(i) he is over the age of thirty; or
(ii) he has served in the Armed Forces of the Federation or the Nigeria Police Force for a period of more than nine months; or
(iii) he is member of staff of any of the following, that is
1. the Nigerian Security Organisation, or
2. the State Security Service, or
3. the National Intelligence Agency.`,
    },
  ];

  const quickTips = [
    '💡 Always carry your call-up letter and ID',
    '🏃‍♂️ Participate actively in all camp activities',
    '🤝 Make friends from different states and cultures',
    '📱 Keep your phone charged for emergencies',
    '💧 Stay hydrated and drink clean water only',
  ];

  const campGuideData = [
    {
      title: 'Before Leaving Home',
      content: [
        {
          title: 'Required Documentation',
          content:
            'Bring your original call-up letter, degree certificate, NYSC medical form, passport photographs (8 copies), and valid means of identification.',
        },
        {
          title: 'Essential Items',
          content:
            'Pack white canvas shoes, jungle boots, white round-neck t-shirts, white shorts, toiletries, mosquito net, and personal medications.',
        },
        {
          title: 'Financial Preparation',
          content:
            'Carry sufficient cash for transport, feeding, and other incidentals. Note that ATM services may be limited in some camps.',
        },
        {
          title: 'Health Preparation',
          content:
            "Complete your medical examination, get necessary vaccinations, and ensure you're physically fit for camp activities.",
        },
      ],
    },
    {
      title: 'Registration Process',
      content: [
        {
          title: 'Document Verification',
          content:
            'Present all required documents at the registration desk. Ensure your certificates are authentic and properly signed.',
        },
        {
          title: 'Medical Screening',
          content:
            'Undergo medical examination including blood pressure check, general health assessment, and fitness evaluation.',
        },
        {
          title: 'Biometric Capture',
          content:
            'Complete fingerprinting and photograph capture for your discharge certificate and ID card.',
        },
        {
          title: 'Platoon Assignment',
          content:
            "You'll be assigned to a platoon based on your course of study and camp logistics.",
        },
      ],
    },
    {
      title: 'Daily Camp Life',
      content: [
        {
          title: 'Morning Parade',
          content:
            'Mandatory 6:00 AM assembly for physical exercises, announcements, and uniform inspection.',
        },
        {
          title: 'Lectures and Seminars',
          content:
            'Attend lectures on entrepreneurship, leadership, civic education, and national development.',
        },
        {
          title: 'Skill Acquisition',
          content:
            'Choose from various vocational skills like computer training, tailoring, agriculture, or baking.',
        },
        {
          title: 'Community Development',
          content:
            'Participate in community service projects and outreach programs in nearby communities.',
        },
      ],
    },
    {
      title: 'Health and Safety',
      content: [
        {
          title: 'Camp Clinic',
          content:
            'Visit the medical center for any health issues. Free medical services are available 24/7.',
        },
        {
          title: 'Water and Food Safety',
          content:
            'Drink only treated water and eat meals from approved vendors to prevent foodborne illnesses.',
        },
        {
          title: 'Personal Security',
          content:
            'Keep your valuables secure, avoid isolated areas at night, and report suspicious activities immediately.',
        },
        {
          title: 'Emergency Procedures',
          content:
            'Know the location of fire exits, assembly points, and emergency contact numbers.',
        },
      ],
    },
  ];

  const foodTimeTable = [
    {
      day: 'Monday',
      meals: [
        {
          time: '8:00 AM',
          meal: 'Breakfast',
          description: 'Bread, tea/coffee, boiled eggs or akamu',
        },
        {
          time: '2:00 PM',
          meal: 'Lunch',
          description: 'Jollof rice, fried rice, or beans with stew',
        },
        {
          time: '6:00 PM',
          meal: 'Dinner',
          description: 'Yam and egg sauce or beans and plantain',
        },
      ],
    },
    {
      day: 'Tuesday',
      meals: [
        {
          time: '8:00 AM',
          meal: 'Breakfast',
          description: 'Akamu (pap), bread, tea, or cornflakes',
        },
        {
          time: '2:00 PM',
          meal: 'Lunch',
          description: 'White rice and stew with chicken or fish',
        },
        {
          time: '6:00 PM',
          meal: 'Dinner',
          description: 'Spaghetti with sauce or noodles',
        },
      ],
    },
    {
      day: 'Wednesday',
      meals: [
        {
          time: '8:00 AM',
          meal: 'Breakfast',
          description: 'Oatmeal, milk, bread, or tea',
        },
        {
          time: '2:00 PM',
          meal: 'Lunch',
          description: 'Fried rice with chicken, salad, and fruit',
        },
        {
          time: '6:00 PM',
          meal: 'Dinner',
          description: 'Beans and rice (waakye) with fish',
        },
      ],
    },
    {
      day: 'Thursday',
      meals: [
        {
          time: '8:00 AM',
          meal: 'Breakfast',
          description: 'Bread, butter, jam, tea, or coffee',
        },
        {
          time: '2:00 PM',
          meal: 'Lunch',
          description: 'Local rice with palm nut soup and meat',
        },
        {
          time: '6:00 PM',
          meal: 'Dinner',
          description: 'Semovita with vegetable soup and protein',
        },
      ],
    },
    {
      day: 'Friday',
      meals: [
        {
          time: '8:00 AM',
          meal: 'Breakfast',
          description: 'Cornflakes, milk, bread, or akamu',
        },
        {
          time: '2:00 PM',
          meal: 'Lunch',
          description: 'Jollof rice with chicken and coleslaw',
        },
        {
          time: '6:00 PM',
          meal: 'Dinner',
          description: 'Yam and tomato sauce with fish',
        },
      ],
    },
    {
      day: 'Saturday',
      meals: [
        {
          time: '8:00 AM',
          meal: 'Breakfast',
          description: 'Tea, bread, egg, or local breakfast',
        },
        {
          time: '2:00 PM',
          meal: 'Lunch',
          description: 'Special weekend meal - varies by camp',
        },
        {
          time: '6:00 PM',
          meal: 'Dinner',
          description: 'Light meal - noodles or bread',
        },
      ],
    },
    {
      day: 'Sunday',
      meals: [
        {
          time: '8:00 AM',
          meal: 'Breakfast',
          description: 'Special Sunday breakfast',
        },
        {
          time: '2:00 PM',
          meal: 'Lunch',
          description: 'Sunday special - rice and chicken',
        },
        { time: '6:00 PM', meal: 'Dinner', description: 'Light evening meal' },
      ],
    },
  ];

  // Save data to AsyncStorage
  const saveFoodTimeTable = async () => {
    try {
      const jsonValue = JSON.stringify(foodTimeTable);
      await AsyncStorage.setItem('foodTimeTable', jsonValue);
      console.log('Food timetable saved!');
    } catch (e) {
      console.error('Error saving timetable:', e);
    }
  };

  const getFoodTimeTable = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('foodTimeTable');
      const newvalue = jsonValue != null ? JSON.parse(jsonValue) : [];
      setTimetable(newvalue);
      return newvalue;
    } catch (e) {
      console.error('Error fetching timetable:', e);
      return [];
    }
  };

  useEffect(() => {
    const initializeTimetable = async () => {
      try {
        const existingData = await AsyncStorage.getItem('foodTimeTable');
        if (!existingData) {
          // If no timetable saved, save the default one
          await saveFoodTimeTable();
          setTimetable(foodTimeTable);
        } else {
          // If timetable exists, just load it
          const parsed = JSON.parse(existingData);
          setTimetable(parsed);
        }
      } catch (e) {
        console.error('Error initializing timetable:', e);
      }
    };

    initializeTimetable();
  }, []);

  const nutritionTips = [
    '🥗 Eat a variety of foods to get balanced nutrition',
    '💧 Drink at least 8 glasses of water daily',
    '🍎 Supplement with fruits and vegetables when available',
    '🥛 Take calcium-rich foods for strong bones',
    '🍯 Avoid too much sugar and processed foods',
  ];

  const orientationData = [
    {
      week: 'Week 1: Arrival & Orientation',
      activities: [
        {
          time: 'Day 1-2',
          activity: 'Registration & Documentation',
          description:
            'Complete registration process, document verification, and medical screening',
        },
        {
          time: 'Day 3',
          activity: 'Welcome Ceremony',
          description:
            'Official opening ceremony with camp commandant address and orientation overview',
        },
        {
          time: 'Day 4-5',
          activity: 'Camp Familiarization',
          description:
            'Camp tour, facility orientation, safety briefing, and platoon assignment',
        },
        {
          time: 'Day 6-7',
          activity: 'Skill Acquisition Intro',
          description:
            'Introduction to available vocational skills and initial selection process',
        },
      ],
    },
    {
      week: 'Week 2: Training & Development',
      activities: [
        {
          time: 'Daily 6:00 AM',
          activity: 'Morning Parade',
          description:
            'Physical exercises, announcements, uniform inspection, and national anthem',
        },
        {
          time: '8:00-11:00 AM',
          activity: 'Lectures & Seminars',
          description:
            'Entrepreneurship, leadership, civic education, and national issues',
        },
        {
          time: '2:00-5:00 PM',
          activity: 'Skill Acquisition',
          description: 'Intensive vocational training in chosen skill areas',
        },
        {
          time: '6:00-8:00 PM',
          activity: 'Cultural Activities',
          description:
            'Traditional dances, drama, cultural exchange, and talent shows',
        },
      ],
    },
    {
      week: 'Week 3: Assessment & Preparation',
      activities: [
        {
          time: 'Monday-Tuesday',
          activity: 'Community Development',
          description: 'Community outreach programs and environmental projects',
        },
        {
          time: 'Wednesday',
          activity: 'Skills Assessment',
          description:
            'Practical examination and certification of acquired skills',
        },
        {
          time: 'Thursday',
          activity: 'Sports & Recreation',
          description: 'Inter-platoon competitions and recreational activities',
        },
        {
          time: 'Friday',
          activity: 'Passing Out Parade',
          description:
            'Graduation ceremony and preparation for primary assignment',
        },
      ],
    },
  ];

  const campRules = [
    {
      category: 'General Conduct & Discipline',
      rules: [
        'Respect all camp officials, military personnel, and fellow corps members',
        'Maintain proper dress code during official activities and parades',
        'Participate actively in all scheduled camp programs and activities',
        'Keep your accommodation area and camp surroundings clean at all times',
        'Report any suspicious activities or security concerns immediately',
      ],
    },
    {
      category: 'Accommodation & Personal Behavior',
      rules: [
        'No fighting, bullying, or aggressive behavior towards other corps members',
        'Consumption of alcohol and illegal substances is strictly prohibited',
        'Observe lights-out time and maintain quiet hours (10:00 PM - 5:00 AM)',
        'Unauthorized movement outside camp premises is not allowed',
        'Mobile phones must be on silent mode during lectures and parades',
      ],
    },
    {
      category: 'Health, Safety & Hygiene',
      rules: [
        'Report any illness or injury to the camp medical center immediately',
        'Do not share personal items like towels, clothes, or eating utensils',
        'Maintain excellent personal hygiene and use provided sanitation facilities',
        'Follow all safety instructions during physical activities and drills',
        'Avoid consuming food and water from unauthorized sources outside camp',
      ],
    },
    {
      category: 'Documentation & Camp Property',
      rules: [
        'Always carry your call-up letter and identification documents',
        'Do not damage or misuse camp property, facilities, or equipment',
        'Take proper care of issued uniforms and return them in good condition',
        "Respect other corps members' personal belongings and privacy",
        'Submit all required forms and documentation within specified deadlines',
      ],
    },
  ];

  const checklistData = [
    {
      category: 'Essential Documents',
      items: [
        'NYSC call-up letter (original and photocopies)',
        'Degree certificate (original and photocopies)',
        'NYSC medical fitness certificate',
        'Passport photographs (minimum 8 copies)',
        "Valid means of identification (voter's card, driver's license, etc.)",
        'Birth certificate or age declaration',
        'Marriage certificate (if applicable)',
      ],
    },
    {
      category: 'Clothing & Uniforms',
      items: [
        'White canvas shoes (2 pairs)',
        'Jungle boots (1 pair)',
        'White round-neck t-shirts (6 pieces)',
        'White shorts (3 pairs)',
        'Khaki uniform materials (3 yards)',
        'Casual wear for weekends',
        'Underwear and socks',
        'Sweater or cardigan for cold weather',
      ],
    },
    {
      category: 'Personal Care & Health',
      items: [
        'Toiletries (soap, toothbrush, toothpaste, shampoo)',
        'Towels (2-3 pieces)',
        'Mosquito net',
        'Insect repellent',
        'Personal medications',
        'First aid kit',
        'Sanitary pads (for ladies)',
        'Sunscreen lotion',
      ],
    },
    {
      category: 'Bedding & Accommodation',
      items: [
        'Bedsheets and pillowcases',
        'Pillow',
        'Blanket',
        'Mattress (if not provided)',
        'Bucket for bathing',
        'Padlock for your box',
        'Flashlight with batteries',
        'Extension cord/power bank',
      ],
    },
    {
      category: 'Study & Recreation',
      items: [
        'Notebooks and writing materials',
        'Books for personal development',
        'Calculator (if needed)',
        'Camera for memories',
        'Musical instruments (if talented)',
        'Sports equipment (if interested)',
        'Games and recreational items',
      ],
    },
  ];

  const emergencyContacts = [
    {
      service: 'Police Emergency',
      number: '199',
      description: 'For security emergencies and criminal activities',
    },
    {
      service: 'Fire Service',
      number: '199',
      description: 'For fire emergencies and rescue operations',
    },
    {
      service: 'Medical Emergency',
      number: '199',
      description: 'For urgent medical situations',
    },
    {
      service: 'NYSC Headquarters',
      number: '09-4130201',
      description: 'For NYSC-related issues and complaints',
    },
  ];

  const emergencyProcedures = [
    {
      situation: 'Medical Emergency',
      steps: [
        'Remain calm and assess the situation',
        'Call for help immediately',
        'Take the person to the camp clinic',
        'If serious, call emergency services',
        "Notify camp officials and the person's family",
      ],
    },
    {
      situation: 'Fire Emergency',
      steps: [
        'Raise the alarm immediately',
        'Evacuate the area calmly',
        'Call the fire service',
        'Use fire extinguishers if safe to do so',
        'Assemble at designated meeting points',
      ],
    },
    {
      situation: 'Security Threat',
      steps: [
        'Do not panic or confront the threat',
        'Alert security personnel immediately',
        'Move to a safe location',
        'Follow instructions from camp officials',
        'Report the incident properly',
      ],
    },
  ];

  const navigateTo = (page) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setCurrentPage(page);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };
  const bannerError = () => {
  
  console.log('Ad error occured ');
};

  const Header = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {currentPage !== 'home' && (
          <TouchableOpacity
            onPress={() => {
              navigateTo('home');
              setCurrentPage('home');
            }}
            style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>MetaEdge NYSC Guide</Text>
        <View style={styles.starContainer}>
          <Ionicons name="star" size={20} color="#FCD34D" />
        </View>
      </View>
    </View>
  );
  const getCategoryColor = (category) => {
    switch (category) {
      case 'NYSC':
        return '#4F46E5';
      case 'Nigeria':
        return '#008751';
      case 'SDG':
        return '#FF6B35';
      default:
        return '#6B7280';
    }
  };

  const DocumentCard = ({ document }) => (
    <TouchableOpacity
      style={styles.documentCard1}
      onPress={() => setSelectedDocument(document)}
      activeOpacity={0.7}>
      <View style={styles.cardHeader1}>
        <View style={styles.iconContainer1}>{document.icon}</View>
        <View style={styles.cardContent1}>
          <Text style={styles.documentTitle1}>{document.title}</Text>
          <Text style={styles.documentDescription1}>
            {document.description}
          </Text>
          <View
            style={[
              styles.categoryBadge1,
              { backgroundColor: getCategoryColor(document.category) + '20' },
            ]}>
            <Text
              style={[
                styles.categoryText1,
                { color: getCategoryColor(document.category) },
              ]}>
              {document.category}
            </Text>
          </View>
        </View>
        <ChevronRight size={20} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );

  const DocumentDetail = ({ document }) => (
    <View style={styles.documentDetail1}>
      <TouchableOpacity
        style={styles.backButton1}
        onPress={() => setSelectedDocument(null)}>
        <Text style={styles.backButtonText1}>← Back to Documents</Text>
      </TouchableOpacity>

      <View style={styles.detailHeader1}>
        <View style={styles.detailIconContainer1}>{document.icon}</View>
        <Text style={styles.detailTitle1}>{document.title}</Text>
        <View
          style={[
            styles.categoryBadge1,
            { backgroundColor: getCategoryColor(document.category) + '20' },
          ]}>
          <Text
            style={[
              styles.categoryText1,
              { color: getCategoryColor(document.category) },
            ]}>
            {document.category}
          </Text>
        </View>
      </View>

      <View style={styles.contentContainer1}>
        <Text style={styles.contentNote1}>📋 Official Content Notice</Text>
        <Text style={styles.contentText1}>{document.content}</Text>
        <Text style={styles.disclaimer1}>
          Note: This placeholder contents is sourced from official government
          documents and materials to ensure accuracy and compliance.
        </Text>
      </View>
    </View>
  );
  const OfficialDocuments = () => {
    return (
      <SafeAreaView style={styles.container1}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

        {!selectedDocument ? (
          <ScrollView
            style={styles.scrollView1}
            showsVerticalScrollIndicator={false}>
            <View style={styles.header1}>
              <Text style={styles.headerTitle1}>📜 Official Documents</Text>
              <Text style={styles.headerSubtitle1}>
                Access important national and organizational documents
              </Text>
            </View>

            <View style={styles.documentsGrid1}>
              {documents.map((document) => (
                <DocumentCard key={document.id} document={document} />
              ))}
            </View>

            <View style={styles.footer1}>
              <Text style={styles.footerText1}>
                All documents are official materials from their respective
                organizations
              </Text>
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            style={styles.scrollView1}
            showsVerticalScrollIndicator={false}>
            <DocumentDetail document={selectedDocument} />
          </ScrollView>
        )}
      </SafeAreaView>
    );
  };

  const HomePage = () => (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeIcon}>
            <Text style={styles.welcomeEmoji}>🎓</Text>
          </View>
          <Text style={styles.welcomeTitle}>Welcome to NYSC Camp!</Text>
          <Text style={styles.welcomeSubtitle}>
            Your complete guide to National Youth Service Corps
          </Text>
        </View>

        {/* Menu Cards */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigateTo(item.page);
                setCurrentPage(item.page);
              }}
              style={[styles.menuCard, { backgroundColor: item.color }]}
              activeOpacity={0.8}>
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={32} color="white" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="white" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Tips */}
        <View style={styles.tipsContainer}>
          <View style={styles.tipsHeader}>
            <Ionicons name="alert-circle" size={24} color="#059669" />
            <Text style={styles.tipsTitle}>Quick Tips</Text>
          </View>
          {quickTips.map((tip, index) => (
            <View key={index} style={styles.tipCard}>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Animated.View>
  );

  const CampGuidePage = () => (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pageHeader}>
          <Ionicons name="book" size={48} color="#059669" />
          <Text style={styles.pageTitle}>NYSC Camp Guide</Text>
          <Text style={styles.pageSubtitle}>
            Everything you need to know about camp life
          </Text>
        </View>

        {campGuideData.map((section, index) => (
          <View key={index} style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <Ionicons name="checkmark-circle" size={24} color="#059669" />
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            {section.content.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.contentItem}>
                <Text style={styles.contentTitle}>• {item.title}</Text>
                <Text style={styles.contentText}>{item.content}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </Animated.View>
  );
  const getMealColors = (mealType) => {
    switch (mealType.toLowerCase()) {
      case 'breakfast':
        return { background: '#FFF2B2', text: '#E68A00' }; // Honey Yellow
      case 'lunch':
        return { background: '#FFB6A0', text: '#B23A48' }; // Soft Coral
      case 'dinner':
        return { background: '#D4F8C4', text: '#3B7D3A' }; // Light Lime
      default:
        return { background: '#E0E0E0', text: '#333' }; // Fallback
    }
  };

  const FoodTablePage = () => (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pageHeader}>
          <Ionicons name="restaurant" size={48} color="#EA580C" />
          <Text style={styles.pageTitle}>Camp Food Timetable</Text>
          <Text style={styles.pageSubtitle}>
            Weekly meal schedule and nutrition info
            <View style={styles.headerNoteWrapper112}>
              <Text style={styles.headerNote112}>
                *Note:* Click on any meal to update.
              </Text>
            </View>
          </Text>
        </View>
        {timetable.map((day, index) => (
          <View key={index} style={styles.sectionCard}>
            <Text
              style={[
                styles.sectionTitle,
                { color: '#6B7280', textAlign: 'center' },
              ]}>
              {day.day}
            </Text>
            {day.meals.map((meal, mealIndex) => (
              <TouchableOpacity
                key={mealIndex}
                onPress={() => {
                  // Navigate to update page and pass meal details
                  setSelectedMeal({
                    day: day.day,
                    mealName: meal.meal,
                    currentDescription: meal.description,
                  });
                  setCurrentPage('updatefood');
                }}>
                <View style={styles.mealItem}>
                  <Text style={styles.mealTime}>{meal.time}</Text>
                  <View style={styles.mealDetails}>
                    <Text style={styles.mealName}>{meal.meal}</Text>
                    <Text style={styles.mealDescription}>
                      {meal.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="heart" size={24} color="#EA580C" />
            <Text style={[styles.sectionTitle, { color: '#EA580C' }]}>
              Nutrition Tips
            </Text>
          </View>
          {nutritionTips.map((tip, index) => (
            <View
              key={index}
              style={[styles.tipCard, { backgroundColor: '#FED7AA' }]}>
              <Text style={[styles.tipText, { color: '#9A3412' }]}>{tip}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Animated.View>
  );

  const OrientationPage = () => (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pageHeader}>
          <Ionicons name="calendar" size={48} color="#7C3AED" />
          <Text style={styles.pageTitle}>Orientation Programme</Text>
          <Text style={styles.pageSubtitle}>
            3-week structured camp activities
          </Text>
        </View>

        {orientationData.map((week, index) => (
          <View key={index} style={styles.sectionCard}>
            <Text style={[styles.sectionTitle, { color: '#7C3AED' }]}>
              {week.week}
            </Text>
            {week.activities.map((activity, actIndex) => (
              <View key={actIndex} style={styles.activityItem}>
                <View style={styles.activityHeader}>
                  <Text style={styles.activityName}>{activity.activity}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
                <Text style={styles.activityDescription}>
                  {activity.description}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </Animated.View>
  );

  const RulesPage = () => (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pageHeader}>
          <Ionicons name="shield-checkmark" size={48} color="#DC2626" />
          <Text style={styles.pageTitle}>Camp Rules & Regulations</Text>
          <Text style={styles.pageSubtitle}>
            Important guidelines for camp life
          </Text>
        </View>

        {campRules.map((category, index) => (
          <View key={index} style={styles.sectionCard}>
            <Text style={[styles.sectionTitle, { color: '#DC2626' }]}>
              {category.category}
            </Text>
            {category.rules.map((rule, ruleIndex) => (
              <View key={ruleIndex} style={styles.ruleItem}>
                <Text style={styles.ruleNumber}>{ruleIndex + 1}.</Text>
                <Text style={styles.ruleText}>{rule}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </Animated.View>
  );

  const ChecklistPage = () => (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pageHeader}>
          <Ionicons name="document-text" size={48} color="#2563EB" />
          <Text style={styles.pageTitle}>Camp Checklist</Text>
          <Text style={styles.pageSubtitle}>
            Essential items to bring to camp
          </Text>
        </View>

        {checklistData.map((category, index) => (
          <View key={index} style={styles.sectionCard}>
            <Text style={[styles.sectionTitle, { color: '#2563EB' }]}>
              {category.category}
            </Text>
            {category.items.map((item, itemIndex) => (
              <View key={itemIndex} style={styles.checklistItem}>
                <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
                <Text style={styles.checklistText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </Animated.View>
  );

  const EmergencyPage = () => (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pageHeader}>
          <Ionicons name="alert-circle" size={48} color="#DC2626" />
          <Text style={styles.pageTitle}>Emergency Information</Text>
          <Text style={styles.pageSubtitle}>
            Important contacts and procedures
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { color: '#DC2626' }]}>
            Emergency Contacts
          </Text>
          {emergencyContacts.map((contact, index) => (
            <View key={index} style={styles.emergencyItem}>
              <Text style={styles.emergencyService}>{contact.service}</Text>
              <Text style={styles.emergencyNumber}>{contact.number}</Text>
              <Text style={styles.emergencyDescription}>
                {contact.description}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { color: '#DC2626' }]}>
            Emergency Procedures
          </Text>
          {emergencyProcedures.map((procedure, index) => (
            <View key={index} style={styles.procedureItem}>
              <Text style={styles.procedureTitle}>{procedure.situation}</Text>
              {procedure.steps.map((step, stepIndex) => (
                <Text key={stepIndex} style={styles.procedureStep}>
                  {stepIndex + 1}. {step}
                </Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </Animated.View>
  );

  const StatesLGAPicker = () => {
    return (
      <View style={styles.picker19Container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

        <View style={styles.picker20Header}>
          <Text style={styles.picker21HeaderTitle}>Location Selector</Text>
          <Text style={styles.picker22HeaderSubtitle}>
            Choose your state and local government area
          </Text>
        </View>

        <View style={styles.picker23FormContainer}>
          <Text style={styles.picker24Label}>State</Text>
          <StateDropdown />

          <Text style={[styles.picker24Label, styles.picker25LabelSpacing]}>
            Local Government Areas
          </Text>

          {selectedState && (
            <View style={styles.picker7ModalOverlay}>
              <View style={styles.picker8ModalContent}>
                <View style={styles.picker9ModalHeader}>
                  <Text style={styles.picker10ModalTitle}>
                    LGA's in - {selectedState?.state}
                  </Text>
                </View>

                <ScrollView
                  style={styles.picker12ModalScrollView}
                  showsVerticalScrollIndicator={false}
                  bounces={true}>
                  {selectedState?.lgas.map((lga, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.picker13ModalItem,
                        selectedLGA === lga && styles.picker14SelectedItem,
                      ]}
                      activeOpacity={0.6}>
                      <Navigation
                        size={18}
                        color="#10b981"
                        style={styles.picker15ItemIcon}
                      />
                      <Text
                        style={[
                          styles.picker16ModalItemText,
                          selectedLGA === lga &&
                            styles.picker17SelectedItemText,
                        ]}>
                        {lga}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          )}
        </View>

        <StateModal />
        <LGAModal />
      </View>
    );
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedLGA(null);
    setShowStateModal(false);
  };

  const handleLGASelect = (lga) => {
    setSelectedLGA(lga);
    setShowLGAModal(false);
  };

  const StateDropdown = () => (
    <TouchableOpacity
      style={styles.picker1Dropdown}
      onPress={() => setShowStateModal(true)}
      activeOpacity={0.7}>
      <View style={styles.picker2DropdownContent}>
        <MapPin size={20} color="#6366f1" style={styles.picker3Icon} />
        <Text style={styles.picker4DropdownText}>
          {selectedState ? selectedState.state : 'Select State'}
        </Text>
        <ChevronDown size={20} color="#6b7280" />
      </View>
    </TouchableOpacity>
  );

  const LGADropdown = () => (
    <TouchableOpacity
      style={[
        styles.picker1Dropdown,
        !selectedState && styles.picker5DisabledDropdown,
      ]}
      onPress={() => selectedState && setShowLGAModal(true)}
      activeOpacity={selectedState ? 0.7 : 1}>
      <View style={styles.picker2DropdownContent}>
        <Navigation
          size={20}
          color={selectedState ? '#10b981' : '#9ca3af'}
          style={styles.picker3Icon}
        />
        <Text
          style={[
            styles.picker4DropdownText,
            !selectedState && styles.picker6DisabledText,
          ]}>
          {selectedLGA || 'Select LGA'}
        </Text>
        <ChevronDown size={20} color={selectedState ? '#6b7280' : '#9ca3af'} />
      </View>
    </TouchableOpacity>
  );

  const StateModal = () => (
    <Modal
      visible={showStateModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowStateModal(false)}>
      <View style={styles.picker7ModalOverlay}>
        <View style={styles.picker8ModalContent}>
          <View style={styles.picker9ModalHeader}>
            <Text style={styles.picker10ModalTitle}>Select State</Text>
            <TouchableOpacity
              onPress={() => setShowStateModal(false)}
              style={styles.picker11CloseButton}>
              <ChevronUp size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.picker12ModalScrollView}
            showsVerticalScrollIndicator={false}
            bounces={true}>
            {statesData.map((state, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.picker13ModalItem,
                  selectedState?.state === state.state &&
                    styles.picker14SelectedItem,
                ]}
                onPress={() => handleStateSelect(state)}
                activeOpacity={0.6}>
                <MapPin
                  size={18}
                  color="#6366f1"
                  style={styles.picker15ItemIcon}
                />
                <Text
                  style={[
                    styles.picker16ModalItemText,
                    selectedState?.state === state.state &&
                      styles.picker17SelectedItemText,
                  ]}>
                  {state.state}
                </Text>
                <Text style={styles.picker18LgaCount}>
                  {state.lgas.length} LGAs
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const LGAModal = () => (
    <Modal
      visible={showLGAModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowLGAModal(false)}>
      <View style={styles.picker7ModalOverlay}>
        <View style={styles.picker8ModalContent}>
          <View style={styles.picker9ModalHeader}>
            <Text style={styles.picker10ModalTitle}>
              Select LGA - {selectedState?.state}
            </Text>
            <TouchableOpacity
              onPress={() => setShowLGAModal(false)}
              style={styles.picker11CloseButton}>
              <ChevronUp size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.picker12ModalScrollView}
            showsVerticalScrollIndicator={false}
            bounces={true}>
            {selectedState?.lgas.map((lga, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.picker13ModalItem,
                  selectedLGA === lga && styles.picker14SelectedItem,
                ]}
                onPress={() => handleLGASelect(lga)}
                activeOpacity={0.6}>
                <Navigation
                  size={18}
                  color="#10b981"
                  style={styles.picker15ItemIcon}
                />
                <Text
                  style={[
                    styles.picker16ModalItemText,
                    selectedLGA === lga && styles.picker17SelectedItemText,
                  ]}>
                  {lga}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  //success Modal

  const SuccessModal = ({ message = 'Success!', onHide }) => {
    const slideAnim = useRef(new Animated.Value(-300)).current; // Start off-screen (left)

    useEffect(() => {
      if (visible) {
        // Slide in
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          // Auto-hide after 2 seconds
          setTimeout(() => {
            Animated.timing(slideAnim, {
              toValue: -300,
              duration: 500,
              useNativeDriver: true,
            }).start(() => {
              if (onHide) onHide();
            });
          }, 2000);
        });
      }
    }, [visible]);

    if (!visible) return null;

    return (
      <Animated.View
        style={[
          styles.container1123,
          { transform: [{ translateX: slideAnim }] },
        ]}>
        <Text style={styles.text112}>✅ {message}</Text>
      </Animated.View>
    );
  };

  // Update a specific meal (Breakfast, Lunch, Dinner)
  const updateMeal = async (day, mealName, newDescription) => {
    const table = await getFoodTimeTable();
    const updatedTable = table.map((item) => {
      if (item.day === day) {
        setUpdatedMealName(mealName);
        setUpdatedDay(day);
        return {
          ...item,
          meals: item.meals.map((meal) =>
            meal.meal === mealName
              ? { ...meal, description: newDescription }
              : meal
          ),
        };
      }
      return item;
    });

    await AsyncStorage.setItem('foodTimeTable', JSON.stringify(updatedTable));
    return updatedTable;
  };

  const UpdateMealScreen = () => {
    const { day, mealName, currentDescription } = selectedMeal || {};

    const [newDescription, setNewDescription] = useState(currentDescription);

    //setNewDescription(currentDescription)

    const handleSave = async () => {
      if (!newDescription.trim()) {
        alert('Please enter a description.');
        return;
      }

      await updateMeal(day, mealName, newDescription);
      getFoodTimeTable();
      setVisible(true);
      //alert(`${mealName} for ${day} updated!`);
      setCurrentPage('food'); // Go back to the timetable screen
    };

    return (
      <View style={styles.screenWrapper11}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton11}
          onPress={() => setCurrentPage('food')}>
          <Text style={styles.backButtonText11}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerText11}>
          Update your {day} {mealName}
        </Text>

        <TextInput
          value={newDescription}
          onChangeText={setNewDescription}
          placeholder={`Enter new ${mealName} description`}
          style={styles.inputBox11}
          multiline
        />

        <Button title="Save Changes" onPress={handleSave} />
        <Button
          title="Cancel"
          onPress={() => setCurrentPage('food')}
          color="gray"
        />
      </View>
    );
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'guide':
        return <CampGuidePage />;
      case 'food':
        return <FoodTablePage />;
      case 'updatefood':
        return <UpdateMealScreen />;
      case 'orientation':
        return <OrientationPage />;
      case 'rules':
        return <RulesPage />;
      case 'checklist':
        return <ChecklistPage />;
      case 'emergency':
        return <EmergencyPage />;
      case 'statesandlga':
        return <StatesLGAPicker />;
      case 'officialdoc':
        return <OfficialDocuments />;
      default:
        return <HomePage />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />
      <Header />

      {visible && (
        <SuccessModal
          message={`Your ${updatedMealName} Meal for ${updatedDay} updated successfully!`}
          onHide={() => setVisible(false)}
        />
      )}
      {renderCurrentPage()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#059669',
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: width - 32,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
  starContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  welcomeSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  welcomeIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#059669',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  welcomeEmoji: {
    fontSize: 40,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  menuContainer: {
    marginBottom: 24,
  },
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuIconContainer: {
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  tipsContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
    marginLeft: 8,
  },
  tipCard: {
    backgroundColor: '#ECFDF5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  tipText: {
    color: '#065F46',
    fontWeight: '500',
    fontSize: 14,
  },
  pageHeader: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 24,
    borderRadius: 16,
    marginVertical: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 12,
    textAlign: 'center',
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
    marginLeft: 8,
  },
  contentItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#D1FAE5',
    paddingLeft: 16,
    marginBottom: 16,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  mealItem: {
    flexDirection: 'row',
    backgroundColor: '#E6F4EA',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  mealTime: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7280',
    width: 60,
  },
  mealDetails: {
    flex: 1,
    marginLeft: 16,
  },
  mealName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 4,
  },
  mealDescription: {
    fontSize: 14,
    color: '#374151',
  },

  activityItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#DDD6FE',
    paddingLeft: 16,
    marginBottom: 16,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  activityTime: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7C3AED',
  },
  activityDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  ruleItem: {
    flexDirection: 'row',
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  ruleNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#DC2626',
    width: 24,
  },
  ruleText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  checklistText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  emergencyItem: {
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  emergencyService: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  emergencyNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 8,
  },
  emergencyDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  procedureItem: {
    borderLeftWidth: 4,
    borderLeftColor: '#FCA5A5',
    paddingLeft: 16,
    marginBottom: 16,
  },
  procedureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  procedureStep: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  picker19Container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 5,
  },
  picker20Header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  picker21HeaderTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  picker22HeaderSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  picker23FormContainer: {
    padding: 20,
    flex: 1,
  },
  picker24Label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  picker25LabelSpacing: {
    marginTop: 24,
  },
  picker1Dropdown: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  picker5DisabledDropdown: {
    backgroundColor: '#f3f4f6',
    borderColor: '#d1d5db',
  },
  picker2DropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker4DropdownText: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 12,
    fontWeight: '500',
  },
  picker6DisabledText: {
    color: '#9ca3af',
  },
  picker3Icon: {
    marginRight: 8,
  },
  picker7ModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  picker8ModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: height * 0.8,
    paddingTop: 20,
  },
  picker9ModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  picker10ModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  picker11CloseButton: {
    padding: 8,
  },
  picker12ModalScrollView: {
    paddingHorizontal: 20,
  },
  picker13ModalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f9fafb',
  },
  picker14SelectedItem: {
    backgroundColor: '#eff6ff',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  picker15ItemIcon: {
    marginRight: 12,
  },
  picker16ModalItemText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  picker17SelectedItemText: {
    color: '#1d4ed8',
    fontWeight: '600',
  },
  picker18LgaCount: {
    fontSize: 12,
    color: '#6b7280',
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: '500',
  },
  picker26SelectionSummary: {
    marginTop: 32,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  picker27SummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  picker28SummaryContent: {
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  picker29SummaryState: {
    fontSize: 16,
    color: '#1e40af',
    fontWeight: '600',
    marginBottom: 4,
  },
  picker30SummaryLGA: {
    fontSize: 14,
    color: '#1e40af',
  },
  container1: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView1: {
    flex: 1,
  },
  header1: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle1: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    flexShrink: 1,
    flexWrap: 'nowrap',
  },
  headerSubtitle1: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 22,
  },
  documentsGrid1: {
    padding: 20,
    paddingTop: 10,
  },
  documentCard1: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader1: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer1: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent1: {
    flex: 1,
  },
  documentTitle1: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  documentDescription1: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
  },
  categoryBadge1: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText1: {
    fontSize: 12,
    fontWeight: '600',
  },
  documentDetail1: {
    padding: 20,
  },
  backButton1: {
    marginBottom: 20,
  },
  backButtonText1: {
    fontSize: 16,
    color: '#4F46E5',
    fontWeight: '500',
  },
  detailHeader1: {
    alignItems: 'center',
    marginBottom: 30,
  },
  detailIconContainer1: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailTitle1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12,
  },
  contentContainer1: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  contentNote1: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  contentText1: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 20,
  },
  disclaimer1: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  footer1: {
    padding: 20,
    paddingTop: 10,
  },
  footerText1: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  screenWrapper11: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton11: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  backButtonText11: {
    fontSize: 16,
    color: '#333',
  },
  headerText11: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputBox11: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    minHeight: 80,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#000',
  },
  container1123: {
    position: 'absolute',
    top: 90,
    left: 2,
    height: 30,
    width: 350,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  text112: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 10,
  },
  headerNoteWrapper112: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerNote112: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#6B7280',
    fontWeight: 'bold',
  },
  container123: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title123: {
    fontSize: 20,
    marginBottom: 20,
  },
  adContainernew: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  bottomBanner: {
    position: "absolute",
    bottom: 0
  },
});

export default MetaEdgeNYSCGuide;
