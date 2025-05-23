import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import * as d3 from 'd3'
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
}

const chart = ({width, height}, data, router, onNodeHover) => {
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

    // Clear any existing elements
    svg.selectAll("*").remove();

    // Add a line for each link
    const link = svg.append("g")
        .attr("stroke-width", 2)
        .attr("stroke", "#9da3ae")
        .attr("stroke-opacity", 0.6)
        .style("stroke-dasharray", ("3, 3"))
        .selectAll("line")
        .data(links)
        .join("line");

    // Create node groups with proper data binding
    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll(".node")
        .data(nodes, d => d.id) // Use d.id as the key for proper data binding
        .join("g")
        .attr("id", d => "node" + d.id)
        .attr("class", "node");

        node.append("circle")
        .attr("r", 7)

    // Create text groups for each node
    node.each(function(d) {
        const textGroup = d3.select(this)
            .append("g")
            .attr("transform", "translate(12,-12)");

        // Create text element with click handler
        const text = textGroup.append("text")
            .style("cursor", "pointer")
            .style("user-select", "none")
            .style("font-size", "20px")
            .on("click", () => {
                router.push(`/word/${d.kanji}`);
            });

        // Add each character as a tspan
        for(let x = 0; d.kanji[x]; x++) {
            const charClass = "char_" + d.kanji[x].charCodeAt(0);
            text.append("tspan")
                .attr("class", charClass)
                .text(d.kanji[x]);
        }
    });

    // Add hover events to all tspan elements
    setTimeout(() => {
        let currentHoveredNode = null;
        
        document.querySelectorAll('#graph tspan').forEach(tspan => {
            const charClass = tspan.getAttribute('class');
            const nodeElement = tspan.closest('.node');
            const nodeId = nodeElement?.id?.replace('node', '');
            const nodeData = data.nodes.find(n => n.id === nodeId);
            
            const handleMouseEnter = () => {
                if (nodeData && nodeData !== currentHoveredNode) {
                    currentHoveredNode = nodeData;
                    onNodeHover(nodeData);
                }

                document.querySelectorAll('.' + charClass).forEach(el => {
                    const nodeElement = el.closest('.node');
                    if (nodeElement) {
                        nodeElement.classList.add('highlight');
                    }
                    el.classList.add('highlight_character');
                });
            };
            
            const handleMouseLeave = () => {
                if (currentHoveredNode) {
                    currentHoveredNode = null;
                    onNodeHover(null);
                }

                document.querySelectorAll('.' + charClass).forEach(el => {
                    const nodeElement = el.closest('.node');
                    if (nodeElement) {
                        nodeElement.classList.remove('highlight');
                    }
                    el.classList.remove('highlight_character');
                });
            };

            // Remove any existing listeners to prevent duplicates
            tspan.removeEventListener('mouseenter', handleMouseEnter);
            tspan.removeEventListener('mouseleave', handleMouseLeave);
            
            // Add the event listeners
            tspan.addEventListener('mouseenter', handleMouseEnter);
            tspan.addEventListener('mouseleave', handleMouseLeave);
        });
    }, 500);

    // Add drag behavior
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

export default function Graph({ data, onNodeHover }){
    const router = useRouter();

    useEffect(() => {
        // Clear existing graph
        const div = document.getElementById("graph");
        div.innerHTML = '';
        
        // Create new graph
        const graph = chart(getWindowDimensions(), data, router, onNodeHover);
        div.appendChild(graph);
        
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
        }, 10000);
        
        return () => {
            clearInterval(reheatInterval);
            // Clean up event listeners
            document.querySelectorAll('#graph tspan').forEach(tspan => {
                tspan.replaceWith(tspan.cloneNode(true));
            });
        };
    }, [data, router]); // Remove onNodeHover from dependencies
    
    return (
        <div id="graph"></div>
    );
}
  
