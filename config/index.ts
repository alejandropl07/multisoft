const startingPrice = 1000;

const config = {
    testMode: false,
    appName: "Multisoft",
    appDescription: "Multisoft",
    domainName: "www.Multisoft.com",
    logo: "/logo-white.png",
    contactEmail: 'support@Multisoft.com',
    appTitle: "Multisoft",
    ogTitle: "Multisoft",
    seoKeywords: "Multisoft, real estate leads, real estate lead generation, real estate lead capture, real estate lead management, real estate lead nurturing, real estate lead conversion, real estate lead funnel, real estate lead magnet, real estate lead qualification, real estate lead scoring, real estate lead tracking, real estate lead follow-up, real estate lead pipeline, real estate lead database, real estate lead analytics, real estate lead reporting, real estate lead dashboard, real estate lead distribution, real estate lead routing, real estate lead segmentation, real estate lead targeting, real estate lead generation software, real estate lead generation tools, real estate lead generation websites, real estate lead generation services, real estate lead generation companies",
    auth: {
        loginUrl: '/login',
        redirectUrl: '/redirect',
    },
    showBadges: true,
    showGuarantee: false,
    firebaseConfig: {
        apiKey: "AIzaSyARMtPwqLjKGbWIwVYquIlrpTi8LAMhNcU",
        authDomain: "luxuryprospectapp.firebaseapp.com",
        projectId: "luxuryprospectapp",
        storageBucket: "luxuryprospectapp.appspot.com",
        messagingSenderId: "689472001331",
        appId: "1:689472001331:web:27b580a771fcf2c45b1a46",
        measurementId: "G-M97QRXW2G2"
    },
    mapbox: {
        userName: 'certileads',
        accessToken: 'pk.eyJ1IjoiY2VydGlsZWFkcyIsImEiOiJjbDV6aHZsYjYwaHp6M2xueWdoenZieXFlIn0.B0pWB9DgUSJ8JZShpYvjYQ',
        style: 'mapbox://styles/certileads/clzsv0w3900mo01pc4gjhapvu',
        styleId: 'clzsv0w3900mo01pc4gjhapvu',
    },
    earningsPercent: 50, // 50% of the revenue goes to Ads
    pricing: {
        minimumPrice: startingPrice,
        maximumPrice: 2500, //only in case zipCode Data is not available
        yearlyDiscount: 50, // 20%
        pricingIncrementMonthly: 50,
        minimumEnterprisePrice: 5000,
    },
    costs: {
        sellerLeadCost: 30,
        buyerLeadCost: 30,
    },
    hideNavbarIn: [
        '/homevalue',
        '/buy',
    ],
    staticNavbar: [
        '/dashboard',
        '/pricing',
        '/support',
        '/billing-terms',
        '/privacy-policy',
        '/redirect',
        '/success',
        '/terms',
        '/zapier',
    ],
    signOutNavbarBtn: [
        '/dashboard',
    ],
    hideFooterIn: [
        '/pricing',
        '/homevalue',
        '/buy',
    ],
    shortFooter: [
        '/dashboard',
        '/homevalue',
        '/buy',
        '/support',
        '/billing-terms',
        '/privacy-policy',
        '/redirect',
        '/success',
        '/terms',
        '/zapier',
    ],
    facts: {
        users: 2100,
        leads: 152, //will add k+
        roi: 12, //will x
    },
    googleMapsApiKey: "AIzaSyDAdP2bX_HvU4yI4iFBy9oEQNQiyxURakU",
    estimateBasedOnSkatePark: true,  // skatePark, zipCode
    skateParkUrl: 'https://buyerleadsestimate-b4bolevgzq-uc.a.run.app',// add zip parameter to get leads for a specific zip code
    skateParkCheckDistance: 20, // miles
    skateParkMinimumLeads: 5, // minimum number of leads to trigger a campaign Activation
    executiveTeam: [
        {
            id: 1,
            name: 'Alex Walsh',
            image: '/img/avatars/t3.jpg',
            designation: 'CEO',
            description: 'Alex loves dogs, pizza and web development.'
        },
        {
            id: 2,
            name: 'Sarah Rice',
            image: '/img/avatars/t2.jpg',
            designation: 'Marketing Manager',
            description: 'Sarah is a cat person, crazy about coffee and running ads.'
        },
        {
            id: 3,
            name: 'William Thompson',
            image: '/img/avatars/t1.jpg',
            designation: 'Sales Manager',
            description: 'Will loves burgers, shakes and sales funnels.'
        },
        {
            id: 4,
            name: 'Jackie Sanders',
            image: '/img/avatars/t4.jpg',
            designation: 'Customer Success Manager',
            description: 'Jackie also loves dogs, sushi and talking to people.'
        }
    ],
    aboutUsFAQs: [
        [
            {
                no: 'One',
                expand: true,
                heading: `What's our mission?`,
                body: `Our mission is to help real estate agents and brokers grow their business by providing them with a simple and affordable way to generate leads.`
            },
            {
                no: 'Two',
                expand: true,
                heading: `What's our vision?`,
                body: `Our vision is very simple, we want to be the top choice for real estate agents and brokers when it comes to lead generation.`
            },
            {
                no: 'Three',
                expand: true,
                heading: 'How long have we been in business?',
                body: `We started as a small team of 3 friends back in 2018, all of them real estate agents from Miami, Florida. Initially started to help other agents in the same brokerage, and the word started to spread, team leaders and managing brokers from other firms started to reach out to us, and before we knew it, we had a successful business in our hands.`
            }
        ],
        [
            {
                no: 'Four',
                expand: true,
                heading: 'What makes us different?',
                body: `We follow the Amazon model, we are customer obsessed, we are constantly listening to our customers and improving our product based on their feedback. We understand that lead generation is a very important part of your business, and we take it very seriously.`
            },
            {
                no: 'Five',
                expand: true,
                heading: 'What should you expect from us?',
                body: `You should expect a simple and affordable way to generate leads, and a team that is always available to help you. We are here to help you grow your business.`
            },
            {
                no: 'Six',
                expand: true,
                heading: `Anything else you'd like to know?`,
                body: `Want to do enterprise level business with us? Have a question about our product? Want to know more about our team? Send us an email to support@connekter.com and we'll get back to you as soon as possible.`
            }
        ]
    ],
    aboutUsHiring: [
        {
            link: '?#',
            time: 'Full-time',
            title: 'Support Agent',
            avatar: 'C',
            location: 'Remote, US',
            avatarColor: 'bg-primary',
        },
        {
            link: '?#',
            time: 'Full-time',
            title: 'Sales Agent',
            avatar: 'S',
            location: 'Remote, US',
            avatarColor: 'bg-success',
        },
        {
            link: '?#',
            time: 'Full-time',
            title: 'Ad Account Manager',
            avatar: 'A',
            location: 'Remote, US',
            avatarColor: 'bg-warning',
        },
        {
            link: '?#',
            time: 'Full-time',
            title: 'Full-Stack Developer',
            avatar: 'D',
            location: 'Remote, US',
            avatarColor: 'bg-danger',
        },//Regional Sales Manager
        {
            link: '?#',
            time: 'Part-time',
            title: 'Regional Sales Representative',
            avatar: 'R',
            location: 'Miami, FL',
            avatarColor: 'bg-info',
        },
        {
            link: '?#',
            time: 'Part-time',
            title: 'Regional Sales Representative',
            avatar: 'R',
            location: 'Los Angeles, CA',
            avatarColor: 'bg-info',
        },
        {
            link: '?#',
            time: 'Part-time',
            title: 'Regional Sales Representative',
            avatar: 'R',
            location: 'New York, NY',
            avatarColor: 'bg-info',
        },
        {
            link: '?#',
            time: 'Part-time',
            title: 'Regional Sales Representative',
            avatar: 'R',
            location: 'Houston, TX',
            avatarColor: 'bg-info',
        },
        {
            link: '?#',
            time: 'Part-time',
            title: 'Regional Sales Representative',
            avatar: 'R',
            location: 'Chicago, IL',
            avatarColor: 'bg-info',
        },
        {
            link: '?#',
            time: 'Part-time',
            title: 'Regional Sales Representative',
            avatar: 'R',
            location: 'Phoenix, AZ',
            avatarColor: 'bg-info',
        },
        {
            link: '?#',
            time: 'Part-time',
            title: 'Regional Sales Representative',
            avatar: 'R',
            location: 'Philadelphia, PA',
            avatarColor: 'bg-info',
        },
        {
            link: '?#',
            time: 'Part-time',
            title: 'Regional Sales Representative',
            avatar: 'R',
            location: 'San Antonio, TX',
            avatarColor: 'bg-info',
        },

    ],
    featuredTestimonials: [
        {
            company: "Steven Anderson",
            position: "Realtor®",
            background: "#FFED4E",
            text: "I'm using Luxuryprospect and they get me consistent leads. I now feel as if the team at Luxuryprospect is a core part of my operation and I will certainly be working with them moving forward."
        },
        {
            company: "Mary Adams",
            position: "Team Leader",
            background: "#00FCFC",
            text: "They helped us design a outreach plan that worked for us and got results. Their team are professional and very effective. Great experience and great results."
        },
        {
            company: "Omar Ali",
            position: "Realtor®",
            background: "#F27AFF",
            text: "I have been using Luxuryprospect for a few months now and I am very happy with the results. They have been able to generate leads for me consistently and I have been able to close deals as a result."
        },
        {
            company: "Sara Johnson",
            position: "Realtor®",
            background: "#52C1FF",
            text: "Many thanks to the team at Luxuryprospect for providing me with solid and profitable real estate leads. I highly recommend them to anyone who needs help with generating real estate leads."
        },
    ],
    hoursForCheckoutDisplay: 4,
    numberOfCheckoutSessions: 1,
    toDoList: [ //Do not change list without changing the code in the Dashboard. Specifically, the DashboardToDoList.tsx component
        {
            name: 'Start your first lead generation campaign',
            href: '/dashboard/leads',
            icon: 'person-lines-fill',
            class: 'success',
        },
        {
            name: 'Complete your Profile',
            href: '/dashboard/profile',
            icon: 'person-bounding-box',
            class: 'warning',
        },
        {
            name: 'Connect your CRM',
            href: '/dashboard/integrations',
            icon: 'puzzle',
            class: 'danger',
        },
        {
            name: 'Set up your Notifications',
            href: '/dashboard/settings',
            icon: 'people-fill',
            class: 'info',
        }
    ],
    dashboardLeadsStatus: {
        default: {
            name: 'New',
            value: 'new',
            class: 'info',
        },
        options: [
            {
                name: 'New',
                value: 'new',
                class: 'bg-pale-sky',
            },
            {
                name: 'Contacted',
                value: 'contacted',
                class: 'bg-soft-green',
            },
            {
                name: 'Not Contacted',
                value: 'not_contacted',
                class: 'bg-soft-ash',
            },
            {
                name: 'Qualified',
                value: 'qualified',
                class: 'bg-soft-leaf',
            },
            {
                name: 'Unqualified',
                value: 'unqualified',
                class: 'bg-soft-ash',
            },
            {
                name: 'Closed Deal',
                value: 'closed_deal',
                class: 'bg-soft-green',
            },
            {
                name: 'Not Interested',
                value: 'not_interested',
                class: 'bg-soft-ash',
            },
        ]
    },
    dashboardPropertyKeysLabels: [
        {
            key: 'formatted_street_address',
            label: 'Address',
            icon: 'bi bi-house-fill',

        },
        {
            key: 'city',
            label: 'City',
            icon: 'bi bi-geo-alt-fill',
        },
        {
            key: 'state',
            label: 'State',
            icon: 'bi bi-geo-alt-fill',
        },
        {
            key: 'zip_code',
            label: 'Zip Code',
            icon: 'bi bi-geo-alt-fill',
        },
        {
            key: 'beds_count',
            label: 'Beds',
            icon: 'bi bi-bed',
        },
        {
            key: 'baths_count',
            label: 'Baths',
            icon: 'bi bi-shower',
        },
    ],
    homeValueQuestions: {
        step3: {
            question: 'Are you the owner of this property?',
            helper: 'Select "Yes" if you are inquiring on behalf of the owner.',
            field: 'owner',
            answers: [
                {
                    label: 'Yes',
                    value: true,
                    class: 'btn btn-primary btn-lg',
                },
                {
                    label: 'No',
                    value: true,
                    class: 'btn btn-secondary btn-lg',
                },
            ]
        },
        step4: {
            question: 'What is the physical condition of the property?',
            helper: 'Select the option that best describes the property’s condition.',
            field: 'condition',
            answers: [
                {
                    label: 'Excellent',
                    value: 'excellent',
                    class: 'btn btn-primary btn-lg',
                },
                {
                    label: 'Good',
                    value: 'good',
                    class: 'btn btn-primary btn-lg',
                },
                {
                    label: 'Fair',
                    value: 'fair',
                    class: 'btn btn-warning btn-lg',
                },
                {
                    label: 'Poor',
                    value: 'poor',
                    class: 'btn btn-danger btn-lg',
                },
            ]
        },
        step5: {
            question: 'What is your timeframe?',
            helper: 'Select the option that best describes your timeframe to sell or refinance.',
            field: 'timeframe',
            answers: [
                {
                    label: 'ASAP',
                    value: 'asap',
                    class: 'btn btn-primary btn-lg',
                },
                {
                    label: '0-3 Months',
                    value: '0-3',
                    class: 'btn btn-primary btn-lg',
                },
                {
                    label: '3-6 Months',
                    value: '3-6',
                    class: 'btn btn-warning btn-lg',
                },
                {
                    label: '6+ Months',
                    value: '6+',
                    class: 'btn btn-danger btn-lg',
                },
                {
                    label: 'Not Sure',
                    value: 'not_sure',
                    class: 'btn btn-secondary btn-lg',
                }
            ]
        },
        step6: {
            question: 'Have you done any recent renovations?',
            helper: 'Public records may not reflect recent renovations and your home value may be higher than estimated.',
            field: 'renovations',
            answers: [
                {
                    label: 'No Renovations',
                    value: 'no_renovations',
                    class: 'btn btn-warning btn-lg',
                },
                {
                    label: 'Minor Renovations',
                    value: 'minor_renovations',
                    class: 'btn btn-primary btn-lg',
                },
                {
                    label: 'Major Renovations',
                    value: 'major_renovations',
                    class: 'btn btn-primary btn-lg',
                },
            ]
        }
    },
    homeValueFAQs: [
        {
            title: 'What is a Home Value Report?',
            content: 'A Home Value Report is a detailed report that includes the estimated value of your home, comparables, market trends, and more. It provides a comprehensive view of what your home is worth in today’s market.',
        },
        {
            title: 'How accurate is the Home Value Report?',
            content: 'The Home Value Report is based on the most up-to-date public record and proprietary data. It is the most accurate estimate available, and is an excellent way to understand your home’s value in today’s market.',
        },
        {
            title: 'What is the difference between a Home Value Report and an appraisal?',
            content: 'A Home Value Report is a comprehensive report that provides a detailed analysis of your home’s value. An appraisal is a certified appraiser’s calculation of the value of your home at a given point in time. In most cases, the two values are within a few percentage points of each other.',
        },
        {
            title: 'What is the difference between a Home Value Report and a comparative market analysis (CMA)?',
            content: 'A Home Value Report is a comprehensive report that provides a detailed analysis of your home’s value. A CMA is created by a real estate agent and is based on their professional knowledge of the local market and comparable properties. In most cases, the two values are within a few percentage points of each other.',
        },
        {
            title: 'How often is the Home Value Report updated?',
            content: 'The Home Value Report is updated daily.',
        },
        {
            title: 'How can I get a copy of my Home Value Report?',
            content: 'You can download a copy of your Home Value Report by clicking the “Download Report” button on the top right of the report.',
        },
        {
            title: 'How can I share my Home Value Report?',
            content: 'You can share your Home Value Report by clicking the “Share Report” button on the top right of the report.',
        },
    ],
    publicProfile: {
        inputs: [
            {
                name: 'name',
                label: 'Name',
                type: 'text',
                placeholder: 'Enter your name',
                id: 'publicName',
            },
            {
                name: 'email',
                label: 'Email',
                type: 'email',
                placeholder: 'Enter your email',
                id: 'publicEmail',
            },
            {
                name: 'phone',
                label: 'Phone',
                type: 'tel',
                placeholder: 'Enter your phone',
                id: 'publicPhone',
            },
            {
                name: 'license',
                label: 'License',
                type: 'text',
                placeholder: 'Enter your license',
                id: 'publicLicense',
            },
            {
                name: 'broker',
                label: 'Broker',
                type: 'text',
                placeholder: 'Enter your broker',
                id: 'publicBroker',
            },
            {
                name: 'website',
                label: 'Website',
                type: 'url',
                placeholder: 'Enter your website',
                id: 'publicWebsite',
            },
            {
                name: 'facebook',
                label: 'Facebook URL',
                type: 'url',
                placeholder: 'Enter your facebook',
                id: 'publicFacebook',
            },
            {
                name: 'instagram',
                label: 'Instagram URL',
                type: 'url',
                placeholder: 'Enter your instagram',
                id: 'publicInstagram',
            },
            {
                name: 'linkedin',
                label: 'Linkedin URL',
                type: 'url',
                placeholder: 'Enter your linkedin',
                id: 'publicLinkedin',
            },
            {
                name: 'twitter',
                label: 'Twitter/X URL',
                type: 'url',
                placeholder: 'Enter your twitter',
                id: 'publicTwitter',
            },
            {
                name: 'youtube',
                label: 'Youtube Channel URL',
                type: 'url',
                placeholder: 'Enter your youtube',
                id: 'publicYoutube',
            },
            {
                name: 'youtubeVideo',
                label: 'Youtube Video URL',
                type: 'url',
                placeholder: 'Enter your youtube video',
                id: 'publicYoutubeVideo',
            },

        ],
        textareas: [
            {
                name: 'bio',
                label: 'Bio',
                placeholder: 'Enter your bio',
                id: 'publicBio',
            }
        ],
        sellerFAQs: [
            {
                no: 'One',
                expand: false,
                heading: 'How does my REALTOR® determine how much my home is worth?',
                body: `Licensed real estate agents estimate the fair market value of a property by doing a Comparable Market Analysis (CMA). With this method, the agent uses the Multiple Listing Service (MLS) to locate the three (or more) homes that have sold in the last 6 months that are the most comparable to your home. Then they make adjustments for the ways in which your home is different from each of the others, and then average the adjusted values. The CMA adjustments are very subjective, and there is great variation between REALTORS® as to how much detail they include and the number and amount of the adjustments they make, so be sure to ask any prospective REALTOR® to explain their CMA in detail.`
            },
            {
                no: 'Two',
                expand: false,
                heading: 'Is A Yard Sign And Lockbox Absolutely Necessary?',
                body: `When selling a home the more exposure the home gets, the greater the chances the property will sell quickly. However, it is not essential to place a sign in the yard or a lockbox on the door.  Sometimes sellers don’t want their neighbors finding out they are selling their home so they prefer not to use a yard sign.  And some sellers are very concerned about security and don’t want a lockbox on the door. If you decide not to use a yard sign and/or lockbox, be sure to communicate that to your agent before the listing agreement is signed. Your agent will make a note to this effect in the MLS listing. Of course, sellers must be aware that homes often sell to buyers driving through the neighborhood. Without a yard sign, those opportunities are lost to the seller. In addition, by not allowing a lockbox, the seller or listing agent must make themselves available every time the property is shown which may result in some potential buyers not seeing the property because schedules cannot be coordinated.`
            },
            {
                no: 'Three',
                expand: false,
                heading: 'Can I stay in the house while it’s being shown to a prospective buyer?',
                body: `Unless it is absolutely necessary (such as in the case of an elderly family member who is not mobile), you should NOT be present when your home is shown to prospective buyers. A buyer chooses to purchase a home because they can envision themselves living in it. If you are there, even if you are outside, they feel like an intruder! Even if you just meet them at the door and graciously tell them to take their time while you walk around the block – it is still your house in their mind. The best way to handle it is to coordinate the timing with the agent showing your property and leave the house before they arrive with their buyers. If you have a pet, take them with you. One option is to just get in your car and park in a nearby parking lot and have the buyer’s agent text you when they leave.`
            },
            {
                no: 'Four',
                expand: false,
                heading: 'Do I have to complete a Seller’s property disclosure?',
                body: `In most states, when property defects or environmental hazards are not disclosed to the buyer, the seller is guilty of misrepresentation if those issues are not readily observable by the buyer. The buyer may be able to rescind the sales contract or if the sale has already closed they can sue you for damages. Please consult with your agent and/or attorney to determine what your state requires.`
            },
            {
                no: 'Five',
                expand: false,
                heading: 'How can I be assured that my buyers will really be able to get a loan?',
                body: `Your agent should require that the prospective buyer provide a letter from their lender along with their offer.  That letter should state a dollar amount, type of loan, and terms of the loan that they are qualified to receive. There are two types of these letters – one is called a “pre-approval” and the other is called a “pre-qualification”.  While, the lender will check the buyer’s credit before issuing either of these letters, a pre-approval is better than a pre-qualification. Before issuing a pre-approval the lender will generally require the buyer to provide documentation of their sources of income, but with a pre-qualification they will just accept what the buyer tells them.`
            },
            {
                no: 'Six',
                expand: false,
                heading: 'Should I still allow my house to be shown after I have a signed contract from a buyer?',
                body: `The answer to this question really depends on the circumstances. The purpose of continuing to show your home is to try to elicit a back-up offer that can be immediately enacted if the original sales contract falls through. If you aren’t living in the home there is likely not a downside to having it shown. However, if you are still living there, these showings may continue to disrupt your life. Talk to your agent about whether they recommend this in your circumstances. If it is imperative you sell quickly, it might be worth the aggravation to continue to allow your home to be shown. It may also be a good idea if you have reason to believe that your buyers may have difficulty obtaining loan approval or if you have concern that the buyers may back out after the inspection.`
            },
            {
                no: 'Seven',
                expand: false,
                heading: 'What is the best way to prepare my home for showings?',
                body: `The best way to prepare your home for showings is to make sure it is clean and uncluttered. If you have a lot of furniture, consider putting some of it in storage. You want your home to look as spacious as possible. If you have a lot of personal items such as family photos, consider putting them away. You want the buyer to be able to envision themselves living in your home. If you have pets, make sure that the house is free of pet odors and that your pets are not in the house when it is being shown.`
            },
            {
                no: 'Eight',
                expand: false,
                heading: 'How can I make my home more appealing to buyers?',
                body: `The best way to make your home more appealing to buyers is to make sure it is clean and uncluttered. If you have a lot of furniture, consider putting some of it in storage. You want your home to look as spacious as possible. If you have a lot of personal items such as family photos, consider putting them away. You want the buyer to be able to envision themselves living in your home. If you have pets, make sure that the house is free of pet odors and that your pets are not in the house when it is being shown.`
            },
            {
                no: 'Nine',
                expand: false,
                heading: 'What is the best way to prepare my home for showings?',
                body: `The best way to prepare your home for showings is to make sure it is clean and uncluttered. If you have a lot of furniture, consider putting some of it in storage. You want your home to look as spacious as possible. If you have a lot of personal items such as family photos, consider putting them away. You want the buyer to be able to envision themselves living in your home. If you have pets, make sure that the house is free of pet odors and that your pets are not in the house when it is being shown.`
            },
        ],
        buyerFAQs: [
            {
                no: 'One',
                expand: false,
                heading: 'What is the MLS?',
                body: `“MLS” stands for Multiple Listing Service. Homes that are listed with a REALTOR® are input into the MLS and then sent out for syndication to other websites. Then other sites such as Realtor.com, Zillow.com, Homes.com, etc., and even other sites owned by individual brokerages can display all the homes that are available in the county.`
            },
            {
                no: 'Two',
                expand: false,
                heading: 'What determines the value of a home?',
                body: `Recent sales of comparable homes, along with current supply and demand, are what determine the market value of a home. Your REALTOR® can do an analysis of the home you are interested in purchasing to see if it is priced appropriately.`
            },
            {
                no: 'Three',
                expand: false,
                heading: 'When do I need to get a mortgage loan approval?',
                body: `Before looking at any homes you should contact a mortgage lender to determine how much of a home you can qualify to purchase. You will need to understand all the costs you will be incurring and how much your monthly payments will be (including taxes and insurance) for whatever price point of home you are considering. It is very depressing to see homes that you love just to find out they are out of your price range! After you’ve spoken to a lender and provided them some documentation, they will give you a letter stating that you have been pre-qualified/approved for a mortgage up to a specified amount. `
            },
            {
                no: 'Four',
                expand: false,
                heading: 'Is it best to go to my local bank to get a mortgage?',
                body: `We highly recommend that you go with a local mortgage broker, not an internet lender and not necessarily where you bank locally. The reason you want to go with someone local is that you can count on better customer service because that lender gets their business from word-of-mouth not from advertising. If they don’t provide excellent service they will not be getting more business and they know that. The reason you may not necessarily want to go with the local bank where you keep your accounts is two-fold. First, the customer service representative at your local bank very likely does not deal in mortgages and the person they refer you to (especially with larger banks) may not be local. But also, by going directly to a bank you will not have the same number of mortgage options to choose from and may miss out on a product that would be great for you. By contrast, a good mortgage broker will work with many banks and private money lenders, and therefore will be able to offer you more alternatives. Ask your REALTOR® to give you some names of local lenders they recommend.`
            },
            {
                no: 'Five',
                expand: false,
                heading: 'Must I put down an earnest money deposit?',
                body: `In almost all cases a seller will expect a buyer to put money into escrow to show they are serious about purchasing the home. There are contingences within the sales contract that will allow the buyer to get their money back in certain instances (for example, they change their mind in the inspection period or they get denied the loan). However, the seller will want assurance that the buyer will not back out of the deal for no reason at the last minute. If that were to happen, the seller may be entitled to keep the deposit. Typically, the seller will expect a deposit equal to around 1% of the purchase price.`
            },
            {
                no: 'Six',
                expand: false,
                heading: 'How much will my closing costs be?',
                body: `Ask your lender to provide you with an estimate of closing costs. When you purchase a home with a mortgage, the vast majority of closing costs that are traditionally paid by the buyer are related to the loan. If you do not think you will have enough cash to cover the down payment on the loan and the closing costs, then it may be possible to negotiate with the seller to pay some of your closing costs (of course they will expect to recoup that amount in a higher sales price).`
            },
            {
                no: 'Seven',
                expand: false,
                heading: 'Do I need a home inspection? ',
                body: `Yes, you should get a home inspection. Depending on the home, numerous inspections may be advisable (such as a pool inspection or septic inspection) Buying a home may be the largest single investment you will ever make. You should know what you are getting before you buy it. A home inspection will help identify the need for major repairs, as well as the need for maintenance to keep it in good shape. A good home inspector will not only point out major problems, he/she will tell you what to do and what to buy to fix minor issues after you move in.`
            },
            {
                no: 'Eight',
                expand: false,
                heading: 'When do I need to arrange for homeowner’s insurance?',
                body: `You can start looking for insurance immediately upon identifying the home you want to purchase. In fact, it is recommended that you know how much your insurance will be prior to the end of the inspection period. If the insurance is going to be significantly more than you expected you may feel the need to cancel the purchase.`
            },
            {
                no: 'Nine',
                expand: false,
                heading: 'What if I am interested in a home that is for-sale-by-owner?',
                body: `If you are working with a REALTOR®, do not approach the owner directly. Once you do that, you’ve cut your REALTOR® out of the process and they will no longer be able to assist you if you choose to purchase that home. Most sellers are willing to work with a REALTOR®, but the REALTOR® must contact the owner first and work out the arrangements before you go to see the home. So, if you come across a for-sale-by-owner home that you are interested in, send the information to your REALTOR® and let them make the arrangements.`
            },
        ]
    },
    pricingTableOptions: {
        monthly: [
            // {
            //     icon: "/images/icon/icon_56.svg",
            //     plan: "Starter Plan",
            //     features: [
            //     "Buyer Leads Only",
            //     "Limited Budget",
            //     "Low Volume",
            //     ],
            //     price: 500,
            //     leadsMin: 16,
            //     leadsMax: 36,
            //     marketshare: 20,
            //     className: "pr-column pr-one",
            //     leadType: 'Buyer',
            // },
            // {
            //     icon: "/images/icon/icon_57.svg",
            //     plan: "Silver Plan",
            //     features: [
            //     "Buyer & Seller Leads",
            //     "Enough Budget",
            //     "Medium Volume",
            //     "High ROI",
            //     ],
            //     price: 750,
            //     leadsMin:  39,
            //     leadsMax:  60,
            //     marketshare: 40,
            //     className: "pr-column pr-two",
            //     leadType: 'Both',
            // },
            {
                icon: "/images/icon/icon_58.svg",
                plan: "Gold Plan",
                features: [
                    "Buyer & Seller Leads",
                    "Better Lead Quality",
                    "High Volume",
                ],
                price: 750,
                leadsMin: 54,
                leadsMax: 76,
                marketshare: 60,
                className: "pr-column pr-two",
                leadType: 'Both',
            },
            {
                icon: "/images/icon/icon_59.svg",
                plan: "Diamond Plan",
                features: [
                    "Buyer and Seller Leads",
                    "Best Lead Quality",
                    "More Listings",
                ],
                highlightedFeatures: [
                    "Includes 5 Zip Codes",
                ],
                price: 1500,
                leadsMin: 80,
                leadsMax: 200,
                marketshare: 100,
                className: "pr-column pr-three",
                leadType: 'Both',
            },
        ],
        promotions: [
            {
                label: 'Month-to-Month',
                description: 'No long-term commitment',
                interval: 'month',
                intervalCount: 1,
                isPreferred: false,
                backgroundColor: '#decd8769',
                multiply: 1
            },
            {
                label: 'Every 6 Months',
                description: 'Pay for 3 months, get 3 free',
                interval: 'month',
                intervalCount: 6,
                isPreferred: true,
                backgroundColor: '#a6b1f969',
                multiply: 3
            },
            {
                label: 'Yearly Commitment',
                description: 'Pay for 6 months, get 6 free',
                interval: 'year',
                intervalCount: 1,
                isPreferred: false,
                backgroundColor: '#de878769',
                multiply: 6
            }
        ],
    },
    faq: [
        {
            id: "faq-1",
            question: "How do you capture seller leads?",
            answer:
                `Our approach utilizes more than 200 landing pages dedicated to attracting seller leads. By running targeted Google ads crafted by our marketing experts, we aim to reach a high caliber of potential sellers. Constant experimentation with our forms, copywriting, and targeting strategies ensures we maximize the number of pre-qualified leads. The ad campaigns are expertly managed and adjusted regularly to optimize results.`
        },
        {
            id: "faq-2",
            question: "How do you capture buyer leads?",
            answer:
                "In collaboration with specialists from Meta, we execute targeted ad campaigns to direct qualified traffic to our landing pages. Here, we gather details on their home search preferences and contact information, facilitating connections with them. Additionally, we employ retargeting ads to study consumer behaviors closely, allowing us to engage effectively with prospective clients."
        },
        {
            id: "faq-3",
            question: "Are the leads exclusive?",
            answer:
                `Absolutely! The buyer and seller leads generated are exclusively for you; we ensure that no lead is shared with another agent or brokerage. Even if leads inquire about properties outside your designated area, they remain exclusive to you. It's crucial to engage with leads promptly, as they may seek assistance from other agents using the services of our competitors if not contacted swiftly.`,
        },
        {
            id: "faq-4",
            question: "How will I receive my lead notifications?",
            answer:
                `Lead notifications are delivered through SMS, email and Zapier — it's important that these details are accurately provided in your profile. Additionally, you can monitor all lead information via your Dashboard, which displays their contact details, properties, and lead status. This feature allows you to track and update your interactions with each lead efficiently.`,
        },
        {
            id: "faq-5",
            question: "I’m getting more leads than forecasted, do I have to pay more?",
            answer:
                `No! We will never charge you more than the plan you signed up for. If you’re getting more leads than expected, it’s because our campaigns are performing better than expected. Enjoy the extra leads!`,
        },
        {
            id: "faq-6",
            question: "Are my ads targeted by zip code?",
            answer:
                `Due to recent policy changes by Google and Meta, following discrimination concerns, targeting by age, gender, or zip code in U.S. housing ads has been removed. We've adapted by targeting broader regions of your choice, ensuring compliance while aiming for effective reach. For targeting, we use a minimum radius strategy, which might include leads from adjacent zip codes.`
        },
        {
            id: "faq-7",
            question: "Do you require a contract? What's your cancellation policy?",
            answer:
                `Our services are offered without binding you to a contract, allowing you the freedom to manage your finances and cancel at your discretion. Subscription cancellations can be easily processed through your dashboard, without the need for signatures or explanations.`
        },
    ],
    // HomePage
    serviceData: [
        {
            iconUrl: '/images/icons/service_icon_1.svg',
            title: 'Conversion-Optimized Campaigns',
            subTitle:
                'Our campaigns utilize a mix of compelling text, eye-catching images, and engaging videos, all designed to maximize lead conversion rates.',
            imgUrl: '/images/service_1_new.webp',
        },
        {
            iconUrl: '/images/icons/service_icon_2.svg',
            title: 'Targeted Lead Acquisition',
            subTitle:
                'We identify and engage potential clients actively searching for real estate in your area, capturing their interest before they connect with other agents.',
            imgUrl: '/images/service_1_dark_500.webp',
        },
        {
            iconUrl: '/images/icons/service_icon_3.svg',
            title: 'Value-Driven Lead Magnets',
            subTitle:
                'We offer valuable resources such as free home evaluations and exclusive market insights to incentivize potential clients to share their contact information.',
            imgUrl: '/images/service_5.webp',
        },
        {
            iconUrl: '/images/icons/service_icon_4.svg',
            title: 'Integrate Your Tools Seamlessly',
            subTitle:
                'Our platform seamlessly integrates with popular CRM systems, ensuring that your leads are automatically added to your workflow for efficient follow-up.',
            imgUrl: '/images/service_4.webp',
        },
        /* 
          {
            title: 'Automated Lead Management',
            subTitle:
              'We provide a robust CRM system to efficiently track and nurture your leads, with seamless integration capabilities for over 5000 apps to streamline your lead conversion process.',
          },
          {
            title: 'Multi-Channel Lead Generation',
            subTitle:
              'We diversify your lead sources by implementing strategies across various platforms, including social media, search engines, and targeted email campaigns.',
          },
        */
    ],
    faqData: [
        {
            title: 'How many zip codes can I cover?',
            desc: "As many as you can handle! Our platform allows you to select the zip codes you want to target, with the flexibility to adjust your coverage based on your capacity and growth goals. Whether you're focused on a single neighborhood or expanding citywide, we can accommodate your needs.",
        },
        {
            title: 'What is your pricing and specials?',
            desc: `Our starting price for most zip codes is $${startingPrice}, which is enough to make sure our ad campaigns work effectively. We also offer promotions for longer commitments, such as 3 months free with a 6-month subscription. We're happy to discuss your specific needs and provide a customized quote.`,
        },
        {
            title: 'Are all leads exclusive with Luxury Prospect?',
            desc: "Yes, all leads generated through our campaigns are exclusive to you. We never share leads with other agents or brokerages, ensuring that you have the best chance of converting them into clients. We're committed to helping you grow your business, succeed and reinvest in more leads.",
        },
        {
            title: 'Timeframe of lead delivery',
            desc: "Luxury Prospect typically delivers leads within the first week of campaign launch, depending on your chosen budget and target market. Our goal is to provide a steady stream of high-quality leads to fuel your sales pipeline and help you achieve your business objectives.",
        },
        {
            title: 'Where do your leads come from?',
            desc: "Our leads are generated through targeted ad campaigns on popular platforms such as Google, Facebook, and Instagram. We use advanced targeting strategies to reach potential clients actively searching for real estate in your area, ensuring that the leads we deliver are highly qualified and ready to engage.",
        },
        {
            title: 'How many agents can run ads in each zip code?',
            desc: "Usually 2-3, depending on the market and it's demand. We limit the number of agents per zip code to ensure that you have the best chance of converting leads into clients. By reducing competition within each area, we help you stand out and maximize your return on investment.",
        },
        {
            title: 'Can leads be shared among team members?',
            desc: "Yes, you can set up multiple contacts to receive lead notifications, allowing you to share leads with team members or assistants. This feature ensures that everyone on your team is informed and can follow up promptly, increasing your chances of converting leads into clients.",
        },
        /* 
        {
          question: "Can I customize the lead criteria for my business?",
          answer: "Absolutely! We work closely with you to understand your target market and ideal customer profile. You can specify criteria such as industry, company size, job titles, geographic location, and even specific pain points or interests. Our system then targets and qualifies leads based on these custom parameters."
        },
        {
          question: "How many leads can I expect to receive?",
          answer: "The number of leads varies based on your chosen plan and industry. Our basic plans typically deliver 20-50 qualified leads per month, while more comprehensive packages can provide 100+ leads monthly. We'll work with you to determine a volume that aligns with your sales capacity and growth goals."
        },
        {
          question: "Is there a contract or can I cancel anytime?",
          answer: "We offer flexible subscription options. While we do have contracts available for those who prefer locked-in rates, we also offer month-to-month plans that you can cancel at any time. Our goal is to earn your business every month by delivering value, not by locking you into long-term commitments."
        },
        {
          question: "How does pricing work?",
          answer: "Our pricing is transparent and based on the number and quality of leads you require. We offer tiered packages to suit different business sizes and needs. Prices typically range from $500 to $5000 per month, depending on volume and customization. We're happy to provide a detailed quote based on your specific requirements."
        },
        {
          question: "Can your service integrate with my existing CRM?",
          answer: "Yes, our service is designed to integrate seamlessly with most popular CRM platforms, including Salesforce, HubSpot, and Pipedrive. This ensures that new leads are automatically added to your existing workflow, saving time and reducing manual data entry."
        },
        {
          question: "How quickly can I get started?",
          answer: "Once you decide to move forward, we can typically have your campaign set up and generating leads within 1-2 weeks. This includes a thorough onboarding process where we'll define your ideal customer profile, set up any necessary integrations, and fine-tune your lead generation strategy."
        }
        */
    ],
    testimonialData: [
        {
            imgUrl: '/images/agent_1.webp',
            subTitle:
            //talk about seller leads in early stages
                "We have closed 10 listings in the first 6 months with Luxury Prospect, and although all not all the leads convert quickly we are filling up our pipeline with future business.",
            rating: '4.8',
            designation: 'Real Estate Agent',
            name: 'Sophia Lee',
        },
        {
            imgUrl: '/images/agent_2.webp',
            subTitle:
                //talk about finance ready leads
                "Most of the leads we receive have the income and a high intent to buy. We've closed several deals with LuxuryProspect leads and are looking forward to more.",
            rating: '5',
            designation: 'Managing Broker',
            name: 'Rachel Adams',
        },
        {
            imgUrl: '/images/agent_3.webp',
            subTitle:
                "My team loves your leads! If you had more zip codes available we would buy them all. We are closing deals and growing our business with Luxury Prospect.",
            rating: '4.2',
            designation: 'Team Leader',
            name: 'Emilio Carter',
        },
    ],
    stepData: [
        {
            imgUrl: '/images/map_2.webp',
            title: 'Check Availability & Pricing',
            desc: 'We use an interactive map to show you the available zip codes in your area, allowing you to select the ones you want to target. Pricing is transparent and based on the number of leads you need.',
            step: '01',
        },
        {
            imgUrl: '/images/notifications_1.webp',
            title: 'Checkout & Onboarding',
            desc: `Once you've selected your zip codes and set your budget, you can complete the checkout process online. Then complete your profile and set up your notification settings to start receiving leads.`,
            step: '02',
        },
        {
            imgUrl: '/images/alerts_1.webp',
            title: 'Connect with Qualified Leads',
            desc: 'Our platform will start delivering high-quality leads directly to you. Engage with them promptly to maximize your chances of converting them into clients and closing deals. Reinvest in more leads to scale your business.',
            step: '03',
        },
    ],
    videoData: {
        imgSrc: '/images/video_block.jpeg',
        bgImgUrl: '/images/video_block_shape.jpeg',
        videoSrc: 'https:/www.youtube.com/embed/0Tz4Ycjbdbg',
        title: 'Unlock Your Path to Premium <br /> Real Estate Leads',
    },
    // about
    aboutTestimonialData: [
        /* {
          imgUrl: '/images/avatar_3.png',
          rating: '5',
          desc: "LuxuryProspect has been instrumental in scaling my real estate business. Their lead generation system is incredibly efficient, providing a steady stream of high-quality leads that convert quickly. Their support team is always responsive and helpful, making the entire process seamless.",
          name: 'Jordan Mitchell',
          designation: 'Real Estate Consultant',
        }, */
        {
            imgUrl: '/images/agent_1.webp',
            desc:
            //talk about seller leads in early stages
                "We have closed 10 listings in the first 6 months, and although all not all the leads convert quickly we are filling up our pipeline with future business.",
            rating: '4.8',
            designation: 'Real Estate Agent',
            name: 'Sophia Lee',
        },
        {
            imgUrl: '/images/agent_2.webp',
            desc:
                //talk about finance ready leads
                "Most of the leads we receive have the income and a high intent to buy. We've closed several deals with LuxuryProspect leads and are looking forward to more.",
            rating: '5',
            designation: 'Managing Broker',
            name: 'Rachel Adams',
        },
        {
            imgUrl: '/images/agent_3.webp',
            desc:
                "My team loves your leads! If you had more zip codes available we would buy them all. We are closing deals and growing our business.",
            rating: '4.2',
            designation: 'Team Leader',
            name: 'Emilio Carter',
        },
        
    ],
    teamData: [
        {
            imgUrl: '/images/team_member_1.jpeg',
            name: 'Ralph Edwards',
            designation: 'CEO & Founder',
            srcUrl: '/team/team-details',
        },
        {
            imgUrl: '/images/team_member_2.jpeg',
            name: 'Wade Warren',
            designation: 'Marketing Coordinator',
            srcUrl: '/team/team-details',
        },
        {
            imgUrl: '/images/team_member_3.jpeg',
            name: 'Jane Cooper',
            designation: 'Sales Manager',
            srcUrl: '/team/team-details',
        },
    ]
};


export default config;