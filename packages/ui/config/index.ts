export interface Iconfig {
  platformName: string;
  platformDescription: string;
  version: string;
  about: {
    name: string;
  };
  contact: {
    name: string;
  };
  footer: {
    sections: {
      title: string;
      items: {
        title: string;
        path: string;
      }[];
    }[];
  };
  store: {
    name: string;
    plural: string;
    individual: {
      name: string;
      description: string;
    };
    business: {
      name: string;
      description: string;
    };
    description: string;
  };
  catalog: {
    name: string;
    item: {
      name: string;
      plural: string;
    };
    category: {
      name: string;
      plural: string;
    };
    option: {
      name: string;
      plural: string;
    };
    optionGroup: {
      name: string;
      plural: string;
      example: string;
    };
    variant: {
      name: string;
    };
  };
  cart: {
    name: string;
  };
  order: {
    name: string;
    plural: string;
  };
}

export const config: Iconfig = {
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
      description:
        "Personal Garages are designed to meet personal offerings of cars.",
    },
    business: {
      name: "car dealership",
      description:
        "Car Dealerships are designed to meet branding and professional requirements, as well as the needs of establishments with a variety of cars.",
    },
    description: "Garages are designed to meet the needs of car sellers. They can be used to showcase cars, manage orders, and more. Join us and create your own garage today!",
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
