@setupApplicationTest
@setupMirage
Feature: Steps Mirage



Scenario: Creating DB records, single-line
  Given there are 2 records of type "ProductVariant" with traits "nameJohnDoe, age30"
  And there are 3 records of type "ProductVariant" with properties {"name": "Foo", "age": 30}
  When I visit URL "/"
  Then there should be 5 Product-Variants in Product-Variants-Age-30
  And the 1st Product-Variant in Product-Variants-Age-30 should be "John Doe 30"
  And the 2nd Product-Variant in Product-Variants-Age-30 should be "John Doe 30"
  And the 3rd Product-Variant in Product-Variants-Age-30 should be "Foo 30"
  And the 4th Product-Variant in Product-Variants-Age-30 should be "Foo 30"
  And the 5th Product-Variant in Product-Variants-Age-30 should be "Foo 30"
