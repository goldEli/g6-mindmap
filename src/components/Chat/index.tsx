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
      default: ["drag-canvas", "zoom-canvas"]
    },
    defaultNode: {
      label: "rect",
      type: "rect",
      // style: {
      //   // The style for the keyShape
      //   fill: "lightblue",
      //   stroke: "#888",
      //   lineWidth: 1,
      //   radius: 7,
      //   hover: {
      //     stroke: "#1890ff",
      //     lineWidth: 2
      //   }
      // }
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

    graph.on("node:click", (evt) => {
      const { item, target } = evt;

      // const targetType = target.get("type");
      // const name = target.get("name");

      console.log("click", item);
      // 增加元素
      // if (targetType === "marker") {
      const model = item.getModel();
      // if (name === "add-item") {
      if (!model.children) {
        model.children = [];
      }
      const id = `n-${Math.random()}`;
      model.children.push({
        id
      });
      graph.updateChild(model, model.id);
      // }
      // else if (name === "remove-item") {
      //   graph.removeChild(model.id);
      // }
      // }
    });
  }, []);
  return <div id="container" ref={ref}></div>;
}
