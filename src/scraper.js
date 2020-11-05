const puppeteer = require("puppeteer");

module.exports.query_result = function(queryoptions){
    let url = url_generate(queryoptions);

    return new Promise((resolve,reject) => {
        resolve(browseractions(url))
    });
}

async function browseractions(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    console.log(url)
    const elements =  await page.$$("#internship_list_container_1 .individual_internship");

    return job_array_generate(elements);
}

async function job_array_generate(dom_elements){
    const internships =  dom_elements.map(async (node) => {
        let title = (await node.$eval(".heading_4_5 a",title => {return title.innerText}));
        let link = "https://internshala.com" + (await node.$eval(".heading_4_5 a",link => {return link.getAttribute("href")}));
        let location = (await node.$eval(".location_link",location => {return location.innerText}));
        let start_date = (await node.$eval(".start_immediately_desktop",start_date => {return start_date.innerText}));
        let apply_by = (await node.$eval(".apply_by .item_body",apply_by => {return apply_by.innerText}));
        let stipend = "₹" + (await node.$eval(".stipend",stipend => {return stipend.innerText}));

        let internship_individual = {
            "title": title,
            "link": link,
            "location": location,
            "startdate": start_date,
            "stipend": stipend,
            "applyby": apply_by,
        };

        return internship_individual;
    });

    return await Promise.all(internships);
};

function url_generate(queryoptions){
    var pre_url = "https://internshala.com/internships/";
    let url = "";
    var jobs = "";

    queryoptions.jobs.forEach((val) => {
        jobs += job_match(val) + ",";
    });

    if(queryoptions.work_from_home){
        pre_url += "work-from-home-";
        url = pre_url+jobs+"-jobs";
    }else{
        url = pre_url+jobs+"-internship";
    }

    if(queryoptions.locations){
        url += "-in-";

        queryoptions.locations.forEach((val) => {
            url += val.toLowerCase() + ",";
        });

        url += "/";
    }else{
        url += "/";
    }

    url += "duration-" + queryoptions.max_duration.toString() + "/";

    url += "start_date-" + queryoptions.start_date.split("-").join("") + "/";

    if(queryoptions.job_offer){
        url += "ppo-true/"
    }

    return url;
}

function job_match(query_job){
    const job_search_param = {
        ".NET Development": ".net development",
        "3D Printing": "3d printing",
        "Accounts": "accounts",
        "Acting": "acting",
        "Aerospace Engineering": "aerospace",
        "Agriculture & Food Engineering": "agriculture and food engineering",
        "Analytics": "analytics",
        "Android App Development": "android",
        "Angular.js Development": "angular.js development",
        "Animation": "animation",
        "Architecture": "architecture",
        "Artificial Intelligence (AI)": "artificial intelligence (ai)",
        "ASP.NET Development": "asp.net",
        "Automobile Engineering": "automobile engineering",
        "Backend Development": "backend development",
        "Big Data": "big data",
        "Bioinformatics": "bioinformatics",
        "Biology": "biology",
        "Biotechnology Engineering": "biotech",
        "Blogging": "blogging",
        "Brand Management": "brand management",
        "CAD Design": "cad design",
        "Campus Ambassador": "campus ambassador",
        "Chartered Accountancy (CA)": "chartered accountancy (ca)",
        "Chemical Engineering": "chemical",
        "Chemistry": "chemistry",
        "Cinematography": "cinematography",
        "Civil Engineering": "civil",
        "Client Services": "client servicing",
        "Cloud Computing": "cloud computing",
        "Commerce": "commerce",
        "Company Secretary (CS)": "company secretary (cs)",
        "Computer Vision": "computer vision",
        "Content Writing": "content writing",
        "Copywriting": "copywriting",
        "Creative Writing": "creative writing",
        "Custom Service": "customer service",
        "Cyber Security": "cyber security",
        "Data Entry": "data entry",
        "Data Science": "data science",
        "Database Building": "database building",
        "Design": "design",
        "Digital Marketing": "digital marketing",
        "Editorial": "editorial",
        "Electrical Engineering": "electrical",
        "Electronics Engineering": "electronics",
        "Embedded Systems": "embedded systems",
        "Energy Science & Engineering": "energy science and engineering",
        "Engineering": "engineering",
        "Engineering Design": "engineering design",
        "Engineering Physics": "Engineering Physics",
        "Environmental Sciences": "environmental sciences",
        "Event Management": "event management",
        "Facebook Marketing": "facebook marketing",
        "Fashion Design": "fashion design",
        "Film Making": "film making",
        "Finance": "finance",
        "Front End Development": "front end development",
        "Full Stack Development": "full stack development",
        "Fundraising": "fundraising",
        "Game Development": "game development",
        "General Management": "general management",
        "Government": "government",
        "Graphic Design": "graphic design",
        "Hospitability": "hospitability",
        "Hotel Management": "hotel management",
        "Human Resources (HR)": "hr",
        "Humanities": "humanities",
        "Image Processing": "image processing",
        "Industrial & Production Engineering": "industrial and production engineering",
        "Industrial Design": "industrial design",
        "Information Technology": "information technology",
        "Instrumentation & Control Engineering": "instrumentation and control engineering",
        "Interior Design": "interior design",
        "Internt of Things (IoT)": "internet of things (iot)",
        "iOS App Development": "ios",
        "Java Development": "java development",
        "Javascript Development": "javascript development",
        "Journalism": "journalism",
        "Law": "law",
        "Legal Research": "legal research",
        "Machine Learning": "machine learning",
        "Magento Development": "magento development",
        "Manufacturing Engineering": "manufacturing engineering",
        "Market/Business Research": "market/business research",
        "Marketing": "marketing",
        "Material Science": "material science",
        "Mathematics": "mathematics",
        "MBA": "mba",
        "Mechanical Engineering": "mechanical",
        "Mechatronics": "mechatronics",
        "Media": "media",
        "Medicine": "medicine",
        "Merchandise Design": "merchandise design",
        "Mobile App Development": "mobile app development",
        "Motion Graphics": "motion graphics",
        "Naval Architecture and Ocean Engineering": "naval and ocean",
        "Network Engineering": "network engineering",
        "ngo": "ngo",
        "Node.js Development": "node.js development",
        "Operations": "operations",
        "Pharmaceutical": "pharmaceutical",
        "Photography": "photography",
        "PHP Development": "php development",
        "Physics": "physics",
        "Political/Economics/Policy Research": "political/economics/policy research",
        "Public Relations (PR)": "pr",
        "Product Management": "product",
        "Programming": "programming",
        "Psychology": "psychology",
        "Python/Django Development": "python/django",
        "Recruitment": "recruitment",
        "Robotics": "robotics",
        "Ruby on Rails": "ruby on rails",
        "Sales": "sales",
        "Science": "science",
        "Search Engine Optimization (SEO)": "search engine optimization (seo)",
        "Social Media Marketing": "social media marketing",
        "Social Work": "social work",
        "Software Development": "software development",
        "Software Testing": "software testing",
        "Statistics": "statistics",
        "Strategy": "strategy",
        "Supply Chain Management (SCM)": "supply chain management",
        "Talent Acquisition": "talent acquisition",
        "Teaching": "teaching",
        "Telecalling": "telecalling",
        "Travel & Tourism": "travel and tourism",
        "UI/UX Design": "ui/ux",
        "Video Making/Editing": "video making/editing",
        "Videography": "videography",
        "Volunteering": "volunteering",
        "Web Development": "web development",
        "Wordpress Development": "wordpress development",
    };

    return job_search_param[query_job];
}