# search-history
a tool for exploring 3 years of google searches
final project for Data Visualization @ CMU, Fall 2019

# important!
This project uses a dataset with my personal Google search history. 
For confidentiality purposes, I have not included the full dataset in this repo. 
I originally ran the demo with the full dataset on Netlify. However (2020), I am no longer running that demo. 

I may take this netlify site down after the project is graded. For this reason, I am including the deliverables (process slides, code, video, etc.) in this README below instead of on the netlify site. 

In this repo, the code includes a *censored* dataset that does not include any of the search text. In order to run the project on your own device, you will need to use your own dataset (or contact me!)

# This project is a tool for self-reflection. Here's how to use your own dataset: 
- download & clean your google search history! You will want a csv file of all your activity. Google allows you to download every search term, as well as every webpages visited. For this project, I chose to omit the webpages and focus only on the things I searched for.
- in assets folder, replace the csv file with your own. Make sure it includes the same column headers (or update them throughout the code). You may want to replace StacyLogo.png with your own as well.
- (in sketch.js: 96) change '10413' to however big your dataset is. I hard coded it here so things would run faster. 
- (in sketch.js: 193) update feelingLucky array to whatever you want those choices to be! You can choose from anything you want...even the whole dataset. As long as it's an array, should be fine. 

# The code
All code is written by me, using p5.js
The original 'Concordance' refers to a demo by [Daniel Shiffman](https://shiffman.github.io/A2Z-F17/week5-analysis/01_concordance/). I kept the class name (in concordance.js) but fully customized the code inside to look for keywords. 

# Deliverables
- [**Process Slides:**](https://www.notion.so/Storytelling-with-my-Data-824b5a20585243748639861cfba1deee#bcef5235f73241a2b9e86b2320bb8312)
- **Code:** 'datavis-gh' folder in this repo
- [**Working visualization:**](https://distracted-hamilton-eb023d.netlify.com) (inactive)
- [**Demo video:**](https://vimeo.com/377110944)
