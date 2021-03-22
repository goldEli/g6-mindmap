import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { data } from "./data";
import G6 from "@antv/g6";

function createGraph(container: HTMLElement) {
  const width = 1200;
  const height = 600;

  const defaultLabelCfg = {
    style: {
      fill: "#000",
      fontSize: 12
    }
  };

  const defaultStateStyles = {
    selected: {
      fill: "#91d5ff",
      stroke: "#1890ff",
      lineWidth: 2
    },
    hover: {
      stroke: "#1890ff",
      lineWidth: 2
    }
  };

  const defaultNodeStyle = {
    fill: "#91d5ff",
    stroke: "#40a9ff",
    radius: 5
  };

  const defaultEdgeStyle = {
    stroke: "#91d5ff"
  };

  const defaultLayout = {
    type: "compactBox",
    direction: "LR",
    getId: function getId(d) {
      return d.id;
    },
    getHeight: function getHeight() {
      return 16;
    },
    getWidth: function getWidth() {
      return 16;
    },
    getVGap: function getVGap() {
      return 40;
    },
    getHGap: function getHGap() {
      return 70;
    }
  };

  const graph = new G6.TreeGraph({
    container: container,
    width,
    height,
    modes: {
      default: ["drag-canvas", "zoom-canvas", "click-select"]
    },
    defaultNode: {
      label: "rect",
      type: "rect",
      style: defaultNodeStyle,
      labelCfg: defaultLabelCfg
    },
    defaultEdge: {
      type: "cubic-horizontal",
      style: defaultEdgeStyle
    },
    nodeStateStyles: defaultStateStyles,
    edgeStateStyles: defaultStateStyles,
    layout: defaultLayout
  });
  // Register a custom behavior: click two end nodes to add an edge

  return graph;
}

export default function () {
  const ref = React.useRef(null);

  useEffect(() => {
    const container = ReactDOM.findDOMNode(ref.current) as HTMLElement;
    const graph = createGraph(container as HTMLElement);

    graph.node(function (node) {
      return {
        label: node.id,
        labelCfg: {
          position: "center"
        }
      };
    });

    graph.data(data);
    graph.render();
    graph.fitView();

    graph.on("node:mouseenter", (evt) => {
      const { item } = evt;
      // console.log("mouseenter", item);
      graph.setItemState(item, "hover", true);
    });

    graph.on("node:mouseleave", (evt) => {
      const { item } = evt;
      graph.setItemState(item, "hover", false);
    });

    graph.on("node:click", (evt) => {});
    graph.on("nodeselectchange", (e) => {
      console.log(e.selectedItems, e.select);
    });
  }, []);
  return <div id="container" ref={ref}></div>;
}
