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
    };

    return job_search_param[query_job];
}