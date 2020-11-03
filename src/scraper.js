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
    var internships = [];
    elements.forEach(async (node) => {
        let title = (await (await node.$eval(".heading_4_5 a",title => {return title.innerText})));
        let link = "https://internshala.com/" + (await (await node.$eval(".heading_4_5 a",link => {return link.getAttribute("href")})));
        let internship_individual = {
            "title": title,
            "link": link,
        };
        internships.push(internship_individual);
        console.log(internship_individual);
    });
    return internships;
}

function url_generate(queryoptions){
    var jobs = "";
    queryoptions.jobs.forEach((val) => {
        jobs += job_match(val) + ",";
    });
    let url = "https://internshala.com/internships/"+jobs+"-internship";
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