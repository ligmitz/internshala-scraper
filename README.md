# Internshala-scraper

### A Node.js package for scraping internships from [Internshala.com](https://internshala.com/)

## Note:

Internshala is subject to changes in UI/UX and their back-end. Hence the package may develop issues in long run. To help keep up this package up-to-date with the current Internshala schema, feel free to open up issues and related PR's to resolve them!

## Installation

You can install using [npm](https://www.npmjs.com/package/internshala-scraper).

```quote
npm install internshala-scraper
```

Include the package

```
const internshala = require('internshala-scraper');
```

Creating a query:

```
(async () => {
    const queryFields = {
        "jobs": ["3D Printing","Accounts"],
        "work_from_home": true,
        "start_date": "2020-11-04",
        "max_duration": 6,
        "job_offer": false,
        "locations": ["Delhi","Mumbai"],
    }

    internshala.query(queryFields).then((res)=> {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });

})();
```

query() takes a _queryFileds_ object as parameter and returns a Promise of an array of _internships_ objects.

- **queryFields** object:
  - **jobs** - *array* - An array of different internship categories.
  - **work_from_home** - _boolean_ - Whether to search in work from home category. - Default: _false_
  - **start_date** - *string* - When to start working from. - Format: *YYYY-MM-DD*. For **immediately** as response, keep this as the current day's date.
  - **max_duration** - _positive integer_ - The maximum duration of internship.
  - **job_offer** - *boolean* - Whether to search for job offering internships. Default: _false_
  - **locations** - _array of strings_ - An array of locations to perform specific search on. Default: _empty_ 

- **internships** object:
  - **title** - _string_ - Title of the internship.
  - **link** - _string_ - Link directed to the internship details.
  - **location** - _string_ - Location of the internship.
  - **startdate** - _string_ - The start date of the internship.
  - **stipend** - _string_ - Stipend for the internship.
  - **applyby** - _string_ - The date to apply latest to the internship.

**jobs** array can contain any of the below given categories:
- .NET Development
- 3D Printing
- Accounts
- Acting
- Aerospace Engineering
- Agriculture & Food Engineering
- Analytics
- Android App Development
- Angular.js Development
- Animation
- Architecture
- Artificial Intelligence (AI)
- ASP.NET Development
- Automobile Engineering
- Backend Development
- Big Data
- Bioinformatics
- Biology
- Biotechnology Engineering
- Blogging
- Brand Management
- CAD Design
- Campus Ambassador
- Chartered Accountancy (CA)
- Chemical Engineering
- Chemistry
- Cinematography
- Civil Engineering
- Client Services
- Cloud Computing
- Commerce
- Company Secretary (CS)
- Computer Vision
- Content Writing
- Copywriting
- Creative Writing
- Custom Service
- Cyber Security
- Data Entry
- Data Science
- Database Building
- Design"
- Digital Marketing
- Editorial
- Electrical Engineering
- Electronics Engineering
- Embedded Systems
- Energy Science & Engineering
- Engineering
- Engineering Design
- Engineering Physics
- Environmental Sciences
- Event Management
- Facebook Marketing
- Fashion Design
- Film Making
- Finance
- Front End Development
- Full Stack Development
- Fundraising
- Game Development
- General Management
- Government
- Graphic Design
- Hospitability
- Hotel Management
- Human Resources (HR)
- Humanities
- Image Processing
- Industrial & Production Engineering
- Industrial Design
- Information Technology
- Instrumentation & Control Engineering
- Interior Design
- Internt of Things (IoT)
- iOS App Development
- Java Development
- Javascript Development
- Journalism
- Law
- Legal Research
- Machine Learning
- Magento Development
- Manufacturing Engineering,
- Market/Business Research
- Marketing
- Material Science
- Mathematics
- MBA
- Mechanical Engineering
- Mechatronics
- Media
- Medicine
- Merchandise Design
- Mobile App Development
- Motion Graphics
- Naval Architecture and Ocean Engineering
- Network Engineering
- ngo
- Node.js Development
- Operations
- Pharmaceutical
- Photography
- PHP Development
- Physics
- Political/Economics/Policy Research
- Public Relations (PR)
- Product Management
- Programming
- Psychology
- Python/Django Development
- Recruitment
- Robotics
- Ruby on Rails
- Sales
- Science
- Search Engine Optimization (SEO)
- Social Media Marketing
- Social Work
- Software Development
- Software Testing
- Statistics
- Strategy
- Supply Chain Management (SCM)
- Talent Acquisition
- Teaching
- Telecalling
- Travel & Tourism
- UI/UX Design
- Video Making/Editing
- Videography
- Volunteering
- Web Development
- Wordpress Development

## Contributing

Feel free to contribute to the package!

1. Clone or fork the repository
2. Make a new branch on local repo.
3. Make and commit changes.
4. Submit a pull request.
