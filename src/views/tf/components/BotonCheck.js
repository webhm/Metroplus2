import m from "mithril";

const BotonCheck = {
  view: ({ attrs: { onClick } }) => {
    return m(
      "button",
      {
        class: "btn btn-primary",
        type: "button",
        onclick: onClick,
      },
      "Check"
    );
  },
};

export default BotonCheck;
