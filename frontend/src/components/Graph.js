import { useEffect } from 'react'

import * as d3 from 'd3'
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
// sample data
//   const data = {
//     "nodes": [
//         {
//             "id":"0",
//             "kanji": "木",
//         },
//         {
//             "id":"1",
//             "kanji": "木曜日",
//         },
//         {
//             "id":"2",
//             "kanji": "木村"
//         },
//         {
//             "id": "3",
//             "kanji": "木綿"
//         },
//         {
//             "id": "4",
//             "kanji": "木星"
//         },
//         {
//             "id":"5",
//             "kanji": "村"
//         },
//     ],
//     "links": [
//         {
//             "source": "0",
//             "target": "1",
//         },
//         {
//             "source": "0",
//             "target": "2",
//         },
//         {
//             "source": "0",
//             "target": "3",
//         },
//         {
//             "source": "0",
//             "target": "4",
//         },
//         {
//             "source": "2",
//             "target": "5",
//         },
//     ]
// }

const chart = ({width, height}, data) => {

    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    const links = data.links.map(d => ({...d}));
    const nodes = data.nodes.map(d => ({...d}));

    // Create a simulation with several forces.
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-500))
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto;");

    // Add a line for each link, and a circle for each node.
    const link = svg.append("g")
        .attr("stroke-width", 2)
        .attr("stroke", "#9da3ae")
        .attr("stroke-opacity", 0.6)
        .style("stroke-dasharray", ("3, 3"))
        .selectAll("line")
        .data(links)
        .join("line")

    const node = svg.append("g").attr("class", "nodes")
        .selectAll(".node")
        .data(nodes)
        .enter()
        .append('g')
        .attr("id", function(d){ return "node"+d.id;})
        .attr("class", "node")

        node.append("circle")
        .attr("r", 7)

        node.append("text")
        .attr("dx", 12)
        .attr("dy", -12)
        .text(function(d) { return d.kanji });

    // console.log("====")
    data.nodes.forEach(function (v, i) {
        // console.log(v, i)
        
        for(let s = 0; v.kanji[s]; s++) {
            let id = 0
            let text = ""
            for(let x = 0; v.kanji[x]; x++){
                // if (v.meta[x]["id"] == v.kanji[s])
                //     id = v.meta[x]["id"]
                // }
                text += "<tspan ";
                // if (id){ // Todo : change for highlight
                text += "class='"+id+"'"
                // }
                text += ">"+v.kanji[x]+"</tspan>";
            }
            d3.select("#node"+i+" text").html(text)
        }
    })

    // Add a drag behavior.
    node.call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // Set the position attributes of links and nodes each time the simulation ticks.
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr('transform', d => `translate(${d.x},${d.y})`);

});

// Reheat the simulation when drag starts, and fix the subject position.
function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
}

// Update the subject (dragged node) position during drag.
function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
}

// Restore the target alpha so the simulation cools after dragging ends.
// Unfix the subject position now that it’s no longer being dragged.
function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
}

// When this cell is re-run, stop the previous simulation. (This doesn’t
// really matter since the target alpha is zero and the simulation will
// stop naturally, but it’s a good practice.)
// invalidation.then(() => simulation.stop());

return svg.node();
}

export default function Graph({ data }){
    console.log(data)
    // this is used to affect the document after it was generated and insert the graph
    useEffect(() => {
        const graph = chart(getWindowDimensions(), data);
        const div = document.getElementById("graph")
        if (div.innerHTML == '')
            div.appendChild(graph)
    })
    
    return (
        <div id="graph"></div>
    )
  }
  
