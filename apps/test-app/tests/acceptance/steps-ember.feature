@setupApplicationTest
@setupMirage
Feature: Steps Ember

Scenario: It should do something
  When I visit URL "/?foo=bar"
  Then I should be at URL "/?foo=bar"
  And current URL's pathname should be "/"
  And current URL should have query param "foo"
  And current URL should have query param "foo" with value "bar"
  And current URL should NOT have query param "bar"
  And current URL should NOT have query param "foo" with value "foo"

  When I pause for 1 ms

  When I visit URL "/?bar&baz=quux"
  Then I should be at URL "/?bar&baz=quux"
  And current URL's pathname should be "/"
  And current URL should NOT have query param "foo"
  And current URL should NOT have query param "foo" with value "bar"
  And current URL should have query param "bar"
  And current URL should have query param "bar" with value ""
  And current URL should NOT have query param "bar" with value "bar"
