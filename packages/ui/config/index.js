export const config = {
  platformName: "Med Equip Hub",
  platformDescription:
    "Med Equip Hub is a platform for buying and selling medical equipment.",
  version: "0.1.1",
  about: {
    name: "about",
  },
  contact: {
    name: "contact",
  },
  footer: {
    sections: [
      {
        title: "Legal",
        items: [
          {
            title: "Terms & Conditions",
            path: "#",
          },
          {
            title: "License",
            path: "#",
          },
        ],
      },
      {
        title: "Social",
        items: [
          {
            title: "Instagram",
            path: "#",
          },
          {
            title: "LinkedIn",
            path: "#",
          },
        ],
      },
    ],
  },
  store: {
    name: "supplier",
    plural: "suppliers",
    individual: {
      name: "individual supplier",
      description:
        "Individual Suppliers are designed to meet personal offerings of medical equipment.",
    },
    business: {
      name: "medical supplier",
      description:
        "Medical Suppliers are designed to meet branding and professional requirements, as well as the needs of establishments with a variety of medical equipment.",
    },
    description:
      "Suppliers are designed to meet the needs of sellers of medical equipment. They can be used to showcase medical equipment, manage orders, and more. Join us and start selling medical equipment today!",
  },
  catalog: {
    name: "catalog",
    item: {
      name: "equipment",
      plural: "equipment",
    },
    category: {
      name: "category",
      plural: "categories",
    },
    option: {
      name: "option",
      plural: "options",
    },
    optionGroup: {
      name: "option group",
      plural: "option groups",
      example:
        "For example, 'Size' is an option group while 'Small', 'Medium', and 'Large' are options.",
    },
    variant: {
      name: "variant",
    },
  },
  cart: {
    name: "cart",
  },
  order: {
    name: "order",
    plural: "orders",
  },
};
