import define1 from "./a33468b95d0b15b0@817.js";

function _1(md){return(
md`# Comparative Examination of Governance and Political Stability Across Asian and European Countries`
)}

function _2(md){return(
md`## Dataset
The dataset sourced from the World Bank database contains percentile rank data on key governance indicators for both European and Asian countries, spanning from 2003 to 2022. It encompasses dimensions such as "Regulatory Quality," "Rule of Law," "Voice and Accountability," "Political Stability and Absence of Violence/Terrorism," "Government Effectiveness," and "Control of Corruption."

Utilizing this dataset, we develop interactive visualizations using Plotly, HTML, and D3. These visualizations include line charts, bar graphs, and heatmaps, offering diverse perspectives on global governance trends across different countries and over time.

The line charts focus on individual countries, illustrating trends in governance indicators over consecutive years. Users can select a specific country to observe its annual percentile ranks, facilitating the identification of improvements or setbacks in crucial governance areas.

Heatmaps provide a snapshot of multiple countries' governance metrics for a selected year. Through color-coded representations, they allow for swift comparison of performance across various governance dimensions, aiding in the identification of leading and lagging nations.

These visualizations serve as crucial tools for understanding global governance trends, providing insights into disparities and interactions among governance factors. They enable comparative assessments and deeper insights into the evolving landscape of governance, thereby assisting policymakers and analysts in comprehending governance dynamics and assessing a country's performance.`
)}

function _corruptionDataAsiaAndEurope_(__query,FileAttachment,invalidation){return(
__query(FileAttachment("Corruption data asia and europe_.csv"),{from:{table:"Corruption data asia and europe_"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _4(md){return(
md`## 1. Grouped Bar Graph:`
)}

function _5(md){return(
md`In the grouped bar graph, each country's performance across six parameters is depicted over the timeline from 2003 to 2022:

 - **Afghanistan** demonstrates a robust voice and accountability, but struggles with political stability and combating corruption.
  
- **Germany** **and** **France** generally maintain stability across multiple aspects, although their political stability remains relatively lower.
  
- **Kazakhstan** consistently shows a restrained voice and limited accountability.
  
- **Ukraine** notably exhibits deteriorating political stability and rule of law, particularly after 2016.`
)}

function _selectcountry1(Inputs,country){return(
Inputs.select(country, {label: "select a country"})
)}

function _year3(Inputs){return(
Inputs.range([2003, 2022], { value: 2003, label: "Year", step: 1 })
)}

function _8(htl){return(
htl.html`html\`<div id="grpChart"></div>\``
)}

function _9(md){return(
md`## 2. Map:`
)}

function _10(md){return(
md`## 2. Cholropeth Map:`
)}

function _11(md){return(
md`The choropleth maps illustrate the degree of "Control of Corruption" for each country included in the dataset:

- Darker hues represent stronger control over corruption, while lighter hues indicate weaker control.
  
- Throughout the timeline, European countries consistently demonstrate superior control over corruption when compared to their Asian counterparts. The darker tones observed across Europe imply more effective anti-corruption measures, whereas the lighter shades in Asian countries suggest relatively lower levels of corruption control over the entire period analyzed.`
)}

function _year4(Inputs){return(
Inputs.range([2003, 2022], { value: 2003, label: "Year", step: 1 })
)}

function _13(year4,d3,corruptionDataAsiaAndEurope_,mergedData,Legend)
{
  const width = 800;
  const height = 500;
  const legendWidth = 22;
  const legendHeight = 210;
  const legendX = width - 55;
  const legendY = height - 40;
  const countriesToHide = [""]; // Add country IDs to hide if needed
  const selectedYear = year4; // Replace with the desired year

  // Define the initial projection settings
  let projection = d3.geoOrthographic().translate([width / 2, height / 2]).scale(250).rotate([0, 0]);
  let path = d3.geoPath(projection);

  // Define a color scale using blues for better readability for colorblind individuals
  const color = d3.scaleSequential()
    .interpolator(d3.interpolateReds)
    .domain([0, 100]); // Adjust the domain based on your data range

  // Extract country names from your data to filter features
  const countryNames = new Set(corruptionDataAsiaAndEurope_.map(d => d["Country Name"]));
  const countriesInData = new Set(corruptionDataAsiaAndEurope_.map(d => d["Country Name"]));
  const legendScale = d3.scaleLinear().range([legendHeight, 0]);

  const svg = d3.create("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height);

  const g = svg.append("g");

  // Add a circle to simulate the globe
  g.append("circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", projection.scale())
    .attr("fill", "lightblue")
    .attr("stroke", "none");

  // Function to update the map based on the selected year
  function updateMap() {
    const filteredData = corruptionDataAsiaAndEurope_
      .filter(d => d.Year === selectedYear)
      .map(d => ({
        Country: d["Country Name"],
        value: d["Control of Corruption: Percentile Rank"],
      }));

    // Update the color scale domain based on the filtered data
    color.domain([d3.min(filteredData, d => d.value), d3.max(filteredData, d => d.value)]);
    legendScale.domain([d3.min(filteredData, d => d.value), d3.max(filteredData, d => d.value)]);

    // Add event listeners for hover effect and update country paths
    g.selectAll("path")
      .data(mergedData.features.filter(d => !countriesToHide.includes(d.id)))
      .join("path")
      .attr("d", path)
      .attr("fill", d => {
        const value = parseFloat(d.properties.value);
        return countriesInData.has(d.properties.name) ? color(value) : "lightgray";
      })
      .attr("stroke", "black")
      .attr("stroke-width", 0.5)
      .on("mouseover", function (event, d) {
        d3.select(this)
          .attr("fill", "yellow") // Change the color when hovering
          .attr("stroke-width", 1); // Adjust stroke width
        // Additional actions while hovering (e.g., tooltip, etc.)
      })
      .on("mouseout", function () {
        d3.select(this)
          .attr("fill", d => {
            // Reset the fill color based on data when not hovering
            const value = parseFloat(d.properties.value);
            return countriesInData.has(d.properties.name) ? color(value) : "lightgray";
          })
          .attr("stroke-width", 0.5); // Reset stroke width
        // Additional actions after hovering (e.g., hide tooltip, etc.)
      })
      .append("title")
      .text(d => {
        // Tooltip text when hovering
        const value = parseFloat(d.properties.value);
        return `${d.properties.name}: Control of Corruption (${selectedYear}) ${value.toFixed(3) || 0}%`;
      });
  }

  // Attach click-and-drag functionality to rotate the globe
svg.call(d3.drag().subject(subject)
  .on("drag", dragged));

// Function to update the globe rotation based on drag
function dragged(event, d) {
  const rotate = projection.rotate();
  const k = 2; // Adjustment factor for sensitivity
  projection.rotate([
    rotate[0] + event.dx / k,
    rotate[1] - event.dy / k
  ]);
  path = d3.geoPath(projection);

  // Update map on drag
  g.selectAll("path")
    .attr("d", path);
}

// Function to get coordinates for dragging
function subject(event, d) {
  const p = projection.invert([event.x, event.y]);
  return { x: p[0], y: p[1] };
}

updateMap();

svg.append("text")
  .attr("x", width / 2)
  .attr("y", 52)
  .attr("text-anchor", "middle")
  .attr("font-weight", "bold")
  .attr("font-size", "22px")
  .text("Control of Corruption: Percentile Rank");

// Create a color gradient for the legend
const gradient = svg.append("defs").append("linearGradient")
  .attr("id", "gradient")
  .attr("x1", "0%")
  .attr("y1", "100%")
  .attr("x2", "0%")
  .attr("y2", "0%")
  .attr("spreadMethod", "pad");

// Your gradient stops here

// Create the legend
svg.append("g")
  .attr("transform", "translate(20,0)")
  .append(() => Legend(color, { title: d => `Control of Corruption (${selectedYear}) (%)`, width: 260 }));

// Add legend scale
svg.append("g")
  .attr("transform", `translate(${legendX + legendWidth + 6},${legendY})`)
  .call(d3.axisRight(legendScale).ticks(5));

return svg.node();
}


function _14(md){return(
md`## Scatter Plot`
)}

function _15(md){return(
md`The scatter plot provides a visual summary of governance indicators across different countries.

a. **Afghanistan, Tajikistan, and Uzbekistan** consistently display low values across all governance parameters.

b. Conversely, **Denmark, Netherlands, and Switzerland** consistently achieve outstanding performance, demonstrating the highest values across these parameters from 2003 to 2022.

c. In general, European countries exhibit consistent distributions across all governance parameters. In contrast, in Asia, **India and Sri Lanka** notably demonstrate uniform patterns in these metrics, while governance performances in other Asian nations may vary.`
)}

function _year5(Inputs){return(
Inputs.range([2003, 2022], { value: 2003, label: "Year", step: 1 })
)}

function _radios1(Inputs){return(
Inputs.radio(["Regulatory Quality: Percentile Rank",
    "Rule of Law: Percentile Rank",
    "Voice and Accountability: Percentile Rank",
    "Political Stability and Absence of Violence/Terrorism: Percentile Rank",
    "Government Effectiveness: Percentile Rank",
    "Control of Corruption: Percentile Rank" ], {label: "Select a sereis", value: "Regulatory Quality: Percentile Rank"})
)}

function _18(htl){return(
htl.html`html\`<div id="scatter"></div>\``
)}

function _corruptionDataAsiaAndEurope_1(__query,FileAttachment,invalidation){return(
__query(FileAttachment("Corruption data asia and europe_@1.csv"),{from:{table:"Corruption data asia and europe_"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _20(md){return(
md`## Bubble chart`
)}

function _21(md){return(
md`The bubble chart provides insights into governance metrics across various countries in Europe and Asia. Bubble sizes depict a discernible contrast between the continents.

European nations are represented by larger bubbles, indicating superior governance metrics, while Asian countries are depicted with smaller bubbles, suggesting comparatively weaker indicators. This disparity in bubble sizes reflects the distinctiveness in governance metrics between the two continents, highlighting Europe's overall stronger governance indicators compared to Asia's relatively weaker ones.`
)}

function _year6(Inputs){return(
Inputs.range([2003, 2022], { value: 2003, label: "Year", step: 1 })
)}

function _radios2(Inputs){return(
Inputs.radio(["Regulatory Quality: Percentile Rank",
    "Rule of Law: Percentile Rank",
    "Voice and Accountability: Percentile Rank",
    "Political Stability and Absence of Violence/Terrorism: Percentile Rank",
    "Government Effectiveness: Percentile Rank",
    "Control of Corruption: Percentile Rank" ], {label: "Select a sereis", value: "Regulatory Quality: Percentile Rank"})
)}

function _24(htl){return(
htl.html`html\`<div id="plotDiv1"></div>\`
`
)}

function _25(md){return(
md`## Analysis of Line Graph Comparing Government Effectiveness and Regulatory Quality`
)}

function _26(md){return(
md`The aim of this line graph is to investigate whether higher government effectiveness is associated with better regulatory quality. It seeks to understand if countries with more efficient governance structures also tend to have improved regulatory environments.

a. Across numerous nations, a distinct correlation is observed between government effectiveness and regulatory quality, revealing a direct and consistent trend in their values.

b. Countries such as **Romania, Serbia, Moldova, and the UK** are notable for their excellence in both government effectiveness and regulatory quality, demonstrating significant strengths in these domains.

c. **Tajikistan** exhibits considerable government competence, but its regulatory quality experiences a decline in 2023, indicating a disconnect between effective governance and regulatory standards within the country.`
)}

function _selectcountry2(Inputs,country){return(
Inputs.select(country, {label: "select a country"})
)}

function _28(htl){return(
htl.html` html\`<div id="plotDiv5"></div>\``
)}

function _29(md){return(
md`## Analysis of Relationship Between Voice & Accountability, Control of Corruption, and Rule of Law`
)}

function _30(md){return(
md`1. **Afghanistan, Bangladesh, Tajikistan, and Uzbekistan** exhibit consistently low ratings across Voice & Accountability, Control of Corruption, and Rule of Law. Afghanistan stands out with relatively higher scores in Voice & Accountability but lower ratings in Rule of Law and Control of Corruption.

2. Initially, **Bangladesh** faced challenges with Control of Corruption in 2003, despite scoring better in Voice & Accountability and Rule of Law. Despite gradual improvements until 2022, combating corruption remains a persistent issue.

3. **Austria, Denmark, Germany, Netherlands, Norway, Switzerland, and the UK** consistently maintain high ratings across all governance parameters, indicating strong governance structures and practices.

4. **Moldova** consistently demonstrates relatively high scores in Voice & Accountability and Rule of Law, but slightly lower ratings in Control of Corruption, suggesting stability in certain governance aspects while highlighting the need for improvements in corruption control.`
)}

function _selectyear(Inputs,year){return(
Inputs.select(year, {label: "select year"})
)}

function _32(htl){return(
htl.html` html\`<div id="mybarChart"></div>\`
`
)}

function _33(md){return(
md`## Comparison of Political Stability, Rule of Law, and Government Effectiveness:`
)}

function _34(md){return(
md`The graph depicts the connection between Political Stability, Rule of Law, and Government Effectiveness, providing insights into their interplay. 

It highlights that despite facing challenges in political stability, **India** demonstrates impressive performance in Rule of Law and Government Effectiveness.

On the other hand, in countries such as **Nepal** and **Tajikistan**, where political stability is relatively higher, Government Effectiveness remains notably poor. This suggests a nuanced association between political stability and the efficiency of governance systems across diverse nations.`
)}

function _selectcountry3(Inputs,country){return(
Inputs.select(country, {label: "select a country"})
)}

function _36(htl){return(
htl.html` html\`<div id="plotDiv511"></div>\`
`
)}

function _37(md){return(
md`## Heatmap for all countries`
)}

function _38(md){return(
md`The heatmap offers a comprehensive view of all countries over time, showcasing their relative performance in the selected parameter series. This graphical depiction facilitates a straightforward examination of each country's standing in comparison to others across the specified parameters from 2003 to 2022.`
)}

function _39(corruptionDataAsiaAndEurope_,html)
{
  const data = corruptionDataAsiaAndEurope_;

  const chartContainer = html`<div style="width: 25cm; height: 15cm; display: flex; flex-wrap: wrap;"></div>`;
  const slider = html`<input type="range" id="yearSlider" min="2003" max="2019" step="1" value="2003">`;
  const select = html`<select id="columnSelect" value="Control of Corruption: Percentile Rank"></select>`;

  const interpolateColors = (value, minValue, maxValue) => {
    const minColor = 200; // Light blue
    const maxColor = 20; // Dark blue

    const normalizedValue = (value - minValue) / (maxValue - minValue);
    const colorShade = Math.round(normalizedValue * (maxColor - minColor) + minColor);

    return `rgb(${colorShade}, ${colorShade}, 255)`; // Use different shades of blue
  };

  const updateChart = (data, selectedColumn) => {
    const selectedYear = parseInt(slider.value);
    const yearData = data.filter(d => d["Year"] === selectedYear);

    const values = yearData.map(d => parseFloat(d[selectedColumn]));
    const sortedData = yearData.sort((a, b) => parseFloat(b[selectedColumn]) - parseFloat(a[selectedColumn]));

    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    const totalSquares = sortedData.length;

    const area = 25 * 15; // Area of the chart container in cm^2

    let currentArea = 0;
    let rowHeight = 0;

    chartContainer.innerHTML = ""; // Clear previous content

    sortedData.forEach(country => {
      const rect = document.createElement('div');
      const value = parseFloat(country[selectedColumn]);
      const color = interpolateColors(value, minValue, maxValue);

      const normalizedValue = (value - minValue) / (maxValue - minValue);

      const squareSize = Math.sqrt((area * normalizedValue) / totalSquares);

      rect.classList.add('heatmap-square');
      rect.style.width = `${squareSize}cm`;
      rect.style.height = `${squareSize}cm`;
      rect.style.background = color;
      rect.style.margin = '1px';
      rect.textContent = `${country["Country Code"]}`; // Display country code

      rect.title = `${country["Country Name"]} (${country["Country Code"]}): ${country[selectedColumn]}`; // Tooltip

      chartContainer.appendChild(rect);

      currentArea += squareSize * squareSize;
      if (currentArea >= (25 * rowHeight)) {
        currentArea = 0;
        rowHeight += squareSize;
        chartContainer.appendChild(html`<br>`);
      }
    });

    // Update title
    document.title = `${selectedColumn} ${selectedYear}`;
  };

  slider.addEventListener('input', () => updateChart(data, select.value));
  select.addEventListener('change', () => updateChart(data, select.value));

  const columns = Object.keys(data[0]).filter(key => key !== "Country Name" && key !== "Year");

  columns.forEach(column => {
    const option = document.createElement('option');
    option.value = column;
    option.text = column;
    select.appendChild(option);
  });

  updateChart(data, select.value);

  return html`<div>${slider}${select}${chartContainer}</div>`;
}


function _40(md){return(
md`## Comparison of Government Effectiveness and Control of Corruption`
)}

function _41(md){return(
md`The graphical representation portraying the correlation between Government Effectiveness and Control of Corruption across time highlights a significant connection between these aspects. It suggests that as a nation's government becomes more proficient in its administrative functions and governance practices, there is typically an associated improvement in the ability to combat corrupt behavior.

When a country demonstrates higher levels of governmental effectiveness, marked by improved governance mechanisms, streamlined administration, and effective policy implementation, it often corresponds with a more successful control of corrupt activities within the system.`
)}

function _selectcountry4(Inputs,country){return(
Inputs.select(country, {label: "select a country"})
)}

function _43(htl){return(
htl.html`html\`<div id="barline"></div>\``
)}

function _44(md){return(
md`## Comparison between Rule of Law and Voice & Accountability`
)}

function _45(md){return(
md`The bar plot visualization depicting the relationship between Rule of Law and Voice & Accountability across various countries reveals a consistent positive correlation between these factors over the entire time series.

In **Afghanistan**, the Rule of Law score is relatively low, suggesting difficulties in upholding legal frameworks and maintaining judicial independence. However, the Voice & Accountability metrics indicate a higher level of citizen engagement and government answerability.

Conversely, in countries like **Sri Lanka, Ukraine, and Azerbaijan**, there appears to be an inverse pattern. Here, the Rule of Law metrics indicate a stronger adherence to legal structures and judicial independence, while Voice & Accountability metrics appear relatively weaker or less involved.`
)}

function _selectcountry7(Inputs,country){return(
Inputs.select(country, {label: "select a country"})
)}

function _47(htl){return(
htl.html`html\`<div id="barline2"></div>\``
)}

function _48(md){return(
md`## Comparison between Voice & Accountability and Control of Corruption`
)}

function _49(md){return(
md`The examination of the association between Voice and Accountability versus Control of Corruption using area graphs unveils a steady positive correlation across all nations. This suggests that heightened citizen involvement tends to coincide with enhanced measures to control and mitigate corruption within governmental systems.

This correlation suggests that as Voice and Accountability metrics rise, indicating increased citizen engagement in governance, there is a corresponding enhancement in the country's capacity to regulate and diminish corrupt behaviors.`
)}

function _selectcountry9(Inputs,country){return(
Inputs.select(country, {label: "select a country"})
)}

function _51(htl){return(
htl.html` html\`<div id="area1"></div>\``
)}

function _52(md){return(
md`## Conclusion`
)}

function _53(md){return(
md`Interconnections exist among different governance dimensions. For instance, stronger government effectiveness often correlates positively with improved regulatory quality and control of corruption in numerous countries. This indicates that nations with more robust governance structures typically exhibit better control over corruption. Additionally, a positive correlation between voice & accountability and corruption control implies that countries where citizens have greater involvement and accountability mechanisms tend to experience lower levels of corruption.

On the contrary, countries with lower political stability may still excel in terms of rule of law and government effectiveness. For instance, countries like India demonstrate strong rule of law and government effectiveness despite facing challenges with political stability. Conversely, nations such as Nepal and Tajikistan, despite enjoying higher political stability, encounter difficulties with government effectiveness.

The graphs also underscore that European countries generally maintain more consistent and resilient governance across various parameters compared to their Asian counterparts.`
)}

function _countries_json(FileAttachment){return(
FileAttachment("Countries_json.json").json()
)}

function _country(corruptionDataAsiaAndEurope_){return(
[... new Set(corruptionDataAsiaAndEurope_.map(d => d["Country Name"]))]
)}

function _year(corruptionDataAsiaAndEurope_){return(
Array.from(new Set(corruptionDataAsiaAndEurope_.map(d => d["Year"]))).sort()
)}

function _57(year3,corruptionDataAsiaAndEurope_,selectcountry1,d3,Plotly)
{
  // Filter data based on the selected country
 const selectedYear = year3.toString(); // Replace this with your dynamic year variable

  const filteredData = corruptionDataAsiaAndEurope_
    .filter(d => d["Year"] === year3 && d["Country Name"] === selectcountry1);

  // Sort the data by the "Year" column in ascending order
  filteredData.sort((a, b) => a.Year - b.Year);

  // Define color scales for each parameter using the new data
  const colorScale1 = d3.scaleLinear()
    .domain([0, d3.max(filteredData, d => d["Regulatory Quality: Percentile Rank"])])
    .range(["#FFC0CB", "#800000"]); // Maroon shade

  // Repeat this for other color scales (colorScale2, colorScale3, ..., colorScale6)
  const colorScale2 = d3.scaleLinear()
    .domain([0, d3.max(filteredData, d => d["Rule of Law: Percentile Rank"])])
    .range(["lightblue", "darkblue"]);

  const colorScale3 = d3.scaleLinear()
    .domain([0, d3.max(filteredData, d => d["Voice and Accountability: Percentile Rank"])])
    .range(["lightgreen", "darkgreen"]);

  const colorScale4 = d3.scaleLinear()
    .domain([0, d3.max(filteredData, d => d["Political Stability and Absence of Violence/Terrorism: Percentile Rank"])])
    .range(["yellow", "orange"]);

  const colorScale5 = d3.scaleLinear()
    .domain([0, d3.max(filteredData, d => d["Government Effectiveness: Percentile Rank"])])
    .range(["#00FFFF", "#008080"]); // Cyan shade

  const colorScale6 = d3.scaleLinear()
    .domain([0, d3.max(filteredData, d => d["Control of Corruption: Percentile Rank"])])
    .range(["#FFD700", "#B8860B"]); // Gold shade
  // Create the grouped bar chart data
  
  const chartData = [
    {
      x: ["Regulatory Quality", "Rule of Law", "Voice and Accountability", "Political Stability and Absence of Violence/Terrorism", "Government Effectiveness", "Control of Corruption"],
      y: [
        filteredData[0]["Regulatory Quality: Percentile Rank"],
        filteredData[0]["Rule of Law: Percentile Rank"],
        filteredData[0]["Voice and Accountability: Percentile Rank"],
        filteredData[0]["Political Stability and Absence of Violence/Terrorism: Percentile Rank"],
        filteredData[0]["Government Effectiveness: Percentile Rank"],
        filteredData[0]["Control of Corruption: Percentile Rank"]
      ],
      type: "bar",
      marker: {
        color: [
          colorScale1(filteredData[0]["Regulatory Quality: Percentile Rank"]),
          colorScale2(filteredData[0]["Rule of Law: Percentile Rank"]),
          colorScale3(filteredData[0]["Voice and Accountability: Percentile Rank"]),
          colorScale4(filteredData[0]["Political Stability and Absence of Violence/Terrorism: Percentile Rank"]),
          colorScale5(filteredData[0]["Government Effectiveness: Percentile Rank"]),
          colorScale6(filteredData[0]["Control of Corruption: Percentile Rank"])
        ]
      }
    }
  ];
  
  const layout = {
    title: `Grouped Bar Graph for ${year3} : ${selectcountry1}`,
    xaxis: { title: year3 },
    yaxis: { title: "Percentile Rank" }
  };

  // Create the Plotly chart
  Plotly.newPlot("grpChart", chartData, layout);
}


function _Plotly(require){return(
require('plotly.js-dist')
)}

function _TotalYears(corruptionDataAsiaAndEurope_){return(
Array.from(new Set(corruptionDataAsiaAndEurope_.map(d => d["Year"]))).sort()
)}

function _world_countries(FileAttachment){return(
FileAttachment("Countries_json.json").json()
)}

function _topojson(require){return(
require('topojson-client@3')
)}

function _geojson(topojson,world_countries){return(
topojson.feature(world_countries, world_countries.objects.countries)
)}

function _all_data(corruptionDataAsiaAndEurope_){return(
corruptionDataAsiaAndEurope_.filter((element) => {
  return element['Country Name'];
})
)}

function _filteredData(corruptionDataAsiaAndEurope_,year4)
{
  
  return corruptionDataAsiaAndEurope_.filter(d => d.Year === year4)
             .map(d => ({Country: d['Country Name'] , value: d['Control of Corruption: Percentile Rank'] }));
  
}


function _mergedData(filteredData,geojson)
{
  const map = new Map(filteredData.map(d => [d.Country, d.value]));
  for (const feature of geojson.features) {
    feature.properties.value = map.get(feature.properties.name) || 0;
  }
  return geojson;
}


function _67(year5,radios1,corruptionDataAsiaAndEurope_,d3,Plotly)
{
  const year = year5; // Assuming year5 holds the selected year
  const series = radios1; // Assuming radios1 holds the selected series

  // Filter data for the selected year
  const filteredData = corruptionDataAsiaAndEurope_.filter(entry => entry.Year === year);

  // Get unique country names
  const countryNames = filteredData.map(d => d["Country Name"]);
  const uniqueCountryNames = Array.from(new Set(countryNames));

  // Generate colors for each unique country
  const colors = {}; // Object to store colors for each country
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10); // Using a categorical color scheme

  uniqueCountryNames.forEach((country, index) => {
    colors[country] = colorScale(index);
  });

  // Prepare data for the scatter plot
  const dotData = uniqueCountryNames.map((country) => {
    const dataForCountry = filteredData.filter(d => d["Country Name"] === country);

    return {
      x: dataForCountry.map(d => country), // Using country names on x-axis
      y: dataForCountry.map(d => d[series]),
      mode: 'markers',
      type: 'scatter',
      marker: {
        size: 5, // Reduced marker size to fit more countries
        color: colors[country], // Assigning color based on country
      },
      text: dataForCountry.map(d => country),
      name: country,
    };
  });

  // Calculate the y-axis range based on the data
  const yAxisRange = [
    Math.min(...filteredData.map(entry => entry[series])),
    Math.max(...filteredData.map(entry => entry[series])) * 1.1, // Increase the range by 10%
  ];

  // Layout options
  const layout = {
    title: `${series} - ${year}`,
    xaxis: { title: 'Country',showgrid: false },
    yaxis: { title: series, range: yAxisRange,showgrid: false }, // Set the y-axis range
    showlegend: false, // Disable legend to prevent overcrowding
    
  };

  // Create the Plotly chart
  Plotly.newPlot('scatter', dotData, layout);
}


function _countries_json1(FileAttachment){return(
FileAttachment("Countries_json@1.json").json()
)}

function _69(year6,radios2,corruptionDataAsiaAndEurope_,d3,country,Plotly)
{
  // Get the selected year from the slider
  const selectedYear = year6; // Assuming year6 holds the selected year

  // Define the value for bubble size (replace 'desiredValue' with the attribute you want to map to bubble size)
  const bubbleSizeValue = radios2; // Replace 'desiredValue' with the attribute for bubble size

  // Calculate the horizontal offset for bubbles
  const bubbleOffset = 0.5; // Adjust this value to set the separation between bubbles

  // Get the values for the bubble sizes to define the color scale
  const bubbleValues = corruptionDataAsiaAndEurope_
    .filter(entry => entry.Year === selectedYear && entry.hasOwnProperty(bubbleSizeValue))
    .map(entry => entry[bubbleSizeValue]);

  // Define a color scale for the bubbles based on their values
  const colorScale = d3.scaleSequential(d3.interpolateReds)
    .domain([d3.min(bubbleValues), d3.max(bubbleValues)]);

  // Define traces for each country's bubble plot for the selected year
  const bubbleTraces = country.map((country, index) => {
    const countryDataForYear = corruptionDataAsiaAndEurope_
      .filter(entry => entry["Country Name"] === country && entry.Year === selectedYear);

    if (countryDataForYear.length > 0) {
      const entry = countryDataForYear[0];
      return {
        type: 'scatter',
        mode: 'markers',
        x: [selectedYear + (index * bubbleOffset)], // Apply offset for each country
        y: [entry[radios2]], // Assuming 'radios1' holds the desired series
        text: `${country}<br>Year: ${selectedYear}<br>${radios2}: ${entry[radios2]}`,
        marker: {
          size: entry[bubbleSizeValue], // Assign bubble size based on the desired attribute
          opacity: 0.7, // Adjust opacity if needed
          line: {
            width: 1
          },
          color: colorScale(entry[bubbleSizeValue]), // Set color based on the bubble size value using the defined color scale
          colorscale: 'Reds', // Use Reds color scale
          cmin: d3.min(bubbleValues), // Set color scale minimum
          cmax: d3.max(bubbleValues), // Set color scale maximum
          colorbar: { bubbleSizeValue } // Set color bar title
        },
        //name: entry[bubbleSizeValue], // Use bubble size value for the legend
      };
    } else {
      return null;
    }
  }).filter(trace => trace !== null);

  // Define layout for the bubble chart
  const layout = {
    title: {
      text: radios2
    },
    xaxis: {
      title: `Year: ${selectedYear}`,
      range: [selectedYear - 0.5, selectedYear + (country.length * bubbleOffset) - 0.5], // Adjust the x-axis range
      tickmode: 'array',
      tickvals: country.map((_, index) => selectedYear + (index * bubbleOffset)),
      ticktext: country.map(() => ''), // Set empty string for x-axis labels
      showgrid: false
    },
    yaxis: {
      title: radios2,
      range: [0, 130], // Adjust the y-axis range from 0 to 150
      tickvals: Array.from({ length: 15 }, (_, i) => i * 10), // Set tick values for intervals of 10
      gridcolor: 'lightgrey',
      showgrid: false
    },
    showlegend: false,
    legend: {
      traceorder: 'reversed', // To reverse the order of legend items
      title: {
        text: bubbleSizeValue, // Set legend title as bubble size value
      },
      itemsizing: 'constant', // To keep legend item size constant
    },
    colorbar: {
     title: bubbleSizeValue, // Set colorbar title as bubble size value
     tickvals: bubbleValues,
     ticktext: bubbleValues.map(val => String(val))
    }
  };

  // Plotly command to create the bubble chart
  Plotly.newPlot('plotDiv1', bubbleTraces, layout);
}


function _70(corruptionDataAsiaAndEurope_,selectcountry2,Plotly)
{
const filteredData = corruptionDataAsiaAndEurope_.filter(d => d["Country Name"] === selectcountry2);

// Line for Government Effectiveness
const line1 = {
  type: 'scatter',
  mode: 'lines',
  x: filteredData.map(d => d["Year"]),
  y: filteredData.map(d => d["Government Effectiveness: Percentile Rank"]),
  name: 'Government Effectiveness',
  line: {
    color: 'blue', // Set the line color for Government Effectiveness
    dash: 'dashdot',
    width: 4
  
  }
};

// Line for Regulatory Quality
const line2 = {
  type: 'scatter',
  mode: 'lines',
  x: filteredData.map(d => d["Year"]),
  y: filteredData.map(d => d["Regulatory Quality: Percentile Rank"]),
  name: 'Regulatory Quality',
  line: {
    color: 'red' // Set the line color for Regulatory Quality
  }
};

const layout = {
  title: `Government Effectiveness vs Regulatory Quality Analysis on ${selectcountry2}`,
  xaxis: {
    title: 'Year'
  },
  yaxis: {
    title: 'Percentile Rank',
    //autorange: 'reversed' // Reverse the y-axis
  }
};

Plotly.newPlot('plotDiv5', [line1, line2], layout);
}


function _71(selectyear,corruptionDataAsiaAndEurope_,Plotly)
{
// Filter the data for the year 1996
const year = selectyear;
const filteredData = corruptionDataAsiaAndEurope_.filter(d => d.Year === year);

// Create data arrays for each category
const Voice = filteredData.map(d => +d["Voice and Accountability: Percentile Rank"]);
const controlcorruption = filteredData.map(d => +d["Control of Corruption: Percentile Rank"]);
const ruleoflaw = filteredData.map(d => +d["Rule of Law: Percentile Rank"]);

// Create country labels
const countries = filteredData.map(d => d["Country Name"]);

// Create the grouped bar chart data
const chartData = [
  {
    x: countries,
    y: Voice,
    type: "bar",
    name: "Voice and Accountability",
  },
  {
    x: countries,
    y: controlcorruption,
    type: "bar",
    name: "Control of Corruption",
  },
  {
    x: countries,
    y: ruleoflaw,
    type: "bar",
    name: "Rule of Law",
    fill: "#6e40aa" ,
  },
];

// Layout options
const layout = {
  title: `Grouped Bar Graph for ${year}`,
  xaxis: { title: "Country" },
  yaxis: { title: "Percentage / Value" },
  barmode: "group",
};

// Create the Plotly chart
Plotly.newPlot("mybarChart", chartData, layout);
}


function _72(corruptionDataAsiaAndEurope_,selectcountry3,Plotly)
{
const filteredData = corruptionDataAsiaAndEurope_.filter(d => d["Country Name"] === selectcountry3);

// Line for Government Effectiveness
const line1 = {
  type: 'scatter',
  mode: 'lines',
  x: filteredData.map(d => d["Year"]),
  y: filteredData.map(d => d["Government Effectiveness: Percentile Rank"]),
  name: 'Government Effectiveness',
  line: {
    color: 'blue', // Set the line color for Government Effectiveness
    
  
  }
};

// Line for Regulatory Quality
const line2 = {
  type: 'scatter',
  mode: 'lines',
  x: filteredData.map(d => d["Year"]),
  y: filteredData.map(d => d["Rule of Law: Percentile Rank"]),
  name: 'Rule of Law',
  line: {
    color: 'red' // Set the line color for Regulatory Quality
  }
};

// Line for Regulatory Quality
const area = {
  type: 'scatter',
  mode: 'lines', // Change mode to 'lines' to fill the area below the line
  fill: 'tozeroy', // Fill area to zero line (y=0)
  x: filteredData.map(d => d["Year"]),
  y: filteredData.map(d => d["Political Stability and Absence of Violence/Terrorism: Percentile Rank"]),
  name: 'Political Stability and Absence of Violence/Terrorism',
  line: {
    color: 'orange', // Set the color of the area fill to orange
  }
};

const layout = {
  title: `Government Effectiveness vs  Rule of law  vs Political stability on ${selectcountry3}`,
  xaxis: {
    title: 'Year'
  },
  yaxis: {
    title: 'Percentile Rank',
    //autorange: 'reversed' // Reverse the y-axis
  }
};

Plotly.newPlot('plotDiv511', [line1, line2,area], layout);
}


function _73(corruptionDataAsiaAndEurope_,selectcountry4,Plotly)
{
const filteredData = corruptionDataAsiaAndEurope_.filter(d => d["Country Name"] === selectcountry4);

// Line for Government Effectiveness
const line1 = {
  type: 'scatter',
  mode: 'lines',
  x: filteredData.map(d => d["Year"]),
  y: filteredData.map(d => d["Government Effectiveness: Percentile Rank"]),
  name: 'Government Effectiveness',
  line: {
    color: 'purple', // Set the line color for Government Effectiveness
    
  
  }
};

// Line for Regulatory Quality
const line2 = {
  type: 'bar',
  mode: 'lines',
  x: filteredData.map(d => d["Year"]),
  y: filteredData.map(d => d["Control of Corruption: Percentile Rank"]),
  name: 'Control of Corruption',
  line: {
    color: 'cyan' // Set the line color for Regulatory Quality
  }
};


const layout = {
  title: `Government Effectiveness vs Control of corruption on ${selectcountry4}`,
  xaxis: {
    title: 'Year'
  },
  yaxis: {
    title: 'Percentile Rank',
    //autorange: 'reversed' // Reverse the y-axis
  }
};

Plotly.newPlot('barline', [line1, line2], layout);
}


function _74(corruptionDataAsiaAndEurope_,selectcountry7,Plotly)
{
const filteredData = corruptionDataAsiaAndEurope_.filter(d => d["Country Name"] === selectcountry7);

// Line for Government Effectiveness
const line1 = {
  type: 'bar',
  mode: 'lines',
  x: filteredData.map(d => d["Year"]),
  y: filteredData.map(d => d["Rule of Law: Percentile Rank"]),
  name: 'Rule of Law',
  line: {
    color: 'pink', // Set the line color for Government Effectiveness
    
  
  }
};

// Line for Regulatory Quality
const line2 = {
  type: 'bar',
  mode: 'lines',
  x: filteredData.map(d => d["Year"]),
  y: filteredData.map(d => d["Voice and Accountability: Percentile Rank"]),
  name: 'Voice and Accountability',
  line: {
    color: 'cyan' // Set the line color for Regulatory Quality
  }
};


const layout = {
  title: `Rule of law vs voice and accountability on ${selectcountry7}`,
  xaxis: {
    title: 'Year'
  },
  yaxis: {
    title: 'Percentile Rank',
    //autorange: 'reversed' // Reverse the y-axis
  }
};

Plotly.newPlot('barline2', [line1, line2], layout);
}


function _75(corruptionDataAsiaAndEurope_,selectcountry9,Plotly)
{
const filteredData = corruptionDataAsiaAndEurope_.filter(d => d["Country Name"] === selectcountry9);

const area = {
  type: 'scatter',
  mode: 'lines', // Change mode to 'lines' to fill the area below the line
  fill: 'tozeroy', // Fill area to zero line (y=0)
  x: filteredData.map(d => d["Year"]),
  y: filteredData.map(d => d["Voice and Accountability: Percentile Rank"]),
  name: 'Voice and Accountability',
  line: {
    color: 'purple', // Set the color of the area fill to orange
  }
};

// Line for Regulatory Quality
const area1 = {
  type: 'scatter',
  mode: 'lines', // Change mode to 'lines' to fill the area below the line
  fill: 'tozeroy', // Fill area to zero line (y=0)
  x: filteredData.map(d => d["Year"]),
  y: filteredData.map(d => d["Control of Corruption: Percentile Rank"]),
  name: 'Control of Corruption',
  line: {
    color: 'orange', // Set the color of the area fill to orange
  }
};

const layout = {
  title: `Voice and accountability vs Corruption control on ${selectcountry9}`,
  xaxis: {
    title: 'Year'
  },
  yaxis: {
    title: 'Percentile Rank',
    //autorange: 'reversed' // Reverse the y-axis
  }
};


const data = [area, area1];
Plotly.newPlot('area1', data, layout);

}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Corruption data asia and europe_.csv", {url: new URL("./files/be462123fe2ae095c346f96642036761712d3d3a35dd04f5b91061d7624880bebbf1617983f39c4e49d1dcce2e100f4dbd37be87195f4eb6eb8bb5fde0323c28.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Countries_json.json", {url: new URL("./files/d9687523b1cba754db69a93eac9ffe9055cd9f298d8bbf757a2cf06e2690f961dbcc701a92b1da3fc8b25d7ce9dafed5502e77894460a7236215a8970af27138.json", import.meta.url), mimeType: "application/json", toString}],
    ["Corruption data asia and europe_@1.csv", {url: new URL("./files/be462123fe2ae095c346f96642036761712d3d3a35dd04f5b91061d7624880bebbf1617983f39c4e49d1dcce2e100f4dbd37be87195f4eb6eb8bb5fde0323c28.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["Countries_json@1.json", {url: new URL("./files/d9687523b1cba754db69a93eac9ffe9055cd9f298d8bbf757a2cf06e2690f961dbcc701a92b1da3fc8b25d7ce9dafed5502e77894460a7236215a8970af27138.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("corruptionDataAsiaAndEurope_")).define("corruptionDataAsiaAndEurope_", ["__query","FileAttachment","invalidation"], _corruptionDataAsiaAndEurope_);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("viewof selectcountry1")).define("viewof selectcountry1", ["Inputs","country"], _selectcountry1);
  main.variable(observer("selectcountry1")).define("selectcountry1", ["Generators", "viewof selectcountry1"], (G, _) => G.input(_));
  main.variable(observer("viewof year3")).define("viewof year3", ["Inputs"], _year3);
  main.variable(observer("year3")).define("year3", ["Generators", "viewof year3"], (G, _) => G.input(_));
  main.variable(observer()).define(["htl"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("viewof year4")).define("viewof year4", ["Inputs"], _year4);
  main.variable(observer("year4")).define("year4", ["Generators", "viewof year4"], (G, _) => G.input(_));
  main.variable(observer()).define(["year4","d3","corruptionDataAsiaAndEurope_","mergedData","Legend"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("viewof year5")).define("viewof year5", ["Inputs"], _year5);
  main.variable(observer("year5")).define("year5", ["Generators", "viewof year5"], (G, _) => G.input(_));
  main.variable(observer("viewof radios1")).define("viewof radios1", ["Inputs"], _radios1);
  main.variable(observer("radios1")).define("radios1", ["Generators", "viewof radios1"], (G, _) => G.input(_));
  main.variable(observer()).define(["htl"], _18);
  main.variable(observer("corruptionDataAsiaAndEurope_1")).define("corruptionDataAsiaAndEurope_1", ["__query","FileAttachment","invalidation"], _corruptionDataAsiaAndEurope_1);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("viewof year6")).define("viewof year6", ["Inputs"], _year6);
  main.variable(observer("year6")).define("year6", ["Generators", "viewof year6"], (G, _) => G.input(_));
  main.variable(observer("viewof radios2")).define("viewof radios2", ["Inputs"], _radios2);
  main.variable(observer("radios2")).define("radios2", ["Generators", "viewof radios2"], (G, _) => G.input(_));
  main.variable(observer()).define(["htl"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer()).define(["md"], _26);
  main.variable(observer("viewof selectcountry2")).define("viewof selectcountry2", ["Inputs","country"], _selectcountry2);
  main.variable(observer("selectcountry2")).define("selectcountry2", ["Generators", "viewof selectcountry2"], (G, _) => G.input(_));
  main.variable(observer()).define(["htl"], _28);
  main.variable(observer()).define(["md"], _29);
  main.variable(observer()).define(["md"], _30);
  main.variable(observer("viewof selectyear")).define("viewof selectyear", ["Inputs","year"], _selectyear);
  main.variable(observer("selectyear")).define("selectyear", ["Generators", "viewof selectyear"], (G, _) => G.input(_));
  main.variable(observer()).define(["htl"], _32);
  main.variable(observer()).define(["md"], _33);
  main.variable(observer()).define(["md"], _34);
  main.variable(observer("viewof selectcountry3")).define("viewof selectcountry3", ["Inputs","country"], _selectcountry3);
  main.variable(observer("selectcountry3")).define("selectcountry3", ["Generators", "viewof selectcountry3"], (G, _) => G.input(_));
  main.variable(observer()).define(["htl"], _36);
  main.variable(observer()).define(["md"], _37);
  main.variable(observer()).define(["md"], _38);
  main.variable(observer()).define(["corruptionDataAsiaAndEurope_","html"], _39);
  main.variable(observer()).define(["md"], _40);
  main.variable(observer()).define(["md"], _41);
  main.variable(observer("viewof selectcountry4")).define("viewof selectcountry4", ["Inputs","country"], _selectcountry4);
  main.variable(observer("selectcountry4")).define("selectcountry4", ["Generators", "viewof selectcountry4"], (G, _) => G.input(_));
  main.variable(observer()).define(["htl"], _43);
  main.variable(observer()).define(["md"], _44);
  main.variable(observer()).define(["md"], _45);
  main.variable(observer("viewof selectcountry7")).define("viewof selectcountry7", ["Inputs","country"], _selectcountry7);
  main.variable(observer("selectcountry7")).define("selectcountry7", ["Generators", "viewof selectcountry7"], (G, _) => G.input(_));
  main.variable(observer()).define(["htl"], _47);
  main.variable(observer()).define(["md"], _48);
  main.variable(observer()).define(["md"], _49);
  main.variable(observer("viewof selectcountry9")).define("viewof selectcountry9", ["Inputs","country"], _selectcountry9);
  main.variable(observer("selectcountry9")).define("selectcountry9", ["Generators", "viewof selectcountry9"], (G, _) => G.input(_));
  main.variable(observer()).define(["htl"], _51);
  main.variable(observer()).define(["md"], _52);
  main.variable(observer()).define(["md"], _53);
  main.variable(observer("countries_json")).define("countries_json", ["FileAttachment"], _countries_json);
  main.variable(observer("country")).define("country", ["corruptionDataAsiaAndEurope_"], _country);
  main.variable(observer("year")).define("year", ["corruptionDataAsiaAndEurope_"], _year);
  main.variable(observer()).define(["year3","corruptionDataAsiaAndEurope_","selectcountry1","d3","Plotly"], _57);
  main.variable(observer("Plotly")).define("Plotly", ["require"], _Plotly);
  main.variable(observer("TotalYears")).define("TotalYears", ["corruptionDataAsiaAndEurope_"], _TotalYears);
  main.variable(observer("world_countries")).define("world_countries", ["FileAttachment"], _world_countries);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  main.variable(observer("geojson")).define("geojson", ["topojson","world_countries"], _geojson);
  const child1 = runtime.module(define1);
  main.import("Legend", child1);
  main.variable(observer("all_data")).define("all_data", ["corruptionDataAsiaAndEurope_"], _all_data);
  main.variable(observer("filteredData")).define("filteredData", ["corruptionDataAsiaAndEurope_","year4"], _filteredData);
  main.variable(observer("mergedData")).define("mergedData", ["filteredData","geojson"], _mergedData);
  main.variable(observer()).define(["year5","radios1","corruptionDataAsiaAndEurope_","d3","Plotly"], _67);
  main.variable(observer("countries_json1")).define("countries_json1", ["FileAttachment"], _countries_json1);
  main.variable(observer()).define(["year6","radios2","corruptionDataAsiaAndEurope_","d3","country","Plotly"], _69);
  main.variable(observer()).define(["corruptionDataAsiaAndEurope_","selectcountry2","Plotly"], _70);
  main.variable(observer()).define(["selectyear","corruptionDataAsiaAndEurope_","Plotly"], _71);
  main.variable(observer()).define(["corruptionDataAsiaAndEurope_","selectcountry3","Plotly"], _72);
  main.variable(observer()).define(["corruptionDataAsiaAndEurope_","selectcountry4","Plotly"], _73);
  main.variable(observer()).define(["corruptionDataAsiaAndEurope_","selectcountry7","Plotly"], _74);
  main.variable(observer()).define(["corruptionDataAsiaAndEurope_","selectcountry9","Plotly"], _75);
  return main;
}
