import authData from "../../data/authData";

describe("Admin Orders Management", () => {
  beforeEach(() => {
    cy.loginAdmin(authData.admin);
    cy.visit("/admin/dashboard/orders");
    cy.intercept("GET", "/admin/api/orders", {
      statusCode: 200,
      body: [
        {
          uuid: "7d8976e2-da11-4aff-b632-c0a5e3527683",
          id: 1,
          userId: "91404c38-df08-47aa-b12a-415cb77516e8",
          user: {
            id: "91404c38-df08-47aa-b12a-415cb77516e8",
            name: "John Doe",
            email: "john@example.com",
            phone: "1234567890",
          },
          total: 3000,
          subtotal: 3000,
          status: "INPROGRESS",
          createdAt: "2024-05-06T03:40:11.654Z",
          updatedAt: "2024-05-06T12:35:45.791Z",
          deletedAt: null,
          address: {
            id: "1b11f7d5-9bae-4c92-8d7b-383908a5e355",
            country: "Harum ipsum impedit",
            city: "Officia in id culpa ",
            state: "Ea magnam proident ",
            street: "Cupidatat nihil aspe",
            postalCode: "Saepe labore autem u",
            notes: "Sunt ea non ex sequi",
          },
          items: [
            {
              id: "d6523d8b-f228-4eaa-a541-417b63853daf",
              name: "BMW M4",
              sku: "asdaw",
              quantity: 3,
              price: 1000,
              storeId: "ae1a8963-438d-4d5d-a340-2786f5009b70",
              status: "INPROGRESS",
              isVariant: true,
              images: [
                {
                  id: "30347b84-5bc2-49ff-b704-ca361f612578",
                  name: "890d95ca-6941-48dd-ac58-6ef407a5d45c.jpg",
                  extension: "jpg",
                  url: "https://media.cars4sale.tech/48535cf3-af64-4aa0-85e4-80812c708b84/890d95ca-6941-48dd-ac58-6ef407a5d45c.jpg",
                  size: 7270,
                },
                {
                  id: "2731508c-96da-4c0a-b605-d5a63d16c765",
                  name: "dd166bac-ce4f-4755-bec0-34af7ac3578f.jpg",
                  extension: "jpg",
                  url: "https://media.cars4sale.tech/48535cf3-af64-4aa0-85e4-80812c708b84/dd166bac-ce4f-4755-bec0-34af7ac3578f.jpg",
                  size: 231896,
                },
              ],
              groups: [
                {
                  id: "13df0159-aba2-45c3-81ad-2553c41b4492",
                  title: "Color",
                  type: "COLOR",
                  options: [
                    {
                      id: "73b56c1c-db5b-49ea-9b84-bd804b5e2605",
                      label: "Dark Blue",
                      value: "#050970",
                    },
                  ],
                },
                {
                  id: "4daf5261-f9c6-4f64-bb6e-107a3eb710d5",
                  title: "Windows",
                  type: "TEXT",
                  options: [
                    {
                      id: "4c9de928-33e3-466a-858c-3e59b0675ea7",
                      label: "Semi-Tinted",
                      value: "semi-tinted",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
  });

  it("should display the orders table and check the number of orders", () => {
    cy.get("table").should("exist");

    // Count the number of order rows in the table
    cy.get("table tbody")
      .find("tr")
      .then((rows) => {
        const count = rows.length;
        cy.log("Number of orders found:", count);
        // Check if the number of orders is equal to 1 since we have only one order in the mock data
        expect(count).to.equal(1);
      });
  });

  it("Check the order details", () => {
    cy.viewOrderDetails();
    cy.contains("Order Overview").should("exist");
    cy.contains("Customer Details").should("exist");
    cy.contains("Order Cars").should("exist");
    cy.contains("Address").should("exist");
  });

  it("Change order status", () => {
    cy.viewOrderDetails();

    cy.get('[data-test="order-status-select"]').click();
    cy.get('[data-test="order-status-DELIVERED"]').click();

    cy.get('[data-test="order-status-select"]').should(
      "have.text",
      "StatusDelivered"
    );
  });
});
