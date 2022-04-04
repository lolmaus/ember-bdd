@setupApplicationTest
@setupMirage
Feature: Steps Mirage



Scenario: Creating DB records with identical attributes (single-line)
  Given there are 2 records of type "ProductVariant" with traits "nameJohnDoe, age30"
  And there are 3 records of type "ProductVariant" with properties {"name": "Foo", "age": 30, "testCaseId": "Creating DB records with identical attributes (single-line)"}
  When I visit URL "/"
  Then there should be 5 Product-Variants
  And the 1st Product-Variant should be "1 John Doe 30"
  And the 2nd Product-Variant should be "2 John Doe 30"
  And the 3rd Product-Variant should be "3 Foo 30"
  And the 4th Product-Variant should be "4 Foo 30"
  And the 5th Product-Variant should be "5 Foo 30"




Scenario: Creating DB records with identical attributes (multi-line)
  Given there are 2 records of type "ProductVariant" with traits "nameJohnDoe, age30"

  And there are 3 records of type "ProductVariant" with traits "nameJohnDoe, age30" and the following properties:
    -----------------------------------------------------------------------------
    | key        | value                                                        |
    | name       | "Foo"                                                        |
    | age        | 30                                                           |
    | testCaseId | "Creating DB records with identical attributes (multi-line)" |
    -----------------------------------------------------------------------------

  When I visit URL "/"
  Then there should be 5 Product-Variants
  And the 1st Product-Variant should be "1 John Doe 30"
  And the 2nd Product-Variant should be "2 John Doe 30"
  And the 3rd Product-Variant should be "3 Foo 30"
  And the 4th Product-Variant should be "4 Foo 30"
  And the 5th Product-Variant should be "5 Foo 30"




Scenario: Creating DB records with unique attributes, no traits
  And there are records of type "ProductVariant" with the following properties:
    ----------------------
    | id | name    | age |
    | 2  | "Alice" | 20  |
    | 1  | "John"  | 30  |
    ----------------------

  When I visit URL "/"
  Then there should be 2 Product-Variants
  And the 1st Product-Variant should be "2 Alice 20"
  And the 2nd Product-Variant should be "1 John 30"
