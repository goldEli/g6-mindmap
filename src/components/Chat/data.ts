export const data = {
  // The array of nodes
  // nodes: [
  // {
  id: "Modeling Methods",
  children: [
    {
      id: "Classification",
      children: [
        { id: "Logistic regression" },
        { id: "Linear discriminant analysis" }
      ]
    },
    {
      id: "Consensus",
      children: [
        {
          id: "Models diversity",
          children: [
            { id: "Different initializations" },
            { id: "Different parameter choices" }
          ]
        },
        {
          id: "Methods",
          children: [
            { id: "Classifier selection" },
            { id: "Classifier fusion" }
          ]
        },
        {
          id: "Common",
          children: [{ id: "Bagging" }, { id: "Boosting" }, { id: "AdaBoost" }]
        }
      ]
    },
    {
      id: "Regression",
      children: [
        { id: "Multiple linear regression" },
        { id: "Partial least squares" }
      ]
    }
  ]
  // }
  // ],
  // // The array of edges
  // edges: [
  //   // {
  //   //   source: "node1", // String, required, the id of the source node
  //   //   target: "node2" // String, required, the id of the target node
  //   // }
  // ]
};
