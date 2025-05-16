import { useEffect } from 'react'

import * as d3 from 'd3'
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}

const chart = ({width, height}, data) => {
    // Use more of the available space
    const graphWidth = width * 0.95;
    const graphHeight = height * 0.95;
    
    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    const links = data.links.map(d => ({...d}));
    const nodes = data.nodes.map(d => ({...d}));

    // Create a simulation with several forces.
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(130)) // Increased distance between nodes
        .force("charge", d3.forceManyBody().strength(-1000)) // Increased repulsion strength
        .force("center", d3.forceCenter(0, 0)) // Add a centering force
        .force("x", d3.forceX().strength(0.1)) // Reduced x-force to allow more spread
        .force("y", d3.forceY().strength(0.1)) // Reduced y-force to allow more spread
        .force("collision", d3.forceCollide().radius(50)) // Add collision detection to prevent overlap
        .alphaDecay(0.01); // Slow down the simulation cooling for better layout

    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", graphWidth)
        .attr("height", graphHeight)
        .attr("viewBox", [-graphWidth / 2, -graphHeight / 2, graphWidth, graphHeight])
        .attr("style", "width: 100%; height: 100%;"); // Changed for better responsiveness

    // Store simulation reference to allow external access
    svg.node().__simulation = simulation;

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

    // Generate character-specific classes and apply hover handlers
    data.nodes.forEach(function (v, i) {
        for(let s = 0; v.kanji[s]; s++) {
            // Generate HTML for each character
            let text = "<a href='/word/"+v.kanji+"'>"
            
            for(let x = 0; v.kanji[x]; x++){
                // Create class name based on the character
                const charClass = "char_" + v.kanji[x].charCodeAt(0);
                
                text += "<tspan class='" + charClass + "'>" + v.kanji[x] + "</tspan>";
            }
            text += "</a>"
            d3.select("#node"+i+" text").html(text)
        }
    });
    
    // Add hover events to all tspan elements
    setTimeout(() => {
        document.querySelectorAll('#graph tspan').forEach(tspan => {
            const charClass = tspan.getAttribute('class');
            
            tspan.addEventListener('mouseenter', () => {
                // Find all tspans with the same class and add highlight
                document.querySelectorAll('.' + charClass).forEach(el => {
                    // Find the parent .node element and add highlight class to it
                    const nodeElement = el.closest('.node');
                    if (nodeElement) {
                        nodeElement.classList.add('highlight');
                    }
                    el.classList.add('highlight_character');
                });
            });
            
            tspan.addEventListener('mouseleave', () => {
                // Remove highlights when mouse leaves
                document.querySelectorAll('.' + charClass).forEach(el => {
                    // Find the parent .node element and remove highlight class
                    const nodeElement = el.closest('.node');
                    if (nodeElement) {
                        nodeElement.classList.remove('highlight');
                    }
                    el.classList.remove('highlight_character');
                });
            });
        });
    }, 500); // Small delay to ensure elements are rendered

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
// Unfix the subject position now that it's no longer being dragged.
function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
}

return svg.node();
}

export default function Graph({ data }){
    // this is used to affect the document after it was generated and insert the graph
    useEffect(() => {
        const graph = chart(getWindowDimensions(), data);
        const div = document.getElementById("graph")
        if (div.innerHTML == '')
            div.appendChild(graph)
            
        // Add additional heating every few seconds to maintain repulsion
        const reheatInterval = setInterval(() => {
            const svgNode = document.querySelector('#graph svg');
            if (svgNode && svgNode.__simulation) {
                svgNode.__simulation.alphaTarget(0.1).restart();
                setTimeout(() => {
                    if (svgNode.__simulation) {
                        svgNode.__simulation.alphaTarget(0);
                    }
                }, 3000);
            }
        }, 10000); // Reheat every 10 seconds
        
        return () => {
            clearInterval(reheatInterval); // Clean up on unmount
        };
    }, [data]); // Added data dependency to refresh when data changes
    
    return (
        <div id="graph"></div>
    )
  }
  
