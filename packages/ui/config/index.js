export const config = {
  platformName: "Cars4Sale",
  platformDescription: "Cars4Sale is a platform for buying and selling cars",
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
    name: "garage",
    plural: "garages",
    individual: {
      name: "personal garage",
      desciption:
        "Personal Garages are designed to meet personal offerings of cars.",
    },
    business: {
      name: "car dealership",
      desciption:
        "Car Dealerships are designed to meet branding and professional requirements, as well as the needs of establishments with a variety of cars.",
    },
    desciption: "Garages are designed to meet the needs of car sellers. They can be used to showcase cars, manage orders, and more. Join us and create your own garage today!",
  },
  catalog: {
    name: "catalog",
    item: {
      name: "car",
      plural: "cars",
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
