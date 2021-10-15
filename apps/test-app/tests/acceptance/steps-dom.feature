Feature: Steps Ember

@setupApplicationTest
Scenario: Click
  When I visit URL "/"
  When I click the Click-Button
  Then there should be a Click-Result
