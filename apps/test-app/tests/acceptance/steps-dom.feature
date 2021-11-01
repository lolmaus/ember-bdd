
@setupApplicationTest
Feature: Steps DOM



Background:
  When I visit URL "/"



Scenario: When I click (?:on )?$emberBddLabel
  When I click the Click-Button
  Then there should be a Click-Result



Scenario: When I double click (?:on )?$emberBddLabel
  When I double click the Double-Click-Button
  Then there should be a Double-Click-Result



Scenario: Then there should be (NO |no )?(?:(\\d+) )?$emberBddLabel
  Then there should be 2 Items
  Then there should be 1 Item(foo)
  Then there should be a Item(foo)
  Then there should be an Item(foo)
  Then there should be Item(foo)
  Then there should be no Item(bar)

